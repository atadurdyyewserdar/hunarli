package com.atadu.platform.model.helper;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopLanguages {
    private String languageOne;
    private String languageTwo;
    private String languageThree;
    private String languageFour;
    private String languageFive;

    public TopLanguages() {
        languageOne = "";
        languageTwo = "";
        languageThree = "";
        languageFour = "";
        languageFive = "";
    }
}
