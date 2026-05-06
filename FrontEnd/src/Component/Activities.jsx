import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 DEFAULT CARDS
const DEFAULT_ACTIVITIES = [
  {
   
    description: "A web app that displays information about countries around the world.",
    image: "/countries.png",
    liveLink: "#",
  },
   {
   
    description: "An invoice generator for creating and downloading professional bills.",
    image: "portfolio.png",
    liveLink: "#",
  },
   {
   
    description: "A simple and dedicated developer who creates clean, responsive, and user-friendly websites.",
    image: "calculator.png",
    liveLink: "#",
  },
 
];

export default function Activities() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await API.get("/api/project");

        if (res.data && res.data.length > 0) {
          setActivities(res.data);
        } else {
          setActivities(DEFAULT_ACTIVITIES);
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
        setActivities(DEFAULT_ACTIVITIES); // 🔥 fallback
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const visibleCount = window.innerWidth < 640 ? 1 : 3;
  const latestPosts = activities.slice(-visibleCount).reverse();

  if (loading)
    return (
      <p className={`text-center mt-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Loading activities...
      </p>
    );

  return (
    <div
      className={`relative transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-gray-800"
      }`}
    >
      {/* dot background */}
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

      <div className="relative md:ml-5 ml-0 pl-7 pr-6 flex flex-col">
        <h2 className="md:text-4xl text-2xl pr-4 font-black mb-3">
          Activities (Projects)
        </h2>

        <div className="grid gap-6 mt-9 grid-cols-1 md:grid-cols-3 w-full">
          {latestPosts.map((activity, index) => (
            <Card
              key={index}
              profilePic={activity.profilePic}
              name={activity.name}
              role={activity.role}
              description={activity.description}
              image={activity.image}
              liveLink={activity.liveLink}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/activity"
            className={`font-medium text-lg transition ${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Show all posts →
          </Link>
        </div>
      </div>
    </div>
  );
}