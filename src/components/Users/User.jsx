import { Tr, Td } from '@chakra-ui/react';
import Actions from '../Actions';

export default function User({ user, isAdmin }) {
    return (
        <Tr>
            <Td>{user.UserName}</Td>
            <Td>{user.Email}</Td>
            <Td>{user.Roles.join(', ')}</Td>
            { isAdmin && (<Td> <Actions link={"users"} id={user.Id} scale={"sm"} /> </Td>) }
        </Tr>
    );
}