import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryBoyDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    sex: "male",
    
    mobile: "",
    
    address: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const res = await fetch("http://localhost:5000/api/deliveryboy/apply", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to submit application");
      setSubmitted(true);
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-box">
          <h2>Application Submitted</h2>
          <p>Your application for Delivery Boy has been submitted.</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Delivery Boy Details</h2>
        <form
          className="auth-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select name="sex" value={form.sex} onChange={handleChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryBoyDetails;
