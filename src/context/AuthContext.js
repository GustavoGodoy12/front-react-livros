// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    userId: decoded.userId,
                    email: decoded.email
                });
            } catch (error) {
                console.error('Token inválido:', error);
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
