import React from 'react';
import { FaCertificate, FaWrench, FaBan } from 'react-icons/fa';

const Warranty = () => {
    return (
        <div className="container-fluid px-4 px-xl-5 py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-black text-gradient mb-3">Warranty Information</h1>
                <p className="lead text-adaptive opacity-75">Peace of mind with our comprehensive protection plans.</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="glass-card p-4 p-md-5 mb-5">
                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaCertificate className="text-warning" /> Standard Manufacturer Warranty
                        </h3>
                        <p className="text-adaptive opacity-75 lh-lg">
                            All products sold on CatalogX come with a standard 1-year manufacturer warranty covering hardware defects and malfunctions under normal use conditions. 
                            Extended warranties up to 3 years are available for select premium items.
                        </p>
                        
                        <hr className="border-secondary my-4" style={{ opacity: 0.15 }} />

                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaWrench className="text-primary" /> What is Covered
                        </h3>
                        <ul className="text-adaptive opacity-75 lh-lg">
                            <li>Internal hardware failures not caused by physical damage.</li>
                            <li>Display defects (e.g., dead pixels exceeding manufacturer thresholds).</li>
                            <li>Battery failures within the first 6 months.</li>
                        </ul>

                        <hr className="border-secondary my-4" style={{ opacity: 0.15 }} />

                        <h3 className="fw-bold text-adaptive mb-4 d-flex align-items-center gap-3">
                            <FaBan className="text-danger" /> What is NOT Covered
                        </h3>
                        <ul className="text-adaptive opacity-75 lh-lg">
                            <li>Accidental damage, drops, spills, or liquid damage.</li>
                            <li>Cosmetic wear and tear, scratches, or dents.</li>
                            <li>Damage resulting from unauthorized modifications or repairs.</li>
                            <li>Software issues or data loss.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warranty;
