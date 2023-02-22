package com.atadu.platform.exception;

public class EmailTokenExpiredException extends Exception {
    public EmailTokenExpiredException(String msg) {
        super(msg);
    }
}
