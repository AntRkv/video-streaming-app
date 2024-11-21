import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import VideosPage from "./pages/VideosPage";
import ShortsPage from "./pages/ShortsPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/shorts" element={<ShortsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
