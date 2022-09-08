import React, { useState, createContext } from "react";
import App from "../App";
import axios from "axios";
import { useEffect } from "react";
const initialState = {
  showSignIn: false,
  showRegister: false,
  handleCloseSignIn: () => {},
  handleShowSignIn: () => {},
  handleCloseRegister: () => {},
  handleShowRegister: () => {},
  getUserData: () => {},
  user: "",
  setUser: () => {},
  products: [],
  categories: [],
  changeCategory: () => {},
  selectedCategory: "",
  search: "",
  setSearch: () => {}
};

export const multiStateContext = createContext(initialState);

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
  const [categories] = useState([
    "All",
    "Accessories",
    "Beauty",
    "Books",
    "Electronics",
    "Fashion",
    "Home",
    "Mobility",
    "Others"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const getProductsBySearch = async () => {
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredProducts);
  };

  const getProducts = async () => {
    const token = localStorage.getItem("token");
    const url =
      selectedCategory === "All"
        ? "http://localhost:3001/products"
        : `http://localhost:3001/products?category=${selectedCategory}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
    getProductsBySearch();
  }, [selectedCategory, search, products]);

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
        products,
        categories,
        changeCategory,
        selectedCategory,
        search,
        setSearch,
        searchResult
      }}
    >
      <App />
    </multiStateContext.Provider>
  );
};
