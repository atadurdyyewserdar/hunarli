package com.atadu.platform.model;

import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonView(JSONViews.Public.class)
public class ResumeMeta {
    @Id
    private String id;
    private String userId;
    private String fileName;
    private String filePath;
    private String folderName;
    private String url;
}
