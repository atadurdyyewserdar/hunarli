package com.atadu.platform.dto;

import java.time.LocalDateTime;

import com.atadu.platform.model.AppUser;
import com.atadu.platform.model.JobPost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobPostDto {
    private String id;
    private String username;
    private String title;
    private String description;
    private String location;
    private String companyName;
    private String companyUrl;
    private LocalDateTime postedDate;
    private String resumesEmail;
    private String category;
    private UserProfileInPostDto appUser;
    private String userId;

}
