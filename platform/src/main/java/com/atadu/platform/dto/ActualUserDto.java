package com.atadu.platform.dto;

import com.atadu.platform.model.helper.SocialLinks;
import com.atadu.platform.model.helper.TopLanguages;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualUserDto {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String joinDate;
    private String lastLoginDate;
    private boolean isNonLocked;
    private boolean isNonExpired;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;
    private String occupation;
    private SocialLinks socialLinks;
    private TopLanguages topLanguages;
}
