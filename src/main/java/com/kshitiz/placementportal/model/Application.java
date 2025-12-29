package com.kshitiz.placementportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AppUser applicant;

    @ManyToOne
    private JobPosting jobPosting;

    private LocalDateTime applicationDate;
    private String status;
    private Double cgpa;
    private Double percentage12th;
    private Double percentage10th;
    private String registrationNumber;
    private Boolean meetsEligibility;

    public Application() {}

    public Application(AppUser applicant, JobPosting jobPosting, LocalDateTime applicationDate, String status,
                       Double cgpa, Double percentage12th, Double percentage10th, 
                       String registrationNumber, Boolean meetsEligibility) {
        this.applicant = applicant;
        this.jobPosting = jobPosting;
        this.applicationDate = applicationDate;
        this.status = status;
        this.cgpa = cgpa;
        this.percentage12th = percentage12th;
        this.percentage10th = percentage10th;
        this.registrationNumber = registrationNumber;
        this.meetsEligibility = meetsEligibility;
    }

    // Getters and setters
    public Long getId() { return id; }
    public AppUser getApplicant() { return applicant; }
    public void setApplicant(AppUser applicant) { this.applicant = applicant; }
    public JobPosting getJobPosting() { return jobPosting; }
    public void setJobPosting(JobPosting jobPosting) { this.jobPosting = jobPosting; }
    public LocalDateTime getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDateTime applicationDate) { this.applicationDate = applicationDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public Double getPercentage12th() { return percentage12th; }
    public void setPercentage12th(Double percentage12th) { this.percentage12th = percentage12th; }

    public Double getPercentage10th() { return percentage10th; }
    public void setPercentage10th(Double percentage10th) { this.percentage10th = percentage10th; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public Boolean getMeetsEligibility() { return meetsEligibility; }
    public void setMeetsEligibility(Boolean meetsEligibility) { this.meetsEligibility = meetsEligibility; }
}
