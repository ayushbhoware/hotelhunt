// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Redirect to login if user is not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
