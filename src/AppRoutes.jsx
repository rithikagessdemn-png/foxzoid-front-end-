// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./components/auth/AuthForm";
import Navbar from "./components/poilet/Navbar";
import Footer from "./components/poilet/Footer";
import About from "./pages/About";
import Game from "./pages/Game";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import ContactPage from "./pages/Contact";
import AdminDashboard from "./admin/AdminDasboard";
import UploadGame from "./admin/components/GameUpload";
import GameList from "./pages/GameList";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-x-hidden">
        <Routes>
          {/* Admin */}
          <Route path="/foxzoidadmin" element={<AdminDashboard />} />
          {/* Auth */}
          <Route path="/auth" element={<Auth />} />
          {/* Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/uploadGame" element={<UploadGame />} />
          <Route path="/getG" element={<GameList />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;