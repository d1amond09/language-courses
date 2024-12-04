import { Button, Input, Textarea, Select } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllStudents } from "../../services/students";
import { useNavigate } from "react-router-dom"; 
import { createPayment, updatePayment } from "../../services/payments";

export default function CreatePaymentForm({ initialPayment }) {
    const [payment, setPayment] = useState(initialPayment || {
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
        if (initialPayment) {
            setPayment({
                id: initialPayment.id || "",
                studentId: initialPayment.studentId || "",
                date: initialPayment.date || "",
                purpose: initialPayment.purpose || "",
                amount: initialPayment.amount || "",
            });
            setSelectedStudent(initialPayment.studentId || "");
        }
    }, [initialPayment]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const paymentWithStudent = { ...payment, studentId: selectedStudent };
        if (initialPayment) {
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
                    {initialPayment ? "Изменение платежа" : "Создание платежа"}
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
                {initialPayment ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}