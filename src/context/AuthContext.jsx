import React, { createContext, useState, useEffect } from 'react';
import decodeJwt from '../utils/jwtUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
      if (token) {
          const decoded = decodeJwt(token);
          const userData = {
            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'], // Имя пользователя
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'], // Идентификатор пользователя
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], // Роль
          };
          setUser(userData);
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
        localStorage.removeItem('refreshToken'); 
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};