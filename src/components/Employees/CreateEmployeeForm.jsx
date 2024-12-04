import { Button, Input, Textarea, Select } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllJobTitles } from "../../services/jobTitles"; 
import { useNavigate } from "react-router-dom"; 
import { createEmployee, updateEmployee } from "../../services/employees";

export default function CreateEmployeeForm({ initialEmployee }) {
    const [employee, setEmployee] = useState(initialEmployee || {
        fullName: "",
        birthDate: "",
        address: "",
        phone: "",
        passportNumber: "",
        education: "",
        jobTitleId: "",
    });

    const [jobTitles, setJobTitles] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");

    useEffect(() => {
        if (initialEmployee) {
            const { fullName, jobTitleId } = initialEmployee;
            const parts = fullName.split(' ');

            setEmployee({
                fullName,
                id: initialEmployee.id || "",
                surname: parts[0] || "",
                name: parts[1] || "",
                midname: parts[2] || "",
                birthDate: initialEmployee.birthDate || "",
                address: initialEmployee.address || "",
                phone: initialEmployee.phone || "",
                passportNumber: initialEmployee.passportNumber || "",
                education: initialEmployee.education || "",
                jobTitleId: jobTitleId || "",
            });
            setSelectedJobTitle(jobTitleId || "");
        }
    }, [initialEmployee]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllJobTitles();
            setJobTitles(data.jobTitles);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleFullNameChange = (e) => {
        const fullName = e.target.value;
        const parts = fullName.split(' ');

        setEmployee(prev => ({
            ...prev,
            fullName,
            surname: parts[0] || "",
            name: parts[1] || "",
            midname: parts[2] || ""
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const employeeWithJobTitle = { ...employee, jobTitleId: selectedJobTitle };
        if (initialEmployee) {
            await updateEmployee(employeeWithJobTitle); 
        } else {
            await createEmployee(employeeWithJobTitle);
        }
        setEmployee({});
        navigate('/employees');
    };

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialEmployee ? "Изменение сотрудника" : "Создание сотрудника"}
                </h1>
            </div>
            <Input
                required
                placeholder="ФИО (Фамилия Имя Отчество)"
                value={employee.fullName}
                onChange={handleFullNameChange}
            />
            <Input
                required
                type="date"
                placeholder="Дата рождения"
                value={employee.birthDate || ""}
                onChange={(e) => setEmployee({ ...employee, birthDate: e.target.value })}
            />
            <Input
                required
                placeholder="Адрес"
                value={employee.address}
                onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
            <Input
                required
                placeholder="Телефон"
                value={employee.phone}
                onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
            />
            <Input
                required
                placeholder="Номер паспорта"
                value={employee.passportNumber}
                onChange={(e) => setEmployee({ ...employee, passportNumber: e.target.value })}
            />
            <Textarea
                maxHeight="200px" resize="vertical"
                placeholder="Образование"
                value={employee.education}
                onChange={(e) => setEmployee({ ...employee, education: e.target.value })}
            />
            <Select
                placeholder="Выберите должность"
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}>
                {jobTitles.map(jobTitle => (
                    <option key={jobTitle.Id} value={jobTitle.Id}>{jobTitle.Name}</option>
                ))}
            </Select>
            <Button type="submit" colorScheme="blue">
                {initialEmployee ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}