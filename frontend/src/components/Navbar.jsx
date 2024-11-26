import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    console.error(
      "AuthContext is undefined. Ensure the AuthProvider wraps your app."
    );
    return null; // Выводим пустой компонент, если контекст не доступен
  }

  const { user, logout } = auth;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
