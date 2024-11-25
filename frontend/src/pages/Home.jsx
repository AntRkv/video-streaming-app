import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import axios from "axios";
import React, { useState, useEffect } from "react";

const response = await axios.get(`${API_BASE_URL}/videos`);

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos`);
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/videos/${id}`);
    setVideos((prevVideos) => prevVideos.filter((video) => video._id !== id));
    setMessage("Video deleted successfully!");
    setTimeout(() => setMessage(""), 3000); 
  } catch (error) {
    console.error("Error deleting video:", error);
    setMessage("Failed to delete video.");
  }
};

return (
  <div className="container">
    <h1>Video List</h1>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video._id}>
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
              {message && <p>{message}</p>}
            </li>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </ul>
    )}
  </div>
);

};

export default Home;
