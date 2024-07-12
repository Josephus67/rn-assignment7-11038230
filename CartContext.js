import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('Cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async (newCart) => {
    try {
      await AsyncStorage.setItem('Cart', JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    saveCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);