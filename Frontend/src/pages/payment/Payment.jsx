import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css"; // Import external styles

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);
  const navigate = useNavigate();

  const upiId = "joshidev219@oksbi";
  const name = "Your Business Name";

  const handleGenerateQR = () => {
    if (!amount) {
      alert("Please enter amount.");
      return;
    }
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    if (!window.QRCode) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.onload = () => generateQRCode(upiUrl);
      document.body.appendChild(script);
    } else {
      generateQRCode(upiUrl);
    }
    setShowQR(true);
  };

  const generateQRCode = (upiUrl) => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      new window.QRCode(qrRef.current, {
        text: upiUrl,
        width: 200,
        height: 200,
      });
    }
  };

  const handleConfirmPayment = () => {
    navigate("/home");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Google Pay via UPI</h2>

        <input
          type="number"
          placeholder="Enter amount (INR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="payment-input"
        />

        <button onClick={handleGenerateQR} className="btn-generate">
          Generate UPI QR
        </button>

        {showQR && (
          <div className="qr-section">
            <p>Scan this QR to pay</p>
            <div ref={qrRef}></div>
            <button onClick={handleConfirmPayment} className="btn-confirm">
              Payment Done, Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
