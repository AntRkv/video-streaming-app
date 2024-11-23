import React, { useEffect, useState } from "react";
import VideosList from "../components/VideosList";
import { fetchShorts } from "../api/api";

const ShortsPage = () => {
  const [shorts, setShorts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadShorts = async () => {
      try {
        const data = await fetchShorts();
        setShorts(data);
      } catch (err) {
        setError("Failed to load shorts. Please try again later.");
        console.error(err);
      }
    };

    loadShorts();
  }, []);

  return (
    <div>
      <main>
        <h1>Shorts</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <VideosList videos={shorts} />
      </main>
    </div>
  );
};

export default ShortsPage;
