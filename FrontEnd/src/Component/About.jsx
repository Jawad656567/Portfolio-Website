import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const DEFAULT_BIO_1 =
  "Computer Science student in my 6th semester, focused on Front-End Development. I build responsive and modern web applications using React and Tailwind CSS with a strong focus on clean UI and maintainable code.";

const DEFAULT_BIO_2 =
  "Passionate about turning ideas into smooth user experiences. My goal is to grow as a developer who bridges design and engineering while continuously learning new technologies.";

export default function LinkedInAbout() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/about`);
        if (res.data?.bio) setBio(res.data.bio);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section
      className={`relative overflow-hidden  px-5 transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900"
      }`}
    >
      {/* Subtle dotted background (from FeaturedSection style) */}
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

      <div className="max-w-6xl mr-auto ml-0 md:ml-5 flex flex-col md:flex-row items-center gap-14 relative">

        {/* LEFT SIDE */}
        <div className="flex-1">

          <h2 className="text-2xl md:text-4xl ml-1 font-extrabold leading-tight mt-3">
            About Me <br /> Web experiences.
          </h2>

          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 my-5" />

          {loading ? (
            <p className="text-slate-600">Loading...</p>
          ) : (
            <>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {bio?.para1 || DEFAULT_BIO_1}
              </p>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base mt-4">
                {bio?.para2 || DEFAULT_BIO_2}
              </p>
            </>
          )}

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["React", "Tailwind", "JavaScript", "Frontend"].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-500"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        {isDesktop && (
          <div className="hidden lg:flex flex-shrink-0 ml-10 mt-5 items-center justify-center">
            <img
              src="about.png"
              alt="Professional"
              className="w-80 h-80 object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
      </div>
    </section>
  );
}