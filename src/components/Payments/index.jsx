import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Thead, Th, Tr, Tbody } from '@chakra-ui/react';
import { fetchPayments } from '../../services/payments';
import Payment from './Payment'; 
import FiltersForPayments from './FiltersForPayments'; // Компонент для фильтрации платежей
import Pagination from '../Pagination'; 
import { AuthContext } from '../../context/AuthContext';

export default function Payments() {
    const { isAdmin } = useContext(AuthContext);
    const admin = isAdmin();
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState({
        minAmount: "",
        maxAmount: "",
        minDate: "",
        maxDate: "",
        searchTerm: "",
        orderBy: "date",
        sortOrder: "asc",
        pageNumber: 1,
        pageSize: 10,
    });

    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        const { payments, totalPages } = await fetchPayments(filter);
        setPayments(payments); 
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
        fetchData(); 
    };

    return (
        <section className='container p-8 flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/4 gap-10'>
                <FiltersForPayments filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                <Pagination 
                    currentPage={filter.pageNumber}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />
                { admin ? (
                    <Link to="/payments/create">
                        <Button size="lg" colorScheme="blue" variant="solid" width="full">Создать платеж</Button>
                    </Link>
                ) : null }
            </div>
            <div className='flex-1'>
                <Table className='min-w-full'>
                    <Thead>
                        <Tr>
                            <Th>ФИО слушателя</Th>
                            <Th>Дата</Th>
                            <Th>Назначение</Th>
                            <Th>Сумма</Th>
                            { admin ? (<Th>Действия</Th>) : null }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {payments.length > 0 ? (
                            payments.map((p) => (
                                <Payment 
                                    key={p.Id}
                                    id={p.Id}
                                    studentId={p.StudentId}
                                    date={new Date(p.Date)} 
                                    purpose={p.Purpose}
                                    amount={p.Amount}
                                    isAdmin={admin}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center'>Платежи не найдены...</td>
                            </tr>
                        )}
                    </Tbody>
                </Table>
            </div>
        </section>
    );
}