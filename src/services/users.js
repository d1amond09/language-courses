import { API_BASE_URL_AUTH } from '../config';
import { apiFetch } from './authentication';

export const fetchUsers = async (filter) => {
    try {
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm; 

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await apiFetch(`${API_BASE_URL_AUTH}/users`, {
            method: "GET",
            params: params,
        });
            
        return {
            employees: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        return { users: [], totalPages: 0 }; 
    }
};

export const fetchUserById = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL_AUTH}/users/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        return null;
    }
};

export const updateUser = async (user) => {
    try {
        const response = await apiFetch(`${API_BASE_URL_AUTH}/users/${user.id}`, {
            method: "PUT",
            data: user,
        });
        return response.data; 
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        throw error; 
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL_AUTH}/users/${id}`, {
            method: "DELETE",
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
        throw error; 
    }
};