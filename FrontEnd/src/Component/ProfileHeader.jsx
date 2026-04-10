import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const ProfileHeader = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  const wrapperBg = theme === "light" ? "bg-white" : "bg-[#0a0a0a]";

  // Better shimmer styles
  const shimmerClass =
    theme === "light"
      ? "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"
      : "animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/profile`);
        const data = res.data || {};

        setProfile({
          bannerUrl: data.banner || "bannerr.webp",
          profilePicUrl: data.profilePic || "profile.jpeg",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className={`relative w-full z-20 ${wrapperBg} transition-colors duration-300`}
    >
      {/* Banner */}
      <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden relative">
        {loading ? (
          <div className={`w-full h-full ${shimmerClass}`} />
        ) : (
          <img
            src={profile.bannerUrl || "bannerr.webp"}
            alt="Banner"
            className="w-full h-full object-cover object-top"
          />
        )}

        {/* Bottom white line under profile pic with stronger shadow */}
        {!loading && (
          <div className="absolute left-0 bottom-0 w-full h-[1px] bg-white/60 shadow-[0_4px_20px_rgba(255,255,255,0.8)] z-0"></div>
        )}

      </div>

      {/* Profile Pic */}
      <div className="absolute left-4 sm:left-8 -bottom-16 sm:-bottom-20 lg:left-8 lg:-bottom-24">
        {loading ? (
          <div
            className={`
              w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56
              rounded-full
              border-4 border-white/40
              ${shimmerClass}
            `}
          />
        ) : (
          <div
            className={`
              w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56
              rounded-full overflow-hidden
              border-2 border-white/70
              ${theme === "light"
                ? "shadow-[0_0_30px_8px_rgba(168,85,247,0.25)]"
                : "shadow-[0_0_35px_10px_rgba(168,85,247,0.35)]"
              }
              transition-all duration-300
            `}
          >
            <img
              src={profile.profilePicUrl || "image.png"}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;