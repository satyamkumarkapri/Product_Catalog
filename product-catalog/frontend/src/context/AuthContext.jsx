import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({
                        email: decoded.sub,
                        roleLevel: decoded.role,
                        fullName: decoded.fullName,
                        address: decoded.address
                    });
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (err) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, roleLevel, fullName, address } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ email, fullName, address, roleLevel });
        return roleLevel;
    };

    const register = async (email, fullName, password, roleLevel = 1) => {
        await api.post('/auth/register', { email, fullName, password, roleLevel });
    };

    const updateProfile = async (email, fullName, password, address) => {
        const response = await api.put('/auth/profile', { email, fullName, password, address });
        const { token, roleLevel, fullName: updatedFullName, address: updatedAddress } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ email, fullName: updatedFullName, address: updatedAddress, roleLevel });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
