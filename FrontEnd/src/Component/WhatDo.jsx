import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const journey = [
  {
    title: "Web Developer",
    role: "Tech Creator | 2025 - Present",
    description:
      "Building fast, responsive web apps with React and TailwindCSS focused on clean UI and great UX",
  },
  {
    title: "React Developer",
    role: "Freelance | 2024 - 2025",
    description:
      "Developed dynamic user interfaces and optimized performance using React, Next.js, and TailwindCSS.",
  },
  {
    title: "Frontend Intern",
    role: "Tech Creator | 2024 - 2025",
    description:
      "Contributed to UI development and collaborated with teams on live frontend projects.",
  },
];

export default function MyJourney() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden px-5 transition-colors duration-500 ${isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
        }`}
    >
      {/* Dotted background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] "
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"
            } 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-5xl mx-auto relative mt-10">
        <div className="grid md:grid-cols-2 gap-10  items-start">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6 md:-ml-18">


            <h2
              className=" md:text-4xl text-2xl font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: isDark ? "#f1f0ec" : "#1a1917",
                letterSpacing: "-0.02em",
              }}
            >
              My Journey
            </h2>


            <p
              className={`text-sm leading-[1.85] ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              A quick overview of my professional growth, roles, and experience
              in frontend and React development.
              <br />
              A concise overview of my professional journey, including roles, growth, and hands-on experience in frontend and React development.
            </p>

            <p
              className={`text-sm leading-[1.85] ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              From internship to freelance and now professional development, I
              focus on building scalable and modern web applications.
            </p>
          </div>

          {/* RIGHT SIDE - TIMELINE */}
          <div className="relative flex flex-col gap-6">
            {/* vertical line */}
            <div
              className={`absolute left-4 top-0 bottom-0 w-[2px] ${isDark ? "bg-slate-800" : "bg-slate-300"
                }`}
            />

            {journey.map((item, i) => (
              <div
                key={i}
                className={`relative pl-12 pr-6 py-5 rounded-2xl border transition-colors duration-300 ${isDark
                    ? "bg-slate-900 border-slate-800/60"
                    : "bg-white border-slate-200/70"
                  }`}
              >
                {/* dot */}
                <div
                  className={`absolute left-3 top-6 w-3 h-3 rounded-full ${isDark ? "bg-white" : "bg-slate-900"
                    }`}
                />

                <h3
                  className={`text-sm font-bold mb-1 ${isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                  {item.role}
                </p>

                <p
                  className={`text-xs leading-[1.8] ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}