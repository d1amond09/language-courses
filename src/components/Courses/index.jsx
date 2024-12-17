import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Course from './Course';
import Filters from './Filters';
import { fetchCourses } from '../../services/courses';
import Pagination from '../Pagination';
import { defaultFilters } from './Filters/data';
import CreateButton from '../Actions/CreateButton';
import Loading from '../Loading';
    
export default function Courses() {
    const { isAdmin } = useContext(AuthContext);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState(defaultFilters);
    const [courses, setCourses] = useState([]);
    
    
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { courses, totalPages } = await fetchCourses({ ...filter, pageNumber: filter.pageNumber });
            setCourses(courses);
            setTotalPages(totalPages); 
        } catch (error) {
            console.error("Ошибка при загрузке курсов:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [filter]);
    
    const handleSearch = async () => {
        await fetchData(); 
    };
    
    const handlePageChange = (page) => {
        setFilter((prev) => ({ ...prev, pageNumber: page }));
    };
    
    const admin = isAdmin();
    
    return (
        <section className='container flex flex-row gap-6'>
            <div className='max-w-sm w-1/3 gap-10 '>
                <Filters filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                { admin ? ( <CreateButton link={"courses"}/> ) : "" }
            </div>
            <div className='flex-1 overflow-auto'>
                <ul className='grid grid-cols-2 gap-5'> 
                {loading ? (
                    <h1 className='text-4xl col-span-3 text-center mt-56'><Loading/></h1>
                ) : courses.length > 0 ? (
                    courses.map((course) => (
                        <li key={course.Id}>
                            <Course course={course} isAdmin={admin} />
                        </li>
                    ))
                ) : (
                    <h1 className='text-4xl col-span-3 text-center mt-56'>Нет курсов для отображения</h1>
                )}
                </ul>
                {courses.length > 0 && (
                    <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />)}
            </div>
        </section>
    );
}