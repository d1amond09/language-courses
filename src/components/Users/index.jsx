import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Thead, Th, Tr, Tbody, Input } from '@chakra-ui/react';
import { fetchUsers } from '../../services/users';
import User from './User'; 
import Pagination from '../Pagination'; 
import { AuthContext } from '../../context/AuthContext';
import FiltersForUsers from './Filters/FiltersForUsers'; 
import Loading from '../Loading';
import { defaultFilters } from './Filters/data';

export default function Users() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(defaultFilters);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { users, totalPages } = await fetchUsers({ ...filter, pageNumber: filter.pageNumber });
            setUsers(users);
            setTotalPages(totalPages); 
        } catch (error) {
            console.error("Ошибка при загрузке пользователей:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        await fetchData(); 
    };
    
    useEffect(() => {
        fetchData();
    }, [filter]);

    const handlePageChange = (page) => {
        setFilter((prev) => ({ ...prev, pageNumber: page }));
    };

    return (
        <section className='container flex flex-row gap-6'>
            <div className='w-1/4 max-w-sm'>
                <FiltersForUsers filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                {admin && ( <Button as={Link} to="/create-user">Создать пользователя</Button> )}
            </div>
            <div className='flex-1 overflow-auto'>
                <Table className='min-w-full' size="sm" minH={"70vh"}>
                    <Thead>
                        <Tr>
                            <Th>Имя пользователя</Th>
                            <Th>Электронная почта</Th>
                            <Th>Роли</Th>
                            {admin && <Th>Действия</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {loading ? (
                            <h1 className='text-4xl col-span-3 text-center mt-56'><Loading/></h1>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <User key={user.Id} user={user} isAdmin={admin} />
                            ))
                        ) : (
                            <Tr>
                                <td colSpan="4" className='text-4xl col-span-3 text-center mt-56'>Нет пользователей для отображения</td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
                {users.length > 0 && (
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />)}
            </div>
        </section>
    );
}