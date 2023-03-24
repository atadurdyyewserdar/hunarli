package com.atadu.platform.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.atadu.platform.dto.AppUserDto;
import com.atadu.platform.repo.AppUserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atadu.platform.dto.JobPostDto;
import com.atadu.platform.dto.ResumeDto;
import com.atadu.platform.exception.UserNotFoundException;
import com.atadu.platform.model.AppUser;
import com.atadu.platform.model.JobPost;
import com.atadu.platform.repo.JobsRepo;

import io.micrometer.common.util.StringUtils;
import jakarta.mail.MessagingException;

@Service
public class JobsService {
    private JobsRepo jobsRepo;
    private AppUserService appUserService;
    private EmailService emailService;

    private AppUserRepo appUserRepo;

    @Autowired
    public JobsService(AppUserRepo appUserRepo, JobsRepo jobsRepo, AppUserService appUserService, EmailService emailService) {
        this.jobsRepo = jobsRepo;
        this.appUserService = appUserService;
        this.emailService = emailService;
        this.appUserRepo = appUserRepo;
    }

    public List<JobPost> listAllJob() {
        return jobsRepo.findAll();
    }

    public void updateJobPost(String id, JobPost jobPost) throws Exception {
        JobPost jobPostToUpdate = jobsRepo.findById(id).orElseThrow(() -> new Exception("Job not found"));
        jobPostToUpdate.setTitle(jobPost.getTitle());
        jobPostToUpdate.setDescription(jobPost.getDescription());
        jobPostToUpdate.setLocation(jobPost.getLocation());
        jobPostToUpdate.setCompanyName(jobPost.getCompanyName());
        jobPostToUpdate.setCompanyUrl(jobPost.getCompanyUrl());
        jobPostToUpdate.setResumesEmail(jobPost.getResumesEmail());
        jobPostToUpdate.setCategory(jobPost.getCategory());
        jobsRepo.save(jobPostToUpdate);
    }

    public void deleteJob(String id, String username) throws UserNotFoundException {
        AppUser appUser = appUserService.findUserByUsername(username);
        JobPost jobPost = jobsRepo.findById(id).get();
        appUser.getJobPosts().remove(jobPost);
        appUserRepo.save(appUser);
        jobsRepo.deleteById(id);
    }

    public void saveJobPost(JobPost jobPost, String username) throws UserNotFoundException {
        AppUser appUser = appUserService.findUserByUsername(username);
        jobPost.setPostedDate(LocalDateTime.now());
        jobPost.setAuthor(appUser);
        appUser.getJobPosts().add(jobPost);
        jobsRepo.save(jobPost);
        appUserRepo.save(appUser);
    }

    public JobPost getJobPostBy(String id) throws Exception {
        return jobsRepo.findById(id).orElseThrow(() -> new Exception("Job not found"));
    }

    public void sendResume(ResumeDto resumeDto, String jobId)
            throws UserNotFoundException, MessagingException, IllegalStateException, IOException {
        AppUser appUser = appUserService.findUserByUsername(resumeDto.getUsername());

        String emailContent = "New applicant from Vacancy Platform\n\n"
                + "Name:" + appUser.getFirstName() + "\n"
                + "Last name:" + appUser.getLastName() + "\n"
                + "Vacancy Platform nick: @" + appUser.getUsername() + "\n"
                + "Below, find attached resume of applicant" + "\n\n"
                + "You are getting this email because you posted a open job vacancy in Vacancy platform";
        emailService.sendResume(resumeDto.getResumesEmail(), emailContent, resumeDto.getFile(),
                appUser.getFirstName() + appUser.getLastName() + "Resume");
    }

    public List<JobPost> searchJobsByTitle(Optional<String> opTitle, Optional<String> opLocation,
                                           Optional<String> opDateS, Optional<String> opCategories) {
        String title = opTitle.orElse("");
        String location = opLocation.orElse("");
        String dateS = opDateS.orElse("");
        String categories = opCategories.orElse("");
        System.out.println(title);
        System.out.println(location);
        System.out.println(dateS);
        System.out.println(categories);
        List<String> categoriesList = null;
        categories = categories.trim();
        if (StringUtils.isNotBlank(categories)) {
            categoriesList = Arrays.stream(categories.split(",", 0)).collect(Collectors.toList());
        }
        LocalDateTime qTimeFrom = parseDateS(dateS);
        LocalDateTime qTimeTo = LocalDateTime.now();
        if (title.equals("") && (location.equals("") || location.equals("all")) && dateS.equals("")) {
            return listAllJob();
        }
        return jobsRepo.findByMultipleCriteria(title, location, qTimeFrom, qTimeTo, categoriesList);
    }

    private LocalDateTime parseDateS(String dateS) {
        LocalDateTime date;
        switch (dateS) {
            case "last24": {
                date = LocalDateTime.now().minusHours(24);
                break;
            }
            case "last3days": {
                date = LocalDateTime.now().minusDays(3);
                break;
            }
            case "lastweek": {
                date = LocalDateTime.now().minusWeeks(1);
                break;
            }
            case "last2weeks": {
                date = LocalDateTime.now().minusWeeks(2);
                break;
            }
            case "last3weeks": {
                date = LocalDateTime.now().minusWeeks(3);
                break;
            }
            case "lastMonth": {
                date = LocalDateTime.now().minusMonths(1);
                break;
            }
            default: {
                date = null;
            }
        }
        return date;
    }

    public List<JobPost> getJobsByUsername(String username) {
        return jobsRepo.findJobPostByUsername(username);
    }
}
