import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const defaultData = {
  role: "Web Development Intern",
  company: "Tech Creator Software House",
  duration: "May 2025 – Present · Mardan, Pakistan",
  responsibilities: [
    "Developed and optimized frontend components using React and Tailwind CSS",
    "Managed source code and collaboration using Git & GitHub",
    "Deployed live projects using Vercel and Render platforms",
    "Improved UI responsiveness and performance across different screen sizes",
  ],
};

export default function WorkExperience() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/experience`)
      .then((res) => {
        if (res.data) setData(res.data);
      })
      .catch(() => {
        console.log("API error, using default data");
      });
  }, []);

  const visibleResponsibilities = showAll
    ? data.responsibilities
    : data.responsibilities.slice(0, 2);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: isDark ? "#030712" : "#F7F6F2",
        color: isDark ? "#ffffff" : "#0f172a",
        transition: "background 0.5s, color 0.5s",
        padding: "0 20px",
      }}
    >
      {/* Dotted background — same as About & Education */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            isDark ? "#fff" : "#000"
          } 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div style={{ position: "relative", padding: "24px 4px 24px" }}>
        {/* Heading */}
         <h2
  className="md:text-4xl text-2xl mb-5  md:ml-4 md:mb-7 font-bold leading-tight"
  style={{
    fontFamily: "'Playfair Display', Georgia, serif",
    color: isDark ? "#f1f0ec" : "#1a1917",
    letterSpacing: "-0.02em",
  }}
>
  Work Experience
</h2>



        {/* Card */}
        <div
          style={{
            background: isDark ? "#111827" : "#ffffff",
            border: `1px solid ${isDark ? "#1f2937" : "#e5e7eb"}`,
            borderRadius: 12,
            padding: 20,
          }}
        >
          {/* Role header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: isDark ? "#1f2937" : "#f3f4f6",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              💼
            </div>

            <div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: isDark ? "#ffffff" : "#111827",
                  marginBottom: 2,
                }}
              >
                {data.role}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: isDark ? "#d1d5db" : "#374151",
                  marginBottom: 2,
                }}
              >
                {data.company}
              </p>
              <p style={{ fontSize: 13, color: isDark ? "#6b7280" : "#6b7280" }}>
                {data.duration}
              </p>
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            {visibleResponsibilities.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                  fontSize: 14,
                  color: isDark ? "#d1d5db" : "#1f2937",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isDark ? "#4b5563" : "#9ca3af",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <span>{item}</span>
              </div>
            ))}

            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                marginTop: 8,
                fontSize: 13,
                color: "#3b82f6",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {showAll ? "...See Less" : "...See More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}