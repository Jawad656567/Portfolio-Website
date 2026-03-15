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
      // backend API call
      const API = process.env.REACT_APP_API_URL;

const response = await axios.post(`${API}/api/auth/login`, {
  username,
  password,
});

      console.log("API Response:", response.data);

      if (response.data.message === "Login successful") {
        localStorage.setItem("admin", "true");
        navigate("/admin/banner"); // login ke baad redirect
      }
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Server error");
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
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
        />
        <button 
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;