import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Thead, Th, Tr, Tbody, Box } from '@chakra-ui/react';
import { fetchEmployees } from '../../services/employees';
import Employee from './Employee'; 
import Pagination from '../Pagination'; 
import { fetchAllJobTitles } from '../../services/jobTitles';
import { AuthContext } from '../../context/AuthContext';
import Filters from './Filters';
import { defaultFilters } from './Filters/data';
import CreateButton from '../Actions/CreateButton';
import Loading from '../Loading';

export default function Employees() {
    const { isAdmin } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState(defaultFilters);
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
    
    const admin = isAdmin();

    return (
        <section className='container flex flex-row gap-5'>
            <div className='flex flex-col w-1/6 gap-10'>
                <Filters filter={filter} jobTitles={jobTitles} setFilter={setFilter} onSearch={handleSearch} />
                { admin ? ( <CreateButton link={"employees"}/> ) : "" }
            </div>
            <div className='flex flex-col gap-5'>
                <Box>
                    <Table size="sm" minHeight="70vh">
                        <Thead>
                            <Tr>
                                <Th>ФИО</Th>
                                <Th>Должность</Th>
                                <Th>Дата рождения</Th>
                                <Th>Адрес</Th>
                                <Th>Телефон</Th>
                                <Th>Номер паспорта</Th>
                                <Th>Образование</Th>
                                {admin && <Th>Действия</Th>}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <Employee employee={employee} key={employee.Id} isAdmin={admin} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className='text-center'> <Loading/></td>
                                </tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
                {employees.length > 0 && (
                    <Pagination 
                        currentPage={filter.pageNumber}
                        totalPages={totalPages || 0}
                        onPageChange={handlePageChange}
                    /> 
                )}
            </div>
        </section>
    );
}