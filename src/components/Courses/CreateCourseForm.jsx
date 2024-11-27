import { Button, Input, InputGroup, Select, InputRightElement, Textarea, HStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllEmployees } from "../../services/employees";

export default function CreateCourseFrom({ onCreate }) {
    const [course, setCourse] = useState();

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllEmployees(); 
                setEmployees(data.employees);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchData();
    }, []);



    const onSubmit = (e) => {
        e.preventDefault();
        const courseWithEmployee = { ...course, EmployeeId: selectedEmployee };
        console.log(courseWithEmployee);
        setCourse(null);
        onCreate(courseWithEmployee);
    }



    return (
        <form onSubmit={(e) => onSubmit(e)} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center"> Создание курса </h1>
            </div>
            <Input 
                placeholder="Название" 
                value={course?.Name ?? ""}
                onChange={(e) => setCourse({...course, Name: e.target.value})} 
            />
            <Input 
                placeholder="Программа обучения" 
                value={course?.TrainingProgram ?? ""}
                onChange={(e) => setCourse({...course, TrainingProgram: e.target.value})} 
            />
            <Input 
                placeholder="Интенсивность" 
                value={course?.Intensity ?? ""}
                onChange={(e) => setCourse({...course, Intensity: e.target.value})} 
            />
            <Textarea 
                maxHeight="200px" resize="vertical" 
                placeholder="Описание курса..." 
                value={course?.Description ?? ""}
                onChange={(e) => setCourse({...course, Description: e.target.value})} 
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
                    <Input 
                        type='number' min={0.01} max={9999999} step={0.01}
                        placeholder="Стоимость"
                        value={course?.TuitionFee ?? 1}
                        onChange={(e) => setCourse({...course, TuitionFee: e.target.value})}     
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="3">
                        BYN
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input 
                        type='number' step={2} min={2} 
                        placeholder="Количество часов обучения"
                        value={course?.Hours ?? 2}
                        onChange={(e) => setCourse({...course, Hours: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        ч.
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input 
                        type='number' min={0} 
                        placeholder="Общее количество мест"
                        value={course?.GroupSize ?? 1}
                        onChange={(e) => setCourse({...course, GroupSize: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        шт.
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input 
                        type='number' min={1} 
                        placeholder="Количество свободных мест"
                        value={course?.AvailableSeats ?? 1}
                        onChange={(e) => setCourse({...course, AvailableSeats: e.target.value})} 
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="1">
                        шт.
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <Button type="submit" colorScheme="blue"> Создать </Button>
        </form>
    );
}