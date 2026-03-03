import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiRender,
} from "react-icons/si";

const categories = ["Frontend", "Backend", "Tools"];

const skillsData = {
  Frontend: [
    { name: "HTML5", icon: <FaHtml5 />, learning: false },
    { name: "JavaScript", icon: <FaJs />, learning: false },
    { name: "React", icon: <FaReact />, learning: false },
    { name: "Tailwind", icon: <SiTailwindcss />, learning: false },
    { name: "Bootstrap", icon: <FaBootstrap />, learning: false },
    { name: "Responsive", icon: <FaCss3Alt />, learning: false },
  ],
  Backend: [
    { name: "Node", icon: <FaNodeJs />, learning: true },
    { name: "Express", icon: <SiExpress />, learning: true },
    { name: "MongoDB", icon: <SiMongodb />, learning: false },
    { name: "MySQL", icon: <SiMysql />, learning: false },
  ],
  Tools: [
    { name: "Git", icon: <FaGitAlt />, learning: false },
    { name: "GitHub", icon: <FaGithub />, learning: false },
    { name: "Vercel", icon: <SiVercel />, learning: false },
    { name: "Render", icon: <SiRender />, learning: false },
  ],
};

export default function Skills() {
  const [active, setActive] = useState("Frontend");

  return (
    <div className="w-full bg-white py-10 px-6">
      {/* Heading */}
       <h2 className="text-[25px] pl-4 font-black text-gray-700 mb-3">My Skill & Tools</h2>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActive(cat)}
            className={`px-5 py-1.5 text-sm rounded-full border transition-all duration-300
              ${
                active === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* GRID SECTION */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid 
                   grid-cols-3 
                   lg:grid-cols-6 
                   gap-6 
                   justify-center 
                   max-w-6xl 
                   mx-auto"
      >
        {skillsData[active].map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{
              scale: 1.08,
              y: -6,
            }}
            className="relative border border-black px-4 py-5 
                       text-center rounded-xl
                       transition-all duration-300 
                       hover:bg-black hover:text-white
                       shadow-sm hover:shadow-xl"
          >
            <div className="text-2xl mb-2 flex justify-center">
              {skill.icon}
            </div>

            <span className="text-xs font-semibold">
              {skill.name}
            </span>

            {skill.learning && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2 
                           bg-black text-white
                           text-[9px] font-bold px-2 py-0.5 
                           rounded-full border border-black"
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