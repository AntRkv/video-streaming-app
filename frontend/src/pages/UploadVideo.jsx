import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/videos`, {
        title,
        description,
        videoUrl,
      });
      console.log("Video uploaded:", response.data);
      setMessage("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Failed to upload video. Please try again.");
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
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Upload
        </button>
        {loading && <p>Uploading...</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UploadVideo;
