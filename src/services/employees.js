import axios from 'axios';

export const fetchEmployees = async (filter) => {
    try {
        const token = localStorage.getItem('token');
        const params = {};

        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.education) params.education = filter.education;
        if (filter.jobTitle) params.jobTitle = filter.jobTitle;
        if (filter.searchTerm) params.searchTerm = filter.searchTerm;
        
        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const response = await axios.get('https://localhost:8007/api/employees', {
            params: params,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return {
            employees: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении курсов:', error);
        return { courses: [], totalPages: 0 }; 
    }
};

export const fetchAllEmployees = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('https://localhost:8007/api/employees?fields=id,fullname&PageSize=2000', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return {
            employees: response.data,
        };
    } catch (error) {
        console.error('Ошибка при получении курсов:', error);
        return []; 
    }
};


export const createEmployee = async (employee) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('https://localhost:8007/api/employees', employee, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при создании курса:', error);
    }
};