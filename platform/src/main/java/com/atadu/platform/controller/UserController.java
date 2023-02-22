package com.atadu.platform.controller;

import com.atadu.platform.dto.ActualUserDto;
import com.atadu.platform.dto.NewPassword;
import com.atadu.platform.exception.EmailExistException;
import com.atadu.platform.exception.InvalidCredentialsException;
import com.atadu.platform.exception.PasswordsNotEqualException;
import com.atadu.platform.exception.UserNotFoundException;
import com.atadu.platform.model.HttpResponse;
import com.atadu.platform.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final AppUserService appUserService;

    @Autowired
    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<ActualUserDto> getUserDetails(@PathVariable String username) throws UserNotFoundException {
        ActualUserDto appUserDto = appUserService.getUserDetails(username);
        return ResponseEntity.ok().body(appUserDto);
    }

    @PostMapping("/{username}")
    public ResponseEntity<HttpResponse> saveUserDetails(@PathVariable String username, @RequestBody ActualUserDto actualUserDto) throws UserNotFoundException, EmailExistException {
        appUserService.saveUserDetails(actualUserDto, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{username}/update-password")
    public ResponseEntity<HttpResponse> updatePassword(@PathVariable String username, @RequestBody NewPassword newPassword) throws UserNotFoundException, PasswordsNotEqualException, InvalidCredentialsException {
        appUserService.saveCredentials(newPassword, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
