import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import VideosList from "../components/VideosList";

const MainPage = () => {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("token");

      const videoResponse = await axios.get("/api/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const shortsResponse = await axios.get("/api/shorts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVideos(videoResponse.data);
      setShorts(shortsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main>
        <section className="videos-section">
          <h2>Videos</h2>
          <VideosList videos={videos} />
        </section>
        <section className="shorts-section">
          <h2>Shorts</h2>
          <VideosList videos={shorts} />
        </section>
      </main>
    </div>
  );
};

export default MainPage;
