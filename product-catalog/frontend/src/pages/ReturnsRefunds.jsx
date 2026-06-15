import React from 'react';
import { FaUndoAlt, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const ReturnsRefunds = () => {
    return (
        <div className="container-fluid px-4 px-xl-5 py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-black text-gradient mb-3">Returns & Refunds</h1>
                <p className="lead text-adaptive opacity-75">We want you to be completely satisfied with your purchase.</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="glass-card p-4 p-md-5 mb-5">
                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaUndoAlt className="text-primary" /> 30-Day Return Policy
                        </h3>
                        <p className="text-adaptive opacity-75 lh-lg">
                            You can return any unused item in its original condition and packaging within 30 days of receipt for a full refund. 
                            Certain products like software licenses and personalized items are excluded.
                        </p>
                        
                        <hr className="border-secondary my-4" style={{ opacity: 0.15 }} />

                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaMoneyBillWave className="text-success" /> Refund Process
                        </h3>
                        <p className="text-adaptive opacity-75 lh-lg">
                            Once your return is received and inspected, we will send you an email notification. 
                            Approved refunds will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
                        </p>

                        <hr className="border-secondary my-4" style={{ opacity: 0.15 }} />

                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaShieldAlt className="text-info" /> How to Initiate a Return
                        </h3>
                        <ol className="text-adaptive opacity-75 lh-lg">
                            <li>Log into your account and navigate to the <strong>Orders</strong> section.</li>
                            <li>Select the order containing the item you wish to return.</li>
                            <li>Click on <strong>Request Return</strong> and follow the prompts.</li>
                            <li>Print the provided shipping label and attach it to your package.</li>
                            <li>Drop the package off at any authorized shipping center.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsRefunds;
