package com.atadu.platform.controller;

import com.amazonaws.services.s3.model.S3Object;
import com.atadu.platform.dto.*;
import com.atadu.platform.exception.EmailExistException;
import com.atadu.platform.exception.InvalidCredentialsException;
import com.atadu.platform.exception.PasswordsNotEqualException;
import com.atadu.platform.exception.UserNotFoundException;
import com.atadu.platform.model.AppUser;
import com.atadu.platform.model.HttpResponse;
import com.atadu.platform.model.views.JSONViews;
import com.atadu.platform.service.AppUserService;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private final AppUserService appUserService;

    @Autowired
    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/{username}")
    @JsonView(JSONViews.UserProfile.class)
    public ResponseEntity<AppUser> getUserDetails(@PathVariable String username) throws UserNotFoundException {
        AppUser appUser = appUserService.getUserDetails(username);
        return ResponseEntity.ok().body(appUser);
    }

    @PostMapping("/{username}")
    public ResponseEntity<HttpResponse> saveUserDetails(@PathVariable String username, @ModelAttribute UserProfileDto userProfileDto) throws UserNotFoundException, EmailExistException, IOException {
        appUserService.saveUserDetails(userProfileDto, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{username}/update-password")
    public ResponseEntity<HttpResponse> updatePassword(@PathVariable String username, @RequestBody NewPassword newPassword) throws UserNotFoundException, PasswordsNotEqualException, InvalidCredentialsException {
        appUserService.saveCredentials(newPassword, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{username}/update-profile-pic")
    public ResponseEntity<HttpResponse> saveProfileImage(@ModelAttribute ProfilePictureRequest file, @PathVariable String username) throws UserNotFoundException, PasswordsNotEqualException, InvalidCredentialsException, IOException {
        appUserService.saveProfileImage(file.getFile(), username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/resume/{id}")
    public ResponseEntity<byte[]> saveProfileImage(@PathVariable String id) throws Exception {
        S3Object s3Object = appUserService.download(id);
        LOGGER.info("File downloaded successfully");
        String contentType = s3Object.getObjectMetadata().getContentType();
        var bytes = s3Object.getObjectContent().readAllBytes();
        LOGGER.info("Setting headers...");
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(bytes.length));
        header.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;");
        header.add(HttpHeaders.CONTENT_TYPE, String.valueOf(MediaType.valueOf(contentType)));
        LOGGER.info("Headers added");
        LOGGER.info("Sending file to frontent...");
        LOGGER.info("Length is " + String.valueOf(bytes.length));
        return ResponseEntity.ok().headers(header).body(bytes);
    }

    @GetMapping("/reset-password/new/{token}")
    public ResponseEntity<HttpResponse> validateToken(@PathVariable String token) throws Exception {
        appUserService.validateResetPasswordToken(token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset-password/new/{token}")
    public ResponseEntity<HttpResponse> resetPassword(@PathVariable String token, @RequestBody NewPassword newPassword) throws Exception {
        appUserService.resetPassword(token, newPassword.getNewPassword(), newPassword.getConfirmPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset-password/{email}")
    public ResponseEntity<String> sendResetLink(@PathVariable String email) throws UserNotFoundException, MessagingException {
        appUserService.sendResetPasswordLink(email);
        return ResponseEntity.ok().body("Success");
    }
}
