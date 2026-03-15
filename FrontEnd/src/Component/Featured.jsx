import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredData = [
  { id: 1, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", title: "Tailor Management System" },
  { id: 2, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", title: "Todo React App" },
  { id: 3, image: "https://images.unsplash.com/photo-1521791136064-7986c2920216", title: "Portfolio Website" },
  { id: 4, image: "https://images.unsplash.com/photo-1506765515384-028b60a970df", title: "Ecommerce Website" },
   { id: 5, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", title: "Tailor Management System" },
  { id: 6, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", title: "Todo React App" },
  { id: 7, image: "https://images.unsplash.com/photo-1521791136064-7986c2920216", title: "Portfolio Website" },
  { id: 8, image: "https://images.unsplash.com/photo-1506765515384-028b60a970df", title: "Ecommerce Website" },
];

export default function FeaturedSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="bg-white pt-9 px-6 pb-10 relative w-full overflow-hidden">
      <h2 className="text-[25px] font-black text-gray-700 mb-6">Featured</h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-[50%] -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-[50%] -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
      >
        {featuredData.map((item) => (
          <div
            key={item.id}
            className="min-w-[280px] rounded-lg overflow-hidden border hover:shadow-md transition duration-300 bg-white flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-gray-700 text-center">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}