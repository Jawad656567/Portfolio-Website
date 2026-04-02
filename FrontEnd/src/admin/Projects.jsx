import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ NEW

  const fetchActivities = async () => {
    try {
      const res = await API.get("/api/project");
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return alert("Description required");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("liveLink", liveLink);
    if (imageFile) formData.append("image", imageFile);

    try {
      setUploading(true); // ✅ START LOADING

      await API.post("/api/project", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDescription("");
      setLiveLink("");
      setImageFile(null);
      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setUploading(false); // ✅ END LOADING
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await API.delete(`/api/project/${id}`);
      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Activities</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-5 mb-8 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Live Link (https://...)"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          disabled={uploading}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          disabled={uploading}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`p-3 rounded text-white font-semibold transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Add Project"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>

      <div className="grid gap-4">
        {activities.map((act) => (
          <div
            key={act._id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              {act.image && (
                <img
                  src={act.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}

              <div>
                <p className="font-medium">{act.description}</p>

                {act.liveLink && (
                  <a
                    href={act.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Visit Project
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(act._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}