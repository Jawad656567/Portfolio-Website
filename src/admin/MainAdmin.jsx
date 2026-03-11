import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("admin"); // remove login
    navigate("/login"); // redirect to login
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col justify-between p-5">
        <div>
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <ul className="space-y-4">
            <li>
              <Link to="banner" className="hover:text-gray-400">
                Banner
              </Link>
            </li>
            <li>
              <Link to="about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="settings" className="hover:text-gray-400">
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-2 px-3 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}