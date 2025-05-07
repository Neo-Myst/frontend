import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/signup`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.redirected) {
        // If redirected, navigate to the login page and display a message
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
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      {fieldErrors.username && (
        <p style={{ color: "red" }}>{fieldErrors.username}</p>
      )}
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      {fieldErrors.email && <p style={{ color: "red" }}>{fieldErrors.email}</p>}
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
      <button onClick={handleSignup} style={{ padding: "10px 20px" }}>
        Signup
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupForm;
