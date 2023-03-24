package com.atadu.platform.repo;

import com.atadu.platform.model.ResumeMeta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResumesRepo extends MongoRepository<ResumeMeta, String> {
}
