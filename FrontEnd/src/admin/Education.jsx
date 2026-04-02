import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ API
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function AdminEducation() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    degree: "",
    short: "",
    institute: "",
    period: "",
    city: "",
    country: "",
    field: "",
    status: "completed",
  });

  const [editId, setEditId] = useState(null);

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      const res = await API.get("/api/education");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await API.put(`/api/education/${editId}`, form);
        setEditId(null);
      } else {
        // ADD
        await API.post("/api/education", form);
      }

      setForm({
        degree: "",
        short: "",
        institute: "",
        period: "",
        city: "",
        country: "",
        field: "",
        status: "completed",
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/education/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Education Panel</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree" className="border p-2" required />
        <input name="short" value={form.short} onChange={handleChange} placeholder="Short (BSCS)" className="border p-2" />
        <input name="institute" value={form.institute} onChange={handleChange} placeholder="Institute" className="border p-2" />
        <input name="period" value={form.period} onChange={handleChange} placeholder="Period" className="border p-2" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2" />
        <input name="field" value={form.field} onChange={handleChange} placeholder="Field" className="border p-2" />

        <select name="status" value={form.status} onChange={handleChange} className="border p-2">
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
        </select>

        <button className="col-span-2 bg-black text-white py-2">
          {editId ? "Update" : "Add"} Education
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{item.degree}</h3>
              <p className="text-sm text-gray-500">
                {item.institute} • {item.period}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}