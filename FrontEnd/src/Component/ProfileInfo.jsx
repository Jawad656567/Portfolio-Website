import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ProfileInfo`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Skeleton Loading UI
// ✅ Skeleton Loading UI
if (loading) {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden animate-pulse">

      {/* Content Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center px-6 pb-6 pt-4 space-y-4 md:space-y-0 md:space-x-6 mt-16 md:mt-24">

        {/* Left Side Skeleton */}
        <div className="flex-1 space-y-3 pt-2">
          {/* Name + semester */}
          <div className="flex items-center space-x-3">
            <div className="h-6 w-36 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            <div className="h-5 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Bio line 1 */}
          <div className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          {/* Bio line 2 */}
          <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />

          {/* Location */}
          <div className="h-3 w-1/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />

          {/* Education */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-1/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            <div className="h-3 w-1/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Contact info link */}
          <div className="h-3 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Right Side Skill Cards Skeleton — Desktop Only */}
        <div className="hidden md:flex flex-col space-y-4 pr-16 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              {/* Icon box */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
              {/* Label */}
              <div className="h-4 w-36 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

      <div className="flex flex-col md:flex-row items-start md:items-center px-6 pb-6 pt-4 space-y-4 md:space-y-0 md:space-x-6">

        <div className="lg:pt-24 pt-12 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.name} <span className="text-gray-500 text-lg">{profile.semester}</span>
          </h2>
          <p className="text-gray-700 mt-1">{profile.bio}</p>
          <p className="text-gray-700 mt-1">{profile.description}</p>

          <div className="flex items-center text-gray-600 text-sm mt-2 space-x-2">
            <span>📍 {profile.location}</span>
          </div>

          <div className="flex flex-col space-y-1 text-gray-700 text-sm mt-3">
            <span>{profile.education}</span>
            <span>{profile.university}</span>
          </div>

          <div className="mt-3">
            <Link
              to="/contact"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Contact info
            </Link>
          </div>
        </div>

        
         {/* Right Side – Skill Highlights (PC Only) */}
        <div className="hidden md:flex flex-col space-y-4 pt-18 pr-50">

          {/* Frontend Development */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
            </div>
            <span className="font-medium text-black text-sm">Front-End Development</span>
          </div>

          {/* React & Tailwind */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className="h-5 w-5 text-white">
                <circle cx="125" cy="125" r="20" fill="currentColor" />
                <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" />
                <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(60 125 125)" />
                <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(120 125 125)" />
              </svg>
            </div>
            <span className="font-medium text-black text-sm">React & Tailwind CSS</span>
          </div>

          {/* Continuous Learning */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <span className="font-medium text-black text-sm">Continuous Learning</span>
          </div>

        </div>
      </div>
     
    </div>
  );
};

export default UserProfileCard;