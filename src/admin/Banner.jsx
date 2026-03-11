import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [banner, setBanner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile");
        setPreviewBanner(res.data.banner);
        setPreviewProfile(res.data.profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await axios.put("http://localhost:5000/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);

      if (banner) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewBanner(reader.result);
        reader.readAsDataURL(banner);
      }
      if (profilePic) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewProfile(reader.result);
        reader.readAsDataURL(profilePic);
      }

      setBanner(null);
      setProfilePic(null);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Banner:</label>
          <input type="file" name="banner" onChange={(e) => setBanner(e.target.files[0])} />
          {previewBanner && <img src={previewBanner} alt="Banner Preview" className="mt-2 w-full h-32 object-cover border" />}
        </div>
        <div>
          <label>Profile Pic:</label>
          <input type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} />
          {previewProfile && <img src={previewProfile} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover border rounded-full" />}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default AdminProfile;