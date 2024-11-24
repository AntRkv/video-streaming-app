import React, { useEffect, useState } from "react";
import {
  fetchUserData,
  fetchVideos,
  fetchShorts,
  deleteVideo,
  deleteShort,
} from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/userPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [error, setError] = useState("");
  const [newVideo, setNewVideo] = useState({ title: "", file: null });
  const [newShort, setNewShort] = useState({ title: "", file: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);

        const videosData = await fetchVideos();
        const shortsData = await fetchShorts();

        setVideos(videosData.filter((video) => video.userId === userData._id));
        setShorts(shortsData.filter((short) => short.userId === userData._id));
      } catch (err) {
        setError("Failed to load content");
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteVideo = async (id) => {
    try {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch {
      setError("Failed to delete video");
    }
  };

  const handleDeleteShort = async (id) => {
    try {
      await deleteShort(id);
      setShorts((prev) => prev.filter((short) => short._id !== id));
    } catch {
      setError("Failed to delete short");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!user?.channelName) {
      setError("Channel name is missing. Please update your profile.");
      return;
    }
    if (!newVideo.file) {
      setError("Please select a video file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newVideo.title || "Untitled");
      formData.append("video", newVideo.file);

      const response = await fetch("/api/videos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const data = await response.json();
      setVideos((prev) => [...prev, data.video]);
      setNewVideo({ title: "", file: null });
    } catch (err) {
      console.error("Error uploading video:", err);
      setError("Failed to upload video");
    }
  };

  const handleShortUpload = async (e) => {
    e.preventDefault();
    if (!user?.channelName) {
      setError("Channel name is missing. Please update your profile.");
      return;
    }
    if (!newShort.file) {
      setError("Please select a short file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newShort.title || "Untitled");
      formData.append("short", newShort.file);

      const response = await fetch("/api/shorts/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload short");
      }

      const data = await response.json();
      setShorts((prev) => [...prev, data.short]);
      setNewShort({ title: "", file: null });
    } catch (err) {
      console.error("Error uploading short:", err);
      setError("Failed to upload short");
    }
  };

  return (
    <div className="user-page">
      <header className="user-header">
        {user && (
          <div className="account-info">
            <h1>Welcome, {user.username}!</h1>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <Link to="/account" className="account-link">
              Go to Account Settings
            </Link>
          </div>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main>
        <h2>My Content</h2>
        {error && <p className="error">{error}</p>}

        <section className="content-section">
          <h3>Videos</h3>
          <form onSubmit={handleVideoUpload} className="upload-form">
            <input
              type="text"
              placeholder="Video Title"
              value={newVideo.title}
              onChange={(e) =>
                setNewVideo({ ...newVideo, title: e.target.value })
              }
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setNewVideo({ ...newVideo, file: e.target.files[0] })
              }
            />
            <button type="submit">Add Video</button>
          </form>
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="content-card">
                <h4>{video.title || "Untitled"}</h4>
                <p>{video.channelName || "No Channel Name"}</p>
                <button onClick={() => handleDeleteVideo(video._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No videos uploaded yet</p>
          )}
        </section>

        <section className="content-section">
          <h3>Shorts</h3>
          <form onSubmit={handleShortUpload} className="upload-form">
            <input
              type="text"
              placeholder="Short Title"
              value={newShort.title}
              onChange={(e) =>
                setNewShort({ ...newShort, title: e.target.value })
              }
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setNewShort({ ...newShort, file: e.target.files[0] })
              }
            />
            <button type="submit">Add Short</button>
          </form>
          {shorts.length > 0 ? (
            shorts.map((short) => (
              <div key={short._id} className="content-card">
                <h4>{short.title || "Untitled"}</h4>
                <p>{short.channelName || "No Channel Name"}</p>
                <button onClick={() => handleDeleteShort(short._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No shorts uploaded yet</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserPage;
