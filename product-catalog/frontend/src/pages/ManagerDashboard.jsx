import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import orderService from '../services/orderService';
import { FaTasks, FaCheckCircle, FaHourglassHalf, FaBoxOpen, FaTruck, FaShippingFast, FaCheck } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const ManagerDashboard = () => {
    const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'orders'
    const [tasks, setTasks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'tasks') {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    const data = await taskService.getTasksForManager(user.id);
                    setTasks(data);
                }
            } else if (activeTab === 'orders') {
                const data = await orderService.getAllOrders();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            await taskService.updateTaskStatus(taskId, newStatus);
            fetchData();
        } catch (error) {
            console.error("Error updating task status", error);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            fetchData();
        } catch (error) {
            console.error("Error updating order status", error);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-gradient d-inline-block">Manager Dashboard</h2>
            
            {/* Tabs */}
            <ul className="nav nav-pills mb-4 border-bottom border-secondary border-opacity-25 pb-2">
                <li className="nav-item">
                    <button 
                        className={`nav-link rounded-pill px-4 ${activeTab === 'tasks' ? 'active btn-primary-gradient text-white' : 'text-adaptive'}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        <FaTasks className="me-2" /> Assigned Tasks
                    </button>
                </li>
                <li className="nav-item ms-2">
                    <button 
                        className={`nav-link rounded-pill px-4 ${activeTab === 'orders' ? 'active btn-primary-gradient text-white' : 'text-adaptive'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <FaBoxOpen className="me-2" /> Customer Orders
                    </button>
                </li>
            </ul>

            {loading ? (
                <LoadingSpinner />
            ) : activeTab === 'tasks' ? (
                /* TASKS TAB */
                <div className="card glass-card border-0">
                    <div className="card-header bg-primary bg-opacity-10 fw-bold border-bottom border-light text-adaptive py-3">
                        <FaTasks className="me-2 text-primary" /> My Assigned Tasks
                    </div>
                    <div className="card-body">
                        {tasks.length === 0 ? (
                            <div className="alert alert-info bg-primary bg-opacity-10 border-0 text-adaptive">You have no tasks assigned at the moment.</div>
                        ) : (
                            <div className="row g-4">
                                {tasks.map(task => (
                                    <div className="col-md-6 col-lg-4" key={task.id}>
                                        <div className={`card h-100 glass-card border-${task.status === 'COMPLETED' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning' : 'secondary'} hover-lift transition-hover`}>
                                            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                                                <span className="fw-bold text-adaptive">{task.title}</span>
                                                <span className={`badge bg-${task.status === 'COMPLETED' ? 'success' : task.status === 'IN_PROGRESS' ? 'warning text-dark' : 'secondary'}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                            <div className="card-body text-adaptive">
                                                <p className="card-text opacity-75">{task.description}</p>
                                                <p className="card-text small mb-1"><strong>Assigned By:</strong> {task.assignedByName}</p>
                                                <p className="card-text small opacity-75"><strong>Date:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 pb-3">
                                                <div className="d-flex gap-2">
                                                    {task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' && (
                                                        <button className="btn btn-sm btn-outline-warning w-100 rounded-pill" onClick={() => handleUpdateTaskStatus(task.id, 'IN_PROGRESS')}>
                                                            <FaHourglassHalf className="me-1" /> Start Task
                                                        </button>
                                                    )}
                                                    {task.status !== 'COMPLETED' && (
                                                        <button className="btn btn-sm btn-outline-success w-100 rounded-pill" onClick={() => handleUpdateTaskStatus(task.id, 'COMPLETED')}>
                                                            <FaCheckCircle className="me-1" /> Mark Complete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ORDERS TAB */
                <div className="card glass-card border-0">
                    <div className="card-header bg-primary bg-opacity-10 fw-bold border-bottom border-light text-adaptive py-3">
                        <FaBoxOpen className="me-2 text-primary" /> Customer Orders needing Confirmation
                    </div>
                    <div className="card-body">
                        {orders.length === 0 ? (
                            <div className="alert alert-info bg-primary bg-opacity-10 border-0 text-adaptive">No orders have been placed yet.</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle text-adaptive">
                                    <thead className="table-light bg-opacity-10">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Shipping Address</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td className="fw-bold">#{order.id}</td>
                                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td>{order.shippingAddress}</td>
                                                <td className="fw-bold text-gradient">${order.totalAmount?.toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge rounded-pill ${order.status === 'PENDING' ? 'bg-warning text-dark' : order.status === 'CONFIRMED' ? 'bg-info text-dark' : order.status === 'SHIPPED' ? 'bg-primary' : 'bg-success'}`}>
                                                        {order.status || 'PENDING'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {(order.status === 'PENDING' || !order.status) && (
                                                        <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => handleUpdateOrderStatus(order.id, 'CONFIRMED')}>
                                                            <FaCheck className="me-1" /> Confirm
                                                        </button>
                                                    )}
                                                    {order.status === 'CONFIRMED' && (
                                                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPED')}>
                                                            <FaTruck className="me-1" /> Ship
                                                        </button>
                                                    )}
                                                    {order.status === 'SHIPPED' && (
                                                        <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => handleUpdateOrderStatus(order.id, 'DELIVERED')}>
                                                            <FaShippingFast className="me-1" /> Delivered
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagerDashboard;
