import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import "./EditVideo.css";

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log(`Fetching video with ID: ${id}`);
        const response = await axios.get(`${API_BASE_URL}/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched video data:", response.data);
        const { title, description, videoUrl } = response.data;
        setTitle(title);
        setDescription(description);
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error("Error fetching video:", error);
        if (error.response?.status === 404) {
          setMessage("Video not found.");
        } else if (error.response?.status === 401) {
          navigate("/login");
        } else {
          setMessage("Failed to load video data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting update with data:", {
      title,
      description,
      videoUrl,
    });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/videos/${id}`,
        { title, description, videoUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Video updated:", response.data);
      setMessage("Video updated successfully!");
      navigate(`/videos/${id}`);
    } catch (error) {
      console.error("Error updating video:", error);
      if (error.response?.status === 401) {
        setMessage("Unauthorized. Please log in.");
        navigate("/login");
      } else {
        setMessage("Failed to update video. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Video</h1>
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
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
