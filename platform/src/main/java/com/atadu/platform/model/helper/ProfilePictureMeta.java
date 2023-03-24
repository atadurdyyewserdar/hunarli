package com.atadu.platform.model.helper;

import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonView(JSONViews.Public.class)
public class ProfilePictureMeta {
    private String fileName;
    private String filePath;
    private String folderName;
    private String url;
}