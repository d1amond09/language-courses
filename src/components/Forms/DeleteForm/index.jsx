import { useParams, useNavigate } from 'react-router-dom';
import { Button, Alert, AlertIcon, Flex, VStack } from '@chakra-ui/react';

export default function DeleteForm({deleteElement, link}) {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const handleDelete = async () => {
        try {
            const response = await deleteElement(id); 
            if (response === 204) { 
                alert('Запись успешно удалена.');
                navigate(`/${link}`); 
            } else {
                alert('Ошибка при удалении записи.');
            }
        } catch (error) {
            console.error('Ошибка удаления записи:', error);
            alert('Произошла ошибка при удалении записи.');
        }
    };

    return (
        <div className="delete-course-form" mt="5px">
            <Alert status="warning" borderRadius={"full"}>
                <AlertIcon />
                Вы уверены, что хотите удалить запись ({link}) с ID: {id}?
            </Alert>
            <VStack className="container mx-auto p-5">
                <Flex gap={5}>
                    <Button colorScheme="red" onClick={handleDelete} mt={4}>
                        Удалить запись
                    </Button>
                    <Button colorScheme="blue" onClick={() => navigate(`/${link}`)} mt={4}>
                        Отмена
                    </Button>
                </Flex>
            </VStack>
        </div>
    );
}