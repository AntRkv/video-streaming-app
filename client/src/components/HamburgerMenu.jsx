import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/hamburgermenu.css";
import logo from "../assets/logo.png";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu} className="hamburger-button">
        <img src={hamb} alt="Logo" className="logo" />
      </button>
      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <Link to="/" onClick={toggleMenu}>
            <img src={logo} alt="Logo" className="menu-logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
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
    </div>
  );
};

export default HamburgerMenu;
