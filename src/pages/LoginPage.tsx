import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors: { [key: string]: string } = {};

    if (!usernameOrEmail) {
      errors.usernameOrEmail = "Please enter a username or email";
      valid = false;
    }
    if (!password) {
      errors.password = "Please enter a password";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      navigate("/"); // Redirect to homepage
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/user/google/login";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username or Email</label>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {fieldErrors.usernameOrEmail && (
            <p className="text-red-400 text-sm">
              {fieldErrors.usernameOrEmail}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {fieldErrors.password && (
            <p className="text-red-400 text-sm">{fieldErrors.password}</p>
          )}
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium mb-4"
        >
          Login
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
        >
          Login with Google
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
