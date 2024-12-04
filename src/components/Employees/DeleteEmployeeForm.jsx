import { useParams, useNavigate } from 'react-router-dom';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';
import { deleteEmployee } from '../../services/employees';

export default function DeleteEmployeeForm() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const handleDelete = async () => {
        try {
            const response = await deleteEmployee(id); 
            if (response === 204) { 
                alert('Сотрудник успешно удалён.');
                navigate('/employees'); 
            } else {
                alert('Ошибка при удалении сотрудника.');
            }
        } catch (error) {
            console.error('Ошибка удаления сотрудника:', error);
            alert('Произошла ошибка при удалении сотрудника.');
        }
    };

    return (
        <div className="delete-employee-form">
            <Alert status="warning">
                <AlertIcon />
                Вы уверены, что хотите удалить сотрудника с ID: {id}?
            </Alert>
            <Button colorScheme="red" onClick={handleDelete} mt={4}>
                Удалить сотрудника
            </Button>
            <Button colorScheme="gray" onClick={() => navigate('/employees')} mt={4}>
                Отмена
            </Button>
        </div>
    );
}