import React, { useState } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="mb-4">
            <h6 className="fw-bold mb-3 text-adaptive">Categories</h6>
            <div className="d-flex flex-wrap gap-2">
                <button 
                    className={`btn btn-sm rounded-pill ${!selectedCategory ? 'btn-primary-gradient' : 'btn-outline-glass'}`}
                    onClick={() => onSelectCategory('')}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className={`btn btn-sm rounded-pill ${selectedCategory === cat.name ? 'btn-primary-gradient' : 'btn-outline-glass'}`}
                        onClick={() => onSelectCategory(cat.name)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
