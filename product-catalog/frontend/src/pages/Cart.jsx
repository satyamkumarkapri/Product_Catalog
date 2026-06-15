import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h2>Your Cart is Empty</h2>
                <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    const total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    {cart.items.map(item => (
                        <div key={item.id} className="card mb-3 shadow-sm">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.productName}</h5>
                                    <p className="text-muted mb-0">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-end">
                                    <h5 className="mb-2 text-success">${(item.price * item.quantity).toFixed(2)}</h5>
                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-outline-danger">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 bg-light">
                        <div className="card-body p-4">
                            <h4 className="mb-4">Order Summary</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <strong>${total.toFixed(2)}</strong>
                            </div>
                            <hr />
                            <button className="btn btn-success btn-lg w-100" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
