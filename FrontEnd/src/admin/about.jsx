import React, { useState, useEffect } from "react";
import axios from "axios";

const ICONS = ["🎓", "💻", "🧩", "🚀"];

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
        <h3 className="text-xl font-bold text-white">About Updated!</h3>
        <p className="text-white/50 text-sm mt-1 font-light">Your changes have been saved successfully.</p>
      </div>
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-gray-600 font-light">Your About section is now live with the latest content.</p>
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
export default function AdminAbout() {
  const [paragraphs, setParagraphs] = useState([
    { icon: "🎓", text: "" },
    { icon: "💻", text: "" },
    { icon: "🧩", text: "" },
    { icon: "🚀", text: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [status,  setStatus]  = useState(null); // null | "success" | "error"

  const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api/about`;

  useEffect(() => {
    axios.get(BACKEND_URL)
      .then(res => { if (res.data?.paragraphs) setParagraphs(res.data.paragraphs); })
      .catch(err => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index, value) => {
    const updated = [...paragraphs];
    updated[index].text = value;
    setParagraphs(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await axios.put(BACKEND_URL, { paragraphs });
      setStatus("success");
    } catch (err) {
      console.error("Update Error:", err);
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
            <div className="h-4 w-24 bg-white/10 rounded-full mb-3 animate-pulse" />
            <div className="h-7 w-48 bg-white/20 rounded-lg mb-2 animate-pulse" />
            <div className="h-3 w-36 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-24 w-full bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              About Section
            </h2>
            <p className="text-white/40 text-sm mt-1 font-light">
              Edit your public About content below
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <div className="space-y-5">
              {paragraphs.map((para, index) => (
                <div key={index}>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>{para.icon}</span>
                    Paragraph {index + 1}
                  </label>
                  <textarea
                    value={para.text}
                    onChange={(e) => handleChange(index, e.target.value)}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition resize-y"
                    placeholder={`Write paragraph ${index + 1} content here…`}
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 my-6" />

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm font-medium py-3.5 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>Update About &rarr;</>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 font-light mt-3">
              Changes are reflected publicly after saving.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}