import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const email = queryParams.get('email');

        const confirmEmail = async () => {
            if (!token || !email) {
                setStatusMessage('Ошибка: недопустимые параметры.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://localhost:8003/api/authentication/confirm-email?token=${token}&email=${email}`);
                if (response.ok) {
                    setStatusMessage('Email успешно подтвержден!');
                } else {
                    const errorData = await response.json();
                    setStatusMessage(errorData.message || 'Ошибка при подтверждении email.');
                }
            } catch (err) {
                setStatusMessage('Ошибка сети. Пожалуйста, попробуйте позже.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        confirmEmail();
    }, []);

    const handleRedirect = () => {
        navigate('/login'); // Перенаправление на страницу входа после подтверждения
    };

    return (
        <Box width="400px" margin="auto" padding="5" textAlign="center">
            {isLoading ? (
                <Text>Загрузка...</Text>
            ) : (
                <>
                    <Text fontSize="xl" mb="4">{statusMessage}</Text>
                    <Button colorScheme="teal" onClick={handleRedirect}>Перейти к входу</Button>
                </>
            )}
        </Box>
    );
};

export default EmailConfirmation;