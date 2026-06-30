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
      <>
        {/* Animation CSS */}
        <style>{`
          @keyframes wave {
            0%, 60%, 100% {
              transform: translateY(0) scale(0.8);
              opacity: .4;
            }

            30% {
              transform: translateY(-16px) scale(1.2);
              opacity: 1;
            }
          }

          .wave-dot {
            animation: wave 0.9s infinite ease-in-out;
          }

          .wave-dot:nth-child(2) {
            animation-delay: .15s;
          }

          .wave-dot:nth-child(3) {
            animation-delay: .30s;
          }
        `}</style>

        <div
          className={`fixed inset-0 flex flex-col justify-center items-center z-50 overflow-hidden transition-colors duration-500 ${
            isDark ? "bg-gray-950 text-white" : "bg-white text-black"
          }`}
        >
          {/* Background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                isDark ? "#fff" : "#000"
              } 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Loader */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* 3 Wave Dots */}
            <div className="flex items-center justify-center gap-4 h-16">
              <span
                className={`wave-dot w-4 h-4 rounded-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              ></span>

              <span
                className={`wave-dot w-4 h-4 rounded-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              ></span>

              <span
                className={`wave-dot w-4 h-4 rounded-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              ></span>
            </div>

           
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default Loader;