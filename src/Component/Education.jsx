import React, { useRef, useState } from "react";
import { MapPin, Calendar, BookOpen, ChevronRight } from "lucide-react";

const EDU_DATA = [
  {
    id: 1,
    degree: "Bachelor in Computer Science",
    short: "BSCS",
    institute: "Government Lahore Degree College",
    period: "16 Mar 2023 – Current",
    city: "Swabi",
    country: "Pakistan",
    field: "Computer Science",
    status: "ongoing",
  },
  {
    id: 2,
    degree: "FSc Pre-Engineering",
    short: "FSc",
    institute: "Government Higher Secondary College",
    period: "2021 – 2023",
    city: "Swabi",
    country: "Pakistan",
    field: "Pre-Engineering",
    status: "completed",
  },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  .edu-root * { box-sizing: border-box; }

  @keyframes eduFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .edu-heading   { animation: eduFadeUp 0.45s ease both; }
  .edu-hint      { animation: eduFadeUp 0.45s ease 0.15s both; }
  .edu-stack-wrap { animation: eduFadeUp 0.45s ease 0.25s both; }

  .edu-card {
    font-family: 'Syne', sans-serif;
    position: absolute;
    width: 100%;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 20px;
    padding: 26px 26px 22px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    user-select: none;
  }

  .edu-card.is-top {
    cursor: grab;
  }
  .edu-card.is-top:active {
    cursor: grabbing;
  }

  .mono { font-family: 'DM Mono', monospace; }

  .status-ongoing {
    background: #111;
    color: #fff;
  }
  .status-completed {
    background: #f3f4f6;
    color: #4b5563;
    border: 1.5px solid #e5e7eb;
  }
`;

function EduCard({ data, index, total, isTop, onSwipedAway }) {
  const drag = useRef({ active: false, startX: 0, x: 0, lastX: 0, vel: 0, lastT: 0 });
  const [tx, setTx]     = useState(0);
  const [rot, setRot]   = useState(0);
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
      setTimeout(() => {
        onSwipedAway();
        setTx(0); setRot(0); setFlying(false);
      }, 380);
    } else {
      setTx(0); setRot(0);
    }
  };

  // Below-top stacking visual
  const stackOffset = (total - 1 - index) * 10;
  const stackScale  = 1 - (total - 1 - index) * 0.045;
  const stackOpacity = 1 - (total - 1 - index) * 0.18;

  const transform = isTop
    ? `translateX(${tx}px) rotate(${rot}deg)`
    : `translateY(${stackOffset}px) scale(${stackScale})`;

  const isDragging = drag.current.active;

  return (
    <div
      className={`edu-card ${isTop ? "is-top" : ""}`}
      style={{
        transform,
        opacity: isTop ? 1 : stackOpacity,
        zIndex: index + 1,
        transition: isDragging || flying ? (flying ? "transform 0.38s cubic-bezier(.55,.06,.68,.19)" : "none") : "transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease",
        touchAction: isTop ? "pan-y" : "none",
      }}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => { e.stopPropagation(); onMove(e.touches[0].clientX); }}
      onTouchEnd={onEnd}
    >
      {/* Badge row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span
          className="mono"
          style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", fontWeight: 500 }}
        >
          {data.short} · {data.field}
        </span>
        <span
          className={`status-pill mono ${data.status === "ongoing" ? "status-ongoing" : "status-completed"}`}
          style={{ fontSize: 10, letterSpacing: "0.07em", padding: "3px 10px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 5, textTransform: "uppercase", fontWeight: 500 }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: data.status === "ongoing" ? "#fff" : "#9ca3af", flexShrink: 0 }} />
          {data.status === "ongoing" ? "Enrolled" : "Completed"}
        </span>
      </div>

      {/* Degree title */}
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 21, fontWeight: 800, color: "#111", lineHeight: 1.2, marginBottom: 5 }}>
        {data.degree}
      </div>

      {/* Institute */}
      <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", marginBottom: 18 }}>
        {data.institute}
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "#f3f4f6", marginBottom: 16 }} />

      {/* Info rows */}
      {[
        { Icon: Calendar, text: data.period },
        { Icon: MapPin,   text: `${data.city}, ${data.country}` },
        { Icon: BookOpen, text: `Field: ${data.field}` },
      ].map(({ Icon, text }, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#374151", fontWeight: 500, marginBottom: 8 }}>
          <Icon size={13} color="#9ca3af" style={{ flexShrink: 0 }} />
          <span>{text}</span>
        </div>
      ))}

      {/* Counter */}
      <div className="mono" style={{ fontSize: 11, color: "#d1d5db", textAlign: "right", marginTop: 14 }}>
        {index + 1} / {total}
      </div>
    </div>
  );
}

export default function Education() {
  const [cards, setCards] = useState([...EDU_DATA].reverse());
  const total = cards.length;

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
      <style>{style}</style>
      <div className="edu-root flex flex-col items-start bg-white px-6 pt-6 pb-20 sm:px-8 lg:pt-8">

        <h2
          className="edu-heading"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 25, fontWeight: 900, color: "#374151", marginBottom: 4 }}
        >
          Education
        </h2>

        <div
          className="edu-hint"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, marginBottom: 32 }}
        >
          <ChevronRight size={12} />
          <span>Swipe card left or right to browse</span>
        </div>

        {/* Stack */}
        <div
          className="edu-stack-wrap w-full"
          style={{ position: "relative", height: 300 + (total - 1) * 12 }}
        >
          {cards.map((card, i) => (
            <EduCard
              key={card.id}
              data={card}
              index={i}
              total={total}
              isTop={i === total - 1}
              onSwipedAway={handleSwipedAway}
            />
          ))}
        </div>

        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-t border-gray-200 mt-8" />
      </div>
    </>
  );
}