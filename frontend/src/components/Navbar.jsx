import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout} className="button">
            Logout
          </button>
        </>
      ) : (
        <a href="/login" className="button">
          Login
        </a>
      )}
    </nav>
  );
};

export default Navbar;
