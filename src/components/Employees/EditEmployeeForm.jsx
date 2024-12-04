import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEmployeeById } from "../../services/employees";
import CreateEmployeeForm from "./CreateEmployeeForm"; 

export default function EditEmployeeForm() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            const fetchedEmployee = await fetchEmployeeById(id);
            setEmployee(fetchedEmployee);
        };
        fetchEmployee();
    }, [id, setEmployee]);

    return <CreateEmployeeForm initialEmployee={employee} />;
}