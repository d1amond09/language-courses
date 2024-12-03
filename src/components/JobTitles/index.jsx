import React, { useContext, useEffect, useState } from 'react';
import JobTitle from './JobTitle'; 
import Filter from './FiltersForJobTitles.jsx'; 
import Pagination from '../Pagination';
import { fetchJobTitles } from '../../services/jobTitles'; 
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function JobTitles() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [jobTitles, setJobTitles] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: "",
        pageNumber: 1,
        pageSize: 4,
    });
  
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async () => {
        const { jobTitles, totalPages } = await fetchJobTitles(filter);
        setJobTitles(jobTitles); 
        setTotalPages(totalPages);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { jobTitles, totalPages } = await fetchJobTitles({ 
                ...filter, 
                searchTerm: "", 
                pageNumber: 1 
            });
            setJobTitles(jobTitles);
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

                { admin ? (
                        <Link to="/jobtitles/create">
                            <Button size="lg" colorScheme="blue" variant="solid" width="full"> Создать должность </Button>
                        </Link>
                    ) : "" 
                }
                
            </div>
            <div className='flex-1 w-1/2'>
                <ul className='grid grid-cols-2 gap-5'> 
                {jobTitles.length > 0 ? (
                    jobTitles.map((jt) => (
                        <li key={jt.Id}>
                            <JobTitle 
                                id={jt.Id}
                                name={jt.Name} 
                                salary={jt.Salary} 
                                responsibilities={jt.Responsibilities} 
                                requirements={jt.Requirements}  
                                isAdmin={admin}
                            />
                        </li>
                    ))
                ) : (
                    <h1 className='text-4xl col-span-3'>Должности не найдены...</h1> 
                )}
                </ul>
            </div>
        </section>
    );
}