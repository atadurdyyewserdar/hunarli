package com.atadu.platform.service;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.atadu.platform.constant.UserConstant;
import com.atadu.platform.dto.UserProfileDto;
import com.atadu.platform.dto.AppUserDto;
import com.atadu.platform.dto.NewPassword;
import com.atadu.platform.exception.*;
import com.atadu.platform.model.*;
import com.atadu.platform.model.helper.ProfilePictureMeta;
import com.atadu.platform.repo.AppUserRepo;
import com.atadu.platform.repo.JobsRepo;
import com.atadu.platform.repo.PasswordsRepo;
import com.atadu.platform.repo.ResumesRepo;
import com.atadu.platform.util.CredentialsValidator;
import jakarta.mail.MessagingException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Qualifier("appUserService")
public class AppUserService implements UserDetailsService {

    private AppUserRepo appUserRepo;
    private PasswordEncoder passwordEncoder;
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private final JobsRepo jobsRepo;

    private final AmazonS3Service s3Service;
    @Value("${aws.s3.bucket.name}")
    private String s3BucketName;

    @Value("${aws.s3.region}")
    private String s3RegionName;

    @Value("${aws.s3.bucket.name.resumes}")
    private String s3ResumesBucketName;

    private EmailService emailService;

    private ResumesRepo resumesRepo;
    private PasswordsRepo passwordsRepo;

    @Autowired
    public AppUserService(PasswordsRepo passwordsRepo, ResumesRepo resumesRepo, JobsRepo jobsRepo, AmazonS3Service s3Service, AppUserRepo appUserRepo, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.s3Service = s3Service;
        this.jobsRepo = jobsRepo;
        this.resumesRepo = resumesRepo;
        this.passwordsRepo = passwordsRepo;
    }

    public void sendResetPasswordLink(String email) throws UserNotFoundException, MessagingException {
        Optional<AppUser> appUserOp = appUserRepo.findAppUserByEmail(email);
        if (appUserOp.isEmpty()) {
            return;
        }
        AppUser appUser = appUserOp.get();
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, appUser.getId(), LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(30));
        String emailContent = "Please use below link to reset your password\n\n"
                + "https://stg.hunarli.com/reset-password/new/" + token
                + "\n\nThis link is valid only for 30 minutes";
        emailService.send(appUser.getEmail(), emailContent);
        passwordsRepo.save(resetToken);
    }

    public void validateResetPasswordToken(String token) throws Exception {
        if (token == null) {
            throw new InvalidConfirmationToken("Invalid token");
        }
        Optional<PasswordResetToken> passwordResetToken = passwordsRepo.findById(token);
        if (passwordResetToken.isEmpty()) {
            throw new InvalidConfirmationToken("Invalid token");
        }
        PasswordResetToken p = passwordResetToken.get();
        if (p.getConfirmedAt() != null
                || p.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new Exception("Token is expired");
        }
    }

    public void resetPassword(String token, String password, String confirmPassword) throws Exception {
        if (token == null) {
            throw new InvalidConfirmationToken("Invalid token");
        }
        Optional<PasswordResetToken> passwordResetToken = passwordsRepo.findById(token);
        if (passwordResetToken.isEmpty()) {
            throw new InvalidConfirmationToken("Invalid token");
        }
        PasswordResetToken p = passwordResetToken.get();
        if (p.getConfirmedAt() != null
                || p.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new Exception("Token is expired");
        }
        AppUser user = appUserRepo.findById(p.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        password = password.trim();
        confirmPassword = confirmPassword.trim();
        if (!password.equals(confirmPassword)) {
            throw new PasswordsNotEqualException("Passwords are not equal, please retype password");
        }
        if (!CredentialsValidator.isSecurePassword(password)) {
            throw new InvalidCredentialsException("Invalid password");
        }
        p.setConfirmedAt(LocalDateTime.now());
        p.setExpiredAt(LocalDateTime.now());
        passwordsRepo.save(p);
        user.setPassword(passwordEncoder.encode(password));
        appUserRepo.save(user);
    }

    public void saveProfileImage(MultipartFile file, String username) throws IOException, UserNotFoundException {
        String folderName = UUID.randomUUID().toString();
        String filePath = String.format("%s/%s", s3BucketName, folderName);
        String fileName = String.format("%s", file.getOriginalFilename());
        String url = "https://" + s3BucketName + ".s3." + s3RegionName + ".amazonaws.com/" + folderName + "/" + fileName;
        uploadTos3Bucket(file, folderName, filePath, fileName);
        AppUser appUser = findUserByUsername(username);
        ProfilePictureMeta pictureMeta = new ProfilePictureMeta();
        pictureMeta.setFileName(fileName);
        pictureMeta.setFolderName(folderName);
        pictureMeta.setFilePath(filePath);
        pictureMeta.setUrl(url);
        appUser.setProfilePictureMeta(pictureMeta);
        appUserRepo.save(appUser);
    }

    private void uploadTos3Bucket(MultipartFile file, String folderName, String filePath, String fileName) throws IOException {
        if (file.isEmpty())
            throw new IllegalStateException("Cannot upload empty file");
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        PutObjectResult putObjectResult = s3Service.upload(
                filePath, fileName, Optional.of(metadata), file.getInputStream());
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser;
        try {
            appUser = findUser(username);
        } catch (UserNotFoundException e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
        UserPrincipal userPrincipal = new UserPrincipal(appUser);
        LOGGER.info(userPrincipal.getPassword());
        LOGGER.info(userPrincipal.getUsername());
        return userPrincipal;
    }

    public AppUser findUserByUsername(String username) throws UserNotFoundException {
        return findUser(username);
    }

    private AppUser findUser(String username) throws UserNotFoundException {
        LOGGER.info("Attempt to find user by username...");
        AppUser appUser;
        if (username.contains("@")) {
            LOGGER.info("Finding user by email...");
            appUser = appUserRepo.findAppUserByEmail(username)
                    .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
            LOGGER.info("User found user by email...");
        } else {
            LOGGER.info("Finding user by username...");
            appUser = appUserRepo.findAppUserByUsername(username)
                    .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
            LOGGER.info("User found by username...");
        }
        if (appUser == null) {
            throw new UsernameNotFoundException("User with username: " + username + "not found");
        }
        LOGGER.info("Returning loaded user...");
        return appUser;
    }

    public AppUserDto getUserForProfileView(String username) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        AppUserDto appUserDto = new AppUserDto();
        appUserDto.setUsername(appUser.getUsername());
        appUserDto.setId(appUserDto.getId());
        appUserDto.setEmail(appUser.getEmail());
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String joinDate = appUser.getJoinDate().format(format);
        appUserDto.setJoinDate(joinDate.replace('-', '.'));
        appUserDto.setSocialLinks(appUser.getSocialLinks());
        appUserDto.setNonLocked(appUser.isNonLocked());
        appUserDto.setLocation(appUser.getLocation());
        return appUserDto;
    }

    public AppUser getUserDetails(String username) throws UserNotFoundException {
        return appUserRepo.customFindById(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
    }

    public AppUser test(String username) throws UserNotFoundException {
        return appUserRepo.customFindById(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
    }

    public void saveUserDetails(UserProfileDto userProfileDto, String username)
            throws UserNotFoundException, EmailExistException, IOException {
        AppUser currentUser = appUserRepo.findAppUserByUsername(username).orElseThrow(
                () -> new UserNotFoundException("User with email: " + userProfileDto.getUsername() + " not found"));
        if (!currentUser.getEmail().equals(userProfileDto.getEmail())) {
            AppUser temp = appUserRepo.findAppUserByEmail(userProfileDto.getEmail()).orElse(null);
            if (temp != null) {
                throw new EmailExistException("This email already taken");
            }
            currentUser.setEmail(userProfileDto.getEmail());
        }
        currentUser.setAboutMe(userProfileDto.getAboutMe());
        currentUser.setPhoneNumber(userProfileDto.getPhoneNumber());
        currentUser.setPortfolioUrl(userProfileDto.getPortfolioUrl());
        currentUser.setCurrentCompany(userProfileDto.getCurrentCompany());
        currentUser.setOccupation(userProfileDto.getOccupation());
        currentUser.setLocation(userProfileDto.getLocation());
        currentUser.setTags(userProfileDto.getTags());

        if (userProfileDto.getResume() != null) {
            LOGGER.info("File is not null");
            String folderName = UUID.randomUUID().toString();
            String filePath = String.format("%s/%s", s3ResumesBucketName, folderName);
            String fileName = String.format("%s", userProfileDto.getResume().getOriginalFilename());
            LOGGER.info("File name is " + fileName);
            String url = "https://" + s3ResumesBucketName + ".s3." + s3RegionName + ".amazonaws.com/" + folderName + "/" + fileName;
            ResumeMeta resumeMeta = new ResumeMeta();
            resumeMeta.setUserId(currentUser.getId());
            resumeMeta.setUrl(url);
            resumeMeta.setFilePath(filePath);
            resumeMeta.setFolderName(folderName);
            resumeMeta.setFileName(fileName);
            uploadTos3Bucket(userProfileDto.getResume(), folderName, filePath, fileName);
            resumesRepo.save(resumeMeta);
            currentUser.setResumeId(resumeMeta.getId());
        }

        if (!userProfileDto.getFirstName().equals("")) {
            currentUser.setFirstName(userProfileDto.getFirstName());
        }
        if (!userProfileDto.getLastName().equals("")) {
            currentUser.setLastName(userProfileDto.getLastName());
        }
        appUserRepo.save(currentUser);
    }

    public S3Object download(String id) throws Exception {
        ResumeMeta fileMeta = resumesRepo.findById(id).orElseThrow(() -> new Exception("File not found"));
        LOGGER.info("Starting download...");
        return s3Service.download(fileMeta.getFilePath(), fileMeta.getFileName());
    }

    public void saveCredentials(NewPassword newPassword, String username)
            throws UserNotFoundException, PasswordsNotEqualException, InvalidCredentialsException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        if (!newPassword.getNewPassword().equals(newPassword.getConfirmPassword())) {
            throw new PasswordsNotEqualException("Please ensure that passwords are equal");
        }
        if (!CredentialsValidator.isSecurePassword(newPassword.getNewPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }
        appUser.setPassword(passwordEncoder.encode(newPassword.getConfirmPassword()));
        appUserRepo.save(appUser);
    }

    public void registerNewUser(AppUserDto appUserDto) throws InvalidCredentialsException, UserNotFoundException,
            EmailNotFoundException, UsernameExistException, EmailExistException, MessagingException {
        if (!CredentialsValidator.isSecurePassword(appUserDto.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }
        if (!CredentialsValidator.isValidEmail(appUserDto.getEmail())) {
            throw new InvalidCredentialsException("Invalid email");
        }
        validateNewUsernameAndEmail(StringUtils.EMPTY, appUserDto.getUsername(), appUserDto.getEmail());
        AppUser appUser = new AppUser();
        appUser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        appUser.setUsername(appUserDto.getUsername());
        appUser.setEmail(appUserDto.getEmail());
        appUser.setLastLoginDate(LocalDateTime.now());
        appUser.setLastName(appUserDto.getLastName());
        appUser.setFirstName(appUserDto.getFirstName());
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(Role.ROLE_USER);
        appUser.setRole(roleSet);
        appUser.setNonExpired(true);
        appUser.setNonLocked(true);
        appUser.setCredentialsNonExpired(true);
        appUser.setEnabled(false);
        appUser.setJoinDate(LocalDateTime.now());
        appUser.setJobPosts(new HashSet<>());
        String token = UUID.randomUUID().toString();
        EmailConfirmationToken confirmationToken = new EmailConfirmationToken(token, LocalDateTime.now(),
                LocalDateTime.now().plusHours(24));
        appUser.setConfirmationTokens(confirmationToken);
        String emailContent = "Please use below link to confirm you email\n\n"
                + "https://stg.hunarli.com/verify-email/confirm?username="
                + appUser.getUsername()
                + "&token=" + token
                + "\n\nYou have 24 hours to confirm your email";
        emailService.send(appUser.getEmail(), emailContent);
        appUserRepo.save(appUser);
    }

    public AppUserDto editUser(AppUserDto appUserDto) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(appUserDto.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User with email: " + appUserDto.getUsername() + " not found"));
        appUser.setSocialLinks(appUserDto.getSocialLinks());
        appUser.setFirstName(appUserDto.getFirstName());
        appUser.setLastName(appUserDto.getLastName());
        appUser.setAboutMe(appUserDto.getAboutMe());
        appUser.setLocation(appUserDto.getLocation());
        appUser.setPhoneNumber(appUserDto.getPhoneNumber());
        appUser.setCurrentCompany(appUserDto.getCurrentCompany());
        appUser.setPortfolioUrl(appUserDto.getPortfolioUrl());
        appUserRepo.save(appUser);
        return appUserDto;
    }

    public String confirmToken(String token, String username)
            throws EmailTokenExpiredException, UserNotFoundException, InvalidConfirmationToken {
        AppUser user = appUserRepo.findAppUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        EmailConfirmationToken confirmationToken = user.getConfirmationTokens();
        LOGGER.info(Boolean.toString(confirmationToken.getExpiredAt().isBefore(LocalDateTime.now())));
        if (confirmationToken.getConfirmedAt() != null
                || confirmationToken.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new EmailTokenExpiredException("Token is expired");
        } else if (!user.getConfirmationTokens().getToken().equals(token)) {
            throw new InvalidConfirmationToken("Token is not valid");
        }
        confirmationToken.setConfirmedAt(LocalDateTime.now());
        user.setEnabled(true);
        appUserRepo.save(user);
        return "Confirmed";
    }

    public UserPrincipal getUserPrincipal(String username) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        return new UserPrincipal(appUser);
    }

    public void uploadProfilePicture(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Can not upload empty file");
        }
    }

    private void validateNewUsernameAndEmail(String currentUsername, String newUsername, String newEmail)
            throws UserNotFoundException, UsernameExistException, EmailNotFoundException, EmailExistException {
        AppUser userByUsername = appUserRepo.findAppUserByUsername(newUsername).orElse(null);
        AppUser userByEmail = appUserRepo.findAppUserByEmail(newEmail).orElse(null);
        if (StringUtils.isNotBlank(currentUsername)) {
            AppUser currentUser = findUserByUsername(currentUsername);
            if (currentUser == null) {
                throw new UserNotFoundException(UserConstant.NO_USER_FOUND_BY_USERNAME + currentUsername);
            }
            if (userByUsername != null && !currentUser.getId().equals(userByUsername.getId())) {
                throw new UsernameExistException(UserConstant.USERNAME_ALREADY_EXISTS);
            }
            if (userByEmail != null && !currentUser.getId().equals(userByEmail.getId())) {
                throw new EmailNotFoundException(UserConstant.EMAIL_ALREADY_EXISTS);
            }
        } else {
            if (userByUsername != null) {
                throw new UsernameExistException(UserConstant.USERNAME_ALREADY_EXISTS);
            }
            if (userByEmail != null) {
                throw new EmailNotFoundException(UserConstant.EMAIL_ALREADY_EXISTS);
            }
        }
    }
}