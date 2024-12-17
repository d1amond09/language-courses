import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../services/authentication';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await sendPasswordResetEmail({ email });
      if (response.status === 200) {
        setMessage('Ссылка для сброса пароля отправлена на ваш email.');
        setTimeout(() => navigate('/login'), 5000);
      } else {
        setError('Ошибка при отправке ссылки для сброса пароля.');
      }
    } catch (err) {
      setError('Ошибка сети. Пожалуйста, попробуйте позже.');
      console.error(err);
    }
  };

  return (
    <Box width="400px" margin="auto" padding="5">
      <Text as="h1" fontSize="3xl" mt="12vh" mb="4">Забыли пароль?</Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">Отправить ссылку для сброса</Button>
        {message && <Text color="green.500">{message}</Text>}
        {error && <Text color="red.500">{error}</Text>}
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Вернуться к &nbsp;
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> 
          Входу
        </Link>
      </p>
    </Box>
  );
};

export default ForgotPassword;