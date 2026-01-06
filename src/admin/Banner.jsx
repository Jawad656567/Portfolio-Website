import React, { useState, useEffect } from "react";

const Banner = () => {
  const [banner, setBanner] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Load previous saved images
  useEffect(() => {
    const savedBanner = localStorage.getItem("banner");
    const savedProfile = localStorage.getItem("profilePic");
    if (savedBanner) setBanner(savedBanner);
    if (savedProfile) setProfilePic(savedProfile);
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "banner") setBanner(reader.result);
      if (type === "profile") setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!banner || !profilePic) {
      alert("Please upload both Banner and Profile Pic!");
      return;
    }
    localStorage.setItem("banner", banner);
    localStorage.setItem("profilePic", profilePic);
    alert("Saved successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Update Banner & Profile Pic</h1>

      {/* Preview */}
      <div className="relative w-full max-w-4xl h-64 mb-6">
        {banner ? (
          <img
            src={banner}
            alt="Banner Preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            Banner Preview
          </div>
        )}

        {/* Profile pic inside banner */}
        <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
              Profile
            </div>
          )}
        </div>
      </div>

      {/* Upload Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "banner")}
          className="border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "profile")}
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Images
      </button>
    </div>
  );
};

export default Banner;
