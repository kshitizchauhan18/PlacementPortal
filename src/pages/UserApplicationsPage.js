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

  if (loading) return <div>Loading applications...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>My Applications</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16, padding: 8 }}>
        Back
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {applications.map(app => (
          <li key={app.id} style={{ border: "1px solid #ccc", marginBottom: 16, padding: 16, borderRadius: 8 }}>
            <h3>{app.jobPosting?.title || "N/A"}</h3>
            <p><b>Company:</b> {app.jobPosting?.company?.name || "N/A"}</p>
            <p><b>Status:</b> {app.status}</p>
            <p><b>Applied on:</b> {app.applicationDate?.replace("T", " ").slice(0, 16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserApplicationsPage;
