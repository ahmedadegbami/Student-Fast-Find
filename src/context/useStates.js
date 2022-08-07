import React, { useState, createContext } from "react";
import App from "../App";
import axios from "axios";

export const multiStateContext = createContext("");

export const StateContext = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState("");

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const response = await axios.get("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <multiStateContext.Provider
      value={{
        showSignIn,
        showRegister,
        handleCloseSignIn,
        handleShowSignIn,
        handleCloseRegister,
        handleShowRegister,
        getUserData,
        user
      }}
    >
      <App />
    </multiStateContext.Provider>
  );
};
