import React, { useState, useContext } from "react";
import { Heart, Flame, Star, Bookmark, MoreHorizontal } from "lucide-react";
import { ThemeContext } from "../context/themeContext";

function Card({ profilePic, name, role, description, image, liveLink }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isFire, setIsFire] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [stars, setStars] = useState(Math.floor(Math.random() * 50));
  const [fires, setFires] = useState(Math.floor(Math.random() * 30));

  const openLiveLink = (url) => {
    if (!url) return;
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div
      className={`rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-lg w-full border transform hover:-translate-y-1 ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-100"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-5 ${
          isDark ? "bg-gray-900" : "bg-gradient-to-r from-white to-gray-50"
        }`}
      >
        <div className="flex items-center">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full mr-3 border-2 border-purple-400 object-cover object-top ring-2 ring-purple-100"
              src={profilePic || "image.png"}
              alt={name}
              onError={(e) => {
                e.target.src =
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
              }}
            />
            <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div>
            <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
              {name || "Jawad Ali"}
            </h3>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {role || "CS Student 🎓 | Front-End Developer 💻"}
            </p>
          </div>
        </div>

        <button
          className={`p-2 rounded-full transition ${
            isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <div className="px-5 pb-3">
        <p className={`${isDark ? "text-gray-300" : "text-gray-800"} text-sm leading-relaxed`}>
          {description}
        </p>
      </div>

      {/* Image */}
      {image && (
        <div
          className="relative group h-64 w-full cursor-pointer"
          onClick={() => openLiveLink(liveLink)}
        >
          <img
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            src={image}
            alt="post"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400/e2e8f0/64748b?text=Image";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

          {liveLink && (
            <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 pointer-events-none">
              Live →
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center px-5 py-3">
        <div className="flex items-center space-x-2">

          {/* Like */}
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikes(isLiked ? likes - 1 : likes + 1);
            }}
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "fill-red-500 text-red-500" : isDark ? "text-gray-400" : "text-gray-700"
              }`}
            />
          </button>

          {/* Fire */}
          <button
            onClick={() => {
              setIsFire(!isFire);
              setFires(isFire ? fires - 1 : fires + 1);
            }}
          >
            <Flame
              className={`w-6 h-6 ${
                isFire ? "fill-orange-500 text-orange-500" : isDark ? "text-gray-400" : "text-gray-700"
              }`}
            />
          </button>

          {/* Star */}
          <button
            onClick={() => {
              setIsStarred(!isStarred);
              setStars(isStarred ? stars - 1 : stars + 1);
            }}
          >
            <Star
              className={`w-6 h-6 ${
                isStarred ? "fill-yellow-500 text-yellow-500" : isDark ? "text-gray-400" : "text-gray-700"
              }`}
            />
          </button>
        </div>

        {/* Save */}
        <button onClick={() => setIsSaved(!isSaved)}>
          <Bookmark
            className={`w-6 h-6 ${
              isSaved
                ? "fill-blue-500 text-blue-500"
                : isDark
                ? "text-gray-400"
                : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* Stats */}
      <div className={`px-5 pb-4 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        {likes} likes
        {isFire && <span className="ml-3 text-orange-500">🔥 {fires}</span>}
        {isStarred && <span className="ml-3 text-yellow-500">⭐ {stars}</span>}
      </div>
    </div>
  );
}

export default Card;