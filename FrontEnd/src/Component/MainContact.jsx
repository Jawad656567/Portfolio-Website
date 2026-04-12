// FindMeOnline.jsx
import React, { useContext } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { ThemeContext } from "../context/themeContext";

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/Jawad656567" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/jawad-ali-201640379" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/jawad37221?igsh=Yzlld214bmJncnRi" },
  { icon: <FaTwitter />, url: "https://x.com/JawadAl24229081" },
];

const FindMeOnline = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center py-10 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-black"
      }`}
    >
      {/* DOT BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            isDark ? "#fff" : "#000"
          } 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Find Me Online</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 text-xl ${
                isDark
                  ? "bg-white text-black border-white hover:bg-black hover:text-white"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindMeOnline;