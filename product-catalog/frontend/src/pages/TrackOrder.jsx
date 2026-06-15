import React from 'react';
import { FaBoxOpen, FaSearchLocation } from 'react-icons/fa';

const TrackOrder = () => {
    return (
        <div className="container-fluid px-4 px-xl-5 py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-black text-gradient mb-3">Track Your Order</h1>
                <p className="lead text-adaptive opacity-75">Enter your order ID to see real-time tracking updates.</p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-lg-6">
                    <div className="glass-card p-4 p-md-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Order ID</label>
                                <input type="text" className="form-control glass-input form-control-lg" placeholder="e.g. ORD-123456789" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Email Address</label>
                                <input type="email" className="form-control glass-input form-control-lg" placeholder="Email used for the order" required />
                            </div>
                            <button type="submit" className="btn btn-primary-gradient btn-lg w-100 fw-bold shadow-sm">
                                Track Package <FaSearchLocation className="ms-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="glass-card p-5 text-center opacity-75" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
                        <FaBoxOpen size={48} className="text-muted mb-3 opacity-50" />
                        <h4 className="text-adaptive fw-bold">Enter your details above to view tracking history</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
