import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CompanyPostedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const companyId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  const fetchCompanyJobs = async () => {
    try {
      const jobsResponse = await api.get(`/jobs/company/${companyId}`);
      setJobs(jobsResponse.data);
      
      // Fetch applications for each job
      const applicationsMap = {};
      for (const job of jobsResponse.data) {
        const appResponse = await api.get(`/applications/job/${job.id}`);
        applicationsMap[job.id] = appResponse.data;
      }
      setApplications(applicationsMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleApplicationStatus = async (applicationId, newStatus) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status: newStatus });
      fetchCompanyJobs(); // Refresh the data
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  return (
    <div style={{
      maxWidth: 1200,
      margin: "40px auto",
      padding: "40px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h2 style={{
          background: "linear-gradient(120deg, #2c3e50 0%, #3498db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.5em",
          fontWeight: "800"
        }}>
          Posted Jobs & Applications
        </h2>
        <button
          onClick={() => navigate("/company/post-job")}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          + Post New Job
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#3498db", padding: "20px" }}>
          Loading your jobs and applications...
        </div>
      ) : jobs.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ color: "#666", marginBottom: "20px" }}>No jobs posted yet</h3>
          <button
            onClick={() => navigate("/company/post-job")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Post Your First Job
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {jobs.map(job => (
            <div key={job.id} style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
            }}>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ color: "#2c3e50", fontSize: "1.5em", marginBottom: "15px" }}>{job.title}</h3>
                <p style={{ color: "#666", marginBottom: "10px" }}>{job.description}</p>
                <div style={{ display: "flex", gap: "20px", color: "#666" }}>
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>
                  Applications ({applications[job.id]?.length || 0})
                </h4>
                {applications[job.id]?.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {applications[job.id].map(app => (
                      <div key={app.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                        backgroundColor: "rgba(52, 152, 219, 0.05)",
                        borderRadius: "10px"
                      }}>
                        <div>
                          <p style={{ fontWeight: "600", color: "#2c3e50" }}>{app.email}</p>
                          <p style={{ fontSize: "0.9em", color: "#666" }}>
                            Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                          </p>
                          <p style={{ fontSize: "0.9em", color: "#666" }}>
                            Registration: {app.registrationNumber}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => {
                              setSelectedApplication(app);
                              setShowDetailsModal(true);
                            }}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              border: "none",
                              background: "rgba(52, 152, 219, 0.1)",
                              color: "#3498db",
                              cursor: "pointer"
                            }}
                          >
                            View Details
                          </button>
                          {app.status === "ACCEPTED" ? (
                            <div style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              background: "#27ae60",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px"
                            }}>
                              <span>✓</span> Accepted
                            </div>
                          ) : app.status === "REJECTED" ? (
                            <div style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              background: "#e74c3c",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px"
                            }}>
                              <span>✕</span> Rejected
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleApplicationStatus(app.id, "ACCEPTED")}
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "8px",
                                  border: "none",
                                  background: "rgba(46, 204, 113, 0.1)",
                                  color: "#27ae60",
                                  cursor: "pointer"
                                }}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleApplicationStatus(app.id, "REJECTED")}
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "8px",
                                  border: "none",
                                  background: "rgba(231, 76, 60, 0.1)",
                                  color: "#e74c3c",
                                  cursor: "pointer"
                                }}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#666", textAlign: "center" }}>No applications received yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
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
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: "0 5px 30px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginBottom: "20px", color: "#2c3e50", fontSize: "1.5em" }}>
              Application Details
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>Personal Information</h4>
                <p><b>Email:</b> {selectedApplication.email}</p>
                <p><b>Registration Number:</b> {selectedApplication.registrationNumber}</p>
              </div>

              <div>
                <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>Academic Details</h4>
                <p><b>CGPA:</b> {selectedApplication.cgpa?.toFixed(2) || "Not specified"}</p>
                <p><b>12th Percentage:</b> {selectedApplication.percentage12th?.toFixed(2) || "Not specified"}%</p>
                <p><b>10th Percentage:</b> {selectedApplication.percentage10th?.toFixed(2) || "Not specified"}%</p>
              </div>

              <div>
                <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>Application Status</h4>
                <p><b>Status:</b> {selectedApplication.status || "Pending"}</p>
                <p><b>Applied On:</b> {new Date(selectedApplication.applicationDate).toLocaleDateString()}</p>
                <p><b>Meets Eligibility:</b> {selectedApplication.meetsEligibility ? "Yes" : "No"}</p>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyPostedJobsPage;
