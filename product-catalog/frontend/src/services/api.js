import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // Use env var for production, fallback to proxy for local dev
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
