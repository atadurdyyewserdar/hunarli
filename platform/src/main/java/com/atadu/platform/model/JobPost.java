package com.atadu.platform.model;

import java.time.LocalDateTime;
import java.util.Set;

import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.*;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(JSONViews.Public.class)
@JsonIgnoreProperties(value = { "target" })
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobPost {
    @Id
    private String id;
    @DBRef(lazy = true)
    @JsonView(JSONViews.JobPosts.class)
    private AppUser author;
    private String title;
    private String description;
    private String location;
    private String companyName;
    private String companyUrl;
    private LocalDateTime postedDate;
    private String resumesEmail;
    private String category;
    private Set<String> tags;
}
