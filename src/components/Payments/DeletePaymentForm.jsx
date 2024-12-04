import { useParams, useNavigate } from 'react-router-dom';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';
import { deletePayment } from '../../services/payments';

export default function DeletePaymentForm() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const handleDelete = async () => {
        try {
            const response = await deletePayment(id); 
            if (response === 204) { 
                alert('Платеж успешно удалён.');
                navigate('/payments'); 
            } else {
                alert('Ошибка при удалении платежа.');
            }
        } catch (error) {
            console.error('Ошибка удаления платежа:', error);
            alert('Произошла ошибка при удалении платежа.');
        }
    };

    return (
        <div className="delete-payment-form">
            <Alert status="warning">
                <AlertIcon />
                Вы уверены, что хотите удалить платеж с ID: {id}?
            </Alert>
            <Button colorScheme="red" onClick={handleDelete} mt={4}>
                Удалить платеж
            </Button>
            <Button colorScheme="gray" onClick={() => navigate('/payments')} mt={4}>
                Отмена
            </Button>
        </div>
    );
}