import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import axios from "axios";
import { StoreProvider } from "./Store.jsx";

const inDevOrProd = import.meta.env.DEV;
axios.defaults.baseURL = inDevOrProd
  ? "http://localhost:8080"
  : "https://amazon-shop-ten.vercel.app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
