import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

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