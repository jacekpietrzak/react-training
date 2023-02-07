import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   </React.StrictMode>
  <BrowserRouter>
    {/* Browser Router jest dostepny jako osobna biblioteka 'react-router-dom'. Autorzy Reacta stwierdzili ze nie bedzie to w podstawowej paczce React gdyz nie jest to niezbedna biblioteka. Router bazuje na context. Aby dzialal musimy oplesc nim nasza aplikacje.*/}
    <App />
  </BrowserRouter>
);
