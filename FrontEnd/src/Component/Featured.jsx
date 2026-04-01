import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

// ✅ Dynamic API (local + live)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function FeaturedSection() {
  const scrollRef = useRef(null);

  // ✅ Default images (fallback)
  const defaultData = [
    { _id: 1, title: "Web Development Masterclass", image_url: "https://picsum.photos/300/200?random=1" },
    { _id: 2, title: "Digital Marketing Strategy", image_url: "https://picsum.photos/300/200?random=2" },
    { _id: 3, title: "UI/UX Design Principles", image_url: "https://picsum.photos/300/200?random=3" },
    { _id: 4, title: "Data Science Fundamentals", image_url: "https://picsum.photos/300/200?random=4" },
    { _id: 5, title: "Business Analytics", image_url: "https://picsum.photos/300/200?random=5" },
    { _id: 6, title: "Cloud Architecture", image_url: "https://picsum.photos/300/200?random=6" },
    { _id: 7, title: "Mobile App Development", image_url: "https://picsum.photos/300/200?random=7" },
    { _id: 8, title: "Cybersecurity Essentials", image_url: "https://picsum.photos/300/200?random=8" }
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
    <div className="bg-gradient-to-b from-gray-50 to-white pt-12 px-6 pb-12 relative w-full overflow-hidden">
      
      {/* Header with subtle styling */}
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-gray-800 mb-2">
          Featured
        </h2>
        <p className="text-sm text-gray-500">
          Discover curated content and opportunities
        </p>
      </div>

      {/* Left Button - Enhanced */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-[55%] -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-blue-50 hover:shadow-xl transition-all duration-300 border border-gray-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={22} className="text-gray-700" />
      </button>

      {/* Right Button - Enhanced */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-[55%] -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-blue-50 hover:shadow-xl transition-all duration-300 border border-gray-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={22} className="text-gray-700" />
      </button>

      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
      >
        {featuredData.map((item) => (
          <Link
            key={item._id || item.title}
            to="/activity"
            className="group min-w-[300px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white flex-shrink-0 block transform hover:-translate-y-1"
          >
            {/* Image Container with Overlay */}
            <div className="relative w-full h-52 overflow-hidden bg-gray-200">
        <img
  src={item.image_url}
  alt={item.title}
  className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
/>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Link Badge - Top Right */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                <ExternalLink size={14} className="text-blue-600" />
                <span className="text-xs font-semibold text-gray-700">Link</span>
              </div>

              {/* Bottom Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-white text-lg leading-tight drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>

          </Link>
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