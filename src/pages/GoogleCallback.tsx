import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const GoogleCallback: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const username = urlParams.get('username');
      const email = urlParams.get('email');

      if (token && username && email) {
        // Store token and update user context
        localStorage.setItem("token", token);
        // Make sure the token is available for future API calls
        localStorage.setItem("isAuthenticated", "true");
        login({ username, email });
        navigate("/");
      } else {
        setError("Authentication failed");
        // Redirect to login after a delay
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleGoogleCallback();
  }, [navigate, login]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg text-white text-center">
        {error ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">Authentication Failed</h2>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Authentication Successful</h2>
            <p>Redirecting to home page...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;