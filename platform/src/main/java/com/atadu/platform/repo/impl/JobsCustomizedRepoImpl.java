package com.atadu.platform.repo.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.atadu.platform.model.JobPost;
import com.atadu.platform.repo.JobsCustomizedRepo;

import io.micrometer.common.util.StringUtils;

@Repository
public class JobsCustomizedRepoImpl implements JobsCustomizedRepo {

    private MongoTemplate mongoTemplate;

    @Autowired
    public JobsCustomizedRepoImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<JobPost> findByTitleAndLocation(String title, String location) {
        Query query = new Query();
        query.addCriteria(Criteria.where("title").regex(".*" + title + ".*", "i").and("location").is(location));
        List<JobPost> posts = mongoTemplate.find(query, JobPost.class);
        return posts;
    }

    @Override
    public List<JobPost> findByMultipleCriteria(String title, String location, LocalDateTime from, LocalDateTime to,
                                                List<String> categories) {
        Query query = new Query();
        if (StringUtils.isNotEmpty(title)) {
            query.addCriteria(Criteria.where("title").regex(".*" + title + ".*", "i"));
        }
        if (StringUtils.isNotEmpty(location) && !location.equals("all")) {
            query.addCriteria(Criteria.where("location").is(location));
        }
        if (from != null) {
            query.addCriteria(Criteria.where("postedDate").gte(from).lte(to));
        }
        if (categories != null && categories.size() != 0) {
            System.out.println("Inside categories");
            query.addCriteria(Criteria.where("category").in(categories));
        }
        List<JobPost> posts = mongoTemplate.find(query, JobPost.class);

        return posts;
    }

}
