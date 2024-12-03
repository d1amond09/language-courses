import { ChakraProvider, Box, Text, Stack, VStack, Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import JobTitles from './components/JobTitles';
import CreateJobTitleForm from './components/JobTitles/CreateJobTitleForm';
import EditJobTitleForm from './components/JobTitles/EditJobTitleForm';
import DeleteJobTitleForm from './components/JobTitles/DeleteJobTitleForm';
import Employees from './components/Employees';
import CreateEmployeeForm from './components/Employees/CreateEmployeeFrom';
import EditEmployeeForm from './components/Employees/EditEmployeeForm';
import DeleteEmployeeForm from './components/Employees/DeleteEmployeeFrom';

function App() {
  const onCreateCourse = async (course) => {
    await createCourse(course);
  };
  useEffect(() => {
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <AuthProvider> 
          <VStack className="container mx-auto p-5">
            <Stack direction="row" spacing={75} align="stretch">
              <Link to="/courses">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Курсы </Button>
              </Link>
              <Link to="/employees">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Cлушатели </Button>
              </Link>
              <Link to="/employees">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Платежи </Button>
              </Link>
              <Link to="/employees">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Сотрудники </Button>
              </Link>
              <Link to="/jobtitles">
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> Должности </Button>
              </Link>
              <AuthDisplay />
            </Stack>

            <Routes>
              <Route path="/jobtitles" element={<PrivateRoute> <JobTitles /> </PrivateRoute>} />
              <Route path="/jobtitles/create" element={<CreateJobTitleForm />} />
              <Route path="/jobtitles/edit/:id" element={<EditJobTitleForm />} />
              <Route path="/jobtitles/delete/:id" element={<DeleteJobTitleForm />} />

              <Route path="/employees" element={<PrivateRoute> <Employees /> </PrivateRoute>} />
              <Route path="/employees/create" element={<CreateEmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EditEmployeeForm />} />
              <Route path="/employees/delete/:id" element={<DeleteEmployeeForm />} />

              <Route path="/courses" element={<PrivateRoute> <Courses /> </PrivateRoute>} />
              <Route path="/courses/create" element={<CreateCourseFrom onCreate={onCreateCourse} />} />
              <Route path="/courses/edit/:id" element={<EditCourseForm />} />
              <Route path="/courses/delete/:id" element={<DeleteCourseForm />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Text fontSize="xl">Выберите таблицу для отображения данных</Text>} />
            </Routes>
          </VStack>
        </AuthProvider> 
      </Router>
    </ChakraProvider>
  );
}

export default App;