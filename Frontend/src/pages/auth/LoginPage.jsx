import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get role from query param
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Only allow the real admin to access admin section
    if (role === "admin") {
      if (email === "yuglakhani33@gmail.com" && password === "Yug@1213" || email === "rushipatel2284@gmail.com" && password === "Rushi@2284") {
        setError("");
        navigate("/admin");
        return;
      } else {
        setError(
          "Invalid admin credentials. Only the real admin can access this section."
        );
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "delivery") {
        // For demo: always redirect to details form after delivery login
        navigate("/delivery/details");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-title">
          Sign In as{" "}
          {role === "admin"
            ? "Admin"
            : role === "delivery"
            ? "Delivery Boy"
            : "User"}
        </h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don&apos;t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
