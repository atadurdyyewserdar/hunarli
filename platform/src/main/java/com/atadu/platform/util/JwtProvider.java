package com.atadu.platform.util;

import com.atadu.platform.constant.JwtConstant;
import com.atadu.platform.model.UserPrincipal;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
// import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Value("${accesstokensecret}")
    private String accessTokenSecret;
    @Value("${refreshtokensecret}")
    private String refreshTokenSecret;

    private Algorithm getAccessTokenAlgorithm() {
        return Algorithm.HMAC512(accessTokenSecret);
    }

    private Algorithm getRefreshTokenAlgorithm() {
        return Algorithm.HMAC512(refreshTokenSecret);
    }

    public String createAccessToken(UserPrincipal userPrincipal) {
        Date creationDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(creationDate.getTime() + JwtConstant.EXPIRATION_TIME);
        return JWT.create()
                .withIssuer(JwtConstant.ISSUER)
                .withAudience(JwtConstant.AUDIENCE)
                .withIssuedAt(creationDate)
                .withSubject(userPrincipal.getUsername())
                .withArrayClaim(JwtConstant.AUTHORITIES, getAuthorities(userPrincipal))
                .withExpiresAt(expirationDate)
                .sign(getAccessTokenAlgorithm());
    }

    public String createRefreshToken(UserPrincipal userPrincipal) {
        Date creationDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(creationDate.getTime() + JwtConstant.EXPIRATION_TIME);
        return JWT.create()
                .withIssuer(JwtConstant.ISSUER)
                .withIssuedAt(creationDate)
                .withSubject(userPrincipal.getUsername())
                .withExpiresAt(expirationDate)
                .sign(getRefreshTokenAlgorithm());
    }

    public Authentication getAuthentication(String username, List<GrantedAuthority> authorities,
            HttpServletRequest request) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                username, null, authorities);
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return usernamePasswordAuthenticationToken;
    }

    public boolean isTokenValid(String username, String token) {
        JWTVerifier verifier = getAccessTokenVerifier();
        return StringUtils.isNoneEmpty(username) && !isTokenExpired(verifier, token);
    }

    public List<GrantedAuthority> getAuthoritiesFromToken(String token) {
        String[] authorities = getClaimsFromToken(token);
        return Arrays.stream(authorities).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public String getSubject(String token) {
        JWTVerifier verifier = getAccessTokenVerifier();
        return verifier.verify(token).getSubject();
    }

    private boolean isTokenExpired(JWTVerifier verifier, String token) {
        Date expireDate = verifier.verify(token).getExpiresAt();
        return expireDate.before(new Date());
    }

    private String[] getClaimsFromToken(String token) {
        JWTVerifier verifier = getAccessTokenVerifier();
        return verifier.verify(token).getClaim(JwtConstant.AUTHORITIES).asArray(String.class);
    }

    // private boolean isRefreshTokenValid(String token) {
    // JWTVerifier verifier = getRefreshTokenVerifier();
    // DecodedJWT jwt = getAccessTokenVerifier().verify(token);
    // Date expireDate = verifier.verify(token).getExpiresAt();
    // return new Date().before(expireDate);
    // }

    private String[] getAuthorities(UserPrincipal userPrincipal) {
        List<String> authorities = new ArrayList<>();
        userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).forEach(authorities::add);
        return authorities.toArray(new String[0]);
    }

    private JWTVerifier getAccessTokenVerifier() {
        JWTVerifier verifier;
        try {
            verifier = JWT.require(getAccessTokenAlgorithm())
                    .withIssuer(JwtConstant.ISSUER)
                    .withAudience(JwtConstant.AUDIENCE)
                    .build();
        } catch (JWTVerificationException ex) {
            LOGGER.error(ex.getMessage() + "::: HERE");
            throw new JWTVerificationException("Access token can't be verified");
        }
        return verifier;
    }

    // private JWTVerifier getRefreshTokenVerifier() {
    // JWTVerifier verifier;
    // try {
    // verifier = JWT.require(getRefreshTokenAlgorithm())
    // .withIssuer(JwtConstant.ISSUER)
    // .build();
    // } catch (JWTVerificationException ex) {
    // LOGGER.error(ex.getMessage() + "::: HERE");
    // throw new JWTVerificationException("Refresh token can't be verified");
    // }
    // return verifier;
    // }
}
