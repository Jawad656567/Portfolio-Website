import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub
} from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiVercel, SiRender } from "react-icons/si";

// Categories
const categories = ["Frontend", "Backend", "Tools"];

// Icon mapping
const iconMap = {
  HTML5: <FaHtml5 />, JavaScript: <FaJs />, React: <FaReact />,
  Tailwind: <SiTailwindcss />, Bootstrap: <FaBootstrap />, CSS: <FaCss3Alt />,
  Node: <FaNodeJs />, Express: <SiExpress />, MongoDB: <SiMongodb />, MySQL: <SiMysql />,
  Git: <FaGitAlt />, GitHub: <FaGithub />, Vercel: <SiVercel />, Render: <SiRender />
};

// API
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// ✅ Default skills data (offline fallback)
const defaultSkills = {
  Frontend: [
    { name: "HTML5", learning: false },
    { name: "React", learning: false },
    { name: "CSS", learning: false },
    { name: "JavaScript", learning: false },
    { name: "Tailwind", learning: false },
    { name: "Bootstrap", learning: false }
  ],
  Backend: [
    { name: "Node", learning: false },
    { name: "Express", learning: false },
    { name: "MongoDB", learning: false },
    { name: "MySQL", learning: false }
  ],
  Tools: [
    { name: "Git", learning: false },
    { name: "GitHub", learning: false },
    { name: "Vercel", learning: false },
    { name: "Render", learning: false }
  ]
};

export default function Skills() {
  const [active, setActive] = useState("Frontend");
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/api/skills");
        if (res.data && res.data.length > 0) {
          // Transform MongoDB array to categories object
          const catSkills = { Frontend: [], Backend: [], Tools: [] };
          res.data.forEach(skill => {
            if (catSkills[skill.category]) {
              catSkills[skill.category].push({
                name: skill.name,
                learning: skill.learning
              });
            }
          });
          setSkills(catSkills);
          localStorage.setItem("skillsData", JSON.stringify(catSkills));
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        const saved = localStorage.getItem("skillsData");
        if (saved) setSkills(JSON.parse(saved));
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = skills[active] || [];

  return (
    <div className="w-full bg-white py-10 px-6">
      <h2 className="text-[25px] pl-4 font-black text-gray-700 mb-3">My Skills & Tools</h2>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActive(cat)}
            className={`px-5 py-1.5 text-sm rounded-full border transition-all duration-300
              ${active === cat ? "bg-black text-white border-black" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
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
        className="grid grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ scale: 1.08, y: -6 }}
            className="relative border px-4 py-5 text-center rounded-xl hover:bg-black hover:text-white shadow-sm hover:shadow-xl"
          >
            <div className="text-2xl mb-2 flex justify-center">
              {iconMap[skill.name] || "⚡"}
            </div>
            <span className="text-xs font-semibold">{skill.name}</span>
            {skill.learning && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-black text-white text-[9px] px-2 py-0.5 rounded-full"
              >
                Learning
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}