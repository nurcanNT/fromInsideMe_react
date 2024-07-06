import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./App.css";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/Register";
import HomePage from "./components/homePage/HomePage";
import ListPage from "./components/list/ListPage";
import MyContents from "./components/myContents/MyContents";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register/Register" element={<Register />} />
        <Route path="/homePage/HomePage" element={<HomePage />} />
        <Route path="/list/ListPage" element={<ListPage />} />
        <Route path="/myContents/MyContents" element={<MyContents />} />
      </Routes>
    </Router>
  );
}

export default App;
