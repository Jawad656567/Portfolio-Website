import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component
 * 
 * Ye check karta hai ki user admin login hai ya nahi.
 * Agar login hai → children render karega
 * Agar login nahi → /login page pe redirect karega
 */

const ProtectedRoute = ({ children }) => {
  // Simple check: localStorage me 'admin' key
  const isLogin = localStorage.getItem("admin");

  if (!isLogin) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  // Agar login hai → render children (admin layout / page)
  return children;
};

export default ProtectedRoute;