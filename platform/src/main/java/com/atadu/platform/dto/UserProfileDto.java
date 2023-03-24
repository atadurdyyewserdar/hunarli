package com.atadu.platform.dto;

import com.atadu.platform.model.EmailConfirmationToken;
import com.atadu.platform.model.JobPost;
import com.atadu.platform.model.Role;
import com.atadu.platform.model.helper.ProfilePictureMeta;
import com.atadu.platform.model.helper.SocialLinks;
import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private String id;
    private Set<JobPost> jobPostId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String location;
    private String currentCompany;
    private String phoneNumber;
    private String portfolioUrl;
    private LocalDateTime joinDate;
    private LocalDateTime lastLoginDate;
    private String occupation;
    private SocialLinks socialLinks;
    private String aboutMe;
    private ProfilePictureMeta profilePictureMeta;
    private Set<String> tags;
    private MultipartFile resume;

}
