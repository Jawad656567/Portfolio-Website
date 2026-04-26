import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const navLinks = ["Home", "About", "Activities", "Education", "Experience", "Contact"];

export default function LinkedInFooter() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`relative overflow-hidden pt-10 pb-5 transition-colors duration-500 ${
        isDark
          ? "bg-gray-950 text-gray-300 border-gray-800"
          : "bg-[#F7F6F2] text-gray-700 border-gray-200"
      } border-t`}
    >
      {/* DOT BACKGROUND (INLINE ONLY) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            isDark ? "#ffffff" : "#000000"
          } 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto px-6" style={{ maxWidth: 1128 }}>
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">

          {/* Profile Pic */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-20 h-20 rounded-full overflow-hidden border-2 shadow-lg flex items-center justify-center ${
                isDark ? "border-white bg-gray-900" : "border-black bg-gray-100"
              }`}
            >
              <img
                src="/white.png"
                alt="Profile"
               
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Navigation
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2">
              {navLinks.map((link) =>
                link === "Contact" ? (
                  <Link
                    key={link}
                    to="/contact"
                    className={`text-sm relative group transition-colors duration-200 ${
                      isDark
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm relative group transition-colors duration-200 ${
                      isDark
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t mb-4 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span className="text-gray-400">
            © {new Date().getFullYear()}
            <span className="text-blue-500 font-semibold"> JWD Coding</span>.
            All rights reserved.
          </span>

          <div className="flex gap-4">
            <a
              href="#"
              className={`transition-colors ${
                isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`transition-colors ${
                isDark ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}