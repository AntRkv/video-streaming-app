import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";

const ViewVideo = () => {
  const { id } = useParams(); 
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="container">
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        Watch Video
      </a>
    </div>
  );
};

export default ViewVideo;
