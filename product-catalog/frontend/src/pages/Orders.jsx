import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaCalendarAlt, FaTruck } from 'react-icons/fa';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await orderService.getUserOrders();
            // Sort by most recent first
            const sortedData = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            setOrders(sortedData);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError('Failed to load your orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-gradient d-inline-block">My Orders</h1>
            
            {error && <div className="alert alert-danger glass-card border-danger text-danger">{error}</div>}
            
            {!loading && orders.length === 0 && !error ? (
                <div className="text-center py-5 glass-card">
                    <FaBoxOpen size={80} className="text-muted mb-4 opacity-50" />
                    <h2 className="text-adaptive mb-3">No orders yet</h2>
                    <p className="text-muted mb-4">You haven't placed any orders with us yet. Start shopping to fill this space!</p>
                    <Link to="/products" className="btn btn-primary-gradient rounded-pill px-4 py-2 fw-bold">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {orders.map(order => (
                        <div key={order.id} className="col-12">
                            <div className="card glass-card border-0 hover-lift transition-hover overflow-hidden">
                                <div className="card-header bg-primary bg-opacity-10 border-bottom border-light d-flex justify-content-between align-items-center py-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                            <FaBoxOpen size={20} />
                                        </div>
                                        <div>
                                            <h5 className="mb-0 fw-bold text-adaptive">Order #{order.id}</h5>
                                            <small className="text-muted d-flex align-items-center gap-1">
                                                <FaCalendarAlt /> {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className={`badge rounded-pill px-3 py-2 ${order.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {order.status || 'PROCESSING'}
                                        </span>
                                        <h4 className="mt-2 mb-0 fw-bolder text-gradient">${order.totalAmount?.toFixed(2)}</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h6 className="fw-bold mb-3 text-adaptive"><FaTruck className="me-2 text-muted" /> Shipping To: <span className="fw-normal">{order.shippingAddress}</span></h6>
                                    
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle text-adaptive mb-0">
                                            <tbody>
                                                {order.items?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td style={{ width: '80px' }}>
                                                            {item.imageUrl ? (
                                                                <img src={item.imageUrl} alt={item.productName} className="img-fluid rounded shadow-sm" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div className="bg-secondary bg-opacity-25 rounded d-flex align-items-center justify-content-center text-muted" style={{ width: '60px', height: '60px' }}>
                                                                    <FaBoxOpen />
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Link to={`/products/${item.productId}`} className="text-decoration-none fw-medium text-adaptive hover-lift d-inline-block">
                                                                {item.productName}
                                                            </Link>
                                                        </td>
                                                        <td className="text-end text-muted">
                                                            {item.quantity} x ${item.priceAtPurchase?.toFixed(2)}
                                                        </td>
                                                        <td className="text-end fw-bold">
                                                            ${(item.quantity * item.priceAtPurchase).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
