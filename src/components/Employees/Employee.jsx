import { 
    Tr, 
    Td, 
    Button 
} from '@chakra-ui/react';
import { fetchJobTitleById } from '../../services/jobTitles';
import { useEffect, useState } from 'react';
import Actions from '../Actions';

export default function Employee({ employee, isAdmin}) {
    const [jobTitle, setJobTitle] = useState({name: 'Не указана'});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchJobTitleById(employee.JobTitleId); 
            setJobTitle(data);    
        };
        fetchData();
    }, []);

    return (
        <Tr key={employee.Id}>
            <Td>{employee.FullName}</Td>
            <Td>{jobTitle.name}</Td>
            <Td>{new Date(employee.BirthDate).toLocaleDateString()}</Td>
            <Td>{employee.Address}</Td>
            <Td>{employee.Phone}</Td>
            <Td>{employee.PassportNumber}</Td>
            <Td>{employee.Education}</Td>
            { isAdmin ? (<Td><Actions link={"employees"} id={employee.Id} scale={"sm"} /></Td>) : ""}
        </Tr>
    );
}