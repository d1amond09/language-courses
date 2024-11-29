import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';
import Course from './Course';
import Filter from './FiltersForCourses';
import { fetchCourses } from '../../services/courses';
import Pagination from '../Pagination';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Courses() {
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

    const handleSearch = async () => {
        const { courses, totalPages } = await fetchCourses(filter);
        setCourses(courses); 
        setTotalPages(totalPages);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { courses, totalPages } = await fetchCourses({ 
                ...filter, 
                searchTerm: "", 
                pageNumber: 1 
            });
            
            setCourses(courses);
            setTotalPages(totalPages); 
        };

        fetchData();
    }, [filter]);

    const handlePageChange = (page) => {
        setFilter((prev) => ({ ...prev, pageNumber: page }));
        handleSearch(); 
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

                <Link to="/courses/create">
                    <Button size="lg" colorScheme="blue" variant="solid" width="full"> Создать курс </Button>
                </Link>
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