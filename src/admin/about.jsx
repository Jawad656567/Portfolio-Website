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

  // Backend URL
  const BACKEND_URL = "http://localhost:5000/api/about"; // apne backend port check karo

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
      await axios.put(BACKEND_URL, { paragraphs });
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Update About Section</h1>

      {paragraphs.map((para, index) => (
        <div key={index} className="mb-4">
          <label className="block font-semibold mb-1">
            {para.icon} Paragraph {index + 1}
          </label>
          <textarea
            value={para.text}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={saving}
        className={`${
          saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-6 py-2 rounded transition`}
      >
        {saving ? "Saving..." : "Update About"}
      </button>
    </div>
  );
}