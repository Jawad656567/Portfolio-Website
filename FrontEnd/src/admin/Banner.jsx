import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [banner, setBanner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // ✅ naya state
  const [showAlert, setShowAlert] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile`);
        const data = res.data || {};
        setPreviewBanner(data.banner || "bannerr.webp");
        setPreviewProfile(data.profilePic || "profile.jpeg");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setPreviewBanner("bannerr.webp");
        setPreviewProfile("profile.jpeg");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // ✅ start updating

    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await axios.post(`${API_URL}/api/profile/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.banner) setPreviewBanner(res.data.banner);
      if (res.data.profilePic) setPreviewProfile(res.data.profilePic);
      setBanner(null);
      setProfilePic(null);

      setMessage("Profile updated successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setUpdating(false); // ✅ end updating
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>

      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-all duration-300">
          {message}
        </div>
      )}

      <div className="relative w-full mb-20 sm:mb-28">
        <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          {loading || updating ? ( // ✅ shimmer jab loading ya updating
            <div className="w-full h-full shimmer"></div>
          ) : (
            <img
              src={previewBanner}
              alt="Banner Preview"
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>

        <div className="absolute left-4 sm:left-8 -bottom-16 sm:-bottom-24">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
            {loading || updating ? (
              <div className="w-full h-full shimmer rounded-full"></div>
            ) : (
              <img
                src={previewProfile}
                alt="Profile Preview"
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200"
      >
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Banner</label>
          <input
            type="file"
            name="banner"
            onChange={(e) => setBanner(e.target.files[0])}
            className="mb-3"
            disabled={updating} // ✅ disable input while updating
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="mb-3"
            disabled={updating} // ✅ disable input while updating
          />
        </div>

        <button
          type="submit"
          disabled={updating} // ✅ disable button while updating
          className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
            updating ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-900"
          }`}
        >
          {updating ? "Updating..." : "Update Profile"} {/* ✅ button text */}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;