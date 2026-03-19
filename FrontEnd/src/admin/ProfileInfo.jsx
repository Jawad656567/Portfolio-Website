import { useState, useEffect } from "react";
import axios from "axios";

const fields = [
  { name: "name",        label: "Full Name",   placeholder: "e.g. Aisha Khan",               icon: "👤", full: false, textarea: false },
  { name: "semester",    label: "Semester",    placeholder: "e.g. 6th Semester",              icon: "📅", full: false, textarea: false },
  { name: "bio",         label: "Bio",         placeholder: "A short tagline about you…",     icon: "✏️", full: true,  textarea: false },
  { name: "description", label: "Description", placeholder: "Tell the world about yourself…", icon: "📝", full: true,  textarea: true  },
  { name: "location",    label: "Location",    placeholder: "e.g. Lahore, Pakistan",          icon: "📍", full: false, textarea: false },
  { name: "education",   label: "Education",   placeholder: "e.g. BS Computer Science",       icon: "🎓", full: false, textarea: false },
  { name: "university",  label: "University",  placeholder: "e.g. LUMS",                      icon: "🏛️", full: false, textarea: false },
];

/* ── Success Popup ── */
const SuccessPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal Card */}
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">

      {/* Top black strip */}
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        {/* Checkmark circle */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Profile Updated!</h3>
        <p className="text-white/50 text-sm mt-1 font-light">
          Your changes have been saved successfully.
        </p>
      </div>

      {/* Bottom white section */}
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-gray-600 font-light">
            Your public profile is now live with the latest info.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
        >
          Got it ✓
        </button>
      </div>
    </div>

    {/* Keyframe animation via style tag */}
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
    name: "", semester: "", bio: "", description: "",
    location: "", education: "", university: "",
  });
  const [status,  setStatus]  = useState(null); // null | "success" | "error"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/ProfileInfo")
      .then(res => setProfile(prev => ({ ...prev, ...(res.data || {}) })))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put("http://localhost:5000/api/ProfileInfo/update", profile)
      .then(() => { setStatus("success"); setLoading(false); })
      .catch(() => { setStatus("error");   setLoading(false); });
  };

  return (
    <>
      {/* ── Popups ── */}
      {status === "success" && <SuccessPopup onClose={() => setStatus(null)} />}
      {status === "error"   && <ErrorPopup   onClose={() => setStatus(null)} />}

      {/* ── Form Card ── */}
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">

          {/* Header */}
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Profile Settings
            </h2>
            <p className="text-white/40 text-sm mt-1 font-light">
              Manage your public-facing information
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={field.full ? "sm:col-span-2" : "col-span-1"}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                      <span>{field.icon}</span>
                      {field.label}
                    </label>

                    {field.textarea ? (
                      <textarea
                        name={field.name}
                        value={profile[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        value={profile[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 my-6" />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm font-medium py-3.5 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>Save Changes &rarr;</>
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