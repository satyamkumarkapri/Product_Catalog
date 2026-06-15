import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import searchService from '../services/searchService';
import productService from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaRobot } from 'react-icons/fa';

const SemanticSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const q = queryParams.get('q');
        if (q && !searched) {
            setQuery(q);
            performSearch(q);
        }
    }, [location.search]);

    const performSearch = async (searchStr) => {
        setLoading(true);
        setSearched(true);
        try {
            const data = await searchService.semanticSearch(searchStr);
            const searchHits = data.results || [];
            
            const allProducts = await productService.getAllProducts();
            
            const detailedResults = searchHits.map(hit => {
                const product = allProducts.find(p => p.id === hit.productId);
                return product ? { ...product, searchScore: hit.score } : null;
            }).filter(Boolean);
            
            setResults(detailedResults);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        performSearch(query);
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold"><FaRobot className="text-primary" /> AI Semantic Search</h2>
                <p className="lead text-muted">Describe what you're looking for in natural language.</p>
                
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8">
                        <form onSubmit={handleSearch} className="input-group input-group-lg shadow-sm">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="e.g. 'Affordable gaming laptop for college'" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="btn btn-primary px-4" type="submit" disabled={loading}>
                                <FaSearch /> Search
                            </button>
                        </form>
                        <div className="mt-3 text-muted small">
                            Suggested: "Best phone for photography", "Budget laptop under $500", "High-performance workstation"
                        </div>
                    </div>
                </div>
            </div>

            {loading && <LoadingSpinner />}

            {!loading && searched && (
                <div>
                    <h4 className="mb-4">Found {results.length} relevant results</h4>
                    {results.length === 0 ? (
                        <div className="alert alert-warning text-center">No results found for your query. Try a different phrase.</div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {results.map((product, idx) => (
                                <div className="col" key={idx}>
                                    <div className="mb-2">
                                        <span className="badge bg-primary">Relevance Score: {product.searchScore ? product.searchScore.toFixed(4) : 'N/A'}</span>
                                    </div>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SemanticSearch;
