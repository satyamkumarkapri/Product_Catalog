import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import SemanticSearch from './pages/SemanticSearch';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ComingSoon from './pages/ComingSoon';
import HelpCenter from './pages/HelpCenter';
import TrackOrder from './pages/TrackOrder';
import ReturnsRefunds from './pages/ReturnsRefunds';
import Warranty from './pages/Warranty';
import ContactUs from './pages/ContactUs';
import { ThemeProvider } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-shrink-0 pb-3" style={{flex: '1', position: 'relative', zIndex: 1, paddingTop: '140px'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/semantic-search" element={<SemanticSearch />} />
            <Route path="/categories" element={<Products />} /> {/* Alias to Products for now */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/returns" element={<ReturnsRefunds />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={
              <div className="container py-5 text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2>Page Not Found</h2>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
