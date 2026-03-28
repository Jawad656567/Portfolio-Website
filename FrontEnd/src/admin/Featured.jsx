import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Dynamic API (local + live)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function FeaturedAdmin() {
  const scrollRef = useRef(null);

  const [featuredData, setFeaturedData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    editId: null,
  });

  // ✅ Fetch featured items
  const fetchFeatured = async () => {
    try {
      const res = await API.get("/api/featured");
      setFeaturedData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ✅ Add / Update featured item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("link", formData.link);
      if (formData.image) fd.append("image", formData.image);

      if (formData.editId) {
        await API.put(`/api/featured/${formData.editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await API.post("/api/featured", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // reset form
      setFormData({
        title: "",
        description: "",
        link: "",
        image: null,
        editId: null
      });

      fetchFeatured();
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      link: item.link,
      image: null,
      editId: item._id,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/api/featured/${id}`);
      fetchFeatured();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ✅ Safe scroll
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Featured Section</h1>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg shadow-sm">
        
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
          accept="image/*"
        />

        {/* ✅ Edit hint */}
        {formData.editId && (
          <p className="text-sm text-gray-500 mb-2">
            Leave image empty to keep old image
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {formData.editId ? "Update Featured" : "Add Featured"}
        </button>
      </form>

      {/* ✅ Carousel */}
      <h2 className="text-xl font-bold mb-4">Featured Items</h2>

      {featuredData.length === 0 && (
        <p className="text-center text-gray-500">No featured items found</p>
      )}

      <div className="relative w-full overflow-hidden">
        
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
        >
          {featuredData.map((item) => (
            <div
              key={item._id || item.title}
              className="min-w-[280px] rounded-lg overflow-hidden border hover:shadow-md transition duration-300 bg-white flex-shrink-0 relative"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-3">
                <p className="font-semibold text-gray-700 text-center">
                  {item.title}
                </p>
              </div>

              {/* Buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}