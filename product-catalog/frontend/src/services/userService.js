import api from './api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const userService = {
    getAllManagers: async () => {
        const response = await api.get(`/users/managers`, { headers: getAuthHeaders() });
        return response.data;
    },

    registerManager: async (data) => {
        const response = await api.post(`/users/register-manager`, data, { headers: getAuthHeaders() });
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`, { headers: getAuthHeaders() });
        return response.data;
    }
};

export default userService;
