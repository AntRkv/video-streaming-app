import React, { useEffect, useState } from "react";
import VideosList from "../components/VideosList";
import { fetchVideos } from "../api/api";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        console.error(err);
      }
    };

    loadVideos();
  }, []);

  return (
    <div>
      <main>
        <h1>Videos</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <VideosList videos={videos} />
      </main>
    </div>
  );
};

export default VideosPage;
