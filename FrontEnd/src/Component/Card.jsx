import React, { useState } from "react";
import { Heart, Flame, Star, Bookmark, MoreHorizontal } from "lucide-react";

function Card({ profilePic, name, role, description, image }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isFire, setIsFire] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [stars, setStars] = useState(Math.floor(Math.random() * 50));
  const [fires, setFires] = useState(Math.floor(Math.random() * 30));
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStars(isStarred ? stars - 1 : stars + 1);
  };

  const handleFire = () => {
    setIsFire(!isFire);
    setFires(isFire ? fires - 1 : fires + 1);
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, time: "Just now" }]);
      setCommentInput("");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-lg w-full border border-gray-100 transform hover:-translate-y-1">
      
      {/* Header: Profile pic + Name + Role + Menu */}
      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-center">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full mr-3 border-2 border-purple-400 object-cover object-top ring-2 ring-purple-100"
              src="image.png"
              alt={name}
              onError={(e) => {
                e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
              }}
            />
            <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{name}</h3>
            <p className="text-gray-500 text-xs">{role}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <div className="px-5 pb-3">
        <p className="text-gray-800 leading-relaxed text-sm">{description}</p>
      </div>

      {/* Post Image - ab bottom se crop hogi, top dikhega */}
      {image && (
        <div className="relative overflow-hidden group h-64">
          <img
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            src={image}
            alt="post image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400/e2e8f0/64748b?text=Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex justify-between items-center px-5 py-3">
        <div className="flex items-center space-x-1">
          {/* Heart - Like */}
          <button
            className={`p-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? "text-red-500 scale-110" 
                : "text-gray-700 hover:bg-red-50 hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 ${isLiked ? "fill-red-500 animate-pulse" : ""}`}
            />
          </button>

          {/* Fire - This is Fire/Lit */}
          <button
            className={`p-2 rounded-full transition-all duration-300 ${
              isFire 
                ? "text-orange-500 scale-110" 
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            }`}
            onClick={handleFire}
          >
            <Flame 
              className={`w-6 h-6 transition-all duration-300 ${isFire ? "fill-orange-500 animate-pulse" : ""}`}
            />
          </button>

          {/* Star - Favorite */}
          <button
            className={`p-2 rounded-full transition-all duration-300 ${
              isStarred 
                ? "text-yellow-500 scale-110" 
                : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-500"
            }`}
            onClick={handleStar}
          >
            <Star 
              className={`w-6 h-6 transition-all duration-300 ${isStarred ? "fill-yellow-500" : ""}`}
            />
          </button>
        </div>

        {/* Bookmark - Save */}
        <button
          className={`p-2 rounded-full transition-all duration-300 ${
            isSaved 
              ? "text-blue-500" 
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-500"
          }`}
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark className={`w-6 h-6 ${isSaved ? "fill-blue-500" : ""}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="px-5 pb-3 flex items-center gap-4">
        <p className="text-sm font-semibold text-gray-900">
          {likes.toLocaleString()} {likes === 1 ? 'like' : 'likes'}
        </p>
        {isFire && (
          <p className="text-sm font-semibold text-orange-500">
            🔥 {fires}
          </p>
        )}
        {isStarred && (
          <p className="text-sm font-semibold text-yellow-500">
            ⭐ {stars}
          </p>
        )}
      </div>

      {/* Comments Section - Optional */}
      {showComments && (
        <div className="px-5 pb-5 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
          {/* Comments List */}
          <div className="space-y-3 mt-4 max-h-60 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3 animate-fadeIn">
                <img
                  className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
                  src={profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name}
                  alt="commenter"
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
                  }}
                />
                <div className="flex-1 bg-white px-3 py-2 rounded-2xl border border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">{name}</p>
                  <p className="text-gray-700 text-sm mt-0.5">{comment.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{comment.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Input */}
          <div className="flex items-center space-x-2 mt-4">
            <img
              className="w-8 h-8 rounded-full border border-gray-200"
              src={profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name}
              alt="your profile"
              onError={(e) => {
                e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
              }}
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-sm"
            />
            {commentInput.trim() && (
              <button
                onClick={handleAddComment}
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Post
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;