import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const steps = [
  {
    number: "1",
    title: "Research",
    description:
      "We start by understanding user needs, project goals, and business requirements to define a clear direction.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Planning & Analysis",
    description:
      "We analyze requirements and structure the project to ensure a clean, scalable, and efficient development process.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "UI Design & Development",
    description:
      "We transform ideas into modern, user-friendly interfaces with clean design and optimized frontend development.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Deployment",
    description:
      "We deliver fully responsive, fast, and optimized applications ready for real-world use.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function WorkProcess() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const descText = isDark ? "text-slate-400" : "text-slate-600";
  const headText = isDark ? "text-slate-200" : "text-slate-900";

  return (
    <section
      className={`relative overflow-hidden px-5 py-16 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Dot background */}
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

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Text */}
          <div className="lg:w-2/5 lg:sticky lg:top-24">

            <h2
              style={{
                color: isDark ? "#e5e7eb" : "#1a1917",
              }}
              className="md:text-4xl text-2xl mb-5 md:-ml-3 md:mb-7 font-bold leading-tight"
            >
              Work Process
            </h2>

            <p className={`text-sm md:text-base leading-relaxed ${descText}`}>
              With over 1 years of frontend development experience, I follow a structured workflow to build modern and responsive web applications.
            </p>

            <p className={`text-sm md:text-base leading-relaxed mt-4 ${descText}`}>
              From planning to deployment, every step is focused on clean code, performance, and user experience.
            </p>
          </div>

          {/* Right Cards */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-gray-900 border border-gray-800"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isDark ? "bg-gray-800 text-slate-200" : "bg-black text-white"
                  }`}
                >
                  {step.icon}
                </div>

                <h3 className={`text-base font-bold mb-2 ${headText}`}>
                  {step.number}. {step.title}
                </h3>

                <p className={`text-sm leading-relaxed ${descText}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}