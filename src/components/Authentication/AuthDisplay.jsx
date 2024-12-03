import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Stack, Button } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext'; 

const AuthDisplay = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <Box>
      {user ? ( 
        <Stack direction="row" spacing={4} align="center">
          <Text fontSize="lg">{user.username}</Text> 
          <Button size="lg" colorScheme="red" onClick={logout}>Выйти</Button>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <Link to="/login">
            <Button size="lg" colorScheme="teal" variant="solid" width="full">Вход</Button>
          </Link>
          <Link to="/register">
            <Button size="lg" colorScheme="teal" variant="solid" width="full">Регистрация</Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
}

export default AuthDisplay;