import axios from 'axios';

export const fetchCourses = async (filter) => {
    try {
        const token = localStorage.getItem('token');
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

        const response = await axios.get('https://localhost:8007/api/courses', {
            params: params,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        
        console.log(response.data.totalPages);

        return {
            courses: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении курсов:', error);
        return { courses: [], totalPages: 0 }; 
    }
};