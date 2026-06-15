import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Generate a dummy rating based on product ID to keep it consistent
    const dummyRating = 4 + (product.id % 10) / 10; 
    const dummyReviews = 50 + (product.id % 200);

    return (
        <div className="card h-100 glass-card hover-lift transition-hover border-0 text-adaptive position-relative">
            {/* Sale Badge */}
            {product.discountPrice && (
                <div className="position-absolute top-0 end-0 m-3 z-1">
                    <span className="badge bg-danger rounded-pill shadow-sm py-2 px-3 fw-bold">SALE</span>
                </div>
            )}
            
            {product.imageUrl && (
                <Link to={`/products/${product.id}`} className="text-decoration-none">
                    <div className="img-zoom-hover rounded-top bg-white d-flex align-items-center justify-content-center p-3" style={{ overflow: 'hidden', height: '220px' }}>
                        <img 
                            src={product.imageUrl} 
                            className="card-img-top" 
                            alt={product.name} 
                            style={{ maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </Link>
            )}
            
            <div className="card-body d-flex flex-column">
                <Link to={`/products/${product.id}`} className="text-decoration-none text-adaptive">
                    <h5 className="card-title fw-bold mb-1 lh-sm" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={product.name}>
                        {product.name}
                    </h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-primary-light small fw-medium">{product.brand}</h6>
                
                {/* Dummy Star Ratings */}
                <div className="d-flex align-items-center mb-3">
                    <div className="text-warning small me-2 d-flex">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className={dummyRating > 4.5 ? "" : "text-muted opacity-50"} />
                    </div>
                    <span className="text-muted small">({dummyRating.toFixed(1)}) {dummyReviews} reviews</span>
                </div>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <div>
                            <span className="fs-4 fw-bolder text-gradient d-block lh-1">
                                ${product.discountPrice ? product.discountPrice : product.basePrice}
                            </span>
                            {product.discountPrice && (
                                <span className="text-decoration-line-through text-muted small">
                                    ${product.basePrice}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-primary-gradient flex-grow-1 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                            disabled={product.stockQuantity <= 0}
                            onClick={async (e) => {
                                e.preventDefault();
                                const success = await addToCart(product.id, 1);
                                if (!success) {
                                    navigate('/login');
                                }
                            }}
                        >
                            {product.stockQuantity > 0 ? (
                                <><FaShoppingCart /> Add to Cart</>
                            ) : (
                                "Out of Stock"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
