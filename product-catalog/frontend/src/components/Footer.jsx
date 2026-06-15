import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="glass-navbar text-adaptive pt-5 pb-3 mt-auto border-top border-secondary position-relative z-1">
            <div className="container-fluid px-4 px-xl-5">
                <div className="row g-4 mb-5">
                    {/* Brand & Social Column */}
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <Link className="text-decoration-none fw-bolder fs-3 text-gradient d-inline-block mb-3" to="/">CatalogX</Link>
                        <p className="text-adaptive opacity-75 mb-4 pe-lg-4">
                            The next generation of e-commerce. Premium tech, lightning-fast delivery, and an AI-powered shopping experience designed around you.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="https://www.facebook.com/profile.php?id=61555316020518" target="_blank" rel="noopener noreferrer" className="btn btn-outline-glass rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}><FaFacebook /></a>
                            <a href="https://x.com/satyam_kapri" target="_blank" rel="noopener noreferrer" className="btn btn-outline-glass rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}><FaTwitter /></a>
                            <a href="https://www.instagram.com/btw_its._satyam?igsh=c2VmYmN2MHBnemVq" target="_blank" rel="noopener noreferrer" className="btn btn-outline-glass rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}><FaInstagram /></a>
                            <a href="https://www.linkedin.com/in/satyamkumarkapri" target="_blank" rel="noopener noreferrer" className="btn btn-outline-glass rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}><FaLinkedin /></a>
                            <a href="https://github.com/satyamkumarkapri" target="_blank" rel="noopener noreferrer" className="btn btn-outline-glass rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}><FaGithub /></a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="col-lg-2 col-md-4 col-6 mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3 text-adaptive">Shop</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><Link to="/products" className="text-decoration-none text-adaptive opacity-75 d-inline-block">All Products</Link></li>
                            <li className="mb-2"><Link to="/categories" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Categories</Link></li>
                            <li className="mb-2"><Link to="/coming-soon" className="text-decoration-none text-adaptive opacity-75 d-inline-block">New Arrivals</Link></li>
                            <li className="mb-2"><Link to="/coming-soon" className="text-decoration-none text-danger opacity-75 d-inline-block fw-bold">Sale Offers</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="col-lg-2 col-md-4 col-6 mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3 text-adaptive">Support</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><Link to="/help-center" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Help Center</Link></li>
                            <li className="mb-2"><Link to="/track-order" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Track Order</Link></li>
                            <li className="mb-2"><Link to="/returns" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Returns & Refunds</Link></li>
                            <li className="mb-2"><Link to="/warranty" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Warranty</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-decoration-none text-adaptive opacity-75 d-inline-block">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="col-lg-4 col-md-4">
                        <h5 className="fw-bold mb-3 text-adaptive">Stay in the Loop</h5>
                        <p className="text-adaptive opacity-75 mb-3 small">
                            Subscribe to our newsletter to get the latest tech news, exclusive drops, and VIP sale access.
                        </p>
                        <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <input type="email" className="form-control glass-input" placeholder="Your email address" aria-label="Email address" required />
                                <button className="btn btn-primary-gradient px-3 text-white" type="submit">
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </form>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>By subscribing, you agree to our Privacy Policy and Terms of Service.</small>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-top border-secondary pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-0 text-muted small fw-medium">&copy; {new Date().getFullYear()} CatalogX Inc. All rights reserved.</p>
                    <div className="mt-2 mt-md-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="Visa" height="20" className="ms-3 opacity-50" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" height="20" className="ms-3 opacity-50" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" height="20" className="ms-3 opacity-50" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
