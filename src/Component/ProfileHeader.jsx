import React, { useState, useEffect } from "react";

const ProfileHeader = () => {
  const [banner, setBanner] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Load saved images on mount
  useEffect(() => {
    const savedBanner = localStorage.getItem("banner");
    const savedProfile = localStorage.getItem("profilePic");
    if (savedBanner) setBanner(savedBanner);
    if (savedProfile) setProfilePic(savedProfile);
  }, []);

  // Function to update images programmatically
  const updateBanner = (base64) => {
    setBanner(base64);
    localStorage.setItem("banner", base64);
  };

  const updateProfile = (base64) => {
    setProfilePic(base64);
    localStorage.setItem("profilePic", base64);
  };

  return (
    <div className="relative w-full">

      {/* Banner */}
      <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden">
        <img
          src={banner || "bannerr.webp"}
          alt="Banner"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Profile Pic */}
      <div className="absolute left-4 sm:left-8 -bottom-16 sm:-bottom-24
                      lg:left-8 lg:-bottom-24">
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
            src={profilePic || "image.png"}
            alt="Profile"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

    </div>
  );
};

export default ProfileHeader;
