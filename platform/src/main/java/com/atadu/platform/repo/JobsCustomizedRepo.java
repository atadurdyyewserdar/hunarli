package com.atadu.platform.repo;

import java.time.LocalDateTime;
import java.util.List;

import com.atadu.platform.model.JobPost;

public interface JobsCustomizedRepo {
    List<JobPost> findByTitleAndLocation(String title, String location);

    List<JobPost> findByMultipleCriteria(String title, String location, LocalDateTime from, LocalDateTime to,
            List<String> categories);
}
