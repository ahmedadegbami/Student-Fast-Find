import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/account";
import PageNavbar from "./components/navbar";
import Details from "./components/details";
import Sell from "./components/sell";

function App() {
  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
