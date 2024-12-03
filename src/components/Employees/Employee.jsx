import { 
    Tr, 
    Td, 
    Button 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchJobTitleById } from '../../services/jobTitles';
import { useEffect, useState } from 'react';

export default function Employee({ 
    id, 
    fullName, 
    jobTitleId,
    birthDate, 
    address, 
    phone, 
    passportNumber, 
    education,
    isAdmin
}) {
    const [jobTitle, setJobTitle] = useState({name: 'Не указана'});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchJobTitleById(jobTitleId); 
            console.log(data)
            setJobTitle(data);    
        };
        fetchData();
    }, []);

    return (
        <Tr key={id}>
                        <Td>{fullName}</Td>
                        <Td>{jobTitle?.name}</Td>
                        <Td>{birthDate.toLocaleDateString()}</Td>
                        <Td>{address}</Td>
                        <Td>{phone}</Td>
                        <Td>{passportNumber}</Td>
                        <Td>{education}</Td>
                        {
                            isAdmin ? (
                                <Td>
                                    <Link to={`/employees/edit/${id}`}>
                                        <Button size="sm" colorScheme="blue" variant="outline">Изменить</Button>
                                    </Link>
                                    <Link to={`/employees/delete/${id}`}>
                                        <Button size="sm" colorScheme="red" variant="outline" ml={2}>Удалить</Button>
                                    </Link>
                                </Td>
                            ) : ""
                        }
                    </Tr>
    );
}