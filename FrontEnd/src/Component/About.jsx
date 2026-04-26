import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

/* ─── Keyframe CSS ─────────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px)   rotate(-1deg); }
    50%       { transform: translateY(-14px) rotate(1deg);  }
  }
  @keyframes drawLine {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.6) translateY(8px); }
    70%  { transform: scale(1.08) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
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
    0%   { transform: translateY(0px)    scale(1);    opacity: 0.4; }
    50%  { transform: translateY(-10px)  scale(1.25); opacity: 0.8; }
    100% { transform: translateY(0px)    scale(1);    opacity: 0.4; }
  }
  @keyframes borderPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.8; }
  }
  @keyframes gridDrift {
    0%,100% { background-position: 0 0; }
    50%      { background-position: 12px 12px; }
  }

  .about-section          { animation: fadeSlideUp .4s ease both; }
  .about-section.dark-glow  { animation: fadeSlideUp .4s ease both, glowPulseDark  4s ease-in-out 1s infinite; }
  .about-section.light-glow { animation: fadeSlideUp .4s ease both, glowPulseLight 4s ease-in-out 1s infinite; }

  .about-heading { animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both; }
  .about-underline {
    display: block; height: 3px; border-radius: 2px;
    margin-top: 6px;
    animation: drawLine .9s cubic-bezier(.22,1,.36,1) .55s both;
  }
  .about-para { animation: fadeSlideUp .65s cubic-bezier(.22,1,.36,1) both; }
  .about-tag  { animation: popIn .5s cubic-bezier(.22,1,.36,1) both; }
  .about-img-wrap { animation: fadeSlideLeft .8s cubic-bezier(.22,1,.36,1) .2s both; }
  .about-img-inner { animation: floatY 5s ease-in-out infinite; }

  .about-img-inner:hover {
    animation-play-state: paused;
    transform: scale(1.06) rotate(0deg) !important;
    transition: transform .4s cubic-bezier(.22,1,.36,1);
  }

  .dot-float { animation: floatDot var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }

  /* Skeleton shimmer */
  .skeleton {
    background: linear-gradient(90deg,
      rgba(150,150,150,.12) 25%,
      rgba(150,150,150,.24) 50%,
      rgba(150,150,150,.12) 75%
    );
    background-size: 200% auto;
    animation: shimmer 1.4s linear infinite;
    border-radius: 6px;
  }
`;

function injectStyles() {
  if (document.getElementById("linkedin-about-styles")) return;
  const el = document.createElement("style");
  el.id = "linkedin-about-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── Floating Dots — desktop only, black/white only ─────────────── */
const FloatingDots = ({ isDark }) => {
  const dots = [
    { top: "14%", left: "4%",  size: 4, dur: "3.1s", delay: "0s"   },
    { top: "60%", left: "2%",  size: 3, dur: "2.5s", delay: "0.7s" },
    { top: "82%", left: "7%",  size: 4, dur: "3.8s", delay: "1.2s" },
    { top: "18%", left: "91%", size: 4, dur: "2.8s", delay: "0.3s" },
    { top: "68%", left: "94%", size: 3, dur: "3.5s", delay: "1.0s" },
    { top: "42%", left: "89%", size: 4, dur: "2.6s", delay: "1.5s" },
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

/* ─── Intersection-observer hook ─────────────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ─── Component ───────────────────────────────────────────────────── */
export default function LinkedInAbout() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [isDesktop, setIsDesktop]   = useState(false);

  const [sectionRef, inView] = useInView(0.12);
  const cardRef = useRef(null);

  /* inject CSS once */
  useEffect(() => { injectStyles(); }, []);

  /* resize listener */
  useEffect(() => {
    const handle = () => setIsDesktop(window.innerWidth >= 1024);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* default content — shown until backend responds */
  const defaultParagraphs = [
    {
      text: "Computer Science student in my 6th semester, focused on Front-End Development. I build responsive and modern web applications using React and Tailwind CSS with a strong focus on clean UI and maintainable code.",
    },
    {
      text: "Passionate about turning ideas into smooth user experiences. My goal is to grow as a developer who bridges design and engineering while continuously learning new technologies.",
    },
  ];

  /* fetch data */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res  = await axios.get(`${API}/api/about`);
        const data = res.data?.data || res.data;
        const fetched = data?.paragraphs;
        setParagraphs(fetched?.length ? fetched : defaultParagraphs);
      } catch {
        setParagraphs(defaultParagraphs);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  /* ── Mouse tilt — desktop only (≥768px), same as ProfileCard ── */
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg) scale(1.004)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  /* ── Theme tokens — black/white only, same as ProfileCard ── */
  const cardBg      = isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900";
  const accentLine  = isDark ? "bg-white"               : "bg-black";
  const borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";

  const tagBorderIdle  = isDark ? "#374151" : "#e5e7eb";
  const tagColorIdle   = isDark ? "#9ca3af" : "#374151";
  const tagBorderHover = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";
  const tagColorHover  = isDark ? "#ffffff"               : "#000000";
  const tagBgHover     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={(el) => {
          sectionRef.current = el;
          cardRef.current    = el;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`about-section ${isDark ? "dark-glow" : "light-glow"} relative overflow-hidden px-5 py-10 transition-all duration-300 ${cardBg}`}
        style={{ willChange: "transform" }}
      >

        {/* ── Top border pulse (same as ProfileCard) ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
            animation: "borderPulse 3s ease-in-out infinite",
          }}
        />

        {/* ── Dotted grid background ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "24px 24px",
            animation: "gridDrift 8s ease-in-out infinite",
          }}
        />

        {/* ── Radial glow blob — desktop only, black/white ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl hidden sm:block"
          style={{
            opacity: isDark ? 0.04 : 0.03,
            background: isDark
              ? "radial-gradient(circle, #fff 0%, transparent 70%)"
              : "radial-gradient(circle, #000 0%, transparent 70%)",
            animation: "floatY 9s ease-in-out infinite",
          }}
        />

        {/* ── Floating dots — desktop only ── */}
        <FloatingDots isDark={isDark} />

        <div className="max-w-6xl mr-auto ml-0 md:ml-5 flex flex-col md:flex-row items-center gap-14 relative">

          {/* ══ LEFT SIDE ══════════════════════════════════════════ */}
          <div className="flex-1">

            {/* Heading with draw-on underline */}
            {inView && (
              <div className="about-heading mb-6" style={{ animationDelay: "0s" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: isDark ? "#f1f0ec" : "#1a1917",
                    letterSpacing: "-0.02em",
                  }}
                  className="md:text-5xl text-2xl font-bold leading-tight"
                >
                  About
                </h2>
                {/* Draw-on underline — white/black only */}
                <span
                  className={`about-underline ${accentLine} opacity-25`}
                  style={{ animationDelay: "0.55s" }}
                />
              </div>
            )}

            {/* Paragraphs */}
            {loading ? (
              <div className="space-y-3 mt-4">
                {[100, 90, 80].map((w, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{ height: 14, width: `${w}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            ) : (
              paragraphs.map((p, i) =>
                inView ? (
                  <p
                    key={i}
                    className="about-para leading-relaxed text-sm md:text-base mt-3"
                    style={{
                      color: isDark ? "#9ca3af" : "#374151",
                      animationDelay: `${0.2 + i * 0.14}s`,
                    }}
                  >
                    {p.text}
                  </p>
                ) : (
                  <p
                    key={i}
                    className="leading-relaxed text-sm md:text-base mt-3 opacity-0"
                    style={{ color: isDark ? "#9ca3af" : "#374151" }}
                  >
                    {p.text}
                  </p>
                )
              )
            )}

            {/* Tags — black/white hover, staggered pop-in */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["React", "Tailwind", "JavaScript", "Frontend"].map((t, i) =>
                inView ? (
                  <span
                    key={t}
                    className="about-tag text-xs px-3 py-1 rounded-full border transition-colors duration-300"
                    style={{
                      animationDelay: `${0.55 + i * 0.1}s`,
                      borderColor: tagBorderIdle,
                      color:       tagColorIdle,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = tagBorderHover;
                      e.currentTarget.style.color       = tagColorHover;
                      e.currentTarget.style.background  = tagBgHover;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = tagBorderIdle;
                      e.currentTarget.style.color       = tagColorIdle;
                      e.currentTarget.style.background  = "transparent";
                    }}
                  >
                    {t}
                  </span>
                ) : (
                  <span key={t} className="opacity-0 text-xs px-3 py-1">{t}</span>
                )
              )}
            </div>
          </div>

          {/* ══ RIGHT IMAGE — desktop only ════════════════════════ */}
          {isDesktop && inView && (
            <div
              className="about-img-wrap hidden lg:flex flex-shrink-0 ml-10 mt-5 items-center justify-center"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Glow ring — white/black only, matches ProfileCard radial glow */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full blur-2xl hidden sm:block"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
                    transform: "scale(1.15)",
                    animation: "floatY 5s ease-in-out infinite",
                  }}
                />

                <div
                  className="about-img-inner relative z-10 overflow-hidden"
                  style={{
                    borderRadius: "28px",
                    border: isDark
                      ? "1.5px solid rgba(255,255,255,0.10)"
                      : "1.5px solid rgba(0,0,0,0.08)",
                    boxShadow: isDark
                      ? "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                      : "0 8px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    transition: "box-shadow .4s ease, border-color .4s ease",
                  }}
                >
                  <img
                    src="about.png"
                    alt="Professional"
                    className="w-72 h-60 object-cover object-top"
                    style={{
                      borderRadius: "26px",
                      transition: "transform .4s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom border line (same as ProfileCard) ── */}
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