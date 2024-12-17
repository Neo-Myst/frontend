import "../css/Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* <div className="logo">LOGO</div> */}
      <div
        className="text-4xl font-bold text-white"
        onClick={() => navigate("/")}
      >
        ML<span className="text-cyan-500">One</span>
      </div>
      <div className="module-title">Module 1: Basics of Machine Learning</div>
      <div className="navigation">
        {/* <button className="submit-btn">Submit</button> */}
        <button className="next-btn">Next</button>
      </div>
    </header>
  );
}

export default Header;
