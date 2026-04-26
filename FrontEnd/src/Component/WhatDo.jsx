import React, { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "../context/themeContext";

/* ─── Keyframes ──────────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeSlideRight {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes drawLine {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes drawLineVertical {
    from { height: 0; }
    to   { height: 100%; }
  }
  @keyframes glowPulseDark {
    0%, 100% { box-shadow: 0 2px 8px 0 rgba(255,255,255,0); }
    50%       { box-shadow: 0 2px 14px 2px rgba(255,255,255,0.10); }
  }
  @keyframes glowPulseLight {
    0%, 100% { box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06); }
    50%       { box-shadow: 0 2px 18px 2px rgba(0,0,0,0.13); }
  }
  @keyframes floatDot {
    0%   { transform: translateY(0px)   scale(1);    opacity: 0.4; }
    50%  { transform: translateY(-10px) scale(1.25); opacity: 0.8; }
    100% { transform: translateY(0px)   scale(1);    opacity: 0.4; }
  }
  @keyframes borderPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.8; }
  }
  @keyframes gridDrift {
    0%,100% { background-position: 0 0; }
    50%      { background-position: 12px 12px; }
  }
  @keyframes shimmerSweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes dotPop {
    0%   { opacity: 0; transform: scale(0); }
    70%  { transform: scale(1.35); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0px rgba(255,255,255,0); }
    50%       { box-shadow: 0 0 0 4px rgba(255,255,255,0.12); }
  }
  @keyframes dotPulseLight {
    0%, 100% { box-shadow: 0 0 0 0px rgba(0,0,0,0); }
    50%       { box-shadow: 0 0 0 4px rgba(0,0,0,0.10); }
  }

  /* Section */
  .journey-section { animation: fadeSlideUp .4s ease both; }
  .journey-section.dark-glow  { animation: fadeSlideUp .4s ease both, glowPulseDark  4s ease-in-out 1s infinite; }
  .journey-section.light-glow { animation: fadeSlideUp .4s ease both, glowPulseLight 4s ease-in-out 1s infinite; }

  /* Heading */
  .journey-heading { animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both; }
  .journey-underline {
    display: block; height: 3px; border-radius: 2px; margin-top: 6px;
    animation: drawLine .9s cubic-bezier(.22,1,.36,1) .55s both;
  }
  .heading-shimmer-dark {
    background: linear-gradient(90deg, #fff 25%, rgba(255,255,255,0.45) 50%, #fff 75%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmerSweep 3.5s linear 1s infinite;
  }
  .heading-shimmer-light {
    background: linear-gradient(90deg, #111 25%, rgba(0,0,0,0.35) 50%, #111 75%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmerSweep 3.5s linear 1s infinite;
  }

  /* Left side text */
  .journey-para-0 { animation: fadeSlideRight .65s cubic-bezier(.22,1,.36,1) .22s both; }
  .journey-para-1 { animation: fadeSlideRight .65s cubic-bezier(.22,1,.36,1) .36s both; }

  /* Vertical timeline line */
  .timeline-line {
    animation: drawLineVertical .9s cubic-bezier(.22,1,.36,1) .3s both;
  }

  /* Timeline cards staggered */
  .journey-card-0 { animation: fadeSlideLeft .6s cubic-bezier(.22,1,.36,1) .20s both; }
  .journey-card-1 { animation: fadeSlideLeft .6s cubic-bezier(.22,1,.36,1) .35s both; }
  .journey-card-2 { animation: fadeSlideLeft .6s cubic-bezier(.22,1,.36,1) .50s both; }

  /* Card hover */
  .journey-card-hover {
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease;
  }
  .journey-card-hover:hover { transform: translateX(5px) scale(1.012); }
  .journey-card-hover-dark:hover  { box-shadow: 0 8px 28px rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15) !important; }
  .journey-card-hover-light:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08);       border-color: rgba(0,0,0,0.15) !important; }

  /* Timeline dot */
  .timeline-dot {
    animation: dotPop .45s cubic-bezier(.34,1.56,.64,1) both;
  }
  .timeline-dot-dark  { animation: dotPop .45s cubic-bezier(.34,1.56,.64,1) both, dotPulse      3s ease-in-out 1s infinite; }
  .timeline-dot-light { animation: dotPop .45s cubic-bezier(.34,1.56,.64,1) both, dotPulseLight 3s ease-in-out 1s infinite; }

  /* Floating dots */
  .dot-float { animation: floatDot var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
`;

/* ─── Floating Dots ──────────────────────────────────────────────── */
const FloatingDots = ({ isDark }) => {
  const dots = [
    { top: "12%", left: "3%",  size: 4, dur: "3.1s", delay: "0s"   },
    { top: "65%", left: "2%",  size: 3, dur: "2.5s", delay: "0.8s" },
    { top: "80%", left: "6%",  size: 4, dur: "3.8s", delay: "1.3s" },
    { top: "20%", left: "93%", size: 4, dur: "2.8s", delay: "0.4s" },
    { top: "70%", left: "95%", size: 3, dur: "3.5s", delay: "1.1s" },
    { top: "45%", left: "91%", size: 4, dur: "2.6s", delay: "1.6s" },
  ];
  const color = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className="dot-float pointer-events-none absolute rounded-full hidden sm:block"
          style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            background: color,
            "--dur":   d.dur,
            "--delay": d.delay,
          }}
        />
      ))}
    </>
  );
};

/* ─── Intersection observer hook ────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Data ───────────────────────────────────────────────────────── */
const journey = [
  {
    title: "Web Developer",
    role: "Tech Creator | 2025 - Present",
    description:
      "Building fast, responsive web apps with React and TailwindCSS focused on clean UI and great UX.",
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

/* ─── Component ──────────────────────────────────────────────────── */
export default function MyJourney() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [sectionRef, inView] = useInView(0.1);

  const borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";
  const accentLine  = isDark ? "#ffffff"                 : "#000000";

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        className={`journey-section ${isDark ? "dark-glow" : "light-glow"} relative overflow-hidden px-5 transition-all duration-300 ${
          isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
        }`}
        style={{ willChange: "transform" }}
      >
        {/* Top border pulse */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
            animation: "borderPulse 3s ease-in-out infinite",
          }}
        />

        {/* Dotted grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "24px 24px",
            animation: "gridDrift 8s ease-in-out infinite",
          }}
        />

        {/* Radial glow blob — desktop only */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl hidden sm:block"
          style={{
            opacity: isDark ? 0.04 : 0.03,
            background: isDark
              ? "radial-gradient(circle, #fff 0%, transparent 70%)"
              : "radial-gradient(circle, #000 0%, transparent 70%)",
          }}
        />

        {/* Floating dots — desktop only */}
        <FloatingDots isDark={isDark} />

        <div className="max-w-5xl mx-auto relative mt-10 pb-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* ── LEFT SIDE ── */}
            <div className="flex flex-col gap-6 md:-ml-18">

              {/* Heading */}
              {inView && (
                <div className="journey-heading">
                  <h2
                    className="md:text-5xl text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <span className={isDark ? "heading-shimmer-dark" : "heading-shimmer-light"}>
                      My Journey
                    </span>
                  </h2>

                  {/* Draw-on underline */}
                  <span
                    className="journey-underline"
                    style={{
                      background: `linear-gradient(90deg, ${accentLine}, transparent)`,
                      opacity: 0.25,
                    }}
                  />
                </div>
              )}

              {inView && (
                <p className={`journey-para-0 text-sm leading-[1.85] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  A quick overview of my professional growth, roles, and experience
                  in frontend and React development. A concise overview of my
                  professional journey, including roles, growth, and hands-on
                  experience in frontend and React development.
                </p>
              )}

              {inView && (
                <p className={`journey-para-1 text-sm leading-[1.85] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  From internship to freelance and now professional development, I
                  focus on building scalable and modern web applications.
                </p>
              )}
            </div>

            {/* ── RIGHT SIDE — TIMELINE ── */}
            <div className="relative flex flex-col gap-6">

              {/* Vertical line — animates height on inView */}
              <div
                className={`absolute left-4 top-0 w-[2px] ${isDark ? "bg-slate-800" : "bg-slate-300"}`}
                style={{
                  height: inView ? "100%" : 0,
                  transition: "height .9s cubic-bezier(.22,1,.36,1) .3s",
                }}
              />

              {journey.map((item, i) => (
                <div
                  key={i}
                  className={`${inView ? `journey-card-${i}` : "opacity-0"} journey-card-hover ${
                    isDark ? "journey-card-hover-dark" : "journey-card-hover-light"
                  } relative pl-12 pr-6 py-5 rounded-2xl border transition-colors duration-300 ${
                    isDark
                      ? "bg-slate-900 border-slate-800/60"
                      : "bg-white border-slate-200/70"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-3 top-6 w-3 h-3 rounded-full ${
                      isDark ? "timeline-dot-dark bg-white" : "timeline-dot-light bg-slate-900"
                    }`}
                    style={{ animationDelay: `${0.20 + i * 0.15}s` }}
                  />

                  {/* Dot ring — accent glow */}
                  <div
                    className="absolute left-3 top-6 w-3 h-3 rounded-full pointer-events-none"
                    style={{
                      background: "transparent",
                      border: `1.5px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
                      transform: "scale(1.8)",
                      opacity: inView ? 1 : 0,
                      transition: `opacity .4s ease ${0.4 + i * 0.15}s`,
                    }}
                  />

                  <h3 className={`text-sm font-bold mb-1 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {item.role}
                  </p>

                  {/* Divider line — draws on per card */}
                  <div
                    className={`h-[1px] mb-2 rounded-full ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
                    style={{
                      width: inView ? "100%" : 0,
                      transition: `width .6s cubic-bezier(.22,1,.36,1) ${0.35 + i * 0.15}s`,
                    }}
                  />

                  <p className={`text-xs leading-[1.8] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
          }}
        />
      </section>
    </>
  );
}