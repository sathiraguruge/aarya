import "./App.css";
import NavigationBar from "./components/common/navBar";
import Login from "./components/login";
import HomePage from "./components/home";
import NotFound from "./components/notFound";
import Register from "./components/register";
import Orders from "./components/orders";
import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
