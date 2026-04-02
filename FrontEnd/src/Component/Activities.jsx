import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // localhost or live backend
});

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  // 🔥 Fetch data from backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await API.get("/api/project"); // backend route
        setActivities(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Responsive: mobile 1, desktop 3
  const visibleCount = window.innerWidth < 640 ? 1 : 3;
  const latestPosts = activities.slice(-visibleCount).reverse();

  if (loading) return <p className="text-center mt-4">Loading activities...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
      <div className="w-full border-t border-gray-300"></div>
      <div className="bg-white pt-9 pl-7 pr-6 flex flex-col">
        <h2 className="text-[25px] pr-4 font-black text-gray-700 mb-3">
          Activities (Projects)
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
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

        {/* Show All Posts */}
        <div className="mt-8 text-center">
          <Link
            to="/activity"
            className="text-gray-600 font-medium text-lg hover:text-black transition"
          >
            Show all posts →
          </Link>
        </div>

        {/* Bottom Border */}
        <div className="mt-4 border-t border-gray-300 -mx-6"></div>
      </div>
    </>
  );
}