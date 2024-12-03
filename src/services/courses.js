import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchCourses = async (filter) => {
    try {
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.minHours) params.minHours = filter.minHours;
        if (filter.maxHours) params.maxHours = filter.maxHours;
        if (filter.minTuitionFee) params.minTuitionFee = filter.minTuitionFee;
        if (filter.maxTuitionFee) params.maxTuitionFee = filter.maxTuitionFee;
        if (filter.searchTrainingProgram) params.searchTrainingProgram = filter.searchTrainingProgram;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm;
        
        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/courses`, {
            method: "GET",
            params: params,
        });

        return {
            courses: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении курсов:', error);
        return { courses: [], totalPages: 0 }; 
    }
};



export const createCourse = async (course) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/courses`, {
            method: "POST",
            data: course,
        });
        
        return response.status;
    } catch (error) {
        console.error('Ошибка при создании курса:', error);
    }
};


export const fetchCourseById = async (id) => {
    try {

        const response = await apiFetch(`${API_BASE_URL}/courses/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении курса:', error);
        return null;
    }
};

export const updateCourse = async (course) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/courses/${course.id}`, {
            method: "PUT",
            data: course,
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при обновлении курса:', error);
    }
};


export const deleteCourse = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/courses/${id}`, {
            method: "DELETE",
        });
        
        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении курса:', error);
    }
};
