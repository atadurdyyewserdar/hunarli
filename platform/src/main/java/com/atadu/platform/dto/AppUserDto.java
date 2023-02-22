package com.atadu.platform.dto;

import com.atadu.platform.model.helper.SocialLinks;
import com.atadu.platform.model.helper.TopLanguages;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDto {
    private String id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private SocialLinks socialLinks;
    private TopLanguages topLanguages;
    private String joinDate;
    private boolean isNonLocked;
    private String occupation;
}
