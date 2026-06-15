import api from './api';

const searchService = {
    semanticSearch: async (query) => {
        const response = await api.post('/search/semantic', { query });
        return response.data;
    }
};

export default searchService;
