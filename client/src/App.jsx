import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainPage from "./pages/MainPage";
import VideosPage from "./pages/VideosPage";
import ShortsPage from "./pages/ShortsPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/app.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`content-container ${
        isMenuOpen ? "menu-open" : "menu-closed"
      }`}
    >
      <Header toggleMenu={toggleMenu} />
      <SideMenu isMenuOpen={isMenuOpen} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/shorts" element={<ShortsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
