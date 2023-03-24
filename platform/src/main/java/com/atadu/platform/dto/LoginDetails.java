package com.atadu.platform.dto;

import com.atadu.platform.model.helper.ProfilePictureMeta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDetails {
    private String username;
    private String password;
    private String profilePictureUrl;
}
