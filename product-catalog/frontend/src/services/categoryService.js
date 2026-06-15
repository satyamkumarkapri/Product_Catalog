import api from './api';

const cache = {
    categories: null,
    timestamp: 0
};

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes for categories (they rarely change)

const categoryService = {
    getAllCategories: async (forceRefresh = false) => {
        const now = Date.now();
        if (!forceRefresh && cache.categories && (now - cache.timestamp < CACHE_TTL)) {
            return cache.categories;
        }
        const response = await api.get('/categories');
        cache.categories = response.data;
        cache.timestamp = now;
        return response.data;
    },
    
    getCategoryById: async (id) => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },
    
    createCategory: async (categoryData) => {
        const response = await api.post('/categories', categoryData);
        cache.categories = null; // Invalidate cache
        return response.data;
    }
};

export default categoryService;
