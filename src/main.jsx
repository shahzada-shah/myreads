import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigation from "./Navigation.jsx";
import { BookProvider } from "./BookContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BookProvider>
    <Navigation />
  </BookProvider>
);
