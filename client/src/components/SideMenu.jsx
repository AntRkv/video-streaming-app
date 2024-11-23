import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg";
import ShortsIcon from "../assets/icons/shorts.svg";
import VideoIcon from "../assets/icons/video.svg";
import UserIcon from "../assets/icons/user.svg";
import "../styles/sidemenu.css";

const SideMenu = ({ isMenuOpen }) => {
  return (
    <nav className={`side-menu ${isMenuOpen ? "" : "collapsed"}`}>
      <ul className="menu-items">
        <li className="menu-item">
          <Link to="/">
            <img src={HomeIcon} alt="Home" className="menu-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/videos">
            <img src={VideoIcon} alt="Videos" className="menu-icon" />
            <span>Videos</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/shorts">
            <img src={ShortsIcon} alt="Shorts" className="menu-icon" />
            <span>Shorts</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/account">
            <img src={UserIcon} alt="Account" className="menu-icon" />
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
