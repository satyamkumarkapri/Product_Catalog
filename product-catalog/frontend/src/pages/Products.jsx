import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter from '../components/PriceFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [selectedCategory, minPrice, maxPrice]);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let data;
            if (selectedCategory || minPrice || maxPrice) {
                const params = {};
                if (selectedCategory) params.category = selectedCategory;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;
                data = await productService.filterProducts(params);
            } else {
                data = await productService.getAllProducts();
            }
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid px-4 px-xl-5 py-4">
            <h2 className="mb-4">All Products</h2>
            <div className="row">
                <div className="col-md-3 col-xl-2 mb-4">
                    <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                        <h5 className="fw-bolder mb-4 text-gradient">Filters</h5>
                        <CategoryFilter 
                            categories={categories} 
                            selectedCategory={selectedCategory} 
                            onSelectCategory={setSelectedCategory} 
                        />
                        <hr className="bg-light opacity-25 my-4" />
                        <PriceFilter 
                            onFilterPrice={(min, max) => {
                                setMinPrice(min);
                                setMaxPrice(max);
                            }} 
                        />
                    </div>
                </div>
                <div className="col-md-9 col-xl-10">
                    {loading ? (
                        <LoadingSpinner />
                    ) : products.length === 0 ? (
                        <div className="alert alert-info">No products found matching your criteria.</div>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                            {products.map(product => (
                                <div className="col" key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
