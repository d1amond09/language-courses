import { Button, Input, InputGroup, Select, InputRightElement, Textarea, HStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllEmployees } from "../../services/employees";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateCourseForm({ onCreate, initialCourse }) {
    const [course, setCourse] = useState(initialCourse || {
        name:"", description:"", tuitionFee:"", 
        trainingProgram:"", intensity:"", 
        availableSeats:"", groupSize:"", hours:""
    });
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(initialCourse?.employeeId || "");

    useEffect(() => {
        setCourse(initialCourse || {});
        setSelectedEmployee(initialCourse?.employeeId || "");
    }, [initialCourse]);

    useEffect(() => {   
        const fetchData = async () => {
            const data = await fetchAllEmployees(); 
            setEmployees(data.employees);    
        };
        fetchData();
    }, []);

    const navigate = useNavigate(); 
    const onSubmit = (e) => {
        e.preventDefault();
        const courseWithEmployee = { ...course, employeeId: selectedEmployee };
        setCourse({});
        onCreate(courseWithEmployee);
        navigate('/courses'); 
    }

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialCourse ? "Изменение курса" : "Создание курса"}
                </h1>
            </div>
            <Input required
                placeholder="Название" 
                value={course?.name || ""}
                onChange={(e) => setCourse({...course, name: e.target.value})} 
            />
            <Input required
                placeholder="Программа обучения" 
                value={course?.trainingProgram || ""}
                onChange={(e) => setCourse({...course, trainingProgram: e.target.value})} 
            />
            <Input required
                placeholder="Интенсивность" 
                value={course?.intensity || ""}
                onChange={(e) => setCourse({...course, intensity: e.target.value})} 
            />
            <Textarea
                maxHeight="200px" resize="vertical" 
                placeholder="Описание курса..." 
                value={course?.description || ""}
                onChange={(e) => setCourse({...course, description: e.target.value})} 
            />
            <Select 
                placeholder="Выберите сотрудника" 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)}>
                {employees.map(employee => (
                    <option key={employee.Id} value={employee.Id}>{employee.FullName}</option>
                ))}
            </Select>
            <HStack gap="5">
                <InputGroup>
                    <Input required
                        type='number' min={0.01} max={9999999} step={0.01}
                        placeholder="Стоимость"
                        value={course?.tuitionFee || 1}
                        onChange={(e) => setCourse({...course, tuitionFee: e.target.value})}     
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="3">
                        BYN
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input required
                        type='number' step={2} min={2} max={9999999}
                        placeholder="Количество часов обучения"
                        value={course?.hours || 2}
                        onChange={(e) => setCourse({...course, hours: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        ч.
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input required
                        type='number' min={0} max={9999999}
                        placeholder="Общее количество мест"
                        value={course?.groupSize || 2}
                        onChange={(e) => setCourse({...course, groupSize: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        шт.
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input required
                        type='number' min={1} max={9999999}
                        placeholder="Количество свободных мест"
                        value={course?.availableSeats || 2}
                        onChange={(e) => setCourse({...course, availableSeats: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        шт.
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <Button type="submit" colorScheme="blue">
                {initialCourse ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}