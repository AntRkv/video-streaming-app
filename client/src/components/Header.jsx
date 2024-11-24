import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/header.css";
import logo from "../assets/logo.png";
import hamb from "../assets/icons/hamburger.png";

const Header = ({ toggleMenu, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="hamburger-logo-container">
        <button onClick={toggleMenuState} className="hamburger-button">
          <img src={hamb} alt="Hamburger" className="hamburger-icon" />
        </button>
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      {isMenuOpen && (
        <nav className="hamburger-menu" ref={menuRef}>
          <ul>
            <li>
              <Link to="/videos" onClick={toggleMenuState}>
                Videos
              </Link>
            </li>
            <li>
              <Link to="/shorts" onClick={toggleMenuState}>
                Shorts
              </Link>
            </li>
            <li>
              <Link to="/account" onClick={toggleMenuState}>
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
        {isLoggedIn ? (
          <Link to="/account" className="link">
            My Account
          </Link>
        ) : (
          <Link to="/login" className="link">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
