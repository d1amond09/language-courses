import { Tr, Td } from '@chakra-ui/react';
import Actions from '../Actions';

export default function Student({ student, isAdmin }) {

    return (
        <Tr>
            <Td>{student.FullName}</Td>
            <Td>{new Date(student.BirthDate).toLocaleDateString()}</Td>
            <Td>{student.Address}</Td>
            <Td>{student.Phone}</Td>
            <Td>{student.PassportNumber}</Td>
            <Td width="90%">
                {student.Courses.length > 0 ? student.Courses.map(course => course.name).reduce((prev, curr) => [prev, <br key={curr} />, curr]) : 'Нет курсов'}
            </Td>
            { isAdmin && (<Td> <Actions link={"students"} id={student.Id} scale={"sm"} /> </Td>) }
        </Tr>
    );
}