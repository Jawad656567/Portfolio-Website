import React from "react";
import Card from "./Card";
import { activitiesData } from "./activitiesData";

export default function AllActivities() {
  // Sab posts, latest first
  const allPosts = [...activitiesData].reverse();

  return (
    <div className="min-h-screen bg-white pt-9 pl-6 pr-6 flex flex-col">
      <h2 className="text-[25px] font-black text-gray-700 mb-3">
        All Activities
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
        {allPosts.map((activity, index) => (
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
    </div>
  );
}
