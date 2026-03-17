// AdminAbout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAbout() {
  const [paragraphs, setParagraphs] = useState([
    { icon: "🎓", text: "" },
    { icon: "💻", text: "" },
    { icon: "🧩", text: "" },
    { icon: "🚀", text: "" }
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Dynamic backend URL (local + live)
  const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api/about`;

  // Fetch current about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(BACKEND_URL);
        if (res.data && res.data.paragraphs) {
          setParagraphs(res.data.paragraphs);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // Handle textarea changes
  const handleChange = (index, value) => {
    const updated = [...paragraphs];
    updated[index].text = value;
    setParagraphs(updated);
  };

  // Handle update submit
  const handleSubmit = async () => {
    setSaving(true);
    try {
      console.log("Sending paragraphs:", paragraphs);
      const res = await axios.put(BACKEND_URL, { paragraphs });
      console.log("Response from server:", res.data);
      alert("About Updated Successfully");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Error updating About section. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Update About Section</h1>

      {paragraphs.map((para, index) => (
        <div key={index} className="mb-6">
          <label className="block font-semibold mb-1">
            {para.icon} Paragraph {index + 1}
          </label>
          <textarea
            value={para.text}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 resize-y"
            rows="4"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={saving}
        className={`${
          saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } w-full sm:w-auto text-white px-6 py-2 rounded transition`}
      >
        {saving ? "Saving..." : "Update About"}
      </button>
    </div>
  );
}