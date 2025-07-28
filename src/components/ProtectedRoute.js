import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!email) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles is provided, check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    // You can redirect to home, dashboard, or show a "Not authorized" message
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
