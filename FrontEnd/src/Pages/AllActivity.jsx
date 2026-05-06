import React, { useEffect, useState, useContext } from "react";
import Card from "../Component/Card";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔹 Skeleton Card Component (Dark Mode Ready)
function SkeletonCard({ isDark }) {
  return (
    <div
      className={`rounded-2xl animate-pulse w-80 h-[350px] shadow-md overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center p-4">
        <div
          className={`w-10 h-10 rounded-full mr-3 ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>

        <div className="flex flex-col flex-1 gap-2">
          <div
            className={`w-24 h-4 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-32 h-3 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div
          className={`w-full h-4 rounded mb-2 ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`w-5/6 h-4 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>

      <div
        className={`h-52 w-full mt-2 ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        }`}
      ></div>

      <div className="flex justify-between items-center px-4 py-2 mt-2">
        <div className="flex gap-2">
          <div
            className={`w-5 h-5 rounded-full ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-5 h-5 rounded-full ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-5 h-5 rounded-full ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>

        <div
          className={`w-5 h-5 rounded-full ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>

      <div className="px-4 py-2 flex gap-4">
        <div
          className={`w-10 h-3 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`w-6 h-3 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default function AllActivities() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await API.get("/api/project");
        setActivities(res.data.reverse());
      } 
      finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div
      className={`relative min-h-screen pt-9 pl-6 pr-6 flex flex-col transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* 🔥 DOT BACKGROUND (same as About/Activities) */}
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

      <h2 className="text-[25px] font-black mb-3 relative z-10">
        All Activities
      </h2>

      {error && (
        <p className="text-center mt-4 text-red-500 relative z-10">
          {error}
        </p>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full relative z-10">
        {loading
  ? Array.from({ length: 6 }).map((_, idx) => (
      <SkeletonCard key={idx} isDark={isDark} />
    ))
  : (activities.length > 0 ? activities : [
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
    ]).map((activity, index) => {
      const {
        profilePic,
        name,
        role,
        description,
        image,
        liveLink,
      } = activity;

      return (
        <Card
          key={index}
          profilePic={profilePic}
          name={name}
          role={role}
          description={description}
          image={image}
          liveLink={liveLink}
        />
      );
    })}
      </div>
    </div>
  );
}