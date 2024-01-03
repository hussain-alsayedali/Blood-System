import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./App";

// Use createRoot from react-dom/client
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
