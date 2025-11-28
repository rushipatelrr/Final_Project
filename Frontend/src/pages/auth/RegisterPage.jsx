import React, { useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", 
    sex: "",
    mobile: "",
    image: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      sex,
      mobile,
      address,
    } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // For delivery boy, check extra fields
    if (role === "delivery" && (!sex || !mobile || !address)) {
      setError("Please fill all delivery boy details.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
          sex,
          mobile,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || data.message || "Registration failed.");
        return;
      }

      setError("");
      setSuccess(data.msg || "Registration successful! Redirecting...");
      setTimeout(() => {
        if (role === "delivery") {
        navigate("/");}
        else {
          navigate("/login");
        }
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Create Account</h1>
        

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-role-select">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="delivery"
                checked={formData.role === "delivery"}
                onChange={handleChange}
              />
              Delivery Boy
            </label>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* Delivery Boy Extra Fields */}
          {formData.role === "delivery" && (
            <>
              <input
                type="text"
                name="sex"
                placeholder="Gender"
                value={formData.sex}
                onChange={handleChange}
                required
              />
              
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
             
            </>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}

          <button type="submit">Register</button>
        </form>

        <p className="register-login-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
