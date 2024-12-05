import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditForm({CreateForm, fetchElementById}) {
    const [element, setElement] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchElement = async () => {
            const fetchedElement = await fetchElementById(id);
            setElement(fetchedElement);
        };
        fetchElement();
    }, [id, setElement]);
    return <CreateForm initialData={element} /> 
};