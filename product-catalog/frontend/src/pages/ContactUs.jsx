import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className="container-fluid px-4 px-xl-5 py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-black text-gradient mb-3">Contact Us</h1>
                <p className="lead text-adaptive opacity-75">We'd love to hear from you. Get in touch with our team.</p>
            </div>

            <div className="row g-5 justify-content-center">
                <div className="col-lg-5">
                    <div className="glass-card p-4 p-md-5 h-100">
                        <h3 className="fw-bold text-adaptive mb-4">Send a Message</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Full Name</label>
                                <input type="text" className="form-control glass-input" placeholder="Satyam" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Email Address</label>
                                <input type="email" className="form-control glass-input" placeholder="satyam@example.com" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Subject</label>
                                <input type="text" className="form-control glass-input" placeholder="How can we help?" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-adaptive fw-medium">Message</label>
                                <textarea className="form-control glass-input" rows="5" placeholder="Type your message here..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary-gradient px-4 py-3 fw-bold w-100 shadow-sm">
                                Send Message <FaPaperPlane className="ms-2" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                        <h3 className="fw-bold text-adaptive mb-5">Contact Information</h3>
                        
                        <div className="d-flex align-items-center gap-4 mb-4">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '60px', height: '60px' }}>
                                <FaEnvelope size={24} />
                            </div>
                            <div>
                                <h5 className="fw-bold text-adaptive mb-1">Email Us</h5>
                                <p className="text-adaptive opacity-75 mb-0">support@catalogx.com</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-4 mb-4">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center text-success" style={{ width: '60px', height: '60px' }}>
                                <FaPhoneAlt size={24} />
                            </div>
                            <div>
                                <h5 className="fw-bold text-adaptive mb-1">Call Us</h5>
                                <p className="text-adaptive opacity-75 mb-0">+1 (800) 123-4567</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                            <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center text-danger" style={{ width: '60px', height: '60px' }}>
                                <FaMapMarkerAlt size={24} />
                            </div>
                            <div>
                                <h5 className="fw-bold text-adaptive mb-1">Visit Us</h5>
                                <p className="text-adaptive opacity-75 mb-0">1 Tech Boulevard<br/>Silicon Valley, CA 94000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
