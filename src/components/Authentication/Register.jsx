import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Stack } from '@chakra-ui/react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('https://localhost:8003/api/authentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                setSuccessMessage('Регистрация прошла успешно! Проверьте ваш email для подтверждения.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phoneNumber: '',
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Ошибка при регистрации.');
            }
        } catch (err) {
            setError('Ошибка сети. Пожалуйста, попробуйте позже.');
            console.error(err);
        }
    };

    return (
        <Box width="400px" margin="auto" padding="5">
            <Text as="h1" fontSize="2xl" mb="4">Регистрация</Text>
            <form onSubmit={handleSubmit}>
                {error && <Text color="red.500">{error}</Text>}
                {successMessage && <Text color="green.500">{successMessage}</Text>}
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Фамилия</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Имя пользователя</FormLabel>
                        <Input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Номер телефона</FormLabel>
                        <Input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit" width="full">Зарегистрироваться</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;
