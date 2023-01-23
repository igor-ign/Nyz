import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom"
import { UserGlobalProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserGlobalProvider>
      <BrowserRouter>
      <ToastContainer autoClose={8000} />
          <App />
      </BrowserRouter>
    </UserGlobalProvider>
  </React.StrictMode>
);