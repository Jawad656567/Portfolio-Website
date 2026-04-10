import React, { useState, useContext } from "react";
import {
  FaHome,
  FaUser,
  FaTasks,
  FaGraduationCap,
  FaBriefcase,
  FaPaperPlane,
  FaTools,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ThemeContext } from "../context/themeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    { icon: <FaHome size={18} />, label: "Home", id: "home" },
    { icon: <FaUser size={18} />, label: "About", id: "about" },
    { icon: <FaTasks size={18} />, label: "Activities", id: "activities" },
    { icon: <FaGraduationCap size={18} />, label: "Education", id: "education" },
    { icon: <FaBriefcase size={18} />, label: "Experience", id: "experience" },
    { icon: <FaTools size={18} />, label: "Skills", id: "skill" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const bgColor = theme === "light" ? "bg-white" : "bg-gray-900";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const menuBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700";

  return (
    <nav className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between ${bgColor} shadow-md shadow-black/50 relative transition-colors duration-300`}>
      
      {/* LEFT: Logo */}
      <div className="flex md:ml-3 ml-0 items-center space-x-2 sm:space-x-3">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
          <img
            src="white.png"
            alt="Logo"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h1 className={`${textColor} text-[20px] sm:text-[25px] font-extrabold transition-colors duration-300`}>
          Dev. Jawad
        </h1>
      </div>

      {/* CENTER: Menu */}
      <div className="hidden sm:flex flex-1 justify-center">
        <div className={`flex items-center space-x-6 px-5 py-2 rounded-full border ${theme === "light" ? "border-gray-300" : "border-gray-700"} ${menuBg} shadow-sm transition-colors duration-300`}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className="flex flex-col items-center group transition-all duration-300"
            >
              <span className={`${theme === "light" ? "text-gray-600 group-hover:text-black" : "text-gray-300 group-hover:text-white"} group-hover:scale-110 transition-all`}>
                {item.icon}
              </span>
              <span className={`text-[11px] ${theme === "light" ? "text-gray-500 group-hover:text-black" : "text-gray-400 group-hover:text-white"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-2">
       <button
  onClick={toggleTheme}
  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:opacity-70"
>
  {theme === "light" ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )}
</button>

        <button className={`hidden sm:flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${theme === "light" ? "from-gray-900 to-black text-white hover:from-black hover:to-gray-800" : "from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800"} text-base font-semibold tracking-wide transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95`}>
          <FaPaperPlane size={16} className="opacity-90 transition-transform duration-300" />
          <span>Start Project</span>
        </button>

        {/* Hamburger */}
        <button
          className={`sm:hidden p-2 rounded-lg ${menuBg} shadow hover:shadow-md transition-all duration-300`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 ${menuBg} backdrop-blur-lg shadow-xl transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
      >
        {/* Top Section */}
        <div className={`flex items-center space-x-3 px-5 py-4 border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img src={theme === "light" ? "white.png" : "dark.png"} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-bold text-lg text-white">{theme === "light" ? "Dev. Jawad" : "Dev. Jawad"}</h2>
        </div>

        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <FaTimes size={20} onClick={() => setMenuOpen(false)} />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col mt-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-4 px-6 py-3 ${textColor} ${hoverBg} transition-all duration-200`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;