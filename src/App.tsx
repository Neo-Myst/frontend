import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleLogin from "./pages/GoogleLogin";
import Module1A from "./pages/Modules/Module1/Module1A";
import Module1B from "./pages/Modules/Module1/Module1B";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/pages/Module1A" element={<Module1A />} />
        <Route path="/pages/Module1B" element={<Module1B />} />
    </Routes>
   </Router>
  );
};
 
export default App;
