import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import cart from '../../assets/images/shopping-cart.gif';
const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/home')}>

        <span className="navbar-title">CampusCravings</span>
      </div>

      <div className="navbar-right">
        <button className="about-btn" onClick={() => navigate('/home')}>Home</button>

        <img
          src={cart}
          alt="Cart"
          className="navbar-cart"
          onClick={() => navigate('/cart')}
        />

        <div className="profile-section">
          <button className="profile-btn" onClick={toggleDropdown}>
            {user?.name || 'Profile'} ⌄
          </button>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={() => navigate('/profile')}>Profile Details</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
