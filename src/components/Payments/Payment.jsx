import { 
    Tr, 
    Td, 
} from '@chakra-ui/react';
import { fetchStudentById } from '../../services/students';
import { useEffect, useState } from 'react';
import Actions from '../Actions';

export default function Payment({ payment, isAdmin}) {
    const [studentName, setStudentName] = useState('Не указано');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchStudentById(payment.StudentId); 
            setStudentName(data?.fullName || 'Не указано');
        };
        fetchData();
    }, [payment.StudentId]);

    return (
        <Tr key={payment.Id}>
            <Td>{studentName}</Td>
            <Td>{new Date(payment.Date).toLocaleDateString()}</Td>
            <Td>{payment.Purpose || "Нет данных"}</Td>
            <Td>{payment.Amount} руб.</Td>
            { isAdmin ? ( <Td> <Actions link={"payments"} id={payment.Id} scale={"sm"}/> </Td> ) : null }
        </Tr>
    );
}