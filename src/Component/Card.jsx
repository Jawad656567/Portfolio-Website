import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

function Card({ profilePic, name, role, description, image }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-lg w-full border border-gray-100">
      
      {/* Header: Profile pic + Name + Role */}
      <div className="flex items-center p-5">
        <img
          className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200 object-cover object-top"
          src="image.png"
          alt={name}
        />
        <div>
          <h3 className="font-bold text-xl text-black">{name}</h3>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pb-4">
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

        {/* Post Image */}
        {image && (
          <img
            className="w-full h-64 object-cover rounded-xl"
            src={image}
            alt="post image"
          />
        )}
      </div>

      {/* Stats */}
      <div className="px-5 py-2 flex justify-between text-sm text-gray-600">
        <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
        <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around px-5 py-3 border-t border-b border-gray-200">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            isLiked 
              ? "text-red-500 font-semibold" 
              : "text-black hover:bg-gray-100"
          }`}
          onClick={handleLike}
          disabled={isLiked}
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`}
          />
          <span>Like</span>
        </button>

        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-gray-100 transition-all duration-200"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-gray-100 transition-all duration-200"
          onClick={() => setShares(shares + 1)}
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-5 py-4 bg-gray-50">
          {/* Add Comment Input */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors"
            />
            <button
              onClick={handleAddComment}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-semibold"
            >
              Post
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profilePic || "profile.jpeg"}
                    alt="commenter"
                  />
                  <div>
                    <p className="font-semibold text-sm text-black">{name}</p>
                    <p className="text-gray-700 text-sm mt-1">{comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
