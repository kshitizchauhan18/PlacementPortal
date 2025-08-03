import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in sessionStorage but not in localStorage
    const sessionEmail = sessionStorage.getItem("email");
    if (!email && sessionEmail) {
      // Copy all user data from sessionStorage to localStorage
      const keys = ["email", "role", "userId", "token"];
      keys.forEach(key => {
        const value = sessionStorage.getItem(key);
        if (value) localStorage.setItem(key, value);
      });
    }
  }, [email]);

  // Not logged in
  if (!email && !sessionStorage.getItem("email")) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles is provided, check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on role
    if (role === "COMPANY") {
      return <Navigate to="/company-dashboard" />;
    } else if (role === "STUDENT") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
