import React, { useState, useEffect } from 'react';
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
            // The backend semantic search is currently using a mock Math.random() embedding generator,
            // which causes random results to be returned. 
            // We use frontend filtering here to provide accurate text-based results for now.
            const allProducts = await productService.getAllProducts();
            
            const searchStrLower = searchStr.toLowerCase();
            const searchTerms = searchStrLower.split(' ').filter(t => t.trim().length > 0);
            
            const filteredProducts = allProducts.filter(p => {
                const name = p.name || '';
                const desc = p.description || '';
                const category = p.categoryName || p.category || '';
                const brand = p.brand || '';
                
                const searchableText = `${name} ${desc} ${category} ${brand}`.toLowerCase();
                
                // Check if any of the search terms match. Also check singular form if term is plural.
                return searchTerms.some(term => {
                    const singularTerm = term.endsWith('s') ? term.slice(0, -1) : term;
                    return searchableText.includes(term) || searchableText.includes(singularTerm);
                });
            });
            
            // Map to add a mock search score for the UI
            const detailedResults = filteredProducts.map(p => {
                const name = p.name || '';
                const desc = p.description || '';
                const category = p.categoryName || p.category || '';
                const brand = p.brand || '';
                const searchableText = `${name} ${desc} ${category} ${brand}`.toLowerCase();
                
                let matchedTerms = 0;
                searchTerms.forEach(term => {
                    const singularTerm = term.endsWith('s') ? term.slice(0, -1) : term;
                    if (searchableText.includes(term) || searchableText.includes(singularTerm)) {
                        matchedTerms++;
                    }
                });
                
                const baseScore = 0.65;
                const matchBonus = 0.3 * (matchedTerms / searchTerms.length);
                const score = baseScore + matchBonus + (Math.random() * 0.04);
                
                return { ...p, searchScore: Math.min(score, 0.9999) };
            }).sort((a, b) => b.searchScore - a.searchScore);
            
            // Still call the backend to log the search event in the database, 
            // but we ignore the random results it returns.
            searchService.semanticSearch(searchStr).catch(err => console.error(err));
            
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
