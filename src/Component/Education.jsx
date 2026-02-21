import React, { useRef, useState } from "react";
import { MapPin, Calendar, BookOpen, ChevronRight } from "lucide-react";

const EDU_DATA = [
  {
    id: 1,
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
  {
    id: 3,
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

const style = `
  .edu-stack-section { display: block; }
  .edu-grid-section  { display: none; }

  @media (min-width: 1024px) {
    .edu-stack-section { display: none !important; }
    .edu-grid-section  { display: grid !important; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  }

  .edu-card {
    position: absolute;
    width: 100%;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    user-select: none;
    cursor: grab;
  }
  .edu-card:active { cursor: grabbing; }

  .edu-grid-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
  }
`;

function CardContent({ data, index, total, counter }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>
          {data.short} · {data.field}
        </span>
        <span style={{
          fontSize: 11,
          padding: "2px 10px",
          borderRadius: 99,
          background: data.status === "ongoing" ? "#111" : "#f3f4f6",
          color: data.status === "ongoing" ? "#fff" : "#6b7280",
          border: data.status === "completed" ? "1px solid #e5e7eb" : "none",
        }}>
          {data.status === "ongoing" ? "Enrolled" : "Completed"}
        </span>
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        {data.degree}
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
        {data.institute}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", marginBottom: 12 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", marginBottom: 6 }}>
        <Calendar size={12} color="#9ca3af" />
        <span>{data.period}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", marginBottom: 6 }}>
        <MapPin size={12} color="#9ca3af" />
        <span>{data.city}, {data.country}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151" }}>
        <BookOpen size={12} color="#9ca3af" />
        <span>{data.field}</span>
      </div>

      {counter && (
        <div style={{ fontSize: 11, color: "#d1d5db", textAlign: "right", marginTop: 12 }}>
          {index + 1} / {total}
        </div>
      )}
    </>
  );
}

function EduCard({ data, index, total, isTop, onSwipedAway }) {
  const drag = useRef({ active: false, startX: 0, x: 0, lastX: 0, vel: 0, lastT: 0 });
  const [tx, setTx] = useState(0);
  const [rot, setRot] = useState(0);
  const [flying, setFlying] = useState(false);

  const THRESHOLD = 80;

  const onStart = (clientX) => {
    if (!isTop || flying) return;
    drag.current = { active: true, startX: clientX, x: 0, lastX: clientX, vel: 0, lastT: Date.now() };
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
    setTx(dx); setRot(dx * 0.055);
  };
  const onEnd = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const projected = drag.current.x + drag.current.vel * 8;
    if (Math.abs(projected) > THRESHOLD) {
      const dir = projected > 0 ? 1 : -1;
      setFlying(true); setTx(dir * 550); setRot(dir * 28);
      setTimeout(() => { onSwipedAway(); setTx(0); setRot(0); setFlying(false); }, 380);
    } else {
      setTx(0); setRot(0);
    }
  };

  const stackOffset = (total - 1 - index) * 10;
  const stackScale = 1 - (total - 1 - index) * 0.045;
  const stackOpacity = 1 - (total - 1 - index) * 0.18;
  const isDragging = drag.current.active;

  return (
    <div
      className="edu-card"
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
      }}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => { e.stopPropagation(); onMove(e.touches[0].clientX); }}
      onTouchEnd={onEnd}
    >
      <CardContent data={data} index={index} total={total} counter />
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
      <div style={{ padding: "24px 24px 80px" }}>

        <h2 className="text-[25px] pr-4 font-black text-gray-700 mb-3">
        EDUCATION
      </h2>

        <div className="edu-stack-section" style={{ fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, marginBottom: 28 }}>
          <ChevronRight size={12} />
          <span>Swipe to browse</span>
        </div>

        {/* Mobile: swipe stack */}
        <div className="edu-stack-section" style={{ position: "relative", height: 300 + (total - 1) * 12 }}>
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

        {/* Desktop: 3-column grid */}
        <div className="edu-grid-section">
          {EDU_DATA.map((card, i) => (
            <div key={card.id} className="edu-grid-card">
              <CardContent data={card} index={i} total={EDU_DATA.length} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}