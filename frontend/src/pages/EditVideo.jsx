import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const EditVideo = () => {
  const { id } = useParams(); // Получаем ID из URL
  const navigate = useNavigate(); // Для перенаправления
  const [video, setVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
        setMessage("Failed to load video.");
      }
    };

    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE_URL}/videos/${id}`, video);
      setMessage("Video updated successfully!");
      setTimeout(() => navigate("/"), 2000); // Перенаправление на главную страницу
    } catch (error) {
      console.error("Error updating video:", error);
      setMessage("Failed to update video.");
    }
  };

  return (
    <div className="container">
      <h1>Edit Video</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={video.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={video.videoUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
