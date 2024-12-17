import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/authentication';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    try {
      const response = await resetPassword({ token, email, password: newPassword, confirmPassword: confirmPassword});
      if (response.status === 200) {
        setSuccess('Пароль успешно сброшен. Вы можете войти.');
        setTimeout(() => navigate('/login'), 5000);
      } else {
        setError('Ошибка при сбросе пароля.');
      }
    } catch (err) {
      setError('Ошибка сети. Пожалуйста, попробуйте позже.');
      console.error(err);
    }
  };

  return (
    <Box width="400px" margin="auto" padding="5">
      <Text as="h1" fontSize="3xl" mt="12vh" mb="4">Сброс пароля</Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>Новый пароль</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Подтверждение пароля</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">Сбросить пароль</Button>
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}
      </form>
    </Box>
  );
};

export default ResetPassword;