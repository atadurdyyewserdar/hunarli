package com.atadu.platform.service;

import com.atadu.platform.constant.UserConstant;
import com.atadu.platform.dto.ActualUserDto;
import com.atadu.platform.dto.AppUserDto;
import com.atadu.platform.dto.NewPassword;
import com.atadu.platform.exception.*;
import com.atadu.platform.model.AppUser;
import com.atadu.platform.model.EmailConfirmationToken;
import com.atadu.platform.model.Role;
import com.atadu.platform.model.UserPrincipal;
import com.atadu.platform.model.helper.TopLanguages;
import com.atadu.platform.repo.AppUserRepo;
import com.atadu.platform.util.CredentialsValidator;
import jakarta.mail.MessagingException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@Qualifier("appUserService")
public class AppUserService implements UserDetailsService {

    private AppUserRepo appUserRepo;
    private PasswordEncoder passwordEncoder;
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private EmailService emailService;


    @Autowired
    public AppUserService(AppUserRepo appUserRepo, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
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
            appUser = appUserRepo.findAppUserByEmail(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
            LOGGER.info("User found user by email...");
        } else {
            LOGGER.info("Finding user by username...");
            appUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
            LOGGER.info("User found by username...");
        }
        if (appUser == null) {
            throw new UsernameNotFoundException("User with username: " + username + "not found");
        }
        LOGGER.info("Returning loaded user...");
        return appUser;
    }

    public AppUserDto getUserForProfileView(String username) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        AppUserDto appUserDto = new AppUserDto();
        appUserDto.setUsername(appUser.getUsername());
        appUserDto.setId(appUserDto.getId());
        appUserDto.setEmail(appUser.getEmail());
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String joinDate = appUser.getJoinDate().format(format);
        appUserDto.setJoinDate(joinDate.replace('-', '.'));
        appUserDto.setSocialLinks(appUser.getSocialLinks());
        appUserDto.setTopLanguages(appUser.getTopLanguages());
        appUserDto.setNonLocked(appUser.isNonLocked());
        return appUserDto;
    }

    public ActualUserDto getUserDetails(String username) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        ActualUserDto actualUser = new ActualUserDto();
        actualUser.setEnabled(appUser.isEnabled());
        actualUser.setFirstName(appUser.getFirstName());
        actualUser.setLastName(appUser.getLastName());
        actualUser.setEmail(appUser.getEmail());
        actualUser.setId(appUser.getId());
        actualUser.setTopLanguages(appUser.getTopLanguages());
        actualUser.setSocialLinks(appUser.getSocialLinks());
        actualUser.setUsername(appUser.getUsername());
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String joinDate = appUser.getJoinDate().format(format).replace('-', '.');
        actualUser.setJoinDate(joinDate);
        actualUser.setNonExpired(appUser.isNonExpired());
        actualUser.setNonLocked(appUser.isNonLocked());
        actualUser.setCredentialsNonExpired(appUser.isCredentialsNonExpired());
        actualUser.setOccupation(appUser.getOccupation());
        return actualUser;
    }

    public void saveUserDetails(ActualUserDto actualUserDto, String username) throws UserNotFoundException, EmailExistException {
        AppUser currentUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + actualUserDto.getUsername() + " not found"));
        if (!currentUser.getEmail().equals(actualUserDto.getEmail())) {
            AppUser temp = appUserRepo.findAppUserByEmail(actualUserDto.getEmail()).orElse(null);
            if (temp != null) {
                throw new EmailExistException("This email already taken");
            }
            currentUser.setEmail(actualUserDto.getEmail());
        }
        currentUser.setOccupation(actualUserDto.getOccupation());
        currentUser.setTopLanguages(actualUserDto.getTopLanguages());
        if (!actualUserDto.getFirstName().equals("")) {
            currentUser.setFirstName(actualUserDto.getFirstName());
        }
        if (!actualUserDto.getLastName().equals("")) {
            currentUser.setLastName(actualUserDto.getLastName());
        }
        appUserRepo.save(currentUser);
    }

    public void saveCredentials(NewPassword newPassword, String username) throws UserNotFoundException, PasswordsNotEqualException, InvalidCredentialsException {
        AppUser appUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        if (!newPassword.getNewPassword().equals(newPassword.getConfirmPassword())) {
            throw new PasswordsNotEqualException("Please ensure that passwords are equal");
        }
        if (!CredentialsValidator.isSecurePassword(newPassword.getNewPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }
        appUser.setPassword(passwordEncoder.encode(newPassword.getConfirmPassword()));
        appUserRepo.save(appUser);
    }

    public void registerNewUser(AppUserDto appUserDto) throws InvalidCredentialsException, UserNotFoundException, EmailNotFoundException, UsernameExistException, EmailExistException, MessagingException {
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
        appUser.setTopLanguages(new TopLanguages());
        appUser.setJoinDate(LocalDateTime.now());
        String token = UUID.randomUUID().toString();
        EmailConfirmationToken confirmationToken = new EmailConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusHours(24));
        appUser.setConfirmationTokens(confirmationToken);
        String emailContent = "Please use below link to confirm you email\n\n"
                + "http://localhost:8080/confirm?username="
                + appUser.getUsername()
                + "&token=" + token
                + "\n\nYou have 24 hours to confirm your email";
        emailService.send(appUser.getEmail(), emailContent);
        appUserRepo.save(appUser);
    }

    public AppUserDto editUser(AppUserDto appUserDto) throws UserNotFoundException {
        AppUser appUser = appUserRepo.findAppUserByUsername(appUserDto.getUsername()).orElseThrow(() -> new UserNotFoundException("User with email: " + appUserDto.getUsername() + " not found"));
        appUser.setTopLanguages(appUserDto.getTopLanguages());
        appUser.setSocialLinks(appUserDto.getSocialLinks());
        appUser.setFirstName(appUserDto.getFirstName());
        appUser.setLastName(appUserDto.getLastName());
        appUser.setOccupation(appUserDto.getOccupation());
        appUserRepo.save(appUser);
        return appUserDto;
    }

    public String confirmToken(String token, String username) throws EmailTokenExpiredException, UserNotFoundException, InvalidConfirmationToken {
        AppUser user = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        EmailConfirmationToken confirmationToken = user.getConfirmationTokens();
        if (confirmationToken.getConfirmedAt() != null
                || confirmationToken.getExpiredAt().isBefore(LocalDateTime.now())
        ) {
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
        AppUser appUser = appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User with email: " + username + " not found"));
        return new UserPrincipal(appUser);
    }

    private void validateNewUsernameAndEmail(String currentUsername, String newUsername, String newEmail) throws UserNotFoundException, UsernameExistException, EmailNotFoundException, EmailExistException {
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