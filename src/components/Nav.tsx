import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4">
      <div
        className="text-4xl font-bold text-white"
        onClick={() => navigate("/")}
      >
        ML<span className="text-cyan-500">One</span>
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-white hover:text-cyan-500 transition duration-300"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 rounded shadow-md py-2 w-48">
                <p className="px-4 py-2 text-white">Welcome, {user.username}</p>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
