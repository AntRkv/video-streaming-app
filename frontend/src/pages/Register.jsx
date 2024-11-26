import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "/Users/anton/Desktop/RTT-43/video-streaming-app/frontend/config.js";
import "../styles/form.css";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email, 
        password,
      });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label> 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;