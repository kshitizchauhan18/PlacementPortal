package com.kshitiz.placementportal.repository;

import com.kshitiz.placementportal.model.Application;
import com.kshitiz.placementportal.model.AppUser;
import com.kshitiz.placementportal.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByApplicant(AppUser applicant);
    List<Application> findByJobPosting(JobPosting jobPosting);
}
