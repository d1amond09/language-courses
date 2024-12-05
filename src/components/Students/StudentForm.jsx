import { Button, Input, Textarea, Select } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllCourses } from "../../services/courses"; 
import { useNavigate } from "react-router-dom"; 
import { createStudent, updateStudent } from "../../services/students";

export default function StudentForm({ initialData }) {
    const [student, setStudent] = useState(initialData || {
        fullName: "", birthDate: "",
        address: "", phone: "",
        passportNumber: "",
        courseIds: [],
    });

    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        if (initialData) {
            const { fullName, courseIds } = initialData;
            const parts = fullName.split(' ');

            setStudent({
                fullName,
                id: initialData.id || "",
                surname: parts[0] || "",
                name: parts[1] || "",
                midname: parts[2] || "",
                birthDate: initialData.birthDate || "",
                address: initialData.address || "",
                phone: initialData.phone || "",
                passportNumber: initialData.passportNumber || "",
                courseIds: courseIds || [],
            });
            setSelectedCourses(courseIds || []);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCourses();
            setCourses(data.courses);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleFullNameChange = (e) => {
        const fullName = e.target.value;
        const parts = fullName.split(' ');

        setStudent(prev => ({
            ...prev,
            fullName,
            surname: parts[0] || "",
            name: parts[1] || "",
            midname: parts[2] || ""
        }));
    };

    const handleCourseChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedCourses(value);
        setStudent(prev => ({
            ...prev,
            courseIds: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (initialData) {
            await updateStudent(student); 
        } else {
            await createStudent(student);
        }
        navigate('/students');
    };

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-2">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialData ? "Изменение студента" : "Создание студента"}
                </h1>
            </div>
            <Input
                required
                placeholder="ФИО (Фамилия Имя Отчество)"
                value={student.fullName}
                onChange={handleFullNameChange}
            />
            <Input
                required
                type="date"
                placeholder="Дата рождения"
                value={student.birthDate || ""}
                onChange={(e) => setStudent({ ...student, birthDate: e.target.value })}
            />
            <Input
                required
                placeholder="Адрес"
                value={student.address}
                onChange={(e) => setStudent({ ...student, address: e.target.value })}
            />
            <Input
                required
                placeholder="Телефон"
                value={student.phone}
                onChange={(e) => setStudent({ ...student, phone: e.target.value })}
            />
            <Input
                required
                placeholder="Номер паспорта"
                value={student.passportNumber}
                onChange={(e) => setStudent({ ...student, passportNumber: e.target.value })}
            />
            <Select
                placeholder="Выберите курсы"
                multiple
                size="lg" minH={"56"}
                value={selectedCourses}
                onChange={handleCourseChange}
            >
                {courses.map(course => (
                    <option key={course.Id} value={course.Id}>{course.Name} {course.TrainingProgram}: {course.TuitionFee}</option>
                ))}
            </Select>
            <Button type="submit" colorScheme="blue">
                {initialData ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}