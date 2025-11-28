import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSource, setCartSource] = useState(null); // 'restaurant' | 'essentials'
  const [restaurantName, setRestaurantName] = useState(null); // For restaurant orders
  const addToCart = (item) => {
    const itemSource = item.source; // 'restaurant' or 'essentials'

    if (!cartSource) {
      // First item sets source
      setCartSource(itemSource);
      setCartItems([{ ...item, quantity: 1 }]);
    } else if (cartSource === itemSource) {
      // Same source, allow adding
      setCartItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    } else {
      alert(
        `You can only order from one section at a time. Please clear your cart to switch.`
      );
    }
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    if (updated.length === 0) {
      setCartSource(null);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartSource(null);
    setRestaurantName(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSource,
        setCartSource,
        restaurantName,
        setRestaurantName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
