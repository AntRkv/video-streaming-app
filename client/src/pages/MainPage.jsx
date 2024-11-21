import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const MainPage = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.searchBarContainer}>
        <input type="text" placeholder="Search..." style={styles.searchBar} />
      </div>
      <div style={styles.linkContainer}>
        <Link to="/shorts" style={styles.link}>
          client/src/pages/LoginPage.jsclient/src/pages/LoginPage.jsx Shorts
        </Link>
        <Link to="/videos" style={styles.link}>
          Videos
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: "40px",
  },
  searchBarContainer: {
    flex: 2,
    textAlign: "center",
  },
  searchBar: {
    width: "60%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  linkContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default MainPage;
