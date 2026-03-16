import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileHeader = () => {
  const [profile, setProfile] = useState({
    bannerUrl: "bannerr.webp",
    profilePicUrl: "profile.jpeg",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Correct GET route
       const API = "http://localhost:5000"; // ✅ sirf local backend
         const res = await axios.get(`${API}/api/profile`);
      console.log("Fetched About Data:", res.data);

        // Safe check
        const data = res.data || {};
        setProfile({
          bannerUrl: data.banner || "bannerr.webp",
          profilePicUrl: data.profilePic || "profile.jpeg",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile({
          bannerUrl: "bannerr.webp",
          profilePicUrl: "profile.jpeg",
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden">
        <img
          src={profile.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Profile Pic */}
      <div className="absolute left-4 sm:left-8 -bottom-16 sm:-bottom-24 lg:left-8 lg:-bottom-24">
        <div
          className="
            w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
            lg:w-62 lg:h-62
            rounded-full
            border-4 border-white
            overflow-hidden
            bg-white
          "
        >
          <img
            src={profile.profilePicUrl}
            alt="Profile"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;