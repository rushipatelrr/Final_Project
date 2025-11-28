import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/comman/Navbar';
import './HomePage.css';
import stationary from '../../assets/images/stationary.gif';
import food from '../../assets/images/food.gif';
import hello from '../../assets/images/hello.gif';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [special, setSpecial] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [mood, setMood] = useState(null);

  // NEW STATES FOR RECOMMENDATIONS
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));

    // daily offer special
    const specials = [
      "🔥 20% off on Burgers today!",
      "🍕 Pizza Lovers’ Day – Buy 1 Get 1!",
      "☕ Free Coffee with any snack",
      "🥗 Healthy Salad Discount – 15% Off",
      "🍩 Sweet Deal: Donuts at half price!"
    ];
    setSpecial(specials[Math.floor(Math.random() * specials.length)]);


    // NEW: Fetch Recommendations from your GNN microservice
    fetch("http://localhost:8000/popular?limit=5")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Recommendations:", data);
        setRecommendations(data);
      })
      .catch((err) => console.error("Recommendation Fetch Error:", err));

  }, [navigate]);



  // NEW: Spin roulette → show next recommended item
  const spinRoulette = () => {

    if (recommendations.length === 0) {
      alert("Recommendations not loaded yet!");
      return;
    }

    setSpinning(true);

    setTimeout(() => {
      const nextItem = recommendations[currentIndex];

      setMood(nextItem.name);

      // Move to next recommended item
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
      setSpinning(false);
    }, 1500);
  };


  return (
    <>
      <Navbar />
      <div className="home-container">

        {/* User Welcome */}
        {user && (
          <div className="welcome-wrapper">
            <h2 className="welcome-msg">Hello, {user.name}</h2>
            <img className="hello-icon" src={hello} alt="Hello Icon" />
          </div>
        )}

        {/* Daily Special Banner */}
        <div className="special-banner">
          <p>{special}</p>
        </div>

        <p className="subheading">What would you like to explore today?</p>

        {/* Category Cards */}
        <div className="category-grid">
          <div className="category-card food" onClick={() => navigate('/food')}>
            <img src={food} alt="Food Icon" />
            <h3>Food & Beverages</h3>
          </div>

          <div className="category-card essentials" onClick={() => navigate('/essentials')}>
            <img src={stationary} alt="Stationary Icon" />
            <h3>Essentials & Stationery</h3>
          </div>
        </div>

        {/* Roulette Section */}
        {/* Roulette Section */}
<div className="roulette-container">

  <button className="spin-btn" onClick={spinRoulette} disabled={spinning}>
    {spinning ? "🎡 Spinning..." : "🎯 Find Today's Best Pick"}
  </button>

  {mood && (
    <div className="recommendation-card fade-in">
      <div className="rec-header">
        <span className="trending-badge">🔥 Trending</span>
      </div>

      <h2 className="rec-title">{mood}</h2>
      <p className="rec-subtitle">Based on today’s popularity & ratings</p>

      <button className="order-now-btn" onClick={() => navigate('/food')}>
        Explore More 🍽️
      </button>
    </div>
  )}

</div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={() => navigate('/orders')}>🧾 My Orders</button>
        </div>

      </div>
    </>
  );
};

export default HomePage;
