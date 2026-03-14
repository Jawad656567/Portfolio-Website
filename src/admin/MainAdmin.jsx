import React, { useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Settings, Image, FileText } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("admin"); // remove login
    navigate("/login"); // redirect to login
  };

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const navItems = [
    { path: "banner", label: "Banner", icon: Image },
    { path: "about", label: "About", icon: FileText },
    { path: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-black text-white transition-all duration-300 flex flex-col justify-between p-4 shadow-lg`}
      >
        {/* Top Section */}
        <div className="space-y-8">
          {/* Header with Toggle */}
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-white text-black font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-gray-900"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section - Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-black">Dashboard</h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage your content and settings
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white">
            <Outlet />
          </div>
        </div>
        
      </div>
    </div>
  );
}