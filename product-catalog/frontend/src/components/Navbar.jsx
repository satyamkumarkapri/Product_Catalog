import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaSun, FaMoon, FaFire, FaBolt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/semantic-search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    
    const isActive = (path) => location.pathname === path ? 'active text-adaptive fw-bold' : 'text-adaptive opacity-75';

    return (
        <header className="fixed-top w-100" style={{ zIndex: 1030 }}>


            {/* Main Navbar */}
            <nav className={`navbar navbar-expand-lg ${scrolled ? 'glass-navbar scrolled' : 'glass-navbar py-3'}`} style={{ transition: 'all 0.4s ease', position: 'relative', zIndex: 10 }}>
                <div className="container-fluid px-4 px-xl-5">
                    <Link className="navbar-brand fw-bolder fs-3 text-gradient d-flex align-items-center gap-2" to="/">
                        <FaBolt className="text-primary" /> CatalogX
                    </Link>
                    
                    {/* Centered Search Bar for E-Commerce Feel */}
                    <div className="d-none d-lg-flex mx-auto" style={{ width: '400px' }}>
                        <form className="input-group" onSubmit={handleSearchSubmit}>
                            <input 
                                type="text" 
                                className="form-control glass-input" 
                                placeholder="Search products, categories..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary-gradient text-white">
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon" style={{ filter: theme === 'light' ? 'none' : 'invert(1)' }}></span>
                    </button>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
                            <button onClick={toggleTheme} className="btn btn-link text-adaptive opacity-75 hover-lift p-0 border-0" title="Toggle Theme">
                                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                            </button>
                            <Link to="/semantic-search" className="text-adaptive opacity-75 hover-lift d-lg-none"><FaSearch size={18} /></Link>
                            
                            {/* Improved Cart Icon */}
                            <Link to="/cart" className="text-adaptive position-relative opacity-100 d-flex align-items-center gap-2 text-decoration-none fw-medium">
                                <div className="position-relative">
                                    <FaShoppingCart size={22} />
                                    {cartCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem', padding: '0.25em 0.5em', transform: 'translate(-30%, -30%)'}}>
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="d-none d-xl-inline ms-1">Cart</span>
                            </Link>

                            {user ? (
                                <div className="dropdown">
                                    <button className="btn btn-outline-glass dropdown-toggle px-3 py-2 rounded-pill d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                                        <FaUser /> <span className="fw-medium d-none d-sm-inline">Hello, {user.fullName?.split(' ')[0] || user.email.split('@')[0]}</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow-lg glass-card border-0 mt-2 p-2">
                                        <li><Link className="dropdown-item text-adaptive rounded py-2 mb-1" to="/profile"><FaUser className="me-2 text-muted"/> Account</Link></li>
                                        <li><Link className="dropdown-item text-adaptive rounded py-2 mb-1" to="/orders"><i className="fa fa-box me-2 text-muted"></i> Orders</Link></li>
                                        {user.roleLevel === 3 && (
                                            <li><Link className="dropdown-item text-primary rounded py-2 mb-1 fw-bold" to="/admin"><FaUser className="me-2"/> Admin Dashboard</Link></li>
                                        )}
                                        {user.roleLevel === 2 && (
                                            <li><Link className="dropdown-item text-info rounded py-2 mb-1 fw-bold" to="/manager"><FaUser className="me-2"/> Manager Dashboard</Link></li>
                                        )}
                                        <li><hr className="dropdown-divider bg-secondary opacity-25" /></li>
                                        <li><button className="dropdown-item text-danger rounded py-2 fw-bold" onClick={handleLogout}><FaSignOutAlt className="me-2"/> Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="d-flex gap-3">
                                    <Link to="/login" className="btn btn-link text-adaptive text-decoration-none fw-medium d-none d-sm-inline">Log In</Link>
                                    <Link to="/register" className="btn btn-primary-gradient rounded-pill px-4 text-white fw-bold">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Category Bar */}
            <div className="d-none d-lg-block border-bottom border-secondary position-relative" style={{ background: 'var(--bg-dark)', zIndex: 5 }}>
                <div className="container-fluid px-4 px-xl-5">
                    <ul className="nav nav-pills py-2 px-0 mx-0 w-100 d-flex justify-content-center gap-5" style={{ fontSize: '0.95rem' }}>
                        <li className="nav-item"><Link to="/products" className="nav-link text-adaptive px-0 py-2 fw-medium hover-lift">All Products</Link></li>
                        <li className="nav-item"><Link to="/categories" className="nav-link text-adaptive px-0 py-2 fw-medium hover-lift">Categories</Link></li>
                        <li className="nav-item"><Link to="/coming-soon" className="nav-link text-danger px-0 py-2 fw-bold hover-lift">Today's Deals</Link></li>
                        <li className="nav-item"><Link to="/coming-soon" className="nav-link text-adaptive px-0 py-2 fw-medium hover-lift">Best Sellers</Link></li>
                        <li className="nav-item"><Link to="/coming-soon" className="nav-link text-adaptive px-0 py-2 fw-medium hover-lift">New Releases</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
