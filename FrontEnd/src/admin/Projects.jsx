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

  // Fetch projects
  const fetchActivities = async () => {
    try {
      const res = await API.get("/api/project");
      setActivities(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle file upload + form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return alert("Description required");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("liveLink", liveLink);
    if (imageFile) formData.append("image", imageFile);

    try {
      await API.post("/api/project", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDescription("");
      setLiveLink("");
      setImageFile(null);
      fetchActivities(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    }
  };

  // Delete project
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Activities</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Live Link"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Project
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Existing Projects</h2>
      <div className="grid gap-4">
        {activities.map((act) => (
          <div key={act._id} className="border p-3 rounded flex justify-between items-center">
            <div className="flex items-center gap-3">
              {act.image && <img src={act.image} alt="" className="w-16 h-16 object-cover rounded" />}
              <div>
                <p>{act.description}</p>
                <a href={act.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {act.liveLink}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleDelete(act._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}