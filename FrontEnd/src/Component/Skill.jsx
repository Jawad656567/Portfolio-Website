import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub
} from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiVercel, SiRender } from "react-icons/si";

const categories = ["Frontend", "Backend", "Tools"];

const iconMap = {
  HTML5: <FaHtml5 />, JavaScript: <FaJs />, React: <FaReact />,
  Tailwind: <SiTailwindcss />, Bootstrap: <FaBootstrap />, CSS: <FaCss3Alt />,
  Node: <FaNodeJs />, Express: <SiExpress />, MongoDB: <SiMongodb />, MySQL: <SiMysql />,
  Git: <FaGitAlt />, GitHub: <FaGithub />, Vercel: <SiVercel />, Render: <SiRender />
};

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const defaultSkills = {
  Frontend: [
    { name: "HTML5", learning: false }, { name: "React", learning: false },
    { name: "CSS", learning: false }, { name: "JavaScript", learning: false },
    { name: "Tailwind", learning: false }, { name: "Bootstrap", learning: false }
  ],
  Backend: [
    { name: "Node", learning: false }, { name: "Express", learning: false },
    { name: "MongoDB", learning: false }, { name: "MySQL", learning: false }
  ],
  Tools: [
    { name: "Git", learning: false }, { name: "GitHub", learning: false },
    { name: "Vercel", learning: false }, { name: "Render", learning: false }
  ]
};

export default function Skills() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [active, setActive] = useState("Frontend");
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/api/skills");
        if (res.data && res.data.length > 0) {
          const catSkills = { Frontend: [], Backend: [], Tools: [] };
          res.data.forEach(skill => {
            if (catSkills[skill.category]) {
              catSkills[skill.category].push({ name: skill.name, learning: skill.learning });
            }
          });
          setSkills(catSkills);
          localStorage.setItem("skillsData", JSON.stringify(catSkills));
        }
      } catch (err) {
        const saved = localStorage.getItem("skillsData");
        if (saved) setSkills(JSON.parse(saved));
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = skills[active] || [];

  return (
    <section
      className={`relative overflow-hidden px-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Dotted background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative px-1 pt-6 pb-6">

        {/* Heading */}
        <h2 className={`text-[25px] font-black mb-3 ${isDark ? "text-white" : "text-gray-700"}`}>
          My Skills & Tools
        </h2>

        {/* Blue divider */}
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mb-6" />

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActive(cat)}
              className={`px-5 py-1.5 text-sm rounded-full border transition-all duration-300 ${
                isDark
                  ? active === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                  : active === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.08, y: -6 }}
              className={`relative border px-4 py-5 text-center rounded-xl transition-all duration-300 cursor-pointer
                group shadow-sm hover:shadow-xl
                ${isDark
                  ? "bg-gray-900 border-gray-800 text-white hover:bg-white hover:text-black hover:border-white"
                  : "bg-white border-gray-200 text-gray-900 hover:bg-black hover:text-white hover:border-black"
                }`}
            >
              <div className="text-2xl mb-2 flex justify-center">
                {iconMap[skill.name] || "⚡"}
              </div>
              <span className="text-xs font-semibold">{skill.name}</span>

              {skill.learning && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`absolute -top-2 -right-2 text-[9px] px-2 py-0.5 rounded-full ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  Learning
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}