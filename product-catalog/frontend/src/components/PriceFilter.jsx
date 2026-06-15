import React, { useState } from 'react';

const PriceFilter = ({ onFilterPrice }) => {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const handleApply = () => {
        onFilterPrice(min ? parseFloat(min) : null, max ? parseFloat(max) : null);
    };

    const handleClear = () => {
        setMin('');
        setMax('');
        onFilterPrice(null, null);
    };

    return (
        <div className="glass-card mb-4 p-3 border-0">
            <h6 className="fw-bold mb-3 text-adaptive">Price Range</h6>
            <div className="row g-2 mb-3">
                <div className="col-6">
                    <input 
                        type="number" 
                        className="form-control form-control-sm glass-input" 
                            placeholder="Min $" 
                            value={min} 
                            onChange={(e) => setMin(e.target.value)} 
                        />
                    </div>
                    <div className="col-6">
                        <input 
                            type="number" 
                            className="form-control form-control-sm glass-input" 
                            placeholder="Max $" 
                            value={max} 
                            onChange={(e) => setMax(e.target.value)} 
                        />
                    </div>
                </div>
            <div className="d-flex gap-2">
                <button className="btn btn-sm btn-primary-gradient w-50 rounded-pill" onClick={handleApply}>Apply</button>
                <button className="btn btn-sm btn-outline-glass w-50 rounded-pill" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default PriceFilter;
