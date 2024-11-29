import axios from 'axios';
import { API_BASE_URL_AUTH } from '../config';
import { isTokenExpired } from '../utils/jwtUtils'; 

export const apiFetch = async (url, options) => {
    let token = localStorage.getItem('token');

    if (isTokenExpired(token)) {
        token = await refreshAccessToken(); 
        if (!token) throw new Error('Unable to refresh token'); 
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers 
    };

    const response = await axios({
        url,
        headers,
        ...options,
    });

    return response; 
};


export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');
    if (!refreshToken) return null; 

    try {
        const response = await axios.post(`${API_BASE_URL_AUTH}/token/refresh`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken); 
        return accessToken;
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        return null; 
    }
};

export const signIn = async ({username, password}) => {
    const response = await axios.post(`${API_BASE_URL_AUTH}/authentication/login`, { username, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    return response;
}

export const register = async (data) => {
    const response = await axios.post(`${API_BASE_URL_AUTH}/authentication`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    return response;
}