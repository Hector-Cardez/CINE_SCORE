import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSuccess = (response) => {
    const token = response.credential;
    fetch("http://localhost:8000/api/google-signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  // Sign-out functionality
  const handleLogout = () => {
    googleLogout();

    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          redirectUri="http://localhost:3000"
        />
      ) : (
        <div>
          <h3>Welcome, {userData?.name}</h3>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
