package com.atadu.platform.model;

import com.atadu.platform.constant.AuthorityConstant;

public enum Role {
    ROLE_ADMIN(AuthorityConstant.ADMIN_AUTHORITY),
    ROLE_USER(AuthorityConstant.USER_AUTHORITY);

    private String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }
}
