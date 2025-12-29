import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function UserApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logged-in user ka email localStorage se lo
  const email = localStorage.getItem("email");

  useEffect(() => {
    api.get(`/applications/user/${email}`)
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      fontSize: "1.2em",
      color: "#3498db"
    }}>
      Loading your applications...
    </div>
  );

  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: "35px",
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
        marginBottom: "30px",
        letterSpacing: "-0.5px"
      }}>
        My Applications
      </h2>

      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
          color: "white",
          transition: "all 0.3s ease",
          boxShadow: "0 8px 15px rgba(52, 152, 219, 0.2)",
          fontWeight: "600",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
        ← Back
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {applications.map(app => (
          <li key={app.id} style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "20px",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
            }
          }}>
            <h3 style={{
              color: "#2c3e50",
              fontSize: "1.4em",
              marginBottom: "15px",
              fontWeight: "600"
            }}>
              {app.jobPosting?.title || "N/A"}
            </h3>
            
            <div style={{ display: "grid", gap: "12px" }}>
              <p style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                color: "#555",
                margin: "0"
              }}>
                <span style={{ fontSize: "1.2em" }}>🏢</span>
                <b>Company:</b> {app.jobPosting?.company?.name || "N/A"}
              </p>
              
              <p style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                margin: "0"
              }}>
                <span style={{ fontSize: "1.2em" }}>📊</span>
                <b>Status:</b> 
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.9em",
                  background: app.status === "PENDING" 
                    ? "rgba(52, 152, 219, 0.1)" 
                    : app.status === "ACCEPTED" 
                    ? "rgba(46, 204, 113, 0.1)" 
                    : "rgba(231, 76, 60, 0.1)",
                  color: app.status === "PENDING" 
                    ? "#3498db" 
                    : app.status === "ACCEPTED" 
                    ? "#27ae60" 
                    : "#e74c3c",
                  fontWeight: "500"
                }}>
                  {app.status}
                </span>
              </p>
              
              <p style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                color: "#555",
                margin: "0"
              }}>
                <span style={{ fontSize: "1.2em" }}>📅</span>
                <b>Applied on:</b> {app.applicationDate?.replace("T", " ").slice(0, 16)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      
      {applications.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#666",
          fontSize: "1.1em"
        }}>
          No applications found. Start applying for jobs! 🚀
        </div>
      )}
    </div>
  );
}

export default UserApplicationsPage;
