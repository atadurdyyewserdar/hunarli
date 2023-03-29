package com.atadu.platform.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.atadu.platform.model.JobPost;
import com.atadu.platform.model.views.JSONViews;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.atadu.platform.dto.JobPostDto;
import com.atadu.platform.dto.ResumeDto;
import com.atadu.platform.exception.UserNotFoundException;
import com.atadu.platform.service.JobsService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping(path = "/api/jobs")
public class JobPostsController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());
    private JobsService jobsService;

    @Autowired
    public JobPostsController(JobsService jobsService) {
        this.jobsService = jobsService;
    }

    @PostMapping("/new/{username}")
    public ResponseEntity<String> addNewJobPost(@RequestBody JobPost jobPost, @PathVariable String username) throws UserNotFoundException {
        jobsService.saveJobPost(jobPost, username);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("")
    @JsonView(JSONViews.JobPosts.class)
    public ResponseEntity<List<JobPost>> getAllJobPosts() {
        List<JobPost> jobPosts = jobsService.listAllJob();
        return ResponseEntity.ok().body(jobPosts);
    }

    @GetMapping("/{id}")
    @JsonView(JSONViews.JobPosts.class)
    public ResponseEntity<JobPost> getById(@PathVariable String id) throws Exception {
        JobPost jobPost = jobsService.getJobPostBy(id);
        return ResponseEntity.ok().body(jobPost);
    }

    @PostMapping("/apply/{id}")
    public ResponseEntity<String> applyToJob(@PathVariable String id,
                                             @ModelAttribute ResumeDto resumeDto)
            throws UserNotFoundException, MessagingException, IllegalStateException, IOException {
        jobsService.sendResume(resumeDto, id);
        return ResponseEntity.ok().body("Success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable String id,
                                            @RequestBody JobPost jobPost)
            throws Exception {
        jobsService.updateJobPost(id, jobPost);
        return ResponseEntity.ok().body("Success");
    }

    @DeleteMapping("/{id}/{username}")
    public ResponseEntity<String> deleteJob(@PathVariable String id, @PathVariable String username)
            throws Exception {
        jobsService.deleteJob(id, username);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/search")
    @JsonView(JSONViews.JobPosts.class)
    public ResponseEntity<List<JobPost>> getJobsByTitle(@RequestParam("title") Optional<String> title,
                                                        @RequestParam("location") Optional<String> location, @RequestParam("dateS") Optional<String> dateS,
                                                        @RequestParam("categories") Optional<String> categories) {
        List<JobPost> jobPostsByTitle = jobsService.searchJobsByTitle(title, location, dateS, categories);
        return ResponseEntity.ok().body(jobPostsByTitle);
    }
}
