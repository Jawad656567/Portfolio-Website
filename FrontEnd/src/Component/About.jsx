import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

export default function LinkedInAbout() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/about`);

        const data = res.data?.data || res.data;

        setParagraphs(data?.paragraphs || []);
      } catch (e) {
        console.log(e);
        setParagraphs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section
      className={`relative overflow-hidden px-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
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

      <div className="max-w-6xl mr-auto ml-0 md:ml-5 flex flex-col md:flex-row items-center gap-14 relative">

        {/* LEFT SIDE */}
        <div className="flex-1">

          <h2
            style={{
              color: isDark ? "#e5e7eb" : "#1a1917",
            }}
            className="text-2xl md:mb-7 mb-5 md:text-4xl mr-1 font-extrabold leading-tight mt-3"
          >
            About Me <br /> Web experiences.
          </h2>

          {loading ? (
            <p style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Loading...
            </p>
          ) : (
            paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  color: isDark ? "#9ca3af" : "#374151",
                }}
                className="leading-relaxed text-sm md:text-base mt-3"
              >
                {p.text}
              </p>
            ))
          )}

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["React", "Tailwind", "JavaScript", "Frontend"].map((t) => (
              <span
                key={t}
                style={{
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  color: isDark ? "#9ca3af" : "#374151",
                }}
                className="text-xs px-3 py-1 rounded-full border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        {isDesktop && (
          <div className="hidden lg:flex flex-shrink-0 ml-10 mt-5 items-center justify-center">
            <img
              src="about.png"
              alt="Professional"
              className="w-80 h-80 object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
      </div>
    </section>
  );
}