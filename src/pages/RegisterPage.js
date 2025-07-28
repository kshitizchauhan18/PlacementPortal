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
      await api.post("/api/users/signup", { name, email, password, role });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
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
        <div style={{ marginBottom: 16 }}>
          <label>Register as:</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          >
            <option value="STUDENT">Student</option>
            <option value="COMPANY">Company</option>
          </select>
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 16 }}>{success}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
