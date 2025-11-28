import React, { useState } from "react";
import "./EssentialsCard.css";

import { useCart } from "../context/CartContext";

const EssentialsCard = ({ item }) => {
  const { name, description, price, image, id } = item;
  const [quantities, setQuantities] = useState({});
  const { addToCart, updateQuantity, cartSource } = useCart();

  const isDisabled = cartSource && cartSource !== "essentials";

  const handleAddToCart = () => {
    if (!isDisabled) {
      setQuantities((prev) => ({ ...prev, [id]: 1 }));
      addToCart({ ...item, source: "essentials" });
    }
  };

  const handleIncrement = () => {
    const newQty = (quantities[id] || 0) + 1;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    updateQuantity(id, newQty);
  };

  const handleDecrement = () => {
    const newQty = (quantities[id] || 0) - 1;
    if (newQty <= 0) {
      const copy = { ...quantities };
      delete copy[id];
      setQuantities(copy);
      updateQuantity(id, 0);
    } else {
      setQuantities((prev) => ({ ...prev, [id]: newQty }));
      updateQuantity(id, newQty);
    }
  };

  return (
    <div className="essentials-card">
      <img
        src={image }
        alt={name}
        className="essentials-image"
      />
      <div className="essentials-content">
        <h3 className="essentials-name">{name}</h3>
        <p className="essentials-desc">{description}</p>
        <div className="essentials-footer">
          <span className="essentials-price">₹{price}</span>
          {quantities[id] ? (
            <div className="quantity-controls">
              <button onClick={handleDecrement} disabled={isDisabled}>
                -
              </button>
              <span>{quantities[id]}</span>
              <button onClick={handleIncrement} disabled={isDisabled}>
                +
              </button>
            </div>
          ) : (
            <button
              className="essentials-add-btn"
              onClick={handleAddToCart}
              disabled={isDisabled}
            >
              {isDisabled ? "Cart Locked" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssentialsCard;
