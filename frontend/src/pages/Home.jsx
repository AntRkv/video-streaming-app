import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="container">
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
