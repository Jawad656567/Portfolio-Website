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
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/api/auth/login`, {
        username,
        password,
      });

      console.log("API Response:", response.data);

      if (response.data.message === "Login successful") {
        localStorage.setItem("admin", "true");
        navigate("/admin/banner");
      }
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleLogin} 
          className="bg-white shadow-lg rounded-xl p-8 sm:p-10 border border-gray-200"
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-black">
            Admin Login
          </h1>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} JWD CODE
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;