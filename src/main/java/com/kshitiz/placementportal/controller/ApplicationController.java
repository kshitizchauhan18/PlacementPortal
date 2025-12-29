package com.kshitiz.placementportal.controller;
import com.kshitiz.placementportal.model.Application;
import com.kshitiz.placementportal.model.AppUser;
import com.kshitiz.placementportal.model.JobPosting;
import com.kshitiz.placementportal.repository.ApplicationRepository;
import com.kshitiz.placementportal.repository.AppUserRepository;
import com.kshitiz.placementportal.repository.JobPostingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final AppUserRepository appUserRepository;
    private final JobPostingRepository jobPostingRepository;

    public ApplicationController(ApplicationRepository applicationRepository, 
                                AppUserRepository appUserRepository, 
                                JobPostingRepository jobPostingRepository) {
        this.applicationRepository = applicationRepository;
        this.appUserRepository = appUserRepository;
        this.jobPostingRepository = jobPostingRepository;
    }

    // Get applications for a specific job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobApplications(@PathVariable @NonNull Long jobId) {
        Optional<JobPosting> jobOpt = jobPostingRepository.findById(jobId);
        if (jobOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid job ID");
        }

        List<Application> applications = applicationRepository.findByJobPosting(jobOpt.get());
        List<Map<String, Object>> detailedApplications = applications.stream().map(app -> {
            Map<String, Object> details = new HashMap<>();
            details.put("id", app.getId());
            details.put("applicationDate", app.getApplicationDate());
            details.put("status", app.getStatus());
            details.put("cgpa", app.getCgpa());
            details.put("percentage12th", app.getPercentage12th());
            details.put("percentage10th", app.getPercentage10th());
            details.put("registrationNumber", app.getRegistrationNumber());
            details.put("meetsEligibility", app.getMeetsEligibility());
            
            // Add applicant details
            AppUser applicant = app.getApplicant();
            if (applicant != null) {
                details.put("email", applicant.getEmail());
                details.put("applicantName", applicant.getName());
                details.put("applicantEmail", applicant.getEmail());
            }
            
            return details;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(detailedApplications);
    }

    // Get applications for a specific user by email
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserApplications(@PathVariable @NonNull String email) {
        Optional<AppUser> userOpt = appUserRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Application> applications = applicationRepository.findByApplicant(userOpt.get());
        return ResponseEntity.ok(applications);
    }

    // Update application status
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable @NonNull Long applicationId,
            @RequestBody @NonNull Map<String, String> payload) {
        
        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
        if (applicationOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Application not found");
        }

        String status = payload.get("status");
        if (status == null || (!status.equals("ACCEPTED") && !status.equals("REJECTED") && !status.equals("PENDING"))) {
            return ResponseEntity.badRequest().body("Invalid status");
        }

        Application application = applicationOpt.get();
        application.setStatus(status);
        applicationRepository.save(application);
        return ResponseEntity.ok(application);
    }

    // Apply to a job
    @PostMapping
    public ResponseEntity<?> apply(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        Long jobId = Long.parseLong(payload.get("jobId"));
        
        // Get academic details
        Double cgpa = Double.parseDouble(payload.get("cgpa"));
        Double percentage12th = Double.parseDouble(payload.get("percentage12th"));
        Double percentage10th = Double.parseDouble(payload.get("percentage10th"));
        String registrationNumber = payload.get("registrationNumber");
        Boolean meetsEligibility = Boolean.parseBoolean(payload.get("meetsEligibility"));

        Optional<AppUser> userOpt = appUserRepository.findByEmail(email);
        Optional<JobPosting> jobOpt = jobPostingRepository.findById(jobId);

        if (userOpt.isEmpty() || jobOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user or job ID");
        }

        // Prevent duplicate applications
        List<Application> existing = applicationRepository.findByApplicant(userOpt.get());
        boolean alreadyApplied = existing.stream()
                .anyMatch(app -> app.getJobPosting().getId().equals(jobId));
        if (alreadyApplied) {
            return ResponseEntity.badRequest().body("Already applied for this job");
        }

        Application application = new Application(
                userOpt.get(),
                jobOpt.get(),
                LocalDateTime.now(),
                "APPLIED",
                cgpa,
                percentage12th,
                percentage10th,
                registrationNumber,
                meetsEligibility
        );
        applicationRepository.save(application);
        return ResponseEntity.ok("Application submitted");
    }

}
