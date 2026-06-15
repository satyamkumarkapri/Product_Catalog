import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
    return (
        <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <h1 className="display-3 fw-bolder text-gradient mb-4">Coming Soon</h1>
            <p className="lead text-adaptive opacity-75 mb-5" style={{ maxWidth: '600px' }}>
                We're working hard on bringing this feature to you. Stay tuned for updates!
            </p>
            <Link to="/" className="btn btn-primary-gradient rounded-pill px-4 py-2 fw-medium">
                Return to Home
            </Link>
        </div>
    );
};

export default ComingSoon;
