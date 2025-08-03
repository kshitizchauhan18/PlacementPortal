import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all jobs
        const jobsResponse = await api.get("/jobs");
        const allJobs = jobsResponse.data;

        // Fetch user's applications
        const applicationsResponse = await api.get(`/applications/user/${email}`);
        const userApplications = applicationsResponse.data;

        // Get the job IDs that the user has already applied to
        const appliedJobIds = userApplications.map(app => app.jobPosting.id);

        // Filter out jobs that the user has already applied to
        const availableJobs = allJobs.filter(job => !appliedJobIds.includes(job.id));
        
        setJobs(availableJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  const [applicationForm, setApplicationForm] = useState({
    cgpa: "",
    percentage12th: "",
    percentage10th: "",
    registrationNumber: "",
    meetsEligibility: false
  });
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleApply = async (jobId) => {
    setSelectedJobId(jobId);
    setShowApplicationForm(true);
  };

  const submitApplication = async () => {
    setApplying(selectedJobId);
    setMessage("");
    try {
      await api.post("/applications", {
        email,
        jobId: selectedJobId,
        cgpa: parseFloat(applicationForm.cgpa),
        percentage12th: parseFloat(applicationForm.percentage12th),
        percentage10th: parseFloat(applicationForm.percentage10th),
        registrationNumber: applicationForm.registrationNumber,
        meetsEligibility: applicationForm.meetsEligibility
      });
      setMessage("Applied successfully!");
      setShowApplicationForm(false);
      setApplicationForm({
        cgpa: "",
        percentage12th: "",
        percentage10th: "",
        registrationNumber: "",
        meetsEligibility: false
      });
      
      // Remove the job from the list after successful application
      setJobs(prevJobs => prevJobs.filter(job => job.id !== selectedJobId));
    } catch (error) {
      setMessage(error.response?.data || "Failed to apply.");
    }
    setApplying(null);
  };

  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      fontSize: "1.2em",
      color: "#2193b0"
    }}>
      Loading jobs...
    </div>
  );

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: "40px auto",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      border: "1px solid rgba(255, 255, 255, 0.18)"
    }}>
      <h2 style={{
        textAlign: "center",
        background: "linear-gradient(45deg, #1a5f7a 0%, #159957 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "30px",
        fontSize: "2.3em",
        fontWeight: "700"
      }}>Available Jobs</h2>
      
      <button 
        onClick={() => navigate(-1)} 
        style={{
          padding: "10px 20px",
          fontSize: "15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          background: "linear-gradient(45deg, #2193b0 0%, #6dd5ed 100%)",
          color: "white",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(33, 147, 176, 0.3)",
          fontWeight: "600"
        }}>
        ← Back
      </button>

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{
          color: "#1a5f7a",
          fontSize: "2em",
          margin: 0
        }}>Available Positions</h2>
        <button
          onClick={() => navigate('/my-applications')}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2193b0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "500"
          }}
        >
          View My Applications
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map(job => (
          <li key={job.id} style={{
            border: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "20px",
            padding: "25px",
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)"
            }
          }}>
            <h3 style={{
              color: "#1a5f7a",
              marginBottom: "15px",
              fontSize: "1.4em"
            }}>{job.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <h4 style={{ color: "#1a5f7a", marginBottom: "10px", fontSize: "1.1em" }}>Job Details</h4>
                <p style={{ marginBottom: "10px", lineHeight: "1.6" }}><b>Description:</b> {job.description}</p>
                <p style={{ marginBottom: "10px" }}><b>Location:</b> {job.location}</p>
                <p style={{ marginBottom: "10px" }}><b>Salary:</b> {job.salary}</p>
                <p style={{ marginBottom: "10px" }}><b>Company:</b> {job.company ? job.company.name : "N/A"}</p>
              </div>
              
              <div style={{ 
                backgroundColor: "rgba(33, 147, 176, 0.1)", 
                padding: "15px", 
                borderRadius: "8px"
              }}>
                <h4 style={{ color: "#1a5f7a", marginBottom: "10px", fontSize: "1.1em" }}>Eligibility Criteria</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p><b>Minimum CGPA Required:</b> {job.minCgpa?.toFixed(2) || "Not specified"}</p>
                  <p><b>Minimum 12th Percentage:</b> {job.min12thPercentage?.toFixed(2) || "Not specified"}%</p>
                  <p><b>Minimum 10th Percentage:</b> {job.min10thPercentage?.toFixed(2) || "Not specified"}%</p>
                  {job.eligibilityCriteria && (
                    <p style={{ marginTop: "5px" }}>
                      <b>Additional Requirements:</b><br/>
                      {job.eligibilityCriteria}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleApply(job.id)}
              disabled={applying === job.id || !email}
              style={{
                padding: "12px 25px",
                fontSize: "15px",
                border: "none",
                borderRadius: "8px",
                cursor: applying === job.id || !email ? "not-allowed" : "pointer",
                background: applying === job.id || !email
                  ? "#e0e0e0"
                  : "linear-gradient(45deg, #159957 0%, #155799 100%)",
                color: applying === job.id || !email ? "#666" : "white",
                transition: "all 0.3s ease",
                boxShadow: applying === job.id || !email
                  ? "none"
                  : "0 4px 15px rgba(21, 153, 87, 0.3)",
                fontWeight: "600",
                opacity: applying === job.id || !email ? 0.7 : 1
              }}
            >
              {applying === job.id ? "Applying..." : "Apply Now"}
            </button>
          </li>
        ))}
      </ul>
      {showApplicationForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 5px 30px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{
              marginBottom: "20px",
              color: "#2c3e50",
              fontSize: "1.5em",
              textAlign: "center"
            }}>Complete Your Application</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={applicationForm.cgpa}
                  onChange={(e) => setApplicationForm({...applicationForm, cgpa: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>12th Percentage</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={applicationForm.percentage12th}
                  onChange={(e) => setApplicationForm({...applicationForm, percentage12th: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>10th Percentage</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={applicationForm.percentage10th}
                  onChange={(e) => setApplicationForm({...applicationForm, percentage10th: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>Registration Number</label>
                <input
                  type="text"
                  value={applicationForm.registrationNumber}
                  onChange={(e) => setApplicationForm({...applicationForm, registrationNumber: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                  required
                />
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={applicationForm.meetsEligibility}
                  onChange={(e) => setApplicationForm({...applicationForm, meetsEligibility: e.target.checked})}
                  id="eligibilityCheck"
                />
                <label htmlFor="eligibilityCheck" style={{ color: "#2c3e50" }}>
                  I confirm that I meet all eligibility criteria for this position
                </label>
              </div>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={submitApplication}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#2193b0",
                    color: "white",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div style={{
          color: message.includes("success") ? "#159957" : "#e74c3c",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: message.includes("success") ? "rgba(21, 153, 87, 0.1)" : "rgba(231, 76, 60, 0.1)",
          textAlign: "center",
          fontWeight: "500"
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default JobListPage;
