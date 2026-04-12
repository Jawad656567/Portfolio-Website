import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Loader = ({ children, duration = 2000 }) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-50 overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-gray-950 text-white" : "bg-white text-black"
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

        {/* MAIN LOADER CONTENT */}
        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* SPINNER */}
          <div className="relative w-28 h-28 flex items-center justify-center">

            {/* Outer ring */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin`}
              style={{
                borderColor: isDark ? "#ffffff30" : "#00000020",
                borderTopColor: isDark ? "#fff" : "#000",
                animationDuration: "1.8s",
              }}
            />

            {/* Middle ring */}
            <div
              className="absolute inset-3 rounded-full border-2 animate-spin"
              style={{
                borderColor: isDark ? "#ffffff20" : "#00000010",
                animationDuration: "2.5s",
                animationDirection: "reverse",
              }}
            />

            {/* Glow center */}
            <div
              className={`absolute inset-10 rounded-full blur-md ${
                isDark ? "bg-white/10" : "bg-black/5"
              }`}
            />

            {/* Text */}
            <div className="relative flex flex-col items-center justify-center">
              <h1 className="text-3xl font-black tracking-tight">
                JWD
              </h1>
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center space-y-1">
            <h2 className="text-lg md:text-xl font-bold tracking-widest">
              CODING
            </h2>

            <p className="text-xs tracking-widest uppercase opacity-60">
              Professional Portfolio
            </p>

            <p className="text-[10px] tracking-wider uppercase opacity-40 pt-1">
              Loading experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;