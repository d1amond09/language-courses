import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:8003/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        login(accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/'); 
      } else if (response.status === 401) {
        setError('Ошибка входа. Пожалуйста, проверьте ваши учетные данные.');
      } else {
        const data = await response.json();
        setError(data.message || 'Произошла ошибка. Пожалуйста, попробуйте позже.');
      }
    } catch (err) {
      setError('Ошибка сети. Пожалуйста, попробуйте позже.');
      console.error(err);
    }
  };

  return (
    <Box width="400px" margin="auto" padding="5">
      <Text as="h1" fontSize="2xl" mb="4">Вход</Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>Имя пользователя</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">Войти</Button>
            {error && <Text color="red.500">{error}</Text>}
      </form>
    </Box>
  );
};

export default Login;