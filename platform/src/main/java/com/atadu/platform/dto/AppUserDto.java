package com.atadu.platform.dto;

import com.atadu.platform.model.helper.ProfilePictureMeta;
import com.atadu.platform.model.helper.SocialLinks;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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
    private String location;
    private String aboutMe;
    private String currentCompany;
    private String phoneNumber;
    private String portfolioUrl;
    private SocialLinks socialLinks;
    private String joinDate;
    private boolean isNonLocked;
    private String occupation;
    private ProfilePictureMeta profilePictureMeta;
    private Set<String> tags;
    private String resumeId;
    private List<String> jobPostId;
}
