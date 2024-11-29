import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';
import { deleteCourse } from '../../services/courses'; 

export default function DeleteCourseForm() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const handleDelete = async () => {
        try {
            const response = await deleteCourse(id); 
            if (response === 204) { 
                alert('Курс успешно удалён.');
                navigate('/courses'); 
            } else {
                alert('Ошибка при удалении курса.');
            }
        } catch (error) {
            console.error('Ошибка удаления курса:', error);
            alert('Произошла ошибка при удалении курса.');
        }
    };

    return (
        <div className="delete-course-form">
            <Alert status="warning">
                <AlertIcon />
                Вы уверены, что хотите удалить курс с ID: {id}?
            </Alert>
            <Button colorScheme="red" onClick={handleDelete} mt={4}>
                Удалить курс
            </Button>
            <Button colorScheme="gray" onClick={() => navigate('/courses')} mt={4}>
                Отмена
            </Button>
        </div>
    );
}