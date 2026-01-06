import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as addToCartService, removeFromCart as removeFromCartService } from '../services/tradeService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const items = await getCart(user.id);
          setCartItems(items);
        } catch (error) {
          console.error("Failed to load cart", error);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [isAuthenticated, user]);

  const addToCart = async (listingId) => {
    if (!isAuthenticated || !user?.id) {
        alert("Please login to add items to cart");
        return;
    }
    
    try {
        const newItem = await addToCartService(user.id, { listingId });
        setCartItems(prev => [...prev, newItem]);
        // Ideally we should re-fetch to be safe or just append
        // Re-fetching ensures data consistency but might be slower
        // const items = await getCart(user.id);
        // setCartItems(items);
    } catch (error) {
        alert("Failed to add to cart: " + error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
        await removeFromCartService(itemId);
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
        console.error("Failed to remove item", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
        // item.listing should be populated in CartItemResponse
        return total + (item.listing ? item.listing.price : 0);
    }, 0);
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
