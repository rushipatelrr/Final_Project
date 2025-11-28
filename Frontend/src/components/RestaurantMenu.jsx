// src/pages/RestaurantMenu.jsx
import React, { useState, useEffect } from "react";
import "./RestaurantMenu.css";
import { useCart } from "../context/CartContext";

const RestaurantMenu = ({ restaurantName, items }) => {
  const [quantities, setQuantities] = useState({});
  const { addToCart, updateQuantity, cartSource, setRestaurantName } =
    useCart();

  useEffect(() => {
    setRestaurantName(restaurantName); // ✅ Save on mount
  }, [restaurantName, setRestaurantName]);

  const isDisabled = cartSource && cartSource !== "restaurant";

  const handleAddToCart = (item) => {
    if (!isDisabled) {
      setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
      addToCart({ ...item, source: "restaurant" });
    }
  };

  const handleIncrement = (item) => {
    const newQty = (quantities[item.id] || 0) + 1;
    setQuantities((prev) => ({ ...prev, [item.id]: newQty }));
    updateQuantity(item.id, newQty);
  };

  const handleDecrement = (item) => {
    const newQty = (quantities[item.id] || 0) - 1;
    if (newQty <= 0) {
      const copy = { ...quantities };
      delete copy[item.id];
      setQuantities(copy);
      updateQuantity(item.id, 0); // remove item
    } else {
      setQuantities((prev) => ({ ...prev, [item.id]: newQty }));
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">{restaurantName} - Menu</h2>
      {items && items.length > 0 ? (
        <div className="menu-list">
          {items.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-card-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="menu-price">₹{item.price}</span>
              </div>

              {quantities[item.id] ? (
                <div className="quantity-controller">
                  <button
                    onClick={() => handleDecrement(item)}
                    disabled={isDisabled}
                  >
                    -
                  </button>
                  <span>{quantities[item.id]}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    disabled={isDisabled}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(item)}
                  disabled={isDisabled}
                >
                  {isDisabled ? "Cart Locked" : "Add to Cart"}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No menu items available.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
