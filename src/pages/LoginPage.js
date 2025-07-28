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
      const res = await api.post("/api/users/login", { email, password });
      // Save user info to localStorage
      localStorage.setItem("token", res.data.token || "");
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId); // Save userId for company job posting

      // Redirect based on role
      if (res.data.role === "COMPANY") {
        navigate("/company-dashboard");
      } else if (res.data.role === "STUDENT") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
