import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";

const GoogleLogin: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const username = params.get("username");

    if (token && username) {
      // Check if the token is already stored to prevent repeated login attempts
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", token);
        login(username);
        navigate("/"); // Redirect to homepage after successful login
        window.location.reload(); // Force a full page reload
      }
    } else {
      console.error("Token or username missing in URL");
      navigate("/login"); // Redirect to login page if there's an error
    }
  }, [location, login, navigate]);

  return (
    <div className="text-center mt-20">
      <p>Logging in with Google...</p>
    </div>
  );
};

export default GoogleLogin;
