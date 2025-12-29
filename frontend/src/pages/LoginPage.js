import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Add console logs for debugging
      console.log("Attempting login with:", { email, password });
      
      const res = await api.post("/api/users/login", { 
        email: email.trim(),
        password: password.trim() 
      });
      
      console.log("Login response:", res.data);
      
      // Save user info to localStorage for persistence
      const userData = {
        token: res.data.token || "",
        email: res.data.email,
        role: res.data.role,
        userId: res.data.userId
      };

      // Save to localStorage and sessionStorage
      Object.entries(userData).forEach(([key, value]) => {
        if (value) { // Only save non-null values
          localStorage.setItem(key, value);
          sessionStorage.setItem(key, value);
        }
      });

      // Redirect based on role, allowing normal history
      if (res.data.role === "COMPANY") {
        navigate("/company-dashboard");
      } else if (res.data.role === "STUDENT") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{
      maxWidth: 400,
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
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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

        {error && (
          <div style={{
            color: "#e74c3c",
            backgroundColor: "rgba(231, 76, 60, 0.1)",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "0.9em",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            <span style={{ fontSize: "1.2em" }}>⚠️</span>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 15px rgba(52, 152, 219, 0.2)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px rgba(52, 152, 219, 0.3)"
            }
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
