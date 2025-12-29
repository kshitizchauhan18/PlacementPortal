package com.kshitiz.placementportal.dto;

public class JobPostingRequest {
    private String title;
    private String description;
    private String location;
    private String salary;
    private Double minCgpa;
    private Double min12thPercentage;
    private Double min10thPercentage;
    private String eligibilityCriteria;

    // Existing getters and setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    // New getters and setters for eligibility criteria
    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
    
    public Double getMin12thPercentage() { return min12thPercentage; }
    public void setMin12thPercentage(Double min12thPercentage) { this.min12thPercentage = min12thPercentage; }
    
    public Double getMin10thPercentage() { return min10thPercentage; }
    public void setMin10thPercentage(Double min10thPercentage) { this.min10thPercentage = min10thPercentage; }
    
    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }
}
