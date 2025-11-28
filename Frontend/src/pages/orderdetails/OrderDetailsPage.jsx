import React, { useEffect, useState } from 'react';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/order/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching order history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-history-page">
      <h2>Your Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Delivery To:</strong> {order.deliveryLocation}</p>
                <p><strong>Order Type:</strong> {order.cartSource}</p>
                {order.restaurantName && (
                    <p><strong>Restaurant:</strong> {order.restaurantName}</p>
                )}
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <div className="items">
                    {order.cartItems.map((item, index) => (
                    <div key={`${order._id}-${item.name}-${index}`} className="item">
                        <p>{item.name} × {item.quantity} - ₹{item.price * item.quantity}</p>
                    </div>
                    ))}
                </div>
                </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
