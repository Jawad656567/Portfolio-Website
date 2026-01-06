import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("banner");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    closeSidebar();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-3 bg-black text-white rounded-xl shadow-2xl lg:hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-black shadow-2xl
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-400 mt-1">Management Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col flex-1 mt-6 px-3 overflow-y-auto">
          <Link
            to="banner"
            onClick={() => handleLinkClick("banner")}
            className={`
              flex items-center px-4 py-4 mb-2 rounded-xl
              transition-all duration-300 group relative overflow-hidden
              ${activeLink === "banner" 
                ? "bg-white text-black shadow-lg" 
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            <div className={`
              absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
              ${activeLink === "banner" ? "bg-black" : "bg-transparent group-hover:bg-white"}
            `} />
            <FaTachometerAlt className={`
              mr-4 text-xl transition-transform duration-300
              ${activeLink === "banner" ? "scale-110" : "group-hover:scale-110"}
            `} />
            <span className="font-semibold">Banner</span>
          </Link>
          
          <Link
            to="users"
            onClick={() => handleLinkClick("users")}
            className={`
              flex items-center px-4 py-4 mb-2 rounded-xl
              transition-all duration-300 group relative overflow-hidden
              ${activeLink === "users" 
                ? "bg-white text-black shadow-lg" 
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            <div className={`
              absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
              ${activeLink === "users" ? "bg-black" : "bg-transparent group-hover:bg-white"}
            `} />
            <FaUsers className={`
              mr-4 text-xl transition-transform duration-300
              ${activeLink === "users" ? "scale-110" : "group-hover:scale-110"}
            `} />
            <span className="font-semibold">Users</span>
          </Link>
          
          <Link
            to="settings"
            onClick={() => handleLinkClick("settings")}
            className={`
              flex items-center px-4 py-4 mb-2 rounded-xl
              transition-all duration-300 group relative overflow-hidden
              ${activeLink === "settings" 
                ? "bg-white text-black shadow-lg" 
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            <div className={`
              absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
              ${activeLink === "settings" ? "bg-black" : "bg-transparent group-hover:bg-white"}
            `} />
            <FaCog className={`
              mr-4 text-xl transition-transform duration-300
              ${activeLink === "settings" ? "scale-110" : "group-hover:scale-110"}
            `} />
            <span className="font-semibold">Settings</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-800 p-3">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center px-4 py-4 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-xl transition-all duration-300 group hover:text-red-300"
          >
            <FaSignOutAlt className="mr-4 text-xl group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">Logout</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">© 2026 Admin Panel</p>
        </div>
      </aside>


    </div>
  );
}