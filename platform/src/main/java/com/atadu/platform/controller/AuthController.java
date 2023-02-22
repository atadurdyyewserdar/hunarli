package com.atadu.platform.controller;

import com.atadu.platform.dto.AppUserDto;
import com.atadu.platform.dto.LoginDetails;
import com.atadu.platform.exception.*;
import com.atadu.platform.model.AppUser;
import com.atadu.platform.model.HttpResponse;
import com.atadu.platform.model.UserPrincipal;
import com.atadu.platform.service.AppUserService;
import com.atadu.platform.util.JwtProvider;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/")
public class AuthController {
    private AppUserService appUserService;
    private JwtProvider jwtProvider;
    private AuthenticationManager authenticationManager;
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    public AuthController(AppUserService appUserService, JwtProvider jwtProvider, AuthenticationManager authenticationManager) {
        this.appUserService = appUserService;
        this.jwtProvider = jwtProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDetails> loginUser(@RequestBody LoginDetails loginDetails, HttpServletResponse servletResponse) throws UserNotFoundException {
        LOGGER.info("Login method entry...");
        AppUser appUser = appUserService.findUserByUsername(loginDetails.getUsername());
        LOGGER.info("appUser found...");
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), loginDetails.getPassword()));
        LOGGER.info("authenticated...");
        UserPrincipal userPrincipal = appUserService.getUserPrincipal(appUser.getUsername());
        LOGGER.info("userprincipal found...");
        String accessToken = jwtProvider.createAccessToken(userPrincipal);
        // String refreshToken = jwtProvider.createRefreshToken(userPrincipal);
        LOGGER.info("header added...");
        Cookie aCookie = new Cookie("access_token", accessToken);
//        Cookie rCookie = new Cookie("refresh", refreshToken);
        aCookie.setSecure(true);
//        rCookie.setSecure(true);
        aCookie.setHttpOnly(true);
//        rCookie.setHttpOnly(true);
        servletResponse.addCookie(aCookie);
//        servletResponse.addCookie(rCookie);
        loginDetails.setPassword(null);
        return ResponseEntity.ok().body(loginDetails);
    }

    @PostMapping("/signup")
    public ResponseEntity<HttpResponse> registerUser(@RequestBody AppUserDto user) throws UserNotFoundException, EmailNotFoundException, EmailExistException, InvalidCredentialsException, UsernameExistException, MessagingException {
        appUserService.registerNewUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/test")
    @PreAuthorize("hasAnyAuthority('user:read')")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/test2")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> test2() {
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam String token, @RequestParam String username) throws EmailTokenExpiredException, UserNotFoundException, InvalidConfirmationToken {
        return ResponseEntity.ok().body(appUserService.confirmToken(token, username));
    }

//    @PostMapping("/logout")
//    public ResponseEntity<String> logout(HttpServletRequest request) {
//        SecurityContextHolder.clearContext();
//        Optional<Cookie> authCookie = Stream.of(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
//                .filter(cookie -> cookie.getName().equals("access_token")).findFirst();
//        authCookie.ifPresent(cookie -> cookie.setMaxAge(0));
//        Optional<Cookie> refreshTokenCookie = Stream.of(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
//                .filter(cookie -> cookie.getName().equals("refresh_token")).findFirst();
//        refreshTokenCookie.ifPresent(cookie -> cookie.setMaxAge(0));
//        return ResponseEntity.noContent().build();
//    }


//    public void logout(HttpServletRequest request, HttpServletResponse response) {
//        boolean isSecure = false;
//        String contextPath = null;
//        if (request != null) {
//            HttpSession session = request.getSession(false);
//            if (session != null) {
//                session.invalidate();
//            }
//            isSecure = request.isSecure();
//            contextPath = request.getContextPath();
//        }
//        SecurityContext context = SecurityContextHolder.getContext();
//        SecurityContextHolder.clearContext();
//        context.setAuthentication(null);
//        if (response != null) {
//            Cookie cookie = new Cookie("JSESSIONID", null);
//            String cookiePath = StringUtils.hasText(contextPath) ? contextPath : "/";
//            cookie.setPath(cookiePath);
//            cookie.setMaxAge(0);
//            cookie.setSecure(isSecure);
//            response.addCookie(cookie);
//        }
//    }
}
