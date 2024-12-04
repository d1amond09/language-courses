import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchPayments = async (filter) => {
    try {
        const params = {};
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.minAmount) params.minAmount = filter.minAmount;
        if (filter.maxAmount) params.maxAmount = filter.maxAmount;
        if (filter.minDate) params.minDate = filter.minDate;
        if (filter.maxDate) params.maxDate = filter.maxDate;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm;

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`;
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/payments`, {
            method: "GET",
            params: params,
        });

        return {
            payments: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении платежей:', error);
        return { payments: [], totalPages: 0 };
    }
};

export const createPayment = async (payment) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/payments`, {
            method: "POST",
            data: payment,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании платежа:', error);
        throw error;
    }
};

export const fetchPaymentById = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/payments/${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении платежа:', error);
        return null;
    }
};

export const updatePayment = async (payment) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/payments/${payment.id}`, {
            method: "PUT",
            data: payment,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении платежа:', error);
        throw error;
    }
};

export const deletePayment = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/payments/${id}`, {
            method: "DELETE",
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении платежа:', error);
        throw error;
    }
};

export const fetchAllPayments = async () => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/payments?fields=id,studentId,amount&PageSize=2000`, {
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