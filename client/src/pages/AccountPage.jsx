import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/accounPage.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

 useEffect(() => {
   const fetchUser = async () => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         window.location.href = "/login"; 
         return;
       }

       const response = await axios.get("/api/auth", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       setUser(response.data); 
     } catch (err) {
       console.error("Error fetching user:", err);
       setError("Failed to fetch user. Please log in again.");
       localStorage.removeItem("token");
       window.location.href = "/login";
     }
   };

   fetchUser();
 }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="account-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && (
          <>
            <h1>My Account</h1>
            <div className="account-info">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
