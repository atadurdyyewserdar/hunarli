package com.atadu.platform.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailConfirmationToken {
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;

    public EmailConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
    }
}
