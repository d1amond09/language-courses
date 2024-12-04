import { 
    Tr, 
    Td, 
    Button 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchStudentById } from '../../services/students';
import { useEffect, useState } from 'react';

export default function Payment({ 
    id, 
    studentId, 
    date, 
    purpose, 
    amount, 
    isAdmin 
}) {
    const [studentName, setStudentName] = useState('Не указано');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchStudentById(studentId); 
            setStudentName(data?.fullName || 'Не указано');
        };
        fetchData();
    }, [studentId]);

    return (
        <Tr key={id}>
            <Td>{studentName}</Td>
            <Td>{date.toLocaleDateString()}</Td>
            <Td>{purpose || "Нет данных"}</Td>
            <Td>{amount} руб.</Td>
            {
                isAdmin ? (
                    <Td>
                        <Link to={`/payments/edit/${id}`}>
                            <Button size="sm" colorScheme="blue" variant="outline">Изменить</Button>
                        </Link>
                        <Link to={`/payments/delete/${id}`}>
                            <Button size="sm" colorScheme="red" variant="outline" ml={2}>Удалить</Button>
                        </Link>
                    </Td>
                ) : null
            }
        </Tr>
    );
}