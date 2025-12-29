import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyDashboard() {
  const navigate = useNavigate();
  const companyName = localStorage.getItem("email")?.split("@")[0] || "Company";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      maxWidth: 1200,
      margin: "40px auto",
      padding: "40px",
      position: "relative"
    }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(120deg, #e74c3c 0%, #c0392b 100%)",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(231, 76, 60, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
      >
        Logout
      </button>
      <h1 style={{
        textAlign: "center",
        background: "linear-gradient(120deg, #2c3e50 0%, #3498db 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.8em",
        fontWeight: "800",
        marginBottom: "50px"
      }}>
        Welcome, {companyName}
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        <div 
          onClick={() => navigate("/company/post-job")}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(52, 152, 219, 0.1)"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #3498db, #2c3e50)"
          }} />
          <h3 style={{
            color: "#2c3e50",
            fontSize: "1.5em",
            marginBottom: "15px"
          }}>Post New Job</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Create a new job posting and find the perfect candidates for your company.
          </p>
        </div>

        <div 
          onClick={() => navigate("/company/posted-jobs")}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(52, 152, 219, 0.1)"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #3498db, #2c3e50)"
          }} />
          <h3 style={{
            color: "#2c3e50",
            fontSize: "1.5em",
            marginBottom: "15px"
          }}>View Posted Jobs</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Manage your job postings and review applications from candidates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
