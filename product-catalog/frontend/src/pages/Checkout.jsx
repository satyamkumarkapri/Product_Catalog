import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const [shippingAddress, setShippingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart || !cart.items || cart.items.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders/place', { shippingAddress, phoneNumber });
            alert("Order placed successfully!");
            // The backend clears the cart, we can just redirect
            // Since we don't have an order history page yet, redirect to home
            navigate('/');
            // Reload window to clear frontend cart context cache temporarily
            window.location.reload();
        } catch (err) {
            const data = err.response?.data;
            if (typeof data === 'string') {
                setError(data);
            } else if (data && data.message) {
                setError(data.message);
            } else {
                setError('Failed to place order.');
            }
        }
    };

    if (!cart || !cart.items || cart.items.length === 0) return null;

    const total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-7">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h4 className="mb-4">Shipping Details</h4>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handlePlaceOrder}>
                                <div className="mb-3">
                                    <label className="form-label">Shipping Address</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="3" 
                                        value={shippingAddress} 
                                        onChange={(e) => setShippingAddress(e.target.value)} 
                                        required 
                                        placeholder="123 Main St, City, State, ZIP"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        className="form-control" 
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        required 
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <button type="submit" className="btn btn-success btn-lg w-100">
                                    Place Order - ${total.toFixed(2)}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card shadow-sm bg-light">
                        <div className="card-body p-4">
                            <h4 className="mb-4">Order Summary</h4>
                            {cart.items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between mb-2">
                                    <span>{item.productName} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
