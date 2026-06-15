import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setFullName(user.fullName || '');
            setEmail(user.email || '');
            setAddress(user.address || '');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateProfile(email, fullName, password, address);
            setMessage('Profile updated successfully!');
            setPassword(''); // clear password field after successful update
        } catch (err) {
            const data = err.response?.data;
            if (typeof data === 'string') {
                setError(data);
            } else if (data && data.message) {
                setError(data.message);
            } else {
                setError('Failed to update profile.');
            }
        }
    };

    if (!user) return null;

    const getRoleName = (level) => {
        if (level === 3) return 'System Admin';
        if (level === 2) return 'Store Manager';
        return 'Regular User';
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="glass-card p-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold m-0 text-gradient">My Profile</h2>
                            <span className="badge rounded-pill bg-primary px-3 py-2">
                                {getRoleName(user.roleLevel)}
                            </span>
                        </div>

                        {message && <div className="alert alert-success">{message}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label text-light">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg glass-input" 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-light">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-lg glass-input" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-light">Shipping Address</label>
                                <textarea 
                                    className="form-control form-control-lg glass-input" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    rows="3"
                                />
                            </div>
                            <div className="mb-5">
                                <label className="form-label text-light">New Password <small className="text-muted">(leave blank to keep current)</small></label>
                                <input 
                                    type="password" 
                                    className="form-control form-control-lg glass-input" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary-gradient btn-lg w-100 rounded-pill fw-bold hover-lift">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
