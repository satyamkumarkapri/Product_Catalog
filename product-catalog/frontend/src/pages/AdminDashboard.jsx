import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import taskService from '../services/taskService';
import { FaTrash, FaUserPlus, FaTasks } from 'react-icons/fa';

const AdminDashboard = () => {
    const [managers, setManagers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('managers');

    // New Manager Form
    const [newManager, setNewManager] = useState({ fullName: '', email: '', password: '' });

    // New Task Form
    const [newTask, setNewTask] = useState({ title: '', description: '', assignedToId: '' });

    useEffect(() => {
        fetchManagers();
        fetchTasks();
    }, []);

    const fetchManagers = async () => {
        try {
            const data = await userService.getAllManagers();
            setManagers(data);
        } catch (error) {
            console.error("Error fetching managers", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const handleCreateManager = async (e) => {
        e.preventDefault();
        try {
            await userService.registerManager(newManager);
            setNewManager({ fullName: '', email: '', password: '' });
            fetchManagers();
            alert("Manager created successfully!");
        } catch (error) {
            alert("Error creating manager: " + (error.response?.data || error.message));
        }
    };

    const handleDeleteManager = async (id) => {
        if (!window.confirm("Are you sure you want to delete this manager?")) return;
        try {
            await userService.deleteUser(id);
            fetchManagers();
        } catch (error) {
            console.error("Error deleting manager", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await taskService.createTask(newTask);
            setNewTask({ title: '', description: '', assignedToId: '' });
            fetchTasks();
            alert("Task assigned successfully!");
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-primary">Admin Dashboard</h2>
            
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'managers' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('managers')}>
                        Manage Managers
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'tasks' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('tasks')}>
                        Assign Tasks
                    </button>
                </li>
            </ul>

            {activeTab === 'managers' && (
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white fw-bold">
                                <FaUserPlus className="me-2" /> Add New Manager
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleCreateManager}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Full Name</label>
                                        <input type="text" className="form-control" required value={newManager.fullName} onChange={(e) => setNewManager({...newManager, fullName: e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Email</label>
                                        <input type="email" className="form-control" required value={newManager.email} onChange={(e) => setNewManager({...newManager, email: e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Password</label>
                                        <input type="password" className="form-control" required value={newManager.password} onChange={(e) => setNewManager({...newManager, password: e.target.value})} />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="mb-3 text-secondary">Current Managers</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {managers.length === 0 && <tr><td colSpan="4" className="text-center text-muted">No managers found.</td></tr>}
                                            {managers.map(mgr => (
                                                <tr key={mgr.id}>
                                                    <td>{mgr.id}</td>
                                                    <td className="fw-bold">{mgr.fullName}</td>
                                                    <td>{mgr.email}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteManager(mgr.id)}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'tasks' && (
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-success text-white fw-bold">
                                <FaTasks className="me-2" /> Assign New Task
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleCreateTask}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Task Title</label>
                                        <input type="text" className="form-control" required value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Description</label>
                                        <textarea className="form-control" rows="3" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small">Assign To</label>
                                        <select className="form-select" required value={newTask.assignedToId} onChange={(e) => setNewTask({...newTask, assignedToId: e.target.value})}>
                                            <option value="">-- Select Manager --</option>
                                            {managers.map(mgr => (
                                                <option key={mgr.id} value={mgr.id}>{mgr.fullName} ({mgr.email})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Assign Task</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="mb-3 text-secondary">All Assigned Tasks</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Title</th>
                                                <th>Assigned To</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.length === 0 && <tr><td colSpan="4" className="text-center text-muted">No tasks assigned.</td></tr>}
                                            {tasks.map(task => (
                                                <tr key={task.id}>
                                                    <td className="fw-bold">{task.title}</td>
                                                    <td>{task.assignedToName}</td>
                                                    <td>
                                                        <span className={`badge ${task.status === 'COMPLETED' ? 'bg-success' : task.status === 'IN_PROGRESS' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                                            {task.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-muted small">{new Date(task.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
