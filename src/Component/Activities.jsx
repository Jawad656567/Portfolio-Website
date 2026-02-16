import React from "react";
import Card from "./Card";
import { activitiesData } from "./activitiesData";
import { Link } from "react-router-dom";

export default function Activities() {
  // Responsive: mobile 1, desktop 3
  const visibleCount = window.innerWidth < 640 ? 1 : 3;
  const latestPosts = activitiesData.slice(-visibleCount).reverse(); // latest posts last me hote hai

  return (
    <>
    <div className="w-full border-t border-gray-300"></div>
    <div className="min-h-screen bg-white pt-9 pl-7 pr-6 flex flex-col">
      <h2 className="text-[25px] pr-4 font-black text-gray-700 mb-3">
        Activities
      </h2>

      <div className="grid  gap-6 grid-cols-1 md:grid-cols-3 w-full">
        {latestPosts.map((activity, index) => (
          <Card
            key={index}
            profilePic={activity.profilePic}
            name={activity.name}
            role={activity.role}
            description={activity.description}
            image={activity.image}
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
      <div className="mt-6 border-t border-gray-300 "></div>
    </div>
    </>
  );
}
