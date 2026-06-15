import api from './api';

// In-memory cache to make navigation instant
const cache = {
    products: null,
    productsTimestamp: 0,
    details: {},
    detailsTimestamp: {}
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const productService = {
    getAllProducts: async (forceRefresh = false) => {
        const now = Date.now();
        if (!forceRefresh && cache.products && (now - cache.productsTimestamp < CACHE_TTL)) {
            return cache.products;
        }
        
        // Check localStorage for ultra-fast instant loads across page refreshes
        if (!forceRefresh) {
            try {
                const localCacheStr = localStorage.getItem('catalogx_products_cache');
                if (localCacheStr) {
                    const localCache = JSON.parse(localCacheStr);
                    if (now - localCache.timestamp < CACHE_TTL) {
                        cache.products = localCache.data;
                        cache.productsTimestamp = localCache.timestamp;
                        // Still fetch in background to keep data fresh (Stale-While-Revalidate)
                        api.get('/products').then(res => {
                            cache.products = res.data;
                            cache.productsTimestamp = Date.now();
                            localStorage.setItem('catalogx_products_cache', JSON.stringify({ data: res.data, timestamp: Date.now() }));
                        }).catch(e => console.error(e));
                        return localCache.data;
                    }
                }
            } catch (e) {
                console.error("Local storage cache error", e);
            }
        }
        
        const response = await api.get('/products');
        cache.products = response.data;
        cache.productsTimestamp = now;
        try {
            localStorage.setItem('catalogx_products_cache', JSON.stringify({ data: response.data, timestamp: now }));
        } catch(e) {} // Ignore quota errors
        return response.data;
    },
    
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    
    getProductDetails: async (id, forceRefresh = false) => {
        const now = Date.now();
        if (!forceRefresh && cache.details[id] && cache.detailsTimestamp[id] && (now - cache.detailsTimestamp[id] < CACHE_TTL)) {
            return cache.details[id];
        }
        const response = await api.get(`/products/${id}/details`);
        cache.details[id] = response.data;
        cache.detailsTimestamp[id] = now;
        return response.data;
    },
    
    filterProducts: async (params) => {
        // Don't cache complex filters for now
        const response = await api.get('/products/filter', { params });
        return response.data;
    },
    
    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        cache.products = null; // Invalidate cache
        return response.data;
    },
    
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        cache.products = null; // Invalidate cache
        delete cache.details[id];
        return response.data;
    },
    
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        cache.products = null; // Invalidate cache
        delete cache.details[id];
        return response.data;
    }
};

export default productService;
