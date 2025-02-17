import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleLogin from "./pages/GoogleLogin";
import IntroStory from "./pages/Modules/Module1/IntroStory";
import PreProc1 from "./pages/Modules/Module1/PreProc1";
import PreProc2 from "./pages/Modules/Module1/PreProc2";
import PreProc3 from "./pages/Modules/Module1/PreProc3";
import PreProc4 from "./pages/Modules/Module1/PreProc4";
import PreProc5 from "./pages/Modules/Module1/PreProc5";
import PreProc6 from "./pages/Modules/Module1/PreProc6";
import PreProc7 from "./pages/Modules/Module1/PreProc7";
import PreProc8 from "./pages/Modules/Module1/PreProc8";
import OutroPreProc from "./pages/Modules/Module1/OutroPreProc";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/pages/IntroStory" element={<IntroStory />} />
        <Route path="/pages/PreProc1" element={<PreProc1 />} />
        <Route path="/pages/PreProc2" element={<PreProc2 />} />
        <Route path="/pages/PreProc3" element={<PreProc3 />} />
        <Route path="/pages/PreProc4" element={<PreProc4 />} />
        <Route path="/pages/PreProc5" element={<PreProc5 />} />
        <Route path="/pages/PreProc6" element={<PreProc6 />} />
        <Route path="/pages/PreProc7" element={<PreProc7 />} />
        <Route path="/pages/PreProc8" element={<PreProc8 />} />
        <Route path="/pages/OutroPreProc" element={<OutroPreProc />} />
      </Routes>
    </Router>
  );
};

export default App;
