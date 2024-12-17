import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors: { [key: string]: string } = {};

    if (!username) {
      errors.username = "Please enter a username";
      valid = false;
    }
    if (!email) {
      errors.email = "Please enter an email";
      valid = false;
    }
    if (!password) {
      errors.password = "Please enter a password";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://18.232.187.175:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.redirected) {
        const redirectMessage =
          response.headers.get("message") ||
          "User already exists. Please login.";
        alert(redirectMessage);
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }

      navigate("/");
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://18.232.187.175:8000/user/google/login";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {fieldErrors.username && (
            <p className="text-red-400 text-sm">{fieldErrors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {fieldErrors.email && (
            <p className="text-red-400 text-sm">{fieldErrors.email}</p>
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
          onClick={handleSignup}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium mb-4"
        >
          Signup
        </button>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
        >
          Signup with Google
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
