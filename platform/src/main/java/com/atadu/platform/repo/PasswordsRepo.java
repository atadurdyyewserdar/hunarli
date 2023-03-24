package com.atadu.platform.repo;

import com.atadu.platform.model.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PasswordsRepo extends MongoRepository<PasswordResetToken, String> {

}
