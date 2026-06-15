import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const data = await productService.getProductDetails(id);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product details", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!product) return <div className="container py-5 text-center"><h2 className="text-gradient">Product not found</h2></div>;

    return (
        <div className="container py-5">
            <Link to="/products" className="btn btn-outline-glass rounded-pill px-4 mb-5 d-inline-flex align-items-center gap-2">
                <FaArrowLeft /> Back to Catalog
            </Link>
            
            <div className="row g-5">
                {/* Immersive Image Section */}
                <div className="col-lg-7">
                    <div className="glass-card p-2 mb-5 text-center border-0" style={{ borderRadius: '30px', background: 'rgba(25, 25, 30, 0.2)' }}>
                        {product.imageUrl ? (
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="img-fluid w-100" 
                                style={{ objectFit: 'cover', maxHeight: '600px', borderRadius: '25px' }}
                            />
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{height: '500px', borderRadius: '25px', background: 'rgba(255,255,255,0.05)'}}>
                                <h1 className="text-muted opacity-50">No Image</h1>
                            </div>
                        )}
                    </div>

                    {/* Specifications Section */}
                    <div>
                        <h3 className="fw-bolder mb-4 text-gradient">Technical Details</h3>
                        
                        {product.detailedDescription && (
                            <div className="mb-5">
                                <h5 className="fw-bold text-info mb-3">Overview</h5>
                                <p className="text-adaptive opacity-75" style={{ lineHeight: 1.8 }}>{product.detailedDescription}</p>
                            </div>
                        )}

                        {product.features && (
                            <div className="mb-5">
                                <h5 className="fw-bold text-primary-light mb-3">Key Features</h5>
                                <ul className="list-group list-group-flush bg-transparent">
                                    {product.features.split(',').map((f, i) => (
                                        <li key={i} className="list-group-item bg-transparent text-adaptive opacity-75 border-secondary py-3 px-0">
                                            <FaCheckCircle className="text-success me-3" /> {f.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.specifications && (
                            <div className="mb-5">
                                <h5 className="fw-bold text-gradient mb-3">Specifications</h5>
                                <div className="table-responsive">
                                    <table className="table table-borderless text-adaptive opacity-75">
                                        <tbody>
                                            {Object.entries(typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications).map(([key, value]) => (
                                                <tr key={key} className="border-bottom border-secondary">
                                                    <th className="py-3 ps-0 text-capitalize" style={{ width: '40%' }}>{key.replace(/_/g, ' ')}</th>
                                                    <td className="py-3">{value.toString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sticky Purchase Card */}
                <div className="col-lg-5">
                    <div className="glass-card p-5 sticky-top hover-glow-cyan transition-hover" style={{ top: '120px', borderRadius: '24px' }}>
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <span className="badge bg-primary text-white px-3 py-2 rounded-pill fw-bold" style={{ letterSpacing: '1px' }}>{product.brand}</span>
                            <span className="text-muted small">SKU: {product.sku}</span>
                        </div>
                        
                        <h2 className="fw-bolder mb-4 text-adaptive lh-sm" style={{ fontSize: '2.5rem' }}>{product.name}</h2>
                        
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                            <div className="d-flex align-items-end gap-3 mb-2">
                                <span className="fw-black text-gradient" style={{ fontSize: '3rem', lineHeight: 1 }}>
                                    ${product.discountPrice || product.basePrice}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-decoration-line-through text-muted mb-2 fs-5">${product.basePrice}</span>
                                )}
                            </div>
                            {product.discountPrice && (
                                <span className="badge bg-success text-white py-2 px-3 rounded-pill">
                                    Save ${(product.basePrice - product.discountPrice).toFixed(2)}
                                </span>
                            )}
                        </div>
                        
                        <div className="mb-5">
                            <div className="d-flex align-items-center gap-3 mb-2">
                                {product.stockQuantity > 0 ? (
                                    <span className="text-success fw-bold d-flex align-items-center gap-2">
                                        <FaCheckCircle size={20} /> In Stock ({product.stockQuantity} available)
                                    </span>
                                ) : (
                                    <span className="text-danger fw-bold d-flex align-items-center gap-2">
                                        <FaTimesCircle size={20} /> Out of Stock
                                    </span>
                                )}
                            </div>
                            {product.warehouseLocation && (
                                <div className="text-muted small ms-4">
                                    Ships from: <span className="text-light">{product.warehouseLocation}</span>
                                </div>
                            )}
                        </div>

                        <button 
                            className="btn btn-primary-gradient btn-lg w-100 rounded-pill py-3 fw-bold fs-5 d-flex align-items-center justify-content-center gap-3" 
                            disabled={product.stockQuantity <= 0}
                            onClick={async () => {
                                const success = await addToCart(product.id, 1);
                                if (!success) {
                                    navigate('/login');
                                }
                            }}
                        >
                            <FaShoppingCart size={24} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
