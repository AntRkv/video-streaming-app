import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/header.css";
import logo from "../assets/logo.png";
import hamb from "../assets/hamburger.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="hamburger-logo-container">
        <button onClick={toggleMenu} className="hamburger-button">
          <img src={hamb} alt="Logo" className="logo" />
        </button>
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      {isMenuOpen && (
        <nav className="hamburger-menu">
          <ul>
            <li>
              <button onClick={toggleMenu} className="hamburger-button">
                <img src={hamb} alt="Logo" className="logo" />
              </button>
            </li>
            <li>
              <Link to="/videos" onClick={toggleMenu}>
                Videos
              </Link>
            </li>
            <li>
              <Link to="/shorts" onClick={toggleMenu}>
                Shorts
              </Link>
            </li>
            <li>
              <Link to="/account" onClick={toggleMenu}>
                My Account
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="link-container">
       
        <Link to="/login" className="link">
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;
