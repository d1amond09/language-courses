import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';
import Course from './Course';
import Filter from './FiltersForCourses';
import { fetchCourses, deleteCourse } from '../../services/courses';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Courses() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState({
        searchTrainingProgram: "",
        searchTerm: "",
        minHours: "",
        maxHours: "",
        minTuitionFee: "",
        maxTuitionFee: "",
        orderBy: "name",
        sortOrder: "desc",
        pageNumber: 1,
        pageSize: 4,
    });
  
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        const { courses, totalPages } = await fetchCourses({ ...filter, pageNumber: filter.pageNumber });
        setCourses(courses);
        setTotalPages(totalPages); 
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

    return (
        <section className='container p-8 flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/4 gap-10 '>
                <Filter filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />
                {
                    admin ? ( 
                    <Link to="/courses/create">
                        <Button size="lg" colorScheme="blue" variant="solid" width="full"> Создать курс </Button>
                    </Link>) : ""
                }
            </div>
            <div className='flex-1 w-1/2'>
                <ul className='grid grid-cols-2 gap-5'> 
                {courses.length > 0 ? (
                    courses.map((c) => (
                        <li key={c.Id}>
                            <Course 
                                id={c.Id}
                                name={c.Name} 
                                description={c.Description} 
                                tuitionFee={c.TuitionFee} 
                                hours={c.Hours} 
                                intensity={c.Intensity} 
                                groupSize={c.GroupSize} 
                                availableSeats={c.AvailableSeats} 
                                trainingProgram={c.TrainingProgram}  
                                isAdmin={admin}
                            />
                        </li>
                    ))
                ) : (
                    <h1 className='text-4xl col-span-3'>Курсы не найдены...</h1> 
                )}
                </ul>
            </div>
        </section>
    );
}