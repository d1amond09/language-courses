import React, { useContext, useEffect, useState } from 'react';
import JobTitle from './JobTitle'; 
import Pagination from '../Pagination';
import { fetchJobTitles } from '../../services/jobTitles'; 
import { AuthContext } from '../../context/AuthContext.jsx';
import Filters from './Filters';
import CreateButton from '../Actions/CreateButton.jsx';
import { defaultFilters } from './Filters/data.js';
import Loading from '../Loading/index.jsx';

export default function JobTitles() {
    const { isAdmin } = useContext(AuthContext);
    const [filter, setFilter] = useState(defaultFilters);
    const [totalPages, setTotalPages] = useState(0);
    const [jobTitles, setJobTitles] = useState([]);

    const fetchData = async () => {
        const { jobTitles, totalPages } = await fetchJobTitles({ ...filter, pageNumber: filter.pageNumber });
        setJobTitles(jobTitles);
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
    
    const admin = isAdmin();

    return (
        <section className='container flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/3 gap-10 '>
                <Filters filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                { admin ? ( <CreateButton link={"jobtitles"} /> ) : "" }
            </div>
            <div className='flex-1 w-1/2'>
                <ul className='grid grid-cols-2 gap-5'> 
                {jobTitles.length > 0 ? (
                    jobTitles.map((jt) => (
                        <li key={jt.Id}>
                            <JobTitle jobTitle={jt} isAdmin={admin} />
                        </li>
                    ))
                ) : (
                    <h1 className='text-4xl col-span-3 text-center mt-56'><Loading/></h1> 
                )}
                </ul>
                {jobTitles.length > 0 && (
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />)}
            </div>
        </section>
    );
}