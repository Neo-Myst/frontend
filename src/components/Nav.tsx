import "../css/Nav.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4">
      <div
        className="text-4xl font-bold text-white"
        onClick={() => navigate("/")}
      >
        ML<span className="text-cyan-500">One</span>
      </div>

      <div className="flex items-center space-x-6">
        <a
          onClick={() => navigate("/login")}
          href="#"
          className="text-white hover:text-cyan-500 transition duration-300"
        >
          Log In
        </a>

        <button
          className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow-md hover:bg-cyan-700 transition duration-300"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Nav;
