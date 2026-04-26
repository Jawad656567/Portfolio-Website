import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

/* ─── Keyframe CSS injected once ─────────────────────────────────── */
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
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0px rgba(99,102,241,.35); }
    100% { box-shadow: 0 0 0 18px rgba(99,102,241,0);  }
  }
  @keyframes gridDrift {
    0%,100% { background-position: 0 0; }
    50%      { background-position: 12px 12px; }
  }

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

  .about-tag:hover {
    animation: pulseRing .6s ease-out forwards;
    cursor: default;
  }

  /* Shimmer on loading skeleton */
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

  /* inject CSS once */
  useEffect(() => { injectStyles(); }, []);

  /* resize listener */
  useEffect(() => {
    const handle = () => setIsDesktop(window.innerWidth >= 1024);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* fetch data */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res  = await axios.get(`${API}/api/about`);
        const data = res.data?.data || res.data;
        setParagraphs(data?.paragraphs || []);
      } catch {
        setParagraphs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  /* accent colour */
  const accent = isDark ? "#818cf8" : "#4f46e5";

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-5 py-10 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* ── Animated dot-grid background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
          } 1px, transparent 0)`,
          backgroundSize: "24px 24px",
          animation: "gridDrift 8s ease-in-out infinite",
        }}
      />

      {/* ── Soft glow blob ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,.10) 0%, transparent 70%)",
          animation: "floatY 9s ease-in-out infinite",
        }}
      />

      <div className="max-w-6xl mr-auto ml-0 md:ml-5 flex flex-col md:flex-row items-center gap-14 relative">

        {/* ══ LEFT SIDE ══════════════════════════════════════════════ */}
        <div className="flex-1">

          {/* Heading with animated underline */}
          {inView && (
            <div
              className="about-heading mb-6"
              style={{ animationDelay: "0s" }}
            >
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
              {/* Draw-on underline */}
              <span
                className="about-underline"
                style={{
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                  animationDelay: "0.55s",
                }}
              />
            </div>
          )}

          {/* Paragraphs */}
          {loading ? (
            /* Skeleton shimmer */
            <div className="space-y-3 mt-4">
              {[100, 90, 80].map((w, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: 14, width: `${w}%`, animationDelay: `${i * .15}s` }}
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

          {/* Tags — staggered pop-in */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["React", "Tailwind", "JavaScript", "Frontend"].map((t, i) =>
              inView ? (
                <span
                  key={t}
                  className="about-tag text-xs px-3 py-1 rounded-full border transition-colors duration-300"
                  style={{
                    animationDelay: `${0.55 + i * 0.1}s`,
                    borderColor: isDark ? "#374151" : "#e5e7eb",
                    color:       isDark ? "#9ca3af" : "#374151",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.color       = accent;
                    e.currentTarget.style.background  = isDark
                      ? "rgba(99,102,241,.12)"
                      : "rgba(79,70,229,.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? "#374151" : "#e5e7eb";
                    e.currentTarget.style.color       = isDark ? "#9ca3af" : "#374151";
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

        {/* ══ RIGHT IMAGE ════════════════════════════════════════════ */}
        {isDesktop && inView && (
          <div
            className="about-img-wrap hidden lg:flex flex-shrink-0 ml-10 mt-5 items-center justify-center"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Glow ring behind image */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${
                    isDark ? "rgba(99,102,241,.25)" : "rgba(79,70,229,.15)"
                  } 0%, transparent 70%)`,
                  transform: "scale(1.15)",
                  animation: "pulseRing 2.5s ease-in-out infinite",
                }}
              />

              <div className="about-img-inner relative z-10">
                <img
                  src="about.png"
                  alt="Professional"
                  className="w-80 h-80 object-contain"
                  style={{
                    filter: isDark
                      ? "drop-shadow(0 20px 40px rgba(99,102,241,.35))"
                      : "drop-shadow(0 20px 40px rgba(79,70,229,.20))",
                    transition: "filter .4s ease",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}