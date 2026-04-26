import React, { useRef, useState, useEffect, useContext } from "react";
import { MapPin, Calendar, BookOpen, ChevronRight } from "lucide-react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* ─── Keyframes ──────────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeSlideUpCard {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
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
  @keyframes badgePop {
    0%   { opacity: 0; transform: scale(0.6) translateY(4px); }
    70%  { transform: scale(1.08) translateY(-1px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes shimmerSweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes swipeHint {
    0%   { transform: translateX(0);   opacity: 0.7; }
    30%  { transform: translateX(10px); opacity: 1;   }
    60%  { transform: translateX(-6px); opacity: 0.8; }
    100% { transform: translateX(0);   opacity: 0.7; }
  }

  /* Section */
  .edu-section       { animation: fadeSlideUp .4s ease both; }
  .edu-section.dark-glow  { animation: fadeSlideUp .4s ease both, glowPulseDark  4s ease-in-out 1s infinite; }
  .edu-section.light-glow { animation: fadeSlideUp .4s ease both, glowPulseLight 4s ease-in-out 1s infinite; }

  /* Heading */
  .edu-heading   { animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both; }
  .edu-underline {
    display: block; height: 3px; border-radius: 2px; margin-top: 6px;
    animation: drawLine .9s cubic-bezier(.22,1,.36,1) .55s both;
  }

  /* Heading shimmer */
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

  /* Desktop cards staggered */
  .edu-card-0 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .15s both; }
  .edu-card-1 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .28s both; }
  .edu-card-2 { animation: fadeSlideUpCard .6s cubic-bezier(.22,1,.36,1) .41s both; }

  /* Desktop card hover */
  .edu-card-hover {
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease;
  }
  .edu-card-hover:hover {
    transform: translateY(-5px) scale(1.012);
  }
  .edu-card-hover-dark:hover  { box-shadow: 0 12px 32px rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.18) !important; }
  .edu-card-hover-light:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.10);       border-color: rgba(0,0,0,0.18) !important; }

  /* Badge pop */
  .badge-pop { animation: badgePop .45s cubic-bezier(.34,1.56,.64,1) .5s both; }

  /* Swipe hint icon */
  .swipe-hint { animation: swipeHint 1.6s ease-in-out 1.2s 2; }

  /* Floating dots */
  .dot-float { animation: floatDot var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }

  /* Mobile stack entry */
  .stack-enter { animation: fadeSlideUpCard .55s cubic-bezier(.22,1,.36,1) .2s both; }
`;

/* ─── Floating Dots ──────────────────────────────────────────────── */
const FloatingDots = ({ isDark }) => {
  const dots = [
    { top: "12%", left: "3%",  size: 4, dur: "3.1s", delay: "0s"   },
    { top: "65%", left: "2%",  size: 3, dur: "2.5s", delay: "0.8s" },
    { top: "80%", left: "6%",  size: 4, dur: "3.8s", delay: "1.3s" },
    { top: "20%", left: "92%", size: 4, dur: "2.8s", delay: "0.4s" },
    { top: "70%", left: "95%", size: 3, dur: "3.5s", delay: "1.1s" },
    { top: "45%", left: "90%", size: 4, dur: "2.6s", delay: "1.6s" },
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

const defaultEducation = [
  {
    _id: "1",
    degree: "Bachelor in Computer Science",
    short: "BSCS",
    institute: "Government Lahore Degree College",
    period: "Mar 2023 – Present",
    city: "Swabi",
    country: "Pakistan",
    field: "Computer Science",
    status: "ongoing",
  },
  {
    _id: "2",
    degree: "FSc Pre-Engineering",
    short: "FSc",
    institute: "Government Higher Secondary College",
    period: "2021 – 2023",
    city: "Swabi",
    country: "Pakistan",
    field: "Pre-Engineering",
    status: "completed",
  },
  {
    _id: "3",
    degree: "Matric · Computer Science",
    short: "Matric",
    institute: "Government Higher Secondary College",
    period: "2019 – 2020",
    city: "Swabi",
    country: "Pakistan",
    field: "Computer Science",
    status: "completed",
  },
];

/* ─── Card Content ───────────────────────────────────────────────── */
function CardContent({ data, index, total, counter, isDark, inView, cardIdx }) {
  return (
    <>
      <div className="flex justify-between mb-2.5">
        <span className={`text-[11px] uppercase tracking-wide ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {data.short} · {data.field}
        </span>

        <span
          className={`badge-pop text-[11px] px-3 py-[2px] rounded-full ${
            data.status === "ongoing"
              ? isDark
                ? "bg-white text-gray-900"
                : "bg-black text-white"
              : isDark
                ? "bg-gray-800 text-gray-400 border border-gray-700"
                : "bg-gray-100 text-gray-500 border border-gray-200"
          }`}
        >
          {data.status === "ongoing" ? "Enrolled" : "Completed"}
        </span>
      </div>

      <div className={`text-[18px] font-bold mb-1 leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
        {data.degree}
      </div>

      <div className={`text-[13px] mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {data.institute}
      </div>

      <hr
        className="mb-3"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
          animation: inView ? `drawLine .6s cubic-bezier(.22,1,.36,1) ${0.3 + (cardIdx ?? 0) * 0.13}s both` : "none",
          width: inView ? undefined : 0,
        }}
      />

      <div className={`flex items-center gap-1.5 text-[12px] mb-1.5 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        <Calendar size={12} className={isDark ? "text-gray-600" : "text-gray-400"} />
        <span>{data.period}</span>
      </div>

      <div className={`flex items-center gap-1.5 text-[12px] mb-1.5 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        <MapPin size={12} className={isDark ? "text-gray-600" : "text-gray-400"} />
        <span>{data.city}, {data.country}</span>
      </div>

      <div className={`flex items-center gap-1.5 text-[12px] ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        <BookOpen size={12} className={isDark ? "text-gray-600" : "text-gray-400"} />
        <span>{data.field}</span>
      </div>

      {counter && (
        <div className={`text-[11px] text-right mt-3 ${isDark ? "text-gray-700" : "text-gray-300"}`}>
          {index + 1} / {total}
        </div>
      )}
    </>
  );
}

/* ─── Swipeable Card ─────────────────────────────────────────────── */
function EduCard({ data, index, total, isTop, onSwipedAway, isDark }) {
  const drag = useRef({ active: false, startX: 0, x: 0, lastX: 0, vel: 0, lastT: 0 });
  const [tx, setTx]       = useState(0);
  const [rot, setRot]     = useState(0);
  const [flying, setFlying] = useState(false);
  const THRESHOLD = 80;

  const onStart = (clientX) => {
    if (!isTop || flying) return;
    drag.current = { active: true, startX: clientX, x: 0, lastX: clientX, vel: 0, lastT: Date.now() };
  };
  const onMove = (clientX) => {
    if (!drag.current.active) return;
    const dx  = clientX - drag.current.startX;
    const now = Date.now();
    const dt  = Math.max(now - drag.current.lastT, 1);
    drag.current.vel   = ((clientX - drag.current.lastX) / dt) * 16;
    drag.current.lastX = clientX;
    drag.current.lastT = now;
    drag.current.x     = dx;
    setTx(dx);
    setRot(dx * 0.055);
  };
  const onEnd = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const projected = drag.current.x + drag.current.vel * 8;
    if (Math.abs(projected) > THRESHOLD) {
      const dir = projected > 0 ? 1 : -1;
      setFlying(true);
      setTx(dir * 550);
      setRot(dir * 28);
      setTimeout(() => { onSwipedAway(); setTx(0); setRot(0); setFlying(false); }, 380);
    } else {
      setTx(0);
      setRot(0);
    }
  };

  const stackOffset  = (total - 1 - index) * 10;
  const stackScale   = 1 - (total - 1 - index) * 0.045;
  const stackOpacity = 1 - (total - 1 - index) * 0.18;
  const isDragging   = drag.current.active;

  /* Drag direction hint color */
  const hintOpacity = Math.min(Math.abs(tx) / 80, 1);
  const hintColor   = tx > 0
    ? `rgba(${isDark ? "255,255,255" : "0,0,0"},${hintOpacity * 0.12})`
    : `rgba(${isDark ? "255,255,255" : "0,0,0"},${hintOpacity * 0.06})`;

  return (
    <div
      className={`stack-enter absolute w-full rounded-xl p-5 select-none cursor-grab active:cursor-grabbing border ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
      style={{
        transform: isTop
          ? `translateX(${tx}px) rotate(${rot}deg)`
          : `translateY(${stackOffset}px) scale(${stackScale})`,
        opacity: isTop ? 1 : stackOpacity,
        zIndex: index + 1,
        transition: isDragging || flying
          ? flying ? "transform 0.38s ease" : "none"
          : "transform 0.4s ease, opacity 0.3s ease",
        touchAction: isTop ? "pan-y" : "none",
        background: isTop && Math.abs(tx) > 8
          ? (isDark
              ? `linear-gradient(135deg, ${hintColor}, #111827)`
              : `linear-gradient(135deg, ${hintColor}, #ffffff)`)
          : undefined,
      }}
      onMouseDown={(e)  => onStart(e.clientX)}
      onMouseMove={(e)  => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e)  => { e.stopPropagation(); onMove(e.touches[0].clientX); }}
      onTouchEnd={onEnd}
    >
      <CardContent data={data} index={index} total={total} counter isDark={isDark} inView cardIdx={0} />
    </div>
  );
}

/* ─── Main Education Component ───────────────────────────────────── */
export default function Education() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [cards, setCards] = useState(defaultEducation);
  const total = cards.length;

  const [sectionRef, inView] = useInView(0.1);

  const borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";
  const accentLine  = isDark ? "#ffffff"                 : "#000000";

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await API.get("/api/education");
        if (res.data && res.data.length > 0) {
          setCards(res.data.reverse());
          localStorage.setItem("eduData", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Error fetching education:", err);
        const saved = localStorage.getItem("eduData");
        if (saved) setCards(JSON.parse(saved));
      }
    };
    fetchEducation();
  }, []);

  const handleSwipedAway = () => {
    setCards((prev) => {
      const arr = [...prev];
      const top = arr.pop();
      arr.unshift(top);
      return arr;
    });
  };

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        className={`edu-section ${isDark ? "dark-glow" : "light-glow"} relative overflow-hidden px-5 transition-all duration-300 ${
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

        <div className="relative px-1 pb-8 pt-6">

          {/* Heading */}
          {inView && (
            <div className="edu-heading md:ml-5 mb-2">
             <h2
  className="md:text-4xl text-2xl md:ml-1 md:mb-7 font-bold leading-tight"
  style={{
    fontFamily: "'Playfair Display', Georgia, serif",
    color: isDark ? "#f1f0ec" : "#1a1917",
    letterSpacing: "-0.02em",
  }}
>
  Education
</h2>



             
            </div>
          )}

          {/* Swipe hint — mobile only */}
          <div
            className={`lg:hidden text-[11px] flex items-center gap-1 mb-4 mt-5 ${
              isDark ? "text-gray-600" : "text-gray-400"
            }`}
          >
            <ChevronRight size={12} className="swipe-hint" />
            <span>Swipe to browse</span>
          </div>

          {/* ── Mobile Stack ── */}
          <div
            className="relative lg:hidden"
            style={{ height: 220 + (total - 1) * 12 }}
          >
            {cards.map((card, i) => (
              <EduCard
                key={card._id || card.id}
                data={card}
                index={i}
                total={total}
                isTop={i === total - 1}
                onSwipedAway={handleSwipedAway}
                isDark={isDark}
              />
            ))}
          </div>

          {/* ── Desktop Grid ── */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-5 md:mx-5">
            {cards
              .slice()
              .reverse()
              .map((card, i) => (
                <div
                  key={card._id || card.id}
                  className={`edu-card-${i} edu-card-hover ${isDark ? "edu-card-hover-dark" : "edu-card-hover-light"} rounded-xl p-5 border ${
                    isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                  }`}
                >
                  <CardContent
                    data={card}
                    index={i}
                    total={cards.length}
                    isDark={isDark}
                    inView={inView}
                    cardIdx={i}
                  />
                </div>
              ))}
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