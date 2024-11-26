import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setMessage("Failed to load videos. Please try again.");
      }
    };

    fetchVideos();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response:", response.data);
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== id));
      alert("Video deleted successfully.");
    } catch (error) {
      console.error("Failed to delete video:", error.response || error.message);
      alert(
        error.response?.data?.message ||
          "Failed to delete video. Please try again."
      );
    }
  };

  return (
    <div className="container">
      <h1>Video List</h1>
      {message && <p className="error-message">{message}</p>}
      <ul className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video._id} className="video-item">
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
              <a href={`/videos/${video._id}`} className="button">
                View Details
              </a>
              <a href={`/videos/edit/${video._id}`} className="button">
                Edit
              </a>
              <button
                onClick={() => handleDelete(video._id)}
                className="button delete"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
