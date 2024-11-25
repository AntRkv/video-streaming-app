import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import axios from "axios";
import React, { useState, useEffect } from "react";

const response = await axios.get(`${API_BASE_URL}/videos`);

const Home = () => {
  const [videos, setVideos] = useState([]); // Состояние для хранения списка видео

  // Запрос списка видео с backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos`);
        setVideos(response.data); // Сохраняем полученные данные
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Удаление видео
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/videos/${id}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== id)); // Обновляем список
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="container">
      <h1>Video List</h1>
      {/* Проверка: есть ли видео */}
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
              <button
                onClick={() => handleDelete(video._id)}
                className="button delete"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </ul>
    </div>
  );
};

export default Home;