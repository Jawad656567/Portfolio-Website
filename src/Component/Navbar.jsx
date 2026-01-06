// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // menu items with paths
  const menuItems = [
    { icon: <FaHome size={20} />, label: "Home", path: "/" },
    { icon: <FaUser size={20} />, label: "About", path: "/about" },
    { icon: <FaTools size={20} />, label: "Skills", path: "/skills" },
    { icon: <FaProjectDiagram size={20} />, label: "Projects", path: "/projects" },
    { icon: <FaEnvelope size={20} />, label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-between bg-white shadow-md relative">
      
      {/* LEFT: Logo + Search */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <img
            src="logo.png"
            alt="Logo"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="hidden sm:block border rounded-full px-3 py-1 w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* CENTER: Menu Icons */}
      <div className="hidden sm:flex flex-1 justify-center space-x-6">
        {menuItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer min-w-[50px]"
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* RIGHT: User + Hamburger */}
      <div className="flex items-center space-x-2 sm:space-x-2 cursor-pointer">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden">
          <img
            src="image.png"
            alt="Profile"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="text-xs sm:text-sm text-gray-700 hidden sm:block">Me</span>

        <button
          className="sm:hidden ml-2 text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md z-50">
          {menuItems.map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className="flex items-center space-x-2 px-4 py-3 border-b border-gray-200 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
