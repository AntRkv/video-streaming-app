import React, { useEffect, useState } from "react";
import VideosList from "../components/VideosList";
import { fetchVideos } from "../api/api";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
        setError(""); 
        setError("Failed to load videos. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);
  
  return (
    <div>
      <main>
        <h1>Videos</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && videos.length === 0 && !error && (
          <p>No videos available</p>
        )}
        <VideosList videos={videos} />
      </main>
    </div>
  );
};

export default VideosPage;
