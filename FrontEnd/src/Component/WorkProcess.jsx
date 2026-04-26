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
  @keyframes fadeSlideUpCard {
    from { opacity: 0; transform: translateY(36px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes drawLine {
    from { width: 0; }
    to   { width: 100%; }
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
  @keyframes iconPop {
    0%   { opacity: 0; transform: scale(0.5) rotate(-12deg); }
    70%  { transform: scale(1.15) rotate(4deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes numberSlide {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes softBounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-4px); }
    60%       { transform: translateY(-2px); }
  }

  /* Section */
  .work-section { animation: fadeSlideUp .4s ease both; }
  .work-section.dark-glow  { animation: fadeSlideUp .4s ease both, glowPulseDark  4s ease-in-out 1s infinite; }
  .work-section.light-glow { animation: fadeSlideUp .4s ease both, glowPulseLight 4s ease-in-out 1s infinite; }

  /* Heading */
  .work-heading   { animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both; }
  .work-underline {
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

  /* Left text */
  .work-para-0 { animation: fadeSlideRight .65s cubic-bezier(.22,1,.36,1) .22s both; }
  .work-para-1 { animation: fadeSlideRight .65s cubic-bezier(.22,1,.36,1) .36s both; }

  /* Cards staggered */
  .work-card-0 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .15s both; }
  .work-card-1 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .27s both; }
  .work-card-2 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .39s both; }
  .work-card-3 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .51s both; }

  /* Card hover */
  .work-card-hover {
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease;
  }
  .work-card-hover:hover { transform: translateY(-6px) scale(1.013); }
  .work-card-hover-dark:hover  { box-shadow: 0 14px 36px rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.18) !important; }
  .work-card-hover-light:hover { box-shadow: 0 14px 36px rgba(0,0,0,0.10);       border-color: rgba(0,0,0,0.18) !important; }

  /* Icon box */
  .icon-pop { animation: iconPop .5s cubic-bezier(.34,1.56,.64,1) both; }
  .icon-box {
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
  }
  .work-card-hover:hover .icon-box {
    transform: scale(1.12) rotate(-6deg);
  }
  .work-card-hover-dark:hover  .icon-box { box-shadow: 0 4px 14px rgba(255,255,255,0.12); }
  .work-card-hover-light:hover .icon-box { box-shadow: 0 4px 14px rgba(0,0,0,0.18); }

  /* Step number bounce */
  .step-number { animation: numberSlide .45s cubic-bezier(.22,1,.36,1) both; }
  .work-card-hover:hover .step-number { animation: softBounce .5s ease; }

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

/* ─── Steps data ─────────────────────────────────────────────────── */
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

/* ─── Component ──────────────────────────────────────────────────── */
export default function WorkProcess() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [sectionRef, inView] = useInView(0.1);

  const borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";
  const accentLine  = isDark ? "#ffffff"                 : "#000000";
  const descText    = isDark ? "text-slate-400"          : "text-slate-600";
  const headText    = isDark ? "text-slate-200"          : "text-slate-900";

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        className={`work-section ${isDark ? "dark-glow" : "light-glow"} relative overflow-hidden px-5 py-16 transition-all duration-300 ${
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
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl hidden sm:block"
          style={{
            opacity: isDark ? 0.04 : 0.03,
            background: isDark
              ? "radial-gradient(circle, #fff 0%, transparent 70%)"
              : "radial-gradient(circle, #000 0%, transparent 70%)",
          }}
        />

        {/* Floating dots — desktop only */}
        <FloatingDots isDark={isDark} />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* ── Left Text ── */}
            <div className="lg:w-2/5 lg:sticky lg:top-24">

              {inView && (
                <div className="work-heading md:-ml-3 mb-5">
                  <h2
                    className="md:text-4xl text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <span className={isDark ? "heading-shimmer-dark" : "heading-shimmer-light"}>
                      Work Process
                    </span>
                  </h2>

                  {/* Draw-on underline */}
                  <span
                    className="work-underline"
                    style={{
                      background: `linear-gradient(90deg, ${accentLine}, transparent)`,
                      opacity: 0.25,
                    }}
                  />
                </div>
              )}

              {inView && (
                <p className={`work-para-0 text-sm md:text-base leading-relaxed ${descText}`}>
                  With over 1 year of frontend development experience, I follow a
                  structured workflow to build modern and responsive web applications.
                </p>
              )}

              {inView && (
                <p className={`work-para-1 text-sm md:text-base leading-relaxed mt-4 ${descText}`}>
                  From planning to deployment, every step is focused on clean code,
                  performance, and user experience.
                </p>
              )}
            </div>

            {/* ── Right Cards ── */}
            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`${inView ? `work-card-${i}` : "opacity-0"} work-card-hover ${
                    isDark ? "work-card-hover-dark" : "work-card-hover-light"
                  } rounded-2xl p-6 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Icon box */}
                  <div
                    className={`icon-box ${inView ? "icon-pop" : "opacity-0"} w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      isDark ? "bg-gray-800 text-slate-200" : "bg-black text-white"
                    }`}
                    style={{ animationDelay: `${0.2 + i * 0.12}s` }}
                  >
                    {step.icon}
                  </div>

                  {/* Step number + title */}
                  <h3
                    className={`step-number text-base font-bold mb-2 ${headText}`}
                    style={{ animationDelay: `${0.25 + i * 0.12}s` }}
                  >
                    {step.number}. {step.title}
                  </h3>

                  {/* Divider — draws on */}
                  <div
                    className={`h-[1px] mb-3 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
                    style={{
                      width: inView ? "100%" : 0,
                      transition: `width .6s cubic-bezier(.22,1,.36,1) ${0.35 + i * 0.12}s`,
                    }}
                  />

                  <p className={`text-sm leading-relaxed ${descText}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        
      </section>
    </>
  );
}