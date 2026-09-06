import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../context/themeContext";

/**
 * Loader
 * Full-screen splash/loading overlay that renders its children once the
 * given duration has elapsed (or is unmounted early via `onFinish`).
 *
 * Props:
 *  - children:  content to render once loading completes
 *  - duration:  ms to display the loader (default 2000)
 *  - label:     accessible label announced to screen readers (default "Loading")
 *  - onFinish:  optional callback fired when loading completes
 */
const Loader = ({ children, duration = 2000, label = "Loading", onFinish }) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onFinishRef.current?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!loading) return <>{children}</>;

  return (
    <>
      <style>{`
        @keyframes loader-wave {
          0%, 60%, 100% { transform: translateY(0) scale(0.8); opacity: .4; }
          30% { transform: translateY(-16px) scale(1.2); opacity: 1; }
        }
        .loader-wave-dot {
          animation: loader-wave 0.9s infinite ease-in-out;
        }
        .loader-wave-dot:nth-child(2) { animation-delay: .15s; }
        .loader-wave-dot:nth-child(3) { animation-delay: .30s; }

        @media (prefers-reduced-motion: reduce) {
          .loader-wave-dot {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={`fixed inset-0 flex flex-col justify-center items-center z-50 overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-gray-950 text-white" : "bg-white text-black"
        }`}
      >
        {/* Subtle dot-grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDark ? "#fff" : "#000"
            } 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-4 h-16">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`loader-wave-dot w-4 h-4 rounded-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              />
            ))}
          </div>

          <span className="sr-only">{label}</span>
        </div>
      </div>
    </>
  );
};

export default Loader;