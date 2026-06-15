import api from './api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const taskService = {
    getAllTasks: async () => {
        const response = await api.get('/tasks', { headers: getAuthHeaders() });
        return response.data;
    },

    getTasksForManager: async (managerId) => {
        const response = await api.get(`/tasks/assigned/${managerId}`, { headers: getAuthHeaders() });
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData, { headers: getAuthHeaders() });
        return response.data;
    },

    updateTaskStatus: async (taskId, status) => {
        const response = await api.put(`/tasks/${taskId}/status`, { status }, { headers: getAuthHeaders() });
        return response.data;
    },

    deleteTask: async (taskId) => {
        const response = await api.delete(`/tasks/${taskId}`, { headers: getAuthHeaders() });
        return response.data;
    }
};

export default taskService;
