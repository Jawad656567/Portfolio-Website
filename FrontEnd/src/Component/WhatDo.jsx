import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const services = [
  {
    title: "User Experience (UX)",
    description:
      "I design clean and easy-to-use experiences by understanding what users need and creating layouts that feel natural and simple.",
  },
  {
    title: "User Interface (UI)",
    description:
      "I build visually clear and consistent interfaces with a strong focus on layout, spacing, and typography for a smooth user journey.",
  },
  {
    title: "Web Development",
    description:
      "I develop fast, responsive websites using modern technologies that are easy to maintain and work well on all devices.",
  },
];

export default function WhatIDo() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden px-5 py-12 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Dotted background — same as testimonial */}
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

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6">

            {/* Label */}
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${
                isDark ? "text-slate-600" : "text-slate-400"
              }`}
            >
              My Services
            </p>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              What I{" "}
              <span className={isDark ? "text-white" : "text-slate-900"}>
                do?
              </span>
            </h2>

            {/* Underline — same as testimonial */}
            <div
              className={`w-16 h-1 rounded-full ${
                isDark ? "bg-white" : "bg-slate-900"
              }`}
            />

            {/* Description */}
            <p
              className={`text-sm leading-[1.85] ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              I focus on designing user experiences, building clean interfaces,
              and developing web applications that are fast and easy to use.
            </p>

            <p
              className={`text-sm leading-[1.85] ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              I combine creativity with technical skills to deliver work that
              looks great and functions perfectly for every user.
            </p>

            {/* Say Hello button — dark: white bg + dark text | light: dark bg + white text */}
            <div>
              <button
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isDark
                    ? "bg-white text-slate-900 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-700"
                }`}
              >
                Say Hello!
              </button>
            </div>
          </div>

          {/* ── Right Column — Service Cards ── */}
          <div className="flex flex-col gap-4">
            {services.map((service, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 border transition-colors duration-300 ${
                  isDark
                    ? "bg-slate-900 border-slate-800/60"
                    : "bg-white border-slate-200/70"
                }`}
              >
                {/* Left accent bar — same gradient logic as testimonial top line */}
                {i === 0 && (
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl"
                    style={{
                      background: isDark
                        ? "linear-gradient(180deg, #ffffff, #94a3b8, transparent)"
                        : "linear-gradient(180deg, #0f172a, #475569, transparent)",
                    }}
                  />
                )}

                <h3
                  className={`text-sm font-bold mb-2 ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-xs leading-[1.85] ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}