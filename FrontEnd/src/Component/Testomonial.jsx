import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const testimonials = [
  {
    text: "Working with Jawad Ali was a truly outstanding experience from start to finish. He delivered a fast, clean, and user-friendly website ahead of schedule. His attention to detail and ability to translate ideas into real, polished code is exceptional. I would not hesitate to hire him again for future projects.",
    name: "Abdul Hafeez",
    role: "Business Owner, Lahore",
    stars: 5,
  },
  {
    text: "Jawad is one of the most professional and responsive developers I have worked with. The project was completed smoothly without a single issue. He kept me updated at every stage and made sure every feature was exactly as I envisioned. His work ethic and communication are top-notch.",
    name: "Ubaid Ahmed",
    role: "Startup Founder, Karachi",
    stars: 5,
  },
  {
    text: "Highly recommended! The design is clean, modern, and the performance is excellent. Jawad really listens to your requirements and delivers results that exceed expectations. My website now loads faster and looks far more professional than before. Really satisfied with the quality of work.",
    name: "Zohaib Abbas",
    role: "E-commerce Client, Islamabad",
    stars: 5,
  },
  {
    text: "The entire process was simple and straightforward. Jawad maintained excellent communication throughout the project and delivered everything exactly as discussed — no surprises, no delays. The final product was polished and well-structured. A true professional who values his clients' time.",
    name: "Sahil Khan",
    role: "Agency Client, Hyderabad",
    stars: 5,
  }
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const StarRating = ({ count }) => (
  <div className="flex gap-0.5 mb-1">
    {Array(count)
      .fill(null)
      .map((_, i) => (
        <span key={i} className="text-amber-400 text-xs">
          ★
        </span>
      ))}
  </div>
);

export default function TestimonialSlider() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  const go = (index) => {
    const next = (index + testimonials.length) % testimonials.length;
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 150);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(next + 1), 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[current];

  return (
    <section
      className={`relative overflow-hidden px-5 py-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Dotted background — same as LinkedInAbout */}
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

      <div className="max-w-3xl mx-auto relative">

        {/* Label */}
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
            isDark ? "text-slate-600" : "text-slate-400"
          }`}
        >
          Client Stories
        </p>

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">
          What clients say about{" "}
          <span className="text-blue-500">working with me</span>
        </h2>

        {/* Blue underline — same as LinkedInAbout */}
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mb-10" />

        {/* Card */}
        <div
          className={`rounded-2xl p-8 md:p-10 relative ${
            isDark
              ? "bg-slate-900 border border-slate-800/60"
              : "bg-white border border-slate-200/70"
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Top blue accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6, #60a5fa, transparent)",
            }}
          />

          {/* Big quote mark */}
          <p
            className={`text-6xl font-black leading-none mb-2 select-none ${
              isDark ? "text-blue-500/20" : "text-blue-500/15"
            }`}
          >
            "
          </p>

          {/* Review text */}
          <p
            className={`text-sm md:text-[0.95rem] leading-[1.85] font-normal mb-6 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {t.text}
          </p>

          {/* Divider */}
          <hr
            className={`mb-5 border-0 border-t ${
              isDark ? "border-slate-800" : "border-slate-100"
            }`}
          />

          {/* Author row */}
          <div className="flex items-center gap-3">
            {/* Avatar circle */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials(t.name)}
            </div>

            {/* Name & role */}
            <div>
              <StarRating count={t.stars} />
              <p
                className={`text-sm font-bold leading-none mb-1 ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }`}
              >
                {t.name}
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {t.role}
              </p>
            </div>

            {/* Slide counter */}
            <p
              className={`ml-auto text-xs font-semibold ${
                isDark ? "text-slate-800" : "text-slate-300"
              }`}
            >
              {current + 1} / {testimonials.length}
            </p>
          </div>
        </div>

        {/* Bottom: dots + arrow buttons */}
        <div className="flex items-center justify-between mt-5">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-[5px] rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                  i === current
                    ? "bg-blue-500 w-5"
                    : isDark
                    ? "bg-slate-800 w-[5px]"
                    : "bg-slate-300 w-[5px]"
                }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => go(current - 1)}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm text-blue-500 cursor-pointer transition-colors ${
                isDark
                  ? "border border-slate-800 hover:bg-slate-800"
                  : "border border-slate-200 hover:bg-slate-100"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => go(current + 1)}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm text-blue-500 cursor-pointer transition-colors ${
                isDark
                  ? "border border-slate-800 hover:bg-slate-800"
                  : "border border-slate-200 hover:bg-slate-100"
              }`}
            >
              →
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
}