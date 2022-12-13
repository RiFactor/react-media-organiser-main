import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "src/pages/home";
import MediaFiles from "src/pages/mediaFiles";
import MediaFile from "src/pages/mediaFile";
import NewMediaFileForm from "src/pages/newMediaFileForm";
import Categories from "./pages/categories";
import reportWebVitals from "./reportWebVitals";
import "src/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mediaFiles" element={<MediaFiles />} />
        <Route path="/mediaFiles/:mediaFileId" element={<MediaFile />} />
        <Route path="/newMediaFile" element={<NewMediaFileForm />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
