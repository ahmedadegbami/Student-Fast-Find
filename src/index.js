import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateContext } from "./context/useStates";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateContext>
    <App />
  </StateContext>
);
