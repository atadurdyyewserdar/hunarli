package com.atadu.platform.model;

import com.atadu.platform.model.helper.ProfilePictureMeta;
import com.atadu.platform.model.helper.SocialLinks;
import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Document(value = "app_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"enabled", "credentialsNonExpired", "target", "password", "role", "confirmationTokens", "lastLoginDate", "nonLocked", "nonExpired"})
@JsonView(JSONViews.Public.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppUser implements Serializable {
    @Id
    private String id;
    @DBRef(lazy = true)
    @JsonView(JSONViews.UserProfile.class)
    private Set<JobPost> jobPosts;
    private String username;
    @JsonView(JSONViews.Private.class)
    private String password;
    @JsonView(JSONViews.UserProfile.class)
    private String email;
    @JsonView(JSONViews.UserProfile.class)
    private String firstName;
    @JsonView(JSONViews.UserProfile.class)
    private String location;
    @JsonView(JSONViews.UserProfile.class)
    private String lastName;
    @JsonView(JSONViews.UserProfile.class)
    private String currentCompany;
    @JsonView(JSONViews.UserProfile.class)
    private String phoneNumber;
    @JsonView(JSONViews.UserProfile.class)
    private String portfolioUrl;
    private Set<Role> role;
    @JsonView(JSONViews.UserProfile.class)
    private LocalDateTime joinDate;
    private LocalDateTime lastLoginDate;
    @JsonView(JSONViews.Private.class)
    private boolean isNonLocked;
    @JsonView(JSONViews.Private.class)
    private boolean isNonExpired;
    @JsonView(JSONViews.Private.class)
    private boolean isCredentialsNonExpired;
    @JsonView(JSONViews.Private.class)
    private boolean isEnabled;
    @JsonView(JSONViews.UserProfile.class)
    private String occupation;
    @JsonView(JSONViews.Private.class)
    private EmailConfirmationToken confirmationTokens;
    @JsonView(JSONViews.UserProfile.class)
    private SocialLinks socialLinks;
    @JsonView(JSONViews.UserProfile.class)
    private String aboutMe;
    private ProfilePictureMeta profilePictureMeta;
    @JsonView(JSONViews.UserProfile.class)
    private Set<String> tags;
    @JsonView(JSONViews.UserProfile.class)
    private String resumeId;
}
