import React, { useEffect, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ── Create cropped image ─────────────────────────────────────────────────────
const createCroppedImage = async (imageSrc, pixelCrop) => {
  const image = new Image();

  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(
          new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          })
        );
      },
      "image/jpeg",
      0.9
    );
  });
};

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ── Crop states ────────────────────────────────────────────────────────────
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // Initial zoom
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

  // ── Select image ───────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);

      // Reset position
      setCrop({ x: 0, y: 0 });

      // Start from minimum zoom.
      // react-easy-crop will automatically fit the image
      // inside the crop area initially.
      setZoom(1);
    };

    reader.readAsDataURL(file);
  };

  // ── Crop complete ──────────────────────────────────────────────────────────
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // ── Apply crop ─────────────────────────────────────────────────────────────
  const handleCropSave = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedFile = await createCroppedImage(
        imageSrc,
        croppedAreaPixels
      );

      setImageFile(croppedFile);
      setShowCropper(false);
      setImageSrc(null);
    } catch (error) {
      console.error(error);
      alert("Failed to crop image");
    }
  };

  // ── Cancel crop ────────────────────────────────────────────────────────────
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) return alert("Description required");

    const formData = new FormData();

    formData.append("description", description);
    formData.append("liveLink", liveLink);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setUploading(true);

      await API.post("/api/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDescription("");
      setLiveLink("");
      setImageFile(null);
      setImageSrc(null);

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

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-900">
        Loading...
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white min-h-screen text-gray-900">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Admin Activities
      </h1>

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

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={uploading}
          className="border border-gray-300 p-1 sm:p-2 rounded text-gray-900 text-sm sm:text-base"
        />

        {/* IMAGE PREVIEW */}
        {imageFile && (
          <div className="flex items-center gap-3">

            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
            />

            <button
              type="button"
              onClick={() => {
                setImageSrc(URL.createObjectURL(imageFile));
                setShowCropper(true);
                setZoom(1);
                setCrop({ x: 0, y: 0 });
              }}
              disabled={uploading}
              className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Edit Crop
            </button>

          </div>
        )}

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
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Existing Projects
      </h2>

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

                <p className="font-medium break-words text-gray-900">
                  {act.description}
                </p>

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

      {/* ───────────────── CROP MODAL ───────────────── */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl">

            {/* HEADER */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">

              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Customize Image
              </h2>

              <button
                type="button"
                onClick={handleCropCancel}
                className="text-gray-600 hover:text-black text-2xl"
              >
                ×
              </button>

            </div>

            {/* CROP AREA */}
            <div className="relative w-full h-[400px] sm:h-[400px] bg-black">

              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                minZoom={1}
                maxZoom={4}
                zoomSpeed={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid={true}
                objectFit="contain"
              />

            </div>

            {/* CONTROLS */}
            <div className="p-4 sm:p-5">

              <div className="flex items-center gap-3">

                <span className="text-sm text-gray-700">
                  Zoom
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setZoom((prev) => Math.max(1, prev - 0.1))
                  }
                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  −
                </button>

                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1"
                />

                <button
                  type="button"
                  onClick={() =>
                    setZoom((prev) => Math.min(4, prev + 0.1))
                  }
                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>

                <span className="text-sm text-gray-700 w-10">
                  {zoom.toFixed(1)}x
                </span>

              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Drag the image to choose which part you want to show
              </p>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-5">

                <button
                  type="button"
                  onClick={handleCropCancel}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCropSave}
                  className="px-5 py-2 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold"
                >
                  Apply Crop
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}