import React, { useRef, useEffect, useState, useCallback } from "react";
import { Code2, Zap, Palette, Database, Cloud, Server } from "lucide-react";

const style = `
  @keyframes headingReveal {
    0%   { opacity: 0; transform: translateY(-14px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .spin-hint { animation: headingReveal 0.5s ease 200ms both; }
  .fan-wrapper { animation: fadeIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }
  .skill-card {
    pointer-events: none;
    user-select: none;
  }
`;

const CARD_ANGLES = [0, 90, 180, 270];

function SkillCard({ icon: Icon, name, scale = 1 }) {
  return (
    <div
      className="skill-card bg-white shadow-md rounded-xl flex items-center gap-2 border border-gray-100 whitespace-nowrap"
      style={{ padding: `${6 * scale}px ${12 * scale}px`, fontSize: `${13 * scale}px` }}
    >
      <Icon style={{ width: 16 * scale, height: 16 * scale }} className="text-black shrink-0" />
      <span className="font-semibold text-gray-800">{name}</span>
    </div>
  );
}

function FanDiagram({ label, cards, delay = 0 }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ active: false, lastAngle: 0, velocity: 0, lastTime: 0 });
  const rotRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / 380));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getAngleFromCenter = useCallback((clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }, []);

  const startMomentum = useCallback(() => {
    let vel = dragState.current.velocity;
    const tick = () => {
      vel *= 0.95;
      if (Math.abs(vel) < 0.05) return;
      rotRef.current += vel;
      setRotation(rotRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      cancelAnimationFrame(rafRef.current);
      const angle = getAngleFromCenter(e.clientX, e.clientY);
      dragState.current = { active: true, lastAngle: angle, velocity: 0, lastTime: Date.now() };
      setIsDragging(true);
    };
    const onMouseMove = (e) => {
      if (!dragState.current.active) return;
      const angle = getAngleFromCenter(e.clientX, e.clientY);
      let diff = angle - dragState.current.lastAngle;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const now = Date.now();
      const dt = Math.max(now - dragState.current.lastTime, 1);
      dragState.current.velocity = (diff / dt) * 16;
      dragState.current.lastAngle = angle;
      dragState.current.lastTime = now;
      rotRef.current += diff;
      setRotation(rotRef.current);
    };
    const onMouseUp = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      setIsDragging(false);
      startMomentum();
    };

    const onTouchStart = (e) => {
      cancelAnimationFrame(rafRef.current);
      const t = e.touches[0];
      const angle = getAngleFromCenter(t.clientX, t.clientY);
      dragState.current = { active: true, lastAngle: angle, velocity: 0, lastTime: Date.now() };
      setIsDragging(true);
    };
    const onTouchMove = (e) => {
      if (!dragState.current.active) return;
      const t = e.touches[0];
      const angle = getAngleFromCenter(t.clientX, t.clientY);
      let diff = angle - dragState.current.lastAngle;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const now = Date.now();
      const dt = Math.max(now - dragState.current.lastTime, 1);
      dragState.current.velocity = (diff / dt) * 16;
      dragState.current.lastAngle = angle;
      dragState.current.lastTime = now;
      rotRef.current += diff;
      setRotation(rotRef.current);
    };
    const onTouchEnd = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      setIsDragging(false);
      startMomentum();
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [getAngleFromCenter, startMomentum]);

  const BASE = 380;
  const circleR = 48 * scale;
  const armLen = 130 * scale;
  const totalSize = BASE * scale;
  const lineStart = circleR + 2;
  const lineEnd = armLen - 36 * scale;

  return (
    // ✅ overflow-hidden lagaya — rotating cards page width affect na karein
    <div
      ref={containerRef}
      className="fan-wrapper w-full flex justify-center select-none overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
    >
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: totalSize, height: totalSize }}
      >
        <svg
          className="absolute inset-0"
          width={totalSize}
          height={totalSize}
          style={{ transform: `rotate(${rotation}deg)`, willChange: "transform", overflow: "visible" }}
        >
          {CARD_ANGLES.map((baseAngle, i) => {
            const rad = (baseAngle * Math.PI) / 180;
            const x1 = totalSize / 2 + Math.sin(rad) * lineStart;
            const y1 = totalSize / 2 - Math.cos(rad) * lineStart;
            const x2 = totalSize / 2 + Math.sin(rad) * lineEnd;
            const y2 = totalSize / 2 - Math.cos(rad) * lineEnd;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
            );
          })}
        </svg>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)`, willChange: "transform" }}
        >
          {cards.map((card, i) => {
            const rad = (CARD_ANGLES[i] * Math.PI) / 180;
            const cardX = Math.sin(rad) * armLen;
            const cardY = -Math.cos(rad) * armLen;
            return (
              <div key={i} className="absolute" style={{
                left: "50%", top: "50%",
                transform: `translate(-50%, -50%) translate(${cardX}px, ${cardY}px) rotate(${-rotation}deg)`,
              }}>
                <SkillCard icon={card.icon} name={card.name} scale={scale} />
              </div>
            );
          })}
        </div>

        <div
          className="bg-black text-white flex items-center justify-center rounded-full font-bold z-20 shrink-0"
          style={{ width: circleR * 2, height: circleR * 2, fontSize: 15 * scale, pointerEvents: "none" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    // ✅ sabse bahari div mein overflow-x-hidden — poora section safe
    <div className="overflow-x-hidden">
      <style>{style}</style>
      <div className="flex flex-col items-start bg-white px-6 mt-6 pb-10
                      sm:px-8 sm:mt-0 sm:pt-4 sm:pb-14
                      lg:pt-6 lg:pb-20">

        <h2 className="text-[25px] font-black text-gray-700 spin-hint">
          My Skills & Tools
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
          <div className="w-full lg:w-1/2">
            <FanDiagram
              label="Skills"
              cards={[
                { name: "CSS3",       icon: Palette  },
                { name: "React",      icon: Zap      },
                { name: "MongoDB",    icon: Database },
                { name: "JavaScript", icon: Code2    },
              ]}
              delay={100}
            />
          </div>

          <div className="hidden lg:block w-px bg-gray-200 self-stretch mx-2" />
          <div className="lg:hidden w-full h-px bg-gray-200 my-2" />

          <div className="w-full lg:w-1/2">
            <FanDiagram
              label="Tools"
              cards={[
                { name: "Vercel",  icon: Cloud  },
                { name: "GitHub",  icon: Code2  },
                { name: "Render",  icon: Server },
                { name: "Docker",  icon: Server },
              ]}
              delay={300}
            />
          </div>
        </div>

      </div>

      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
}

