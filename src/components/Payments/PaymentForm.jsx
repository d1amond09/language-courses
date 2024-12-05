import { Button, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllStudents } from "../../services/students";
import { useNavigate } from "react-router-dom"; 
import { createPayment, updatePayment } from "../../services/payments";

export default function PaymentForm({ initialData }) {
    const [payment, setPayment] = useState(initialData || {
        id: "",
        studentId: "",
        date: "",
        purpose: "",
        amount: "",
    });

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllStudents();
            setStudents(data.payments);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setPayment({
                id: initialData.id || "",
                studentId: initialData.studentId || "",
                date: initialData.date || "",
                purpose: initialData.purpose || "",
                amount: initialData.amount || "",
            });
            setSelectedStudent(initialData.studentId || "");
        }
    }, [initialData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const paymentWithStudent = { ...payment, studentId: selectedStudent };
        if (initialData) {
            await updatePayment(paymentWithStudent);
        } else {
            await createPayment(paymentWithStudent);
        }
        setPayment({});
        navigate('/payments');
    };

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialData ? "Изменение платежа" : "Создание платежа"}
                </h1>
            </div>
            <Select
                placeholder="Выберите студента"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
            >
                {students.map(student => (
                    <option key={student.Id} value={student.Id}>{student.FullName}</option>
                ))}
            </Select>
            <Input
                required
                type="date"
                placeholder="Дата"
                value={payment.date || ""}
                onChange={(e) => setPayment({ ...payment, date: e.target.value })}
            />
            <Input
                required
                placeholder="Назначение"
                value={payment.purpose}
                onChange={(e) => setPayment({ ...payment, purpose: e.target.value })}
            />
            <Input
                required
                type="number"
                placeholder="Сумма"
                value={payment.amount}
                onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            />
            <Button type="submit" colorScheme="blue">
                {initialData ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}