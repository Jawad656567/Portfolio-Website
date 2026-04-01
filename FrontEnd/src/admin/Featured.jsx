import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

// API
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

/* ── Success Popup ── */
const SuccessPopup = ({ onClose, message }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">Success!</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1 font-light">{message}</p>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
          <span className="text-lg sm:text-xl">🎉</span>
          <p className="text-xs sm:text-sm text-gray-600 font-light">Your changes are now live.</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
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
      <div className="bg-black px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">Update Failed</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1 font-light">Something went wrong. Please try again.</p>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-900 text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
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

/* ── Delete Confirmation Popup ── */
const DeleteConfirmPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">Delete Item?</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1 font-light">This action cannot be undone.</p>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-black hover:bg-gray-900 text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
        >
          Delete
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
export default function FeaturedAdmin() {
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const [featuredData, setFeaturedData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    editId: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch featured items
  const fetchFeatured = async () => {
    try {
      const res = await API.get("/api/featured");
      setFeaturedData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      if (formData.image) fd.append("image", formData.image);

      if (formData.editId) {
        await API.put(`/api/featured/${formData.editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setSuccessMessage("Featured item updated successfully!");
      } else {
        await API.post("/api/featured", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setSuccessMessage("Featured item added successfully!");
      }

      setFormData({ title: "", image: null, editId: null });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchFeatured();
      setStatus("success");
    } catch (err) {
      console.error("Submit Error:", err);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, image: null, editId: item._id });
    setImagePreview(item.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/api/featured/${deleteTarget}`);
      fetchFeatured();
      setSuccessMessage("Featured item deleted successfully!");
      setStatus("success");
    } catch (err) {
      console.error("Delete Error:", err);
      setStatus("error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const cancelEdit = () => {
    setFormData({ title: "", image: null, editId: null });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-black px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <div className="h-6 sm:h-7 w-40 sm:w-48 bg-white/20 rounded-lg mb-2 animate-pulse" />
            <div className="h-2.5 sm:h-3 w-28 sm:w-36 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 space-y-4 sm:space-y-5">
            <div className="h-10 sm:h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-10 sm:h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-40 sm:h-48 w-full bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Popups ── */}
      {status === "success" && <SuccessPopup onClose={() => setStatus(null)} message={successMessage} />}
      {status === "error" && <ErrorPopup onClose={() => setStatus(null)} />}
      {deleteTarget && <DeleteConfirmPopup onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}

      {/* ── Form Card ── */}
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">

          {/* Header */}
          <div className="bg-black px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Featured Section
            </h2>
            <p className="text-white/40 text-xs sm:text-sm mt-1 font-light">
              Manage your featured items showcase
            </p>
          </div>

          {/* Form Body */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Title Input */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                  <span>📝</span>
                  Item Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter featured item title…"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                  <span>🖼️</span>
                  Image Upload
                </label>
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-gray-900 file:cursor-pointer outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                    accept="image/*"
                  />
                </div>
                {formData.editId && !formData.image && (
                  <p className="text-xs text-gray-400 font-light mt-2">
                    Leave empty to keep the current image
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                    <span>👁️</span>
                    Preview
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 sm:max-h-48 max-w-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-gray-100 my-4 sm:my-6" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {formData.editId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-medium py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className={`${formData.editId ? 'w-full sm:flex-1' : 'w-full'} flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white text-xs sm:text-sm font-medium py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed`}
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>{formData.editId ? "Update Featured Item →" : "Add Featured Item →"}</>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-light mt-3">
                Changes are reflected publicly after saving.
              </p>
            </form>
          </div>
        </div>

        {/* Featured Items Gallery */}
        <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-6">
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            
            {/* Gallery Header */}
            <div className="bg-black px-4 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                Current Featured Items
              </h3>
              <p className="text-white/40 text-xs mt-1 font-light">
                {featuredData.length} {featuredData.length === 1 ? 'item' : 'items'} currently featured
              </p>
            </div>

            {/* Gallery Body */}
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
              {featuredData.length === 0 ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl">📦</span>
                  </div>
                  <p className="text-gray-500 font-medium mb-1 text-sm sm:text-base">No featured items yet</p>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">Add your first featured item above</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Scroll Buttons - Hidden on Mobile */}
                  {featuredData.length > 1 && (
                    <>
                      <button
                        onClick={scrollLeft}
                        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full p-2.5 transition hover:scale-110 active:scale-95"
                      >
                        <ChevronLeft size={20} className="text-gray-700" />
                      </button>

                      <button
                        onClick={scrollRight}
                        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full p-2.5 transition hover:scale-110 active:scale-95"
                      >
                        <ChevronRight size={20} className="text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Scrollable Gallery */}
                  <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {featuredData.map((item) => (
                      <div
                        key={item._id}
                        className="relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                      >
                        {/* Image */}
                        <div className="w-full h-40 sm:h-44 md:h-48 bg-white flex items-center justify-center p-3 sm:p-4">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        {/* Title */}
                        <div className="px-3 py-2.5 sm:px-4 sm:py-3 bg-white border-t border-gray-100">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm text-center truncate">
                            {item.title}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-white hover:bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-medium shadow-md transition hover:-translate-y-0.5 active:translate-y-0 border border-gray-200"
                          >
                            ✏️ <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item._id)}
                            className="bg-black hover:bg-gray-900 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-medium shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
                          >
                            🗑️ <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}