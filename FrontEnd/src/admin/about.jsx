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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // success or error

  const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api/about`;

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

  const handleChange = (index, value) => {
    const updated = [...paragraphs];
    updated[index].text = value;
    setParagraphs(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await axios.put(BACKEND_URL, { paragraphs });
      setAlertMessage("About Updated Successfully!");
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Update Error:", err);
      setAlertMessage("Error updating About section!");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl relative">
      {/* Alert / Popup */}
      {showAlert && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded shadow-lg text-white z-50 transition-all duration-300 ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alertMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">Update About Section</h1>

      {paragraphs.map((para, index) => (
        <div key={index} className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            {para.icon} Paragraph {index + 1}
          </label>
          <textarea
            value={para.text}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            rows="4"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={saving}
        className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
          saving ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
        }`}
      >
        {saving ? "Saving..." : "Update About"}
      </button>
    </div>
  );
}