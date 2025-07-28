import React, { useState } from "react";
import api from "../api";

function CompanyDashboard() {
  const [form, setForm] = useState({ title: "", description: "", location: "", salary: "" });
  const [message, setMessage] = useState("");
  const companyId = localStorage.getItem("userId"); // or get from login response

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post(`/jobs/company/${companyId}`, form);
      setMessage("Job posted successfully!");
      setForm({ title: "", description: "", location: "", salary: "" });
    } catch {
      setMessage("Failed to post job.");
    }
  };

  return (
    <div>
      <h2>Company Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default CompanyDashboard;
