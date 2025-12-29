package com.kshitiz.placementportal.controller;

import java.util.Map;
import java.util.List;

import com.kshitiz.placementportal.dto.JobPostingRequest;
import com.kshitiz.placementportal.model.AppUser;
import com.kshitiz.placementportal.model.JobPosting;
import com.kshitiz.placementportal.repository.AppUserRepository;
import com.kshitiz.placementportal.repository.JobPostingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/jobs")
public class JobPostingController {

    private final JobPostingRepository jobPostingRepository;
    private final AppUserRepository appUserRepository;

    public JobPostingController(JobPostingRepository jobPostingRepository, AppUserRepository appUserRepository) {
        this.jobPostingRepository = jobPostingRepository;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping
    public List<JobPosting> getAllJobs() {
        return jobPostingRepository.findAll();
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JobPosting>> getCompanyJobs(@PathVariable @NonNull Long companyId) {
        AppUser companyUser = appUserRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company user not found"));

        if (!"COMPANY".equals(companyUser.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only companies can access their job listings");
        }

        List<JobPosting> companyJobs = jobPostingRepository.findByCompanyId(companyId);
        return ResponseEntity.ok(companyJobs);
    }

    // Company posts a new job using DTO
    @PostMapping("/company/{companyId}")
    public ResponseEntity<?> createJob(@PathVariable @NonNull Long companyId, @RequestBody @NonNull JobPostingRequest req) {
        AppUser companyUser = appUserRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company user not found"));

        if (!"COMPANY".equals(companyUser.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only users with COMPANY role can post jobs.");
        }

        JobPosting job = new JobPosting();
        job.setTitle(req.getTitle());
        job.setDescription(req.getDescription());
        job.setLocation(req.getLocation());
        job.setSalary(req.getSalary());
        job.setCompany(companyUser);
        
        // Set eligibility criteria
        job.setMinCgpa(req.getMinCgpa());
        job.setMin12thPercentage(req.getMin12thPercentage());
        job.setMin10thPercentage(req.getMin10thPercentage());
        job.setEligibilityCriteria(req.getEligibilityCriteria());

        JobPosting savedJob = jobPostingRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

    @PutMapping("/{id}")
    public JobPosting updateJob(@PathVariable @NonNull Long id, @RequestBody @NonNull JobPosting updatedJob) {
        return jobPostingRepository.findById(id)
                .map(job -> {
                    job.setTitle(updatedJob.getTitle());
                    job.setDescription(updatedJob.getDescription());
                    job.setLocation(updatedJob.getLocation());
                    job.setSalary(updatedJob.getSalary());
                    
                    // Update eligibility criteria
                    job.setMinCgpa(updatedJob.getMinCgpa());
                    job.setMin12thPercentage(updatedJob.getMin12thPercentage());
                    job.setMin10thPercentage(updatedJob.getMin10thPercentage());
                    job.setEligibilityCriteria(updatedJob.getEligibilityCriteria());
                    
                    return jobPostingRepository.save(job);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable @NonNull Long id) {
        jobPostingRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public JobPosting getJobById(@PathVariable @NonNull Long id) {
        return jobPostingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));
    }

    // Apply endpoint (unchanged)
    @PostMapping("/{jobId}/apply")
    public ResponseEntity<String> applyToJob(@PathVariable @NonNull Long jobId, @RequestBody @NonNull Map<String, String> payload) {
        String userEmail = payload.get("email");
        System.out.println("User " + userEmail + " applied to job " + jobId);
        return ResponseEntity.ok("Application received for job " + jobId);
    }
}
