import React, { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, BookOpen, ChevronRight } from "lucide-react";
import axios from "axios";

// ✅ API setup (env se)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

function CardContent({ data, index, total, counter }) {
  return (
    <>
      <div className="flex justify-between mb-2.5">
        <span className="text-[11px] text-gray-400 uppercase">
          {data.short} · {data.field}
        </span>

        <span
          className={`text-[11px] px-3 py-[2px] rounded-full ${
            data.status === "ongoing"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`}
        >
          {data.status === "ongoing" ? "Enrolled" : "Completed"}
        </span>
      </div>

      <div className="text-[18px] font-bold text-gray-900 mb-1">
        {data.degree}
      </div>

      <div className="text-[13px] text-gray-500 mb-4">
        {data.institute}
      </div>

      <hr className="border-t border-gray-100 mb-3" />

      <div className="flex items-center gap-1.5 text-[12px] text-gray-700 mb-1.5">
        <Calendar size={12} className="text-gray-400" />
        <span>{data.period}</span>
      </div>

      <div className="flex items-center gap-1.5 text-[12px] text-gray-700 mb-1.5">
        <MapPin size={12} className="text-gray-400" />
        <span>
          {data.city}, {data.country}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
        <BookOpen size={12} className="text-gray-400" />
        <span>{data.field}</span>
      </div>

      {counter && (
        <div className="text-[11px] text-gray-300 text-right mt-3">
          {index + 1} / {total}
        </div>
      )}
    </>
  );
}

function EduCard({ data, index, total, isTop, onSwipedAway }) {
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
      className="absolute w-full bg-white border border-gray-200 rounded-xl p-5 select-none cursor-grab active:cursor-grabbing"
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
      <CardContent data={data} index={index} total={total} counter />
    </div>
  );
}

export default function Education() {
  const [cards, setCards] = useState([]);

  const total = cards.length;

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await API.get("/api/education");
        setCards(res.data.reverse());
      } catch (err) {
        console.error("Error fetching education:", err);
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
    <div className="px-6 pb-20 pt-6">
      <h2 className="text-[25px] font-black text-gray-700 mb-3">
        EDUCATION
      </h2>

      <div className="lg:hidden text-[11px] text-gray-400 flex items-center gap-1 mb-7">
        <ChevronRight size={12} />
        <span>Swipe to browse</span>
      </div>

      {/* Mobile Stack */}
      <div
        className="relative lg:hidden"
        style={{ height: 300 + (total - 1) * 12 }}
      >
        {cards.map((card, i) => (
          <EduCard
            key={card._id || card.id}
            data={card}
            index={i}
            total={total}
            isTop={i === total - 1}
            onSwipedAway={handleSwipedAway}
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
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <CardContent
                data={card}
                index={i}
                total={cards.length}
              />
            </div>
          ))}
      </div>
    </div>
  );
}