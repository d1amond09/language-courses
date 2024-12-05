import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchStudents = async (filter) => {
    try {
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm;
        if (filter.course) params.course = filter.course;
        if (filter.minAge) params.minAge = filter.minAge;
        if (filter.maxAge) params.maxAge = filter.maxAge;
        if (filter.minBirthDate) params.minBirthDate = filter.minBirthDate;
        if (filter.maxBirthDate) params.maxBirthDate = filter.maxBirthDate;

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/students`, {
            method: "GET",
            params: params,
        });
        
        return {
            students: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении слушателей:', error);
        return { students: [], totalPages: 0 }; 
    }
};

export const createStudent = async (student) => {
    try {
        console.log(student);
        const response = await apiFetch(`${API_BASE_URL}/students`, {
            method: "POST",
            data: student,
        });
        return response.data; 
    } catch (error) {
        console.error('Ошибка при создании студента:', error);
        throw error;
    }
};


export const updateStudent = async (student) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/students/${student.id}`, {
            method: "PUT",
            data: student,
        });
        return response.data; 
    } catch (error) {
        console.error('Ошибка при обновлении студента:', error);
        throw error; 
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/students/${id}`, {
            method: "DELETE",
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении студента:', error);
        throw error; 
    }
};



export const fetchStudentById = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/students/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении должности:', error);
        return null;
    }
};

export const fetchAllStudents = async () => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/students?fields=id,fullname&PageSize=2000`, {
            method: "GET",
        });

        return {
            payments: response.data,
        };
    } catch (error) {
        console.error('Ошибка при получении всех платежей:', error);
        return [];
    }
};

