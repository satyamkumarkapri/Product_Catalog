import React from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';

const HelpCenter = () => {
    return (
        <div className="container-fluid px-4 px-xl-5 py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-black text-gradient mb-3">Help Center</h1>
                <p className="lead text-adaptive opacity-75">How can we help you today?</p>
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="input-group input-group-lg mt-4 shadow-sm">
                        <span className="input-group-text glass-input border-end-0 bg-transparent text-muted"><FaSearch /></span>
                        <input type="text" className="form-control glass-input border-start-0" placeholder="Search for articles, questions, etc..." />
                    </div>
                </div>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-lg-8">
                    <div className="glass-card p-4 p-md-5">
                        <h3 className="fw-bold mb-4 d-flex align-items-center gap-2"><FaQuestionCircle className="text-primary" /> Frequently Asked Questions</h3>
                        <div className="accordion accordion-flush bg-transparent" id="faqAccordion">
                            {/* FAQ 1 */}
                            <div className="accordion-item bg-transparent border-secondary mb-3 rounded overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-adaptive fw-medium py-3" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                        What is the estimated delivery time?
                                    </button>
                                </h2>
                                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-adaptive opacity-75 pt-0">
                                        Standard shipping usually takes 3-5 business days. Express shipping is available for 1-2 business days delivery. You can track your order using your Order ID.
                                    </div>
                                </div>
                            </div>
                            {/* FAQ 2 */}
                            <div className="accordion-item bg-transparent border-secondary mb-3 rounded overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-adaptive fw-medium py-3" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                        How do I reset my password?
                                    </button>
                                </h2>
                                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-adaptive opacity-75 pt-0">
                                        Click on 'Forgot Password' on the login page. Enter your email address and we will send you a secure link to reset your password.
                                    </div>
                                </div>
                            </div>
                            {/* FAQ 3 */}
                            <div className="accordion-item bg-transparent border-secondary mb-3 rounded overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-adaptive fw-medium py-3" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                        Do you ship internationally?
                                    </button>
                                </h2>
                                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-adaptive opacity-75 pt-0">
                                        Currently, we ship to over 50 countries worldwide. Shipping costs and delivery times vary based on the destination.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
