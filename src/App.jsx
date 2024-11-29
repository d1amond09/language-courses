import { ChakraProvider, Box, Text, Stack, VStack, Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/Authentication/PrivateRoute';
import AuthDisplay from './components/Authentication/AuthDisplay';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import CreateCourseFrom from './components/Courses/CreateCourseForm';
import Courses from './components/Courses'; 
import { AuthProvider } from './context/AuthContext'; 
import React, { useContext, useEffect, useState } from 'react';
import { createCourse, updateCourse } from './services/courses';
import EditCourseForm from './components/Courses/EditCourseForm';
import DeleteCourseForm from './components/Courses/DeleteCourseForm';
import { AuthContext } from './context/AuthContext';

function App() {
  const onCreateCourse = async (course) => {
    await createCourse(course);
  };
  
  useEffect(() => {
    
}, []);

  return (
    <ChakraProvider>
      <AuthProvider> 
        <Router>
          <VStack className="container mx-auto p-5">
            <Stack direction="row" spacing={75} align="stretch">
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Курсы </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Cлушатели </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Платежи </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Сотрудники </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Должности </Button>
              </Link>
              <AuthDisplay />
            </Stack>

            <Routes>
              <Route path="/courses" element={<PrivateRoute> <Courses /> </PrivateRoute>} />
              <Route path="/courses/create" element={<CreateCourseFrom onCreate={onCreateCourse} />} />
              <Route path="/courses/edit/:id" element={<EditCourseForm />} />
              <Route path="/courses/delete/:id" element={<DeleteCourseForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Text fontSize="xl">Выберите таблицу для отображения данных</Text>} />
            </Routes>
          </VStack>
        </Router>
      </AuthProvider> 
    </ChakraProvider>
  );
}

export default App;