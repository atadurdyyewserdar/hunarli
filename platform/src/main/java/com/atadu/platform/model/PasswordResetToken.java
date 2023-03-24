package com.atadu.platform.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetToken {

    @Id
    private String id;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;

    public PasswordResetToken(String id, String userId, LocalDateTime createdAt, LocalDateTime expiredAt) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
    }
}
