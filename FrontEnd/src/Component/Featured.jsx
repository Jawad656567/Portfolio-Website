import React, { useRef, useEffect, useState, useContext, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const CARD_WIDTH = 340;
const CARD_GAP = 16;

export default function FeaturedSection() {
  const { theme } = useContext(ThemeContext);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const defaultData = [
    { _id: 1, title: "Project Alpha", tag: "Design", image_url: "/fallback1.png" },
    { _id: 2, title: "Project Beta", tag: "Research", image_url: "/fallback2.png" },
    { _id: 3, title: "Project Gamma", tag: "Engineering", image_url: "/fallback3.png" },
  ];

  const [featuredData, setFeaturedData] = useState(defaultData);

  useEffect(() => {
    API.get("/api/featured")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setFeaturedData(res.data);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  const scrollTo = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, featuredData.length - 1));
    el.scrollTo({ left: clamped * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
    setActiveIndex(clamped);
  }, [featuredData.length]);

  const scrollLeft  = () => scrollTo(activeIndex - 1);
  const scrollRight = () => scrollTo(activeIndex + 1);

  useEffect(() => {
    if (isHovered) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = prev >= featuredData.length - 1 ? 0 : prev + 1;
        scrollRef.current?.scrollTo({ left: next * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
        return next;
      });
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, featuredData.length]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(idx);
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* ── Mobile CSS ── */}
      <style>{`
        .featured-card {
          width: 340px;
          height: 260px;
        }
        @media (max-width: 480px) {
          .featured-card {
            width: 75vw;
            height: 200px;
          }
        }
        .featured-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        className={`relative w-full transition-colors duration-500 ${
          isDark ? "bg-gray-950" : "bg-[#F7F6F2]"
        }`}
        style={{ paddingBlock: "2.5rem 3rem", overflowX: "clip" }}
      >
        {/* ── Subtle background texture ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Header ── */}
        <header className="relative px-6 md:px-10 mb-7 flex items-end justify-between">
         <div>
  <h2
    className=" md:text-5xl text-2xl font-bold leading-tight"
    style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      color: isDark ? "#f1f0ec" : "#1a1917",
      letterSpacing: "-0.02em",
    }}
  >
    Featured
  </h2>

  <p
    className="mt-1 text-sm"
    style={{
      color: isDark ? "rgba(255,255,255,0.6)" : "#666",
    }}
  >
    Recent Work
  </p>
</div>

          {/* ── Nav Buttons ── */}
          <div className="flex gap-2">
            {[{ fn: scrollLeft, Icon: ChevronLeft, label: "Previous" },
              { fn: scrollRight, Icon: ChevronRight, label: "Next" }].map(({ fn, Icon, label }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="group flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 40, height: 40,
                  border: `1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                  color: isDark ? "#d1d0cb" : "#3d3c39",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDark ? "rgba(99,102,241,0.2)" : "rgba(79,70,229,0.08)";
                  e.currentTarget.style.borderColor = isDark ? "#6366f1" : "#4f46e5";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
                }}
              >
                <Icon size={18} strokeWidth={2} />
              </button>
            ))}
          </div>
        </header>

        {/* ── Cards Track ── */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="featured-scroll flex overflow-x-auto pb-2"
          style={{
            gap: CARD_GAP,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            scrollPaddingLeft: "1.5rem",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {featuredData.map((item, i) => (
            <FeaturedCard
              key={item._id ?? item.title}
              item={item}
              index={i}
              isDark={isDark}
            />
          ))}

          {/* ── Trailing spacer ── */}
          <div style={{ minWidth: "0.5rem", flexShrink: 0 }} />
        </div>

        {/* ── Dot Indicators ── */}
        <div className="flex justify-center gap-2 mt-5">
          {featuredData.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                background: i === activeIndex
                  ? isDark ? "#6366f1" : "#4f46e5"
                  : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────
   Card sub-component
───────────────────────────────────────── */
function FeaturedCard({ item, isDark }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/activity"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="featured-card block flex-shrink-0 rounded-2xl overflow-hidden relative"
      style={{
        scrollSnapAlign: "start",
        boxShadow: hovered
          ? isDark
            ? "0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.3)"
            : "0 20px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(79,70,229,0.15)"
          : isDark
            ? "0 4px 16px rgba(0,0,0,0.35)"
            : "0 4px 16px rgba(0,0,0,0.09)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
        outline: "none",
        textDecoration: "none",
      }}
    >
      {/* Image */}
      <img
        src={item.image_url}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Tag badge */}
      {item.tag && (
        <span
          className="absolute top-3.5 left-3.5 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.22)",
            letterSpacing: "0.12em",
          }}
        >
          {item.tag}
        </span>
      )}

      {/* Arrow icon */}
      <span
        className="absolute top-3.5 right-3.5 flex items-center justify-center rounded-full"
        style={{
          width: 32, height: 32,
          background: "rgba(255,255,255,0.95)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-15deg)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <ArrowUpRight size={16} strokeWidth={2.2} style={{ color: "#1a1917" }} />
      </span>

      {/* Bottom text */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.35s ease",
        }}
      >
        <h3
          className="font-bold text-white leading-snug"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-xs mt-0.5"
          style={{
            color: "rgba(255,255,255,0.65)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.3s ease 0.05s",
          }}
        >
          View details →
        </p>
      </div>
    </Link>
  );
}