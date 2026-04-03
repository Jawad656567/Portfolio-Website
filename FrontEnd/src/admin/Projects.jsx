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
  const [uploading, setUploading] = useState(false);

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
      setUploading(true);

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
      setUploading(false);
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

  if (loading) return <p className="text-center mt-10 text-gray-900">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white min-h-screen text-gray-900">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Admin Activities</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-4 sm:p-5 mb-6 flex flex-col gap-3 sm:gap-4 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          className="border border-gray-300 p-2 sm:p-3 rounded text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-700"
        />

        <input
          type="text"
          placeholder="Live Link (https://...)"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          disabled={uploading}
          className="border border-gray-300 p-2 sm:p-3 rounded text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-700"
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          disabled={uploading}
          className="border border-gray-300 p-1 sm:p-2 rounded text-gray-900 text-sm sm:text-base"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`p-2 sm:p-3 rounded font-semibold text-sm sm:text-base transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-gray-900 hover:bg-gray-700 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Add Project"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Existing Projects</h2>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((act) => (
          <div
            key={act._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {act.image && (
                <img
                  src={act.image}
                  alt=""
                  className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg border border-gray-300"
                />
              )}

              <div className="flex-1 mt-2 sm:mt-0 text-sm sm:text-base text-gray-900">
                <p className="font-medium break-words text-gray-900">{act.description}</p>

                {act.liveLink && (
                  <a
                    href={act.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline break-words text-sm sm:text-base"
                  >
                    Visit Project
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(act._id)}
              className="mt-2 sm:mt-0 bg-gray-900 hover:bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}