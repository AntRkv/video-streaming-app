import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/videos", {
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
      </form>
    </div>
  );
};

export default UploadVideo;
