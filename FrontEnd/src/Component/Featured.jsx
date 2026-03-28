import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

// ✅ Dynamic API (local + live)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function FeaturedSection() {
  const scrollRef = useRef(null);

  // ✅ Default images (fallback)
  const defaultData = [
    { _id: 1, title: "Default 1", image_url: "https://picsum.photos/300/200?random=1" },
    { _id: 2, title: "Default 2", image_url: "https://picsum.photos/300/200?random=2" },
    { _id: 3, title: "Default 3", image_url: "https://picsum.photos/300/200?random=3" },
    { _id: 4, title: "Default 4", image_url: "https://picsum.photos/300/200?random=4" },
    { _id: 5, title: "Default 5", image_url: "https://picsum.photos/300/200?random=5" },
    { _id: 6, title: "Default 6", image_url: "https://picsum.photos/300/200?random=6" },
    { _id: 7, title: "Default 7", image_url: "https://picsum.photos/300/200?random=7" },
    { _id: 8, title: "Default 8", image_url: "https://picsum.photos/300/200?random=8" }
  ];

  // ✅ Default state
  const [featuredData, setFeaturedData] = useState(defaultData);

  // ✅ Fetch API
  useEffect(() => {
    API.get("/api/featured")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setFeaturedData(res.data);
        }
      })
      .catch(err => {
        console.error("API Error:", err);
      });
  }, []);

  // ✅ Safe scroll
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-white pt-8 px-6 pb-10 relative w-full overflow-hidden">
      
      <h2 className="text-[25px] font-black text-gray-700 mb-6">
        Featured
      </h2>

      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-[50%] -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-[50%] -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
      >
        {featuredData.map((item) => (
          <div
            key={item._id || item.title}
            className="min-w-[280px] rounded-lg overflow-hidden border hover:shadow-md transition duration-300 bg-white flex-shrink-0"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-gray-700 text-center">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}