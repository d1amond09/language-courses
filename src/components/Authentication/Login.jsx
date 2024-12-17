import React, { useContext, useState } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { signIn } from '../../services/authentication';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await signIn({username, password});
      if (response.status == 200) {
        const { accessToken, refreshToken } = await response.data;
        login(accessToken, refreshToken);
        navigate(fromPage, {replace: true}); 
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
      <Text as="h1" className='text-center' fontSize="3xl" mt="12vh" mb="4">Вход</Text>
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
          <div className='p-0 flex items-center justify-between'>
            <FormLabel>Пароль</FormLabel>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</Link>
            </div>
          </div>
          <div className="mt-0">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">Войти</Button>
            {error && <Text color="red.500">{error}</Text>}
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Не зарегистрированы? &nbsp;
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> 
           Регистрируйтесь здесь
        </Link>
      </p>
    </Box>
  );
};

export default Login;