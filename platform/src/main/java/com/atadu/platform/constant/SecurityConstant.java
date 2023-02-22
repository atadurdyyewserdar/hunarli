package com.atadu.platform.constant;

public class SecurityConstant {
    public static final long EXPIRATION_TIME = 432_000_000; // 5 days expressed in milliseconds
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token can not be verified";
    public static final String IBA_GROUP = "IBA Group";
    public static final String IBA_GROUP_ADMINISTRATION = "Electronic Library";
    public static final String AUTHORITIES = "Authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED_MESSAGE = "You don't have permission to access this page";
    public static final String OPTION_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {
            "/login",
            "/signup",
            "/",
            "/confirm/**"
    };

    //public static final String[] PUBLIC_URLS = {"**"};
}
