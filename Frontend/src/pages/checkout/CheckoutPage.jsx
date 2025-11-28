import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, clearCart, cartSource, restaurantName } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryLocation: '',
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      ...formData,
      cartSource,
      totalAmount: total + 2,
      cartItems,
      restaurantName,
    };

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/order/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        navigate('/home');
      } else {
        const error = await res.json();
        alert(error.message || 'Order failed. Try again.');
      }
    } catch (err) {
      alert('Error placing order.');
      console.error(err);
    }
  };

  return (
   <div className="checkout-container">
  <h2 className="checkout-title">Checkout</h2>

  <div className="checkout-content">
    {/* LEFT: Form */}
    <form className="checkout-form" onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
      <input name="deliveryLocation" placeholder="Delivery Location" value={formData.deliveryLocation} onChange={handleInputChange} />
    </form>

    {/* RIGHT: Cart Items */}
    <div className="cart-section">
      <div className="checkout-list">
        {cartItems.map((item, idx) => (
          <div key={idx} className="checkout-item">
            <div className="checkout-info">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity} × ₹{item.price}</p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <strong>Total:</strong> ₹{total + 2}
      </div>

      <button className="place-order-btn" onClick={handleSubmit}>Place Order</button>
    </div>
  </div>
</div>

);

};

export default CheckoutPage;
