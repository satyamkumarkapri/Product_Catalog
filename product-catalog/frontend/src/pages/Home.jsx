import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShippingFast, FaHeadset, FaShieldAlt, FaClock } from 'react-icons/fa';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [dealProduct, setDealProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 23, seconds: 59 });

    useEffect(() => {
        fetchFeatured();

        // Simple countdown timer for Deal of the Day
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const fetchFeatured = async () => {
        try {
            const data = await productService.getAllProducts();
            if (data && data.length > 0) {
                setFeaturedProducts(data.slice(0, 4));
                setDealProduct(data[data.length > 2 ? 2 : 0]); // Pick a product for Deal of the Day
            }
        } catch (error) {
            console.error("Error fetching featured products", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Massive Full-Bleed Edge-to-Edge Hero Section */}
            <div className="position-relative d-flex align-items-center justify-content-center mb-0" style={{ minHeight: '80vh', overflow: 'hidden', background: '#000' }}>
                
                {/* Background Image & Overlay */}
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ 
                        backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.3)'
                    }}
                ></div>
                
                {/* Floating Orbs for depth */}
                <div className="blob bg-primary position-absolute" style={{ top: '20%', left: '10%', width: '400px', height: '400px', filter: 'blur(100px)' }}></div>
                <div className="blob bg-info position-absolute" style={{ top: '60%', right: '10%', width: '300px', height: '300px', filter: 'blur(90px)' }}></div>
                <div className="blob bg-danger position-absolute" style={{ top: '40%', left: '40%', width: '250px', height: '250px', animationDelay: '2s', filter: 'blur(80px)' }}></div>

                {/* Hero Content */}
                <div className="container-fluid px-4 px-xl-5 text-center position-relative z-1 py-5">
                    <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill glass-card mb-4 text-white fw-bold border-0" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                        <span className="badge bg-danger rounded-pill px-3">SUMMER SALE</span> Up to 40% Off Premium Tech
                    </div>
                    
                    <h1 className="display-1 fw-black mb-4 text-white lh-1" style={{ fontWeight: 900 }}>
                        Elevate Your <br/>
                        <span className="animate-text-gradient">Digital Life</span>
                    </h1>
                    
                    <p className="col-md-7 mx-auto fs-4 text-white mb-5 fw-light" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                        Discover the latest smartphones, pro-grade laptops, and audiophile gear. Carefully curated for creators and professionals.
                    </p>
                    
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/products" className="btn btn-primary-gradient btn-lg px-5 py-3 rounded-pill fw-bold d-flex align-items-center gap-2 shadow-lg text-white" style={{ fontSize: '1.2rem' }}>
                            Shop the Sale <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Animated Brand Trust Marquee */}
            <div className="py-4 border-bottom border-secondary mb-5 marquee-container" style={{ background: 'var(--bg-card)' }}>
                <div className="animate-marquee d-flex align-items-center opacity-50">
                    <div className="d-flex align-items-center justify-content-around w-100 px-5 gap-5">
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">APPLE</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">SAMSUNG</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">SONY</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap" style={{ fontStyle: 'italic' }}>ASUS</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">BOSE</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">DELL</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">LENOVO</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">HP</h3>
                    </div>
                    {/* Duplicate for seamless looping */}
                    <div className="d-flex align-items-center justify-content-around w-100 px-5 gap-5">
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">APPLE</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">SAMSUNG</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">SONY</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap" style={{ fontStyle: 'italic' }}>ASUS</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">BOSE</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">DELL</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">LENOVO</h3>
                        <h3 className="fw-black mb-0 mx-5 text-nowrap">HP</h3>
                    </div>
                </div>
            </div>

            {/* Deal of the Day Section */}
            {dealProduct && (
                <div className="container-fluid px-4 px-xl-5 mb-5">
                    <div className="glass-card border-danger p-4 p-md-5 overflow-hidden position-relative hover-glow-cyan pulse-glow" style={{ borderRadius: '24px', border: '1px solid rgba(220, 53, 69, 0.3)' }}>
                        <div className="position-absolute top-0 end-0 bg-danger text-white px-4 py-2 fw-bold" style={{ borderBottomLeftRadius: '24px' }}>
                            DEAL OF THE DAY
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-5 text-center mb-4 mb-md-0">
                                {dealProduct.imageUrl ? (
                                    <img src={dealProduct.imageUrl} alt={dealProduct.name} className="img-fluid animate-float" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                ) : (
                                    <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{ height: '300px' }}><span className="text-muted">No Image</span></div>
                                )}
                            </div>
                            <div className="col-md-7 ps-md-5">
                                <div className="d-flex align-items-center gap-3 mb-3 text-danger fw-bold fs-5">
                                    <FaClock /> Ends in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                                <h2 className="fw-bolder text-adaptive mb-3">{dealProduct.name}</h2>
                                <p className="text-adaptive opacity-75 mb-4">{dealProduct.description}</p>
                                <div className="d-flex align-items-end gap-3 mb-4">
                                    <h1 className="fw-black text-danger mb-0">${(dealProduct.basePrice * 0.7).toFixed(2)}</h1>
                                    <span className="text-decoration-line-through text-muted fs-4">${dealProduct.basePrice}</span>
                                    <span className="badge bg-danger rounded-pill fs-6 ms-2">Save 30%</span>
                                </div>
                                <Link to={`/products/${dealProduct.id}`} className="btn btn-danger btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                    Grab the Deal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Trust Indicators */}
            <div className="container-fluid px-4 px-xl-5 mb-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-md-4">
                        <div className="glass-card p-4 text-center hover-lift transition-hover border-0 shadow-sm" style={{ background: 'var(--bg-card)' }}>
                            <FaShippingFast size={36} className="text-primary-light mb-3" />
                            <h5 className="fw-bold text-adaptive">Free Express Shipping</h5>
                            <p className="text-adaptive opacity-75 small mb-0">On all orders over $99. Arrives in 2-3 business days.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-4 text-center hover-lift transition-hover border-0 shadow-sm" style={{ background: 'var(--bg-card)' }}>
                            <FaShieldAlt size={36} className="text-info mb-3" />
                            <h5 className="fw-bold text-adaptive">30-Day Easy Returns</h5>
                            <p className="text-adaptive opacity-75 small mb-0">Not satisfied? Return it hassle-free within 30 days.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-4 text-center hover-lift transition-hover border-0 shadow-sm" style={{ background: 'var(--bg-card)' }}>
                            <FaHeadset size={36} className="text-warning mb-3" />
                            <h5 className="fw-bold text-adaptive">24/7 Premium Support</h5>
                            <p className="text-adaptive opacity-75 small mb-0">Our tech experts are always available to help you.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products / New Arrivals */}
            <div className="container-fluid px-4 px-xl-5 mb-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2 className="fw-bolder text-adaptive mb-1">New Arrivals</h2>
                        <p className="text-adaptive opacity-75 mb-0">The latest tech, just dropped.</p>
                    </div>
                    <Link to="/products" className="btn btn-outline-glass rounded-pill px-4">View All</Link>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                        {featuredProducts.map(product => (
                            <div className="col" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Shop by Category Preview */}
            <div className="container-fluid px-4 px-xl-5 mb-5 pb-5">
                <h2 className="fw-bolder text-adaptive mb-4 text-center">Shop by Category</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <Link to="/categories" className="text-decoration-none">
                            <div className="cinematic-card hover-lift transition-hover shadow-lg" style={{ height: '300px' }}>
                                <div className="cinematic-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop)'}}></div>
                                <div className="cinematic-overlay">
                                    <h3 className="text-white fw-bold mb-0">Laptops & PCs</h3>
                                    <p className="text-white opacity-90 mb-0">Power your productivity</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/categories" className="text-decoration-none">
                            <div className="cinematic-card hover-lift transition-hover shadow-lg" style={{ height: '300px' }}>
                                <div className="cinematic-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop)'}}></div>
                                <div className="cinematic-overlay">
                                    <h3 className="text-white fw-bold mb-0">Smartphones</h3>
                                    <p className="text-white opacity-90 mb-0">Stay connected anywhere</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/categories" className="text-decoration-none">
                            <div className="cinematic-card hover-lift transition-hover shadow-lg" style={{ height: '300px' }}>
                                <div className="cinematic-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop)'}}></div>
                                <div className="cinematic-overlay">
                                    <h3 className="text-white fw-bold mb-0">Audio & Sound</h3>
                                    <p className="text-white opacity-90 mb-0">Immersive listening</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
