import React, { useState, createContext } from "react";
import App from "../App";
import axios from "axios";
import { useEffect } from "react";

export const multiStateContext = createContext("");

export const StateContext = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

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

  const getProducts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        user,
        setUser,
        products
      }}
    >
      <App />
    </multiStateContext.Provider>
  );
};
