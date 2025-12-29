import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT"); // Default to student
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // First register the user
      await api.post("/api/users/signup", { name, email, password, role });
      
      // Then immediately log them in
      const loginResponse = await api.post("/api/users/login", { email, password });
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("role", loginResponse.data.role);
      localStorage.setItem("userId", loginResponse.data.userId);
      
      setSuccess("Registration successful!");
      
      // Redirect to appropriate dashboard based on role
      setTimeout(() => {
        if (role === "COMPANY") {
          navigate("/company-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div style={{
      maxWidth: 450,
      margin: "50px auto",
      padding: "40px 30px",
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
        fontSize: "2.3em",
        fontWeight: "800",
        marginBottom: "30px",
        letterSpacing: "-0.5px"
      }}>
        Create Account
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            color: "#2c3e50",
            fontSize: "0.95em",
            fontWeight: "600",
            marginLeft: "4px"
          }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            required
            placeholder="Enter your full name"
            onChange={e => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e1e8f0",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              "&:focus": {
                borderColor: "#3498db",
                boxShadow: "0 2px 8px rgba(52, 152, 219, 0.15)"
              }
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            color: "#2c3e50",
            fontSize: "0.95em",
            fontWeight: "600",
            marginLeft: "4px"
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email address"
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e1e8f0",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              "&:focus": {
                borderColor: "#3498db",
                boxShadow: "0 2px 8px rgba(52, 152, 219, 0.15)"
              }
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            color: "#2c3e50",
            fontSize: "0.95em",
            fontWeight: "600",
            marginLeft: "4px"
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            required
            placeholder="Choose a strong password"
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e1e8f0",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              "&:focus": {
                borderColor: "#3498db",
                boxShadow: "0 2px 8px rgba(52, 152, 219, 0.15)"
              }
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            color: "#2c3e50",
            fontSize: "0.95em",
            fontWeight: "600",
            marginLeft: "4px"
          }}>
            I am a
          </label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e1e8f0",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              cursor: "pointer",
              backgroundColor: "white",
              "&:focus": {
                borderColor: "#3498db",
                boxShadow: "0 2px 8px rgba(52, 152, 219, 0.15)"
              }
            }}
          >
            <option value="STUDENT">Student</option>
            <option value="COMPANY">Company</option>
          </select>
        </div>

        {(error || success) && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "0.9em",
            textAlign: "center",
            backgroundColor: success ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)",
            color: success ? "#27ae60" : "#e74c3c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            <span style={{ fontSize: "1.2em" }}>
              {success ? "✅" : "⚠️"}
            </span>
            {success || error}
          </div>
        )}

        <button 
          type="submit" 
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 15px rgba(52, 152, 219, 0.2)",
            marginTop: "10px",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px rgba(52, 152, 219, 0.3)"
            }
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
