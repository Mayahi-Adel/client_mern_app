import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Profil from "../pages/Profil";
import Trending from "../pages/Trending";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profil" exact element={<Profil />} />
        <Route path="/trending" exact element={<Trending />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
