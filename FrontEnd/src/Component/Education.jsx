import React, { useRef, useState, useEffect, useContext } from "react";
import { MapPin, Calendar, BookOpen, ChevronRight } from "lucide-react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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

// ✅ Card content component
function CardContent({ data, index, total, counter, isDark }) {
  return (
    <>
      <div className="flex justify-between mb-2.5">
        <span className={`text-[11px] uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {data.short} · {data.field}
        </span>

        <span
          className={`text-[11px] px-3 py-[2px] rounded-full ${
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

      <div className={`text-[18px] font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {data.degree}
      </div>

      <div className={`text-[13px] mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {data.institute}
      </div>

      <hr className={`mb-3 ${isDark ? "border-gray-800" : "border-gray-100"}`} />

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

// ✅ Swipeable card component
function EduCard({ data, index, total, isTop, onSwipedAway, isDark }) {
  const drag = useRef({
    active: false,
    startX: 0,
    x: 0,
    lastX: 0,
    vel: 0,
    lastT: 0,
  });

  const [tx, setTx] = useState(0);
  const [rot, setRot] = useState(0);
  const [flying, setFlying] = useState(false);
  const THRESHOLD = 80;

  const onStart = (clientX) => {
    if (!isTop || flying) return;
    drag.current = {
      active: true,
      startX: clientX,
      x: 0,
      lastX: clientX,
      vel: 0,
      lastT: Date.now(),
    };
  };

  const onMove = (clientX) => {
    if (!drag.current.active) return;
    const dx = clientX - drag.current.startX;
    const now = Date.now();
    const dt = Math.max(now - drag.current.lastT, 1);
    drag.current.vel = ((clientX - drag.current.lastX) / dt) * 16;
    drag.current.lastX = clientX;
    drag.current.lastT = now;
    drag.current.x = dx;
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
      setTimeout(() => {
        onSwipedAway();
        setTx(0);
        setRot(0);
        setFlying(false);
      }, 380);
    } else {
      setTx(0);
      setRot(0);
    }
  };

  const stackOffset = (total - 1 - index) * 10;
  const stackScale = 1 - (total - 1 - index) * 0.045;
  const stackOpacity = 1 - (total - 1 - index) * 0.18;
  const isDragging = drag.current.active;

  return (
    <div
      className={`absolute w-full rounded-xl p-5 select-none cursor-grab active:cursor-grabbing border ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
      style={{
        transform: isTop
          ? `translateX(${tx}px) rotate(${rot}deg)`
          : `translateY(${stackOffset}px) scale(${stackScale})`,
        opacity: isTop ? 1 : stackOpacity,
        zIndex: index + 1,
        transition:
          isDragging || flying
            ? flying
              ? "transform 0.38s ease"
              : "none"
            : "transform 0.4s ease, opacity 0.3s ease",
        touchAction: isTop ? "pan-y" : "none",
      }}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => {
        e.stopPropagation();
        onMove(e.touches[0].clientX);
      }}
      onTouchEnd={onEnd}
    >
      <CardContent data={data} index={index} total={total} counter isDark={isDark} />
    </div>
  );
}

// ✅ Main Education Component
export default function Education() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [cards, setCards] = useState(defaultEducation);
  const total = cards.length;

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
    <section
      className={`relative overflow-hidden px-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Dotted background — same as About */}
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

      <div className="relative px-1 pb-6 pt-6">
        <h2
          className={`text-[25px] font-black mb-3 ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          EDUCATION
        </h2>

        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mb-5" />

        <div
          className={`lg:hidden text-[11px] flex items-center gap-1 mb-4 ${
            isDark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          <ChevronRight size={12} />
          <span>Swipe to browse</span>
        </div>

        {/* Mobile Stack */}
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

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {cards
            .slice()
            .reverse()
            .map((card, i) => (
              <div
                key={card._id || card.id}
                className={`rounded-xl p-5 border ${
                  isDark
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent
                  data={card}
                  index={i}
                  total={cards.length}
                  isDark={isDark}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}