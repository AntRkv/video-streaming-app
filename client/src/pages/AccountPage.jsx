import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/accounPage.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: "",
    email: "",
    password: "",
    channelName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get("/api/auth/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setUpdatedData({
          username: response.data.username,
          email: response.data.email,
          password: "",
          channelName: response.data.channelName || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/api/auth/update",
        {
          username: updatedData.username,
          email: updatedData.email,
          password: updatedData.password || undefined,
          channelName: updatedData.channelName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user); 
      setEditMode(false);
      setError("");
      setUpdatedData((prev) => ({
        ...prev,
        password: "", 
      }));
    } catch (err) {
      console.error("Error updating user:", err);
      setError(
        err.response?.data?.errors?.[0]?.msg ||
          "Failed to update user information. Please try again."
      );
    }
  };

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="account-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && (
          <>
            <h1>My Account</h1>
            <div className="account-info">
              {editMode ? (
                <>
                  <label>
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={updatedData.username}
                      onChange={handleInputChange}
                      className="account-input"
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={updatedData.email}
                      onChange={handleInputChange}
                      className="account-input"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={updatedData.password}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className="account-input"
                    />
                  </label>
                  <label>
                    Channel Name:
                    <input
                      type="text"
                      name="channelName"
                      value={updatedData.channelName}
                      onChange={handleInputChange}
                      className="account-input"
                    />
                  </label>
                </>
              ) : (
                <>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Channel Name:</strong> {user.channelName || "N/A"}
                  </p>
                </>
              )}
            </div>
            <div className="account-actions">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="button save-button">
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="button cancel-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="button edit-button"
                >
                  Edit Profile
                </button>
              )}
              <button onClick={handleLogout} className="button logout-button">
                Logout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
