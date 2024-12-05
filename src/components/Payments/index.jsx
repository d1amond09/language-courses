import React, { useContext, useEffect, useState } from 'react';
import { Table, Thead, Th, Tr, Tbody } from '@chakra-ui/react';
import { fetchPayments } from '../../services/payments';
import Payment from './Payment'; 
import Pagination from '../Pagination'; 
import { AuthContext } from '../../context/AuthContext';
import { defaultFilters } from './Filters/data';
import Filters from './Filters';
import CreateButton from '../Actions/CreateButton';
import { RepeatIcon } from '@chakra-ui/icons';
import Loading from '../Loading';

export default function Payments() {
    const { isAdmin } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState(defaultFilters);
    
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
    };
    
    const admin = isAdmin();

    return (
        <section className='container flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/4 gap-10'>
                <Filters filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                { admin ? ( <CreateButton link={"payments"}/> ) : null }
            </div>
            <div className='flex-1'>
                <Table className='min-w-full' size="sm" minHeight="70vh">
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
                            payments.map((payment) => (
                                <Payment key={payment.Id} payment={payment} isAdmin={admin} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center'> <Loading/></td>
                            </tr>
                        )}
                    </Tbody>
                </Table>
                {payments.length > 0 && (
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