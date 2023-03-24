package com.atadu.platform.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.atadu.platform.model.JobPost;

@Repository
public interface JobsRepo extends MongoRepository<JobPost, String>, JobsCustomizedRepo {
    @Query(value = "{'title': {'$regex': ?0, $options: 'i'}}")
    List<JobPost> findJobPostsByTitleRegexString(String regexString);

    @Query(value = "{'username': ?0}")
    List<JobPost> findJobPostByUsername(String username);
}
