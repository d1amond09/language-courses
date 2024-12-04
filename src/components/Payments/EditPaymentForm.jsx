import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPaymentById } from "../../services/payments"; 
import CreatePaymentForm from "./CreatePaymentForm"; 

export default function EditPaymentForm() {
    const [payment, setPayment] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPayment = async () => {
            const fetchedPayment = await fetchPaymentById(id);
            setPayment(fetchedPayment);
        };
        fetchPayment();
    }, [id]);

    return payment ? <CreatePaymentForm initialPayment={payment} /> : <div>Загрузка...</div>;
}