package com.atadu.platform.model;

import com.atadu.platform.model.helper.SocialLinks;
import com.atadu.platform.model.helper.TopLanguages;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Document(value = "app_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUser implements Serializable {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Set<Role> role;
    private LocalDateTime joinDate;
    private LocalDateTime lastLoginDate;
    private boolean isNonLocked;
    private boolean isNonExpired;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;
    private String occupation;
    private TopLanguages topLanguages;
    private EmailConfirmationToken confirmationTokens;
    private SocialLinks socialLinks;
}
