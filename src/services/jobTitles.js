import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchJobTitles = async (filter) => {
    try {
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm;
        if (filter.minSalary) params.minSalary = filter.minSalary;
        if (filter.maxSalary) params.maxSalary = filter.maxSalary;

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/jobtitles`, {
            method: "GET",
            params: params,
        });

        return {
            jobTitles: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении должностей:', error);
        return { jobTitles: [], totalPages: 0 }; 
    }
};

export const createJobTitle = async (jobTitle) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/jobtitles`, {
            method: "POST",
            data: jobTitle,
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при создании должности:', error);
    }
};

export const fetchJobTitleById = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/jobtitles/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении должности:', error);
        return null;
    }
};

export const updateJobTitle = async (jobTitle) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/jobtitles/${jobTitle.id}`, {
            method: "PUT",
            data: jobTitle,
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при обновлении должности:', error);
    }
};

export const deleteJobTitle = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/jobtitles/${id}`, {
            method: "DELETE",
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении должности:', error);
    }
};