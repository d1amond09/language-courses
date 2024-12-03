import React, { createContext, useState, useEffect } from 'react';
import decodeJwt, { isTokenExpired } from '../utils/jwtUtils';
import { refreshAccessToken } from '../services/authentication';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const navigate = useNavigate();
    
    useEffect(() => {
        initializeUser();
    }, [token, refreshToken]);

    const initializeUser = async () => {
        if (token) {
            const isExpired = isTokenExpired(token);
            if (isExpired) {
                const newToken = await refreshAccessToken(refreshToken);
                if (newToken) {
                    localStorage.setItem('token', newToken);
                    setToken(newToken);
                    setUser(decodeUser(newToken));
                } else {
                    setUser(null); 
                }
            } else {
                setUser(decodeUser(token)); 
            }
        } else {
            setUser(null); 
        }
    };

    const decodeUser = (token) => {
        const decoded = decodeJwt(token);
        return {
            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        };
    };

    const login = (accessToken, newRefreshToken) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        setToken(accessToken);
        setRefreshToken(newRefreshToken);
        setUser(decodeUser(accessToken));
    };

    const isAdmin = () => {
        console.log(user);
        const admin = user?.role.includes("Administrator");
        console.log(admin);
        return admin;
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, initializeUser }}>
            {children}
        </AuthContext.Provider>
    );
};