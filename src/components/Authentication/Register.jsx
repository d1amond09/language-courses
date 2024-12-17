import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Stack, Flex } from '@chakra-ui/react';
import { register } from '../../services/authentication';
import ButtonGoBack from '../ButtonGoBack';
import { defaultUser } from './data';

const Register = () => {
    const [formData, setFormData] = useState(defaultUser);
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
            const response = await register(formData);

            if (response.ok) {
                setSuccessMessage('Регистрация прошла успешно! Проверьте ваш email для подтверждения.');
                setFormData(defaultUser);
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
            <Text  as="h1" className='text-center' fontSize="3xl" mt="0" mb="1">Регистрация</Text>
            <form onSubmit={handleSubmit}>
                {error && <Text color="red.500">{error}</Text>}
                {successMessage && <Text color="green.500">{successMessage}</Text>}
                <Stack spacing={2}>
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
                        <FormLabel>Логин</FormLabel>
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
                    <Flex gap={2}>
                        <ButtonGoBack/>
                        <Button colorScheme="teal" type="submit" width="full">Зарегистрироваться</Button>
                    </Flex>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;
