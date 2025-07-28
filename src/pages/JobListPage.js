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
    api.get("/jobs")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApply = async (jobId) => {
    setApplying(jobId);
    setMessage("");
    try {
      await api.post("/applications", { email, jobId });
      setMessage("Applied successfully!");
    } catch {
      setMessage("Failed to apply.");
    }
    setApplying(null);
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Available Jobs</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16, padding: 8 }}>
        Back
      </button>
      <div style={{ marginBottom: 16 }}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            localStorage.setItem("email", e.target.value);
          }}
          style={{ padding: 8, width: 250, marginRight: 12 }}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map(job => (
          <li key={job.id} style={{ border: "1px solid #ccc", marginBottom: 16, padding: 16, borderRadius: 8 }}>
            <h3>{job.title}</h3>
            <p><b>Description:</b> {job.description}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Salary:</b> {job.salary}</p>
            <p><b>Company:</b> {job.company ? job.company.name : "N/A"}</p>
            <button
              onClick={() => handleApply(job.id)}
              disabled={applying === job.id || !email}
              style={{ marginTop: 8, padding: 8 }}
            >
              {applying === job.id ? "Applying..." : "Apply"}
            </button>
          </li>
        ))}
      </ul>
      {message && <div style={{ color: "green", marginTop: 16 }}>{message}</div>}
    </div>
  );
}

export default JobListPage;
