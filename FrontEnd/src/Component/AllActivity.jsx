import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // localhost or live backend
});

// 🔹 Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="bg-gray-100 rounded-2xl animate-pulse w-80 h-[350px] shadow-md overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-32 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-52 bg-gray-300 w-full mt-2"></div>
      <div className="flex justify-between items-center px-4 py-2 mt-2">
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
      </div>
      <div className="px-4 py-2 flex gap-4">
        <div className="w-10 h-3 bg-gray-300 rounded"></div>
        <div className="w-6 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function AllActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await API.get("/api/project"); // backend route
        setActivities(res.data.reverse());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-9 pl-6 pr-6 flex flex-col">
      <h2 className="text-[25px] font-black text-gray-700 mb-3">
        All Activities
      </h2>

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : activities.map((activity, index) => (
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
    </div>
  );
}