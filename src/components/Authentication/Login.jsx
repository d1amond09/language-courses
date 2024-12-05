import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { signIn } from '../../services/authentication';

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
      const response = await signIn({username, password});
      if (response.status == 200) {
        const { accessToken, refreshToken } = await response.data;
        login(accessToken, refreshToken);
        navigate('/'); 
      } else if (response.status === 401) {
        setError('Ошибка входа. Пожалуйста, проверьте ваши учетные данные.');
      } else {
        const data = await response.data;
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