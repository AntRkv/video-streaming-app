import React, { useState, useContext } from "react";
import axios from "axios";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import AuthContext from "../context/AuthContext";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/videos`,
        {
          title,
          description,
          videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }
      );
      console.log("Video uploaded:", response.data);
      setMessage("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to upload video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload Video</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            required
          />
        </div>
        <div>
          <label>Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video URL"
            required
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <a href="/" className="button">
        Back to Home
      </a>
    </div>
  );
};

export default UploadVideo;
