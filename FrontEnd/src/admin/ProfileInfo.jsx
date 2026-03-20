import { useState, useEffect } from "react";
import axios from "axios";

const AdminProfileUpdate = () => {
  const [profile, setProfile] = useState({
    name: "",
    semester: "",
    bio: "",
    description: "",
    location: "",
    education: "",
    university: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ProfileInfo`);
        setProfile(res.data || profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/ProfileInfo/update`, profile);
      setMsg("Profile updated successfully! ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMsg("Error updating profile ❌");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Profile Update</h2>
      {msg && <p className={`mb-4 ${msg.includes("❌") ? "text-red-500" : "text-green-600"}`}>{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" value={profile.name || ""} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" />
        <input type="text" name="semester" value={profile.semester || ""} onChange={handleChange} placeholder="Semester" className="w-full border p-2 rounded" />
        <input type="text" name="bio" value={profile.bio || ""} onChange={handleChange} placeholder="Bio" className="w-full border p-2 rounded" />
        <textarea name="description" value={profile.description || ""} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
        <input type="text" name="location" value={profile.location || ""} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />
        <input type="text" name="education" value={profile.education || ""} onChange={handleChange} placeholder="Education" className="w-full border p-2 rounded" />
        <input type="text" name="university" value={profile.university || ""} onChange={handleChange} placeholder="University" className="w-full border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
      </form>
    </div>
  );
};

export default AdminProfileUpdate;