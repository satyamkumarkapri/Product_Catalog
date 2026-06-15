import api from './api';

const orderService = {
    getUserOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },
    getAllOrders: async () => {
        const response = await api.get('/orders/all');
        return response.data;
    },
    updateOrderStatus: async (orderId, status) => {
        const response = await api.put(`/orders/${orderId}/status`, { status });
        return response.data;
    }
};

export default orderService;
