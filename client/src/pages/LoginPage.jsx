import React, { useState } from "react";
import { loginUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/authPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      localStorage.setItem("token", token);
      setError("");
      setIsLoggedIn(true);
      navigate("/user");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="switchText">
        Don't have an account?{" "}
        <Link to="/register" className="switchLink">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
