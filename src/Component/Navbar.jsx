// Navbar.jsx (Sidebar version)
import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaTasks,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome size={20} />, label: "Home", id: "home" },
    { icon: <FaUser size={20} />, label: "About", id: "about" },
    { icon: <FaTasks size={20} />, label: "Activities", id: "activities" },
    { icon: <FaGraduationCap size={20} />, label: "Education", id: "education" },
    { icon: <FaBriefcase size={20} />, label: "Experience", id: "experience" },
    { icon: <FaTools size={20} />, label: "Skills", id: "skill" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-between bg-white shadow-md relative">
      {/* LEFT: Logo + Search */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative w-12 h-10 sm:w-12 sm:h-12 rounded-full">
          <img
            src="logoo.jpeg"
            alt="Logo"
            className="absolute inset-0 w-full h-full object-cover object-top scale-[1.5]"
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
          <button
            key={idx}
            onClick={() => scrollToSection(item.id)}
            className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer min-w-[50px]"
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
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
  className="sm:hidden ml-2 p-2 rounded-lg 
             bg-white shadow hover:shadow-md 
             transition-all duration-200 text-black focus:outline-none"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
</button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white/30 backdrop-blur-md shadow-lg border-r border-white/40
                    transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
                    transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col mt-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-white/50 transition-all duration-200"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;