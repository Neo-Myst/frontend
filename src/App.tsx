import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleLogin from "./pages/GoogleLogin";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Game from "./pages/Game";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
