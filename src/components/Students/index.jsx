import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Thead, Th, Tr, Tbody } from '@chakra-ui/react';
import { fetchStudents } from '../../services/students';
import Student from './Student'; 
import Pagination from '../Pagination'; 
import { AuthContext } from '../../context/AuthContext';
import FiltersForStudents from './Filters';
import { fetchAllCourses } from '../../services/courses';
import Loading from '../Loading';
import { defaultFilters } from './Filters/data';
import CreateButton from '../Actions/CreateButton';

export default function Students() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState(defaultFilters);

    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async () => {
        const { students, totalPages } = await fetchStudents(filter);
        setStudents(students); 
        setTotalPages(totalPages);      
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCourses(); 
            setCourses(data.courses);    
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { students, totalPages } = await fetchStudents({ 
                ...filter, 
                pageNumber: filter.pageNumber 
            });
            
            setStudents(students);
            setTotalPages(totalPages); 
        };

        fetchData();
    }, [filter]);

    const handlePageChange = (page) => {
        setFilter((prev) => ({ ...prev, pageNumber: page }));
    };

    return (
        <section className='container flex flex-row gap-6'>
            <div className='w-1/4 max-w-sm'>
                <FiltersForStudents filter={filter} setFilter={setFilter} onSearch={handleSearch} courses={courses} />
                {admin && ( <CreateButton link={"students"}/> )}
            </div>
            <div className='flex-1 overflow-auto'>
                <Table className='min-w-full' size="sm" minH={"70vh"}>
                    <Thead>
                        <Tr>
                            <Th>ФИО</Th>
                            <Th>Дата рождения</Th>
                            <Th>Адрес</Th>
                            <Th>Телефон</Th>
                            <Th>Номер паспорта</Th>
                            <Th>Курсы</Th>
                            {admin && <Th>Действия</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {students.length > 0 ? (
                            students.map((s) => (
                                <Student key={s.Id} student={s} isAdmin={admin} />
                            ))
                        ) : (
                            <Tr>
                                <td colSpan="8" className='text-center'> <Loading/></td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
                {students.length > 0 && (
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />)}
            </div>
        </section>
    );
}