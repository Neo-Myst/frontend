import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const SignupPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }
    
    if (!password) {
      errors.password = "Please enter a password";
      valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    }
  
    setFieldErrors(errors);
    return valid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // This is the endpoint being used for registration
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.detail) {
          throw new Error(errorData.detail);
        } else if (response.status === 409) {
          throw new Error("User with this email or username already exists");
        } else {
          throw new Error("Registration failed");
        }
      }

      const data = await response.json();
      console.log("Signup response data:", data);
      
      // Store token and update user context
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("isAuthenticated", "true");
      
      // Explicitly store user data in localStorage first
      const userData = { 
        username: data.username || username, // Fallback to input if API doesn't return it
        email: data.email || email // Fallback to input if API doesn't return it
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Then call login with the same data
      login(userData);
      
      // Add a small delay before navigation to ensure context is updated
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/user/google/login`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
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
          
          <div className="mb-4">
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
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium mb-4"
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        
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
