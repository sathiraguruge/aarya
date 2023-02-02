import "./App.css";
import Login from "./components/login";
import HomePage from "./components/home";
import NotFound from "./components/notFound";
import Register from "./components/register";
import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
