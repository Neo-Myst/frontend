import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`, {
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      {fieldErrors.usernameOrEmail && (
        <p style={{ color: "red" }}>{fieldErrors.usernameOrEmail}</p>
      )}
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      {fieldErrors.password && (
        <p style={{ color: "red" }}>{fieldErrors.password}</p>
      )}
      <br />
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
