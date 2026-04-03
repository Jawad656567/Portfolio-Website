import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

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
  </div>
);

/* ── Main Component ── */
export default function FeaturedAdmin() {
  const fileInputRef = useRef(null);
  const [featuredData, setFeaturedData] = useState([]);
  const [formData, setFormData] = useState({ title: "", image: null, editId: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  useEffect(() => { fetchFeatured(); }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
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
        await API.put(`/api/featured/${formData.editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        setSuccessMessage("Featured item updated successfully!");
      } else {
        await API.post("/api/featured", fd, { headers: { "Content-Type": "multipart/form-data" } });
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

  const handleEdit = (item) => { setFormData({ title: item.title, image: null, editId: item._id }); setImagePreview(item.image_url); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDeleteClick = (id) => setDeleteTarget(id);
  const confirmDelete = async () => {
    try {
      await API.delete(`/api/featured/${deleteTarget}`);
      fetchFeatured();
      setSuccessMessage("Featured item deleted successfully!");
      setStatus("success");
    } catch { setStatus("error"); } finally { setDeleteTarget(null); }
  };
  const cancelEdit = () => { setFormData({ title: "", image: null, editId: null }); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; };

  if (loading) return <p className="text-center mt-10 text-gray-900">Loading…</p>;

  return (
    <>
      {status === "success" && <SuccessPopup onClose={() => setStatus(null)} message={successMessage} />}
      {status === "error" && <ErrorPopup onClose={() => setStatus(null)} />}
      {deleteTarget && <DeleteConfirmPopup onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}

      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">

          {/* Header */}
          <div className="bg-black px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">Featured Section</h2>
            <p className="text-white/40 text-xs sm:text-sm mt-1 font-light">Manage your featured items showcase</p>
          </div>

          {/* Form */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <input
                type="text"
                name="title"
                placeholder="Enter featured item title…"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                required
              />
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 file:bg-black file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 hover:file:bg-gray-900"
                accept="image/*"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="max-h-48 w-full object-contain rounded-xl mt-2" />}
              <div className="flex flex-col sm:flex-row gap-3">
                {formData.editId && <button type="button" onClick={cancelEdit} className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl">Cancel Edit</button>}
                <button type="submit" disabled={saving} className="w-full sm:flex-1 bg-black hover:bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2">
                  {saving ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span> : (formData.editId ? "Update →" : "Add →")}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Featured Items Gallery */}
        <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-6">
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-black px-4 py-3 sm:px-6 sm:py-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">Current Featured Items</h3>
              <p className="text-white/40 text-xs mt-1 font-light">
                {featuredData.length} {featuredData.length === 1 ? 'item' : 'items'} currently featured
              </p>
            </div>
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              {featuredData.length === 0 ? (
                <p className="text-gray-900 text-center py-10">No featured items yet</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {featuredData.map(item => (
                    <div key={item._id} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col items-center">
                      <div className="w-full h-40 sm:h-36 md:h-40 bg-white flex items-center justify-center p-3">
                        <img src={item.image_url} alt={item.title} className="max-w-full max-h-full object-contain" />
                      </div>
                      <p className="text-gray-900 text-center font-semibold px-2 py-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}