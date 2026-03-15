import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Vite-compatible environment variable
      const API = import.meta.env.VITE_API_URL;

      if (!API) {
        console.error("VITE_API_URL is undefined! Check your .env file.");
        alert("Backend URL not configured. Contact developer.");
        return;
      }

      console.log("Using Backend URL:", API);

      const response = await axios.post(`${API}/api/auth/login`, {
        username,
        password,
      });

      console.log("API Response:", response.data);

      if (response.data.message === "Login successful") {
        localStorage.setItem("admin", "true");
        navigate("/admin/banner"); // login ke baad redirect
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      alert(error.response?.data?.message || "Server error. Check console.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl mb-6 text-center">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;