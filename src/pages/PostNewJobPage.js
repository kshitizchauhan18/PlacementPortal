import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function PostNewJobPage() {
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    location: "", 
    salary: "",
    minCgpa: "",
    min12thPercentage: "",
    min10thPercentage: "",
    eligibilityCriteria: ""
  });
  const [message, setMessage] = useState("");
  const companyId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const jobData = {
        ...form,
        minCgpa: form.minCgpa ? parseFloat(form.minCgpa) : null,
        min12thPercentage: form.min12thPercentage ? parseFloat(form.min12thPercentage) : null,
        min10thPercentage: form.min10thPercentage ? parseFloat(form.min10thPercentage) : null,
        eligibilityCriteria: form.eligibilityCriteria || null
      };
      await api.post(`/jobs/company/${companyId}`, jobData);
      setMessage("Job posted successfully!");
      setForm({ 
        title: "", 
        description: "", 
        location: "", 
        salary: "",
        minCgpa: "",
        min12thPercentage: "",
        min10thPercentage: "",
        eligibilityCriteria: ""
      });
      // Show success message and redirect after a delay
      setTimeout(() => {
        navigate("/company/posted-jobs");
      }, 2000);
    } catch {
      setMessage("Failed to post job.");
    }
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: "40px"
    }}>
      <div style={{
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(120deg, #fdfbfb 0%, #f5f8ff 100%)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <h2 style={{
          textAlign: "center",
          background: "linear-gradient(120deg, #2c3e50 0%, #3498db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.5em",
          fontWeight: "800",
          marginBottom: "40px",
          letterSpacing: "-0.5px"
        }}>
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
              Job Title
            </label>
            <input
              name="title"
              placeholder="e.g., Senior Software Engineer"
              value={form.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid #e1e8f0",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the role, responsibilities, and requirements"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid #e1e8f0",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                minHeight: "120px"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
                Minimum CGPA Required
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="minCgpa"
                placeholder="e.g., 7.5"
                value={form.minCgpa}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8f0",
                  fontSize: "16px"
                }}
              />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
                Minimum 12th Percentage
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="min12thPercentage"
                placeholder="e.g., 75"
                value={form.min12thPercentage}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8f0",
                  fontSize: "16px"
                }}
              />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
                Minimum 10th Percentage
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="min10thPercentage"
                placeholder="e.g., 75"
                value={form.min10thPercentage}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8f0",
                  fontSize: "16px"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
              Additional Eligibility Criteria
            </label>
            <textarea
              name="eligibilityCriteria"
              placeholder="Enter any additional eligibility criteria, special requirements, or notes for candidates"
              value={form.eligibilityCriteria}
              onChange={handleChange}
              rows="3"
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid #e1e8f0",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                minHeight: "100px"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
                Location
              </label>
              <input
                name="location"
                placeholder="e.g., New York, NY"
                value={form.location}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8f0",
                  fontSize: "16px",
                  marginTop: "8px"
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ color: "#2c3e50", fontSize: "0.95em", fontWeight: "600", marginLeft: "4px" }}>
                Salary Range
              </label>
              <input
                name="salary"
                placeholder="e.g., $80,000 - $100,000"
                value={form.salary}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8f0",
                  fontSize: "16px",
                  marginTop: "8px"
                }}
              />
            </div>
          </div>

          <button type="submit" style={{
            padding: "16px 28px",
            fontSize: "17px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 15px rgba(52, 152, 219, 0.2)",
            marginTop: "20px"
          }}>
            Post Job Opening
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: "30px",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: message.includes("success") ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)",
            color: message.includes("success") ? "#27ae60" : "#e74c3c",
            fontSize: "1.1em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "1.2em" }}>{message.includes("success") ? "✅" : "⚠️"}</span>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostNewJobPage;
