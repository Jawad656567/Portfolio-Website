import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function SectionWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden px-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* dotted background layer */}
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

      {/* content always above background */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}