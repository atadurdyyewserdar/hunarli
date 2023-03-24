package com.atadu.platform.filters;

import com.atadu.platform.util.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private JwtProvider jwtProvider;
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    public JwtFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        LOGGER.info("starting cookies...");
        if (cookies != null) {
            LOGGER.info("Searching for token...");
            Optional<Cookie> accessCookie = Arrays.stream(cookies)
                    .filter(c -> c.getName().equals("access_token")).findFirst();
//            Optional<Cookie> refreshCookie = Arrays.stream(cookies)
//                    .filter(c -> c.getName().equals("refresh")).findFirst();
//            if (accessCookie.isPresent() && refreshCookie.isPresent()) {
            if (accessCookie.isPresent()) {
                LOGGER.info("Token found...");
                Cookie tokenCookie = accessCookie.get();
                String username = jwtProvider.getSubject(tokenCookie.getValue());
                if (tokenCookie.getValue() == null) {
                    LOGGER.info("Token value is null...");
                    filterChain.doFilter(request, response);
                    return;
                }
                if (jwtProvider.isTokenValid(username, tokenCookie.getValue()) && SecurityContextHolder.getContext().getAuthentication() == null) {
                    List<GrantedAuthority> authorities = jwtProvider.getAuthoritiesFromToken(tokenCookie.getValue());
                    LOGGER.info(authorities.toString());
                    SecurityContextHolder.getContext().setAuthentication(jwtProvider.getAuthentication(username, authorities, request));
                    LOGGER.info("Success...");
                } else {
                    SecurityContextHolder.clearContext();
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
