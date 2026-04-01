import React, { useState, useEffect } from "react";
import axios from "axios";

/* ── Success Popup ── */
const SuccessPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Profile Updated!</h3>
        <p className="text-white/50 text-sm mt-1 font-light">Your changes have been saved successfully.</p>
      </div>
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-gray-600 font-light">Your profile is now live with the latest information.</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
        >
          Got it ✓
        </button>
      </div>
    </div>
    <style>{`
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.85) translateY(20px); }
        to   { opacity: 1; transform: scale(1)    translateY(0);    }
      }
    `}</style>
  </div>
);

/* ── Error Popup ── */
const ErrorPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Update Failed</h3>
        <p className="text-white/50 text-sm mt-1 font-light">Something went wrong. Please try again.</p>
      </div>
      <div className="px-6 py-5">
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
        >
          Close
        </button>
      </div>
    </div>
    <style>{`
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.85) translateY(20px); }
        to   { opacity: 1; transform: scale(1)    translateY(0);    }
      }
    `}</style>
  </div>
);

/* ── Main Component ── */
const AdminProfileUpdate = () => {
  const [profile, setProfile] = useState({
    name: "",
    semester: "",
    bio: "",
    description: "",
    location: "",
    education: "",
    university: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [error, setError] = useState(null);

  const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api/ProfileInfo`;

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(BACKEND_URL);
        setProfile(res.data || profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axios.put(`${BACKEND_URL}/update`, profile);
      setStatus("success");
    } catch (err) {
      console.error("Error updating profile:", err);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            <div className="h-7 w-48 bg-white/20 rounded-lg mb-2 animate-pulse" />
            <div className="h-3 w-36 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-5">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Profile Update
            </h2>
          </div>
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-600 font-medium mb-1">{error}</p>
            <p className="text-sm text-gray-400 font-light">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Popups ── */}
      {status === "success" && <SuccessPopup onClose={() => setStatus(null)} />}
      {status === "error" && <ErrorPopup onClose={() => setStatus(null)} />}

      {/* ── Form Card ── */}
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">

          {/* Header */}
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Profile Update
            </h2>
            <p className="text-white/40 text-sm mt-1 font-light">
              Manage your personal and academic information
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-300" />
                  Personal Information
                  <span className="flex-1 h-px bg-gray-300" />
                </h3>

                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>✨</span>
                    Bio
                  </label>
                  <input
                    type="text"
                    name="bio"
                    value={profile.bio || ""}
                    onChange={handleChange}
                    placeholder="A short bio about yourself…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>📝</span>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={profile.description || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder="A detailed description about yourself…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition resize-y"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>📍</span>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location || ""}
                    onChange={handleChange}
                    placeholder="City, Country…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 flex items-center gap-2 pt-2">
                  <span className="w-8 h-px bg-gray-300" />
                  Academic Information
                  <span className="flex-1 h-px bg-gray-300" />
                </h3>

                {/* Semester */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>📚</span>
                    Semester
                  </label>
                  <input
                    type="text"
                    name="semester"
                    value={profile.semester || ""}
                    onChange={handleChange}
                    placeholder="e.g., 5th Semester, Final Year…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>🎓</span>
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={profile.education || ""}
                    onChange={handleChange}
                    placeholder="e.g., Bachelor of Science in Computer Science…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>

                {/* University */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>🏛️</span>
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={profile.university || ""}
                    onChange={handleChange}
                    placeholder="University name…"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 my-6" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm font-medium py-3.5 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Profile…
                  </>
                ) : (
                  <>Update Profile &rarr;</>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 font-light mt-3">
                Changes are reflected publicly after saving.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileUpdate;