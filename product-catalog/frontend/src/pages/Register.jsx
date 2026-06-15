import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleLevel, setRoleLevel] = useState(1);
    const { user, register } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, fullName, password, roleLevel);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (typeof data === 'string') {
                setError(data);
            } else if (data && data.message) {
                setError(data.message);
            } else {
                setError('Registration failed. Did you reset the database?');
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">{user?.roleLevel === 3 ? "Register New User" : "Register"}</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                {user?.roleLevel === 3 && (
                                    <div className="mb-4">
                                        <label className="form-label">Role</label>
                                        <select className="form-select" value={roleLevel} onChange={(e) => setRoleLevel(parseInt(e.target.value))}>
                                            <option value={1}>Regular User</option>
                                            <option value={2}>Store Manager</option>
                                            <option value={3}>System Admin</option>
                                        </select>
                                    </div>
                                )}
                                <button type="submit" className="btn btn-success w-100 mb-3">Create Account</button>
                                <div className="text-center">
                                    <small>Already have an account? <Link to="/login">Login</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
