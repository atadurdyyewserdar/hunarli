package com.atadu.platform.dto;

import com.atadu.platform.model.JobPost;
import com.atadu.platform.model.helper.ProfilePictureMeta;
import com.atadu.platform.model.helper.SocialLinks;

import java.time.LocalDateTime;
import java.util.Set;

public class UserProfileInPostDto {
    private String id;
    private String firstName;
    private String lastName;
    private ProfilePictureMeta profilePictureMeta;
}
