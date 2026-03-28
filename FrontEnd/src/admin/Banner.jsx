import React, { useState, useEffect } from "react";
import axios from "axios";

/* ── Success Popup ── */
const SuccessPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    <div
      className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{
        animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: "none",
      }}
    >
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Profile Updated!</h3>
        <p className="text-white/50 text-sm mt-1 font-light">
          Your changes have been saved successfully.
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-gray-600 font-light">
            Your public profile is now live with the latest info.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition"
        >
          Got it ✓
        </button>
      </div>
    </div>
  </div>
);

/* ── Error Popup ── */
const ErrorPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    <div
      className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{
        animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: "none",
      }}
    >
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-white">Update Failed</h3>
        <p className="text-white/50 text-sm mt-1 font-light">
          Something went wrong. Please try again.
        </p>
      </div>

      <div className="px-6 py-5">
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const AdminProfile = () => {
  const [banner, setBanner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile`);
        const data = res.data || {};
        setPreviewBanner(data.banner || "bannerr.webp");
        setPreviewProfile(data.profilePic || "profile.jpeg");
      } catch (err) {
        console.error(err);
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
    setUpdating(true);

    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await axios.post(
        `${API_URL}/api/profile/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.banner) setPreviewBanner(res.data.banner);
      if (res.data.profilePic) setPreviewProfile(res.data.profilePic);

      setBanner(null);
      setProfilePic(null);

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {/* Popups */}
      {status === "success" && (
        <SuccessPopup onClose={() => setStatus(null)} />
      )}
      {status === "error" && (
        <ErrorPopup onClose={() => setStatus(null)} />
      )}

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Update Profile
        </h2>

        <div className="relative w-full mb-20 sm:mb-28">
          <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden rounded-xl border shadow-sm">
            {loading || updating ? (
              <div className="w-full h-full shimmer"></div>
            ) : (
              <img
                src={previewBanner}
                alt="Banner"
                className="w-full h-full object-cover"
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
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-xl shadow-md border"
        >
          <div>
            <label className="font-semibold">Banner</label>
            <input
              type="file"
              onChange={(e) => setBanner(e.target.files[0])}
              disabled={updating}
            />
          </div>

          <div>
            <label className="font-semibold">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              disabled={updating}
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`py-3 text-white rounded-xl ${
              updating
                ? "bg-gray-600"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Animation */}
      <style>
        {`
        @keyframes popIn {
          from { opacity:0; transform:scale(0.9); }
          to { opacity:1; transform:scale(1); }
        }
      `}
      </style>
    </>
  );
};

export default AdminProfile;