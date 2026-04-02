import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // localhost or live backend
});

export default function AllActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Fetch all activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await API.get("/api/project"); // backend route
        setActivities(res.data.reverse()); // latest first
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading activities...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white pt-9 pl-6 pr-6 flex flex-col">
      <h2 className="text-[25px] font-black text-gray-700 mb-3">
        All Activities
      </h2>
     
      

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
        {activities.map((activity, index) => (
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