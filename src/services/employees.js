import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchEmployees = async (filter) => {
    try {
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm; 
        if (filter.education) params.education = filter.education; 
        if (filter.jobTitle) params.jobTitle = filter.jobTitle; 

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/employees`, {
            method: "GET",
            params: params,
        });
            
        return {
            employees: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
        return { employees: [], totalPages: 0 }; 
    }
};

export const createEmployee = async (employee) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/employees`, {
            method: "POST",
            data: employee,
        });
        return response.data; 
    } catch (error) {
        console.error('Ошибка при создании сотрудника:', error);
        throw error;
    }
};

export const fetchEmployeeById = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/employees/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении сотрудника:', error);
        return null;
    }
};

export const updateEmployee = async (employee) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/employees/${employee.id}`, {
            method: "PUT",
            data: employee,
        });
        return response.data; 
    } catch (error) {
        console.error('Ошибка при обновлении сотрудника:', error);
        throw error; 
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/employees/${id}`, {
            method: "DELETE",
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении сотрудника:', error);
        throw error; 
    }
};

export const fetchAllEmployees = async () => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/employees?fields=id,fullname&PageSize=2000`, {
            method: "GET",
        });

        return {
            employees: response.data,
        };
    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
        return []; 
    }
};