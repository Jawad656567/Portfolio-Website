import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminExperience() {
  const [form, setForm] = useState({
    role: "",
    company: "",
    duration: "",
    responsibilities: [""],
  });

  const [loading, setLoading] = useState(false);

  // Load existing data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/experience`)
      .then(res => {
        if (res.data) setForm(res.data);
      })
      .catch(() => console.log("No existing data"));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle responsibility change
  const handleRespChange = (index, value) => {
    const updated = [...form.responsibilities];
    updated[index] = value;
    setForm({ ...form, responsibilities: updated });
  };

  // Add new responsibility
  const addField = () => {
    setForm({
      ...form,
      responsibilities: [...form.responsibilities, ""],
    });
  };

  // Remove field
  const removeField = (index) => {
    const updated = form.responsibilities.filter((_, i) => i !== index);
    setForm({ ...form, responsibilities: updated });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/experience`, form);
      alert("Saved successfully ✅");
    } catch (err) {
      alert("Error saving ❌");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">Edit Work Experience</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full border p-2 rounded"
        />

        {/* Responsibilities */}
        <div>
          <p className="font-semibold mb-2">Responsibilities</p>

          {form.responsibilities.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleRespChange(i, e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeField(i)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="text-blue-600 text-sm"
          >
            + Add Responsibility
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </form>
    </div>
  );
}