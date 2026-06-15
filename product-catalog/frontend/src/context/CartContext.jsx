import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            return false;
        }
        try {
            const response = await api.post('/cart/add', { productId, quantity });
            setCart(response.data);
            alert("Added to cart successfully!");
            return true;
        } catch (error) {
            console.error("Error adding to cart", error);
            return false;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await api.delete(`/cart/item/${itemId}`);
            setCart(response.data);
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    const clearCart = () => {
        setCart(null);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
