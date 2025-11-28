import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleLoginOption = (role) => {
    setShowLoginOptions(false);
    if (role === "user") navigate("/login");
    else if (role === "delivery") navigate("/login?role=delivery");
    else if (role === "admin") navigate("/login?role=admin");
  };

  const handleGuestBrowse = () => {
    navigate("/home");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="landing-page">
        <h1 className="title">CAMPUS CRAVINGS</h1>
        <p className="subtitle">Essentials delivered from your campus shops</p>
        <p className="description">
          Skip the line — order food, stationery, and more to your classroom or
          hostel.
        </p>
       <div className="button-group">
  <button
    className="register-btn"
    onClick={() => setShowLoginOptions((prev) => !prev)}
  >
    Sign In
  </button>

  {showLoginOptions && (
    <div className="login-option-buttons">
      <button onClick={() => handleLoginOption("user")}>User</button>
      <button onClick={() => handleLoginOption("delivery")}>Delivery Boy</button>
      <button onClick={() => handleLoginOption("admin")}>Admin</button>
    </div>
  )}

  <button className="guest-btn" onClick={handleGuestBrowse}>
    Browse as Guest
  </button>
</div>
      </div>

      {/* Info Sections */}
      <div className="section">
        <h1 className="section-title">What We Do</h1>
        <p className="section-subtitle">Bringing the campus to your doorstep</p>
        <p className="section-text">
          We provide delivery for food, stationery, and essentials across
          hostels, classrooms, and library zones.
        </p>
      </div>
      <div className="section alt-bg">
        <h1 className="section-title">Why Choose Us?</h1>
        <p className="section-subtitle">Reliable. Fast. Personalized.</p>
        <p className="section-text">
          Campus Cravings is designed to make your campus life easier by
          avoiding queues and optimizing your time.
        </p>
      </div>
    </>
  );
};

export default LandingPage;
