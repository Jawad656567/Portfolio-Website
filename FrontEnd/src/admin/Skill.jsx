import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
const categories = ["Frontend", "Backend", "Tools"];

/* ── Success Popup ── */
const SuccessPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Success!</h3>
        <p className="text-white/50 text-sm mt-1 font-light">{message}</p>
      </div>
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-gray-600 font-light">Your changes have been applied successfully.</p>
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
        <h3 className="text-xl font-bold text-white">Operation Failed</h3>
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

/* ── Delete Confirmation Popup ── */
const DeleteConfirmation = ({ skillName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div className="bg-black px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Delete Skill?</h3>
        <p className="text-white/50 text-sm mt-1 font-light">Are you sure you want to delete <span className="text-white font-medium">{skillName}</span>?</p>
      </div>
      <div className="px-6 py-5 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-black hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md"
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
export default function AdminPanel() {
  const [skills, setSkills] = useState({ Frontend: [], Backend: [], Tools: [] });
  const [form, setForm] = useState({ name: "", category: "Frontend", learning: false });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await API.patch(`/api/skills/${editingId}`, form);
        setSuccessMessage("Skill updated successfully!");
      } else {
        await API.post("/api/skills", form);
        setSuccessMessage("Skill added successfully!");
      }
      setStatus("success");
      setForm({ name: "", category: "Frontend", learning: false });
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, category: skill.category, learning: skill.learning });
    setEditingId(skill._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (skill) => {
    setDeleteTarget(skill);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await API.delete(`/api/skills/${deleteTarget._id}`);
        setSuccessMessage("Skill deleted successfully!");
        setStatus("success");
        fetchSkills();
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
      setDeleteTarget(null);
    }
  };

  const cancelEdit = () => {
    setForm({ name: "", category: "Frontend", learning: false });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            <div className="h-7 w-48 bg-white/20 rounded-lg mb-2 animate-pulse" />
            <div className="h-3 w-36 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-8">
            <div className="h-32 w-full bg-gray-100 rounded-xl animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
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
      {status === "success" && (
        <SuccessPopup message={successMessage} onClose={() => setStatus(null)} />
      )}
      {status === "error" && <ErrorPopup onClose={() => setStatus(null)} />}
      {deleteTarget && (
        <DeleteConfirmation
          skillName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Main Card ── */}
      <div className="w-full p-4 sm:p-6">
        <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-black px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Skills Management
            </h2>
            <p className="text-white/40 text-sm mt-1 font-light">
              Add, edit, and organize your technical skills
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            {/* Add/Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-300" />
                  {editingId ? "Edit Skill" : "Add New Skill"}
                  <span className="flex-1 h-px bg-gray-300" />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Skill Name */}
                  <div className="md:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                      <span>💡</span>
                      Skill Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g., React, Node.js, Docker…"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition"
                    />
                  </div>

                  {/* Category */}
                  <div className="md:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
                      <span>📂</span>
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 transition cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Learning Toggle */}
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <input
                    type="checkbox"
                    id="learning"
                    name="learning"
                    checked={form.learning}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black/10 cursor-pointer"
                  />
                  <label htmlFor="learning" className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                    <span>📖</span>
                    Currently Learning This Skill
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Submit Buttons */}
              <div className="flex gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className={`${editingId ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white text-sm font-medium py-3 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed`}
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {editingId ? "Updating…" : "Adding…"}
                    </>
                  ) : (
                    <>{editingId ? "Update Skill ✓" : "Add Skill +"}</>
                  )}
                </button>
              </div>
            </form>

            <div className="border-t border-gray-100 my-8" />

            {/* Skills Display */}
            <div className="space-y-8">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                      {cat}
                    </h3>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">
                      {(skills[cat] || []).length} {(skills[cat] || []).length === 1 ? "skill" : "skills"}
                    </span>
                  </div>

                  {(skills[cat] || []).length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-8 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl opacity-50">📭</span>
                      </div>
                      <p className="text-sm text-gray-400 font-light">No skills in this category yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      <AnimatePresence>
                        {(skills[cat] || []).map((skill) => (
                          <motion.div
                            key={skill._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative bg-white border border-gray-200 rounded-xl p-4 hover:border-black hover:shadow-lg transition-all group"
                          >
                            {/* Learning Badge */}
                            {skill.learning && (
                              <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                                📖
                              </div>
                            )}

                            {/* Skill Name */}
                            <div className="text-center mb-3">
                              <div className="font-semibold text-sm text-gray-900 group-hover:text-black transition">
                                {skill.name}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(skill)}
                                className="flex-1 bg-gray-100 hover:bg-black hover:text-white text-gray-700 text-xs font-medium py-1.5 rounded-lg transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(skill)}
                                className="flex-1 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 text-xs font-medium py-1.5 rounded-lg transition"
                              >
                                Delete
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}