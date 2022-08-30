import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/account";
import PageNavbar from "./components/navbar";
import Details from "./components/details";
import Sell from "./components/sell";
import MyProducts from "./components/myProducts";

function App() {
  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/sell" element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
