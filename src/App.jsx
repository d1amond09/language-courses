import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, VStack } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/Authentication/PrivateRoute';
import AuthDisplay from './components/Authentication/AuthDisplay';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Courses from './components/Courses'; 
import React from 'react';
import JobTitles from './components/JobTitles';
import Employees from './components/Employees';
import Payments from './components/Payments';
import Students from './components/Students';
import ButtonTheme from './components/ButtonTheme';
import Header from './components/Header';
import DeleteForm from './components/Forms/DeleteForm';
import EditForm from './components/Forms/EditForm';
import CourseForm from './components/Courses/CourseForm';
import PaymentForm from './components/Payments/PaymentForm';
import EmployeeForm from './components/Employees/EmployeeForm';
import JobTitleForm from './components/JobTitles/JobTitleForm';
import { deleteCourse, fetchCourseById } from './services/courses';
import { deletePayment, fetchPaymentById } from './services/payments';
import { deleteStudent, fetchStudentById } from './services/students';
import { deleteEmployee, fetchEmployeeById } from './services/employees';
import { deleteJobTitle, fetchJobTitleById } from './services/jobTitles';
import './App.css'
import StudentForm from './components/Students/StudentForm';

function App() {
  return (
      <Router>
        <AuthProvider> 
          <Header/>
          <AuthDisplay />
          <ButtonTheme/>
          <VStack className="container mx-auto p-5">
            <Routes>
              <Route path="/jobtitles" element={<PrivateRoute> <JobTitles /> </PrivateRoute>} />
              <Route path="/jobtitles/create" element={<JobTitleForm />} />
              <Route path="/jobtitles/edit/:id" element={<EditForm CreateForm={JobTitleForm} fetchElementById={fetchJobTitleById} />} />
              <Route path="/jobtitles/delete/:id" element={<DeleteForm link={"jobtitles"} deleteElement={deleteJobTitle}/>} />

              <Route path="/employees" element={<PrivateRoute> <Employees /> </PrivateRoute>} />
              <Route path="/employees/create" element={<EmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EditForm CreateForm={EmployeeForm} fetchElementById={fetchEmployeeById} />} />
              <Route path="/employees/delete/:id" element={<DeleteForm link={"employees"} deleteElement={deleteEmployee}/>} />

              <Route path="/students" element={<PrivateRoute> <Students /> </PrivateRoute>} />
              <Route path="/students/create" element={<StudentForm />} />
              <Route path="/students/edit/:id" element={<EditForm CreateForm={StudentForm} fetchElementById={fetchStudentById} />} />
              <Route path="/students/delete/:id" element={<DeleteForm link={"students"} deleteElement={deleteStudent}/>} />

              <Route path="/payments" element={<PrivateRoute> <Payments /> </PrivateRoute>} />
              <Route path="/payments/create" element={<PaymentForm />} />
              <Route path="/payments/edit/:id" element={<EditForm CreateForm={PaymentForm} fetchElementById={fetchPaymentById} />} />
              <Route path="/payments/delete/:id" element={<DeleteForm link={"payments"} deleteElement={deletePayment}/>} />

              <Route path="/courses" element={<PrivateRoute> <Courses /> </PrivateRoute>} />
              <Route path="/courses/create" element={<CourseForm />} />
              <Route path="/courses/edit/:id" element={<EditForm CreateForm={CourseForm} fetchElementById={fetchCourseById} />} />
              <Route path="/courses/delete/:id" element={<DeleteForm link={"courses"} deleteElement={deleteCourse} />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Text fontSize="xl">Выберите таблицу для отображения данных</Text>} />
            </Routes>
          </VStack>
        </AuthProvider> 
      </Router>
  );
}

export default App;