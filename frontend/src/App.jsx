import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadVideo from "./pages/UploadVideo";
import ViewVideo from "./pages/ViewVideo";
import EditVideo from "./pages/EditVideo";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<UploadVideo />} />
                <Route path="/videos/:id" element={<ViewVideo />} />
                <Route path="/videos/edit/:id" element={<EditVideo />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
