import React, { createContext, useContext, useState, useEffect } from 'react';
import { userCart as mockUserCart } from '../data/mockData';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // For sidebar/modal if needed later

  useEffect(() => {
    // Initialize with mock data
    setCartItems(mockUserCart);
  }, []);

  const addToCart = (product) => {
    // Check if item already exists to avoid duplicates if that's the logic, 
    // or just add it. For figures, let's assume unique items for now or simple quantity.
    // Here we'll just add a new item with a unique ID.
    const newItem = {
      id: `c-${Date.now()}`,
      product: product,
      addedAt: new Date().toISOString(),
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
