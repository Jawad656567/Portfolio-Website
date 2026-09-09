import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API}/api/user/profile`, {
          withCredentials: true,
        });

        // Cookie mein valid token hai
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        if (error.response?.status !== 401) {
          setAuthError("Unable to verify your session. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (authError) {
      return (
        <div role="alert" className="p-6 text-center">
          <p>{authError}</p>
          <button onClick={() => window.location.reload()} className="mt-4 underline">
            Retry
          </button>
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
