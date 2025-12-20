
// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AnalyzeJD from "./pages/AnalyzeJD";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      {/* Navbar must be here */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<AnalyzeJD />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}
