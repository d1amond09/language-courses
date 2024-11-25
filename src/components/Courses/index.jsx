import { useEffect, useState } from 'react';
import '../../App.css';
import Course from './Course';
import Filter from './FiltersForCourses';
import { fetchCourses } from '../../services/courses';
import Pagination from '../Pagination';

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
        pageSize: 6,
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
    }, []);
  
    const handlePageChange = (page) => {
      setFilter((prev) => ({ ...prev, pageNumber: page }));
      handleSearch(); 
    };
  
    return (
        <section className='p-8 flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/4 gap-10'>
                <Filter filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />
            </div>
              <ul className='grid grid-cols-3 gap-5 flex-1 w-1/2'>
                  {courses.length > 0 ? (
                      courses.map((c) => (
                          <li key={c.Id}>
                              <Course 
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
                      <p>Курсы не найдены.</p> 
                  )}
              </ul>
        </section>
    );
  }