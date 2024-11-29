import { useParams, useNavigate } from 'react-router-dom';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';
import { deleteJobTitle } from '../../services/jobTitles';

export default function DeleteJobTitleForm() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const handleDelete = async () => {
        try {
            const response = await deleteJobTitle(id); 
            if (response === 204) { 
                alert('Должность успешно удалена.');
                navigate('/jobtitles'); 
            } else {
                alert('Ошибка при удалении должности.');
            }
        } catch (error) {
            console.error('Ошибка удаления должности:', error);
            alert('Произошла ошибка при удалении должности.');
        }
    };

    return (
        <div className="delete-job-title-form">
            <Alert status="warning">
                <AlertIcon />
                Вы уверены, что хотите удалить должность с ID: {id}?
            </Alert>
            <Button colorScheme="red" onClick={handleDelete} mt={4}>
                Удалить должность
            </Button>
            <Button colorScheme="gray" onClick={() => navigate('/jobtitles')} mt={4}>
                Отмена
            </Button>
        </div>
    );
}