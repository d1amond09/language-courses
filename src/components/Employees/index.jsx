import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Thead, Th, Tr, Tbody } from '@chakra-ui/react';
import { fetchEmployees } from '../../services/employees';
import Employee from './Employee'; 
import FiltersForEmployee from './FiltersForEmployee'; 
import Pagination from '../Pagination'; 
import { fetchAllJobTitles, fetchJobTitleById } from '../../services/jobTitles';
import { AuthContext } from '../../context/AuthContext';

export default function Employees() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: "",
        education: "",
        jobTitleId: "",
        orderBy: "surname",
        sortOrder: "asc",
        pageNumber: 1,
        pageSize: 6,
    });

    const [jobTitles, setJobTitles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllJobTitles(); 
            setJobTitles(data.jobTitles);    
        };
        fetchData();
    }, []);

    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async () => {
        const { employees, totalPages } = await fetchEmployees(filter);
        setEmployees(employees); 
        setTotalPages(totalPages);      
    };

    useEffect(() => {
        const fetchData = async () => {
            const { employees, totalPages } = await fetchEmployees({ 
                ...filter, 
                searchTerm: "", 
                pageNumber: 1 
            });
            
            setEmployees(employees);
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
            <div className='flex flex-col w-1/4 gap-10'>
                <FiltersForEmployee filter={filter} jobTitles={jobTitles} setFilter={setFilter} onSearch={handleSearch} />
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />
                 { admin ? (
                        <Link to="/employees/create">
                            <Button size="lg" colorScheme="blue" variant="solid" width="full">Создать сотрудника</Button>
                        </Link>
                    ) : "" 
                }
                
            </div>
            <div className='flex-1'>
                <Table className='min-w-full'>
                    <Thead>
                        <Tr>
                            <Th>ФИО</Th>
                            <Th>Должность</Th>
                            <Th>Дата рождения</Th>
                            <Th>Адрес</Th>
                            <Th>Телефон</Th>
                            <Th>Номер паспорта</Th>
                            <Th>Образование</Th>
                            { admin ? (<Th>Действия</Th>) : "" }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employees.length > 0 ? (
                            employees.map((e, index) => (
                                <Employee 
                                    key={e.Id}
                                    id={e.Id}
                                    fullName={e.FullName}
                                    jobTitleId={e.JobTitleId}
                                    birthDate={new Date(e.BirthDate)} 
                                    address={e.Address}
                                    phone={e.Phone}
                                    passportNumber={e.PassportNumber}
                                    education={e.Education}
                                    isAdmin={admin}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className='text-center'>Сотрудники не найдены...</td>
                            </tr>
                        )}
                    </Tbody>
                </Table>
            </div>
        </section>
    );
}