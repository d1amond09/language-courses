import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobTitleById } from "../../services/jobTitles";
import CreateJobTitleForm from "./CreateJobTitleForm";

export default function EditJobTitleForm() {
    const [jobTitle, setJobTitle] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchJobTitle = async () => {
            const fetchedJobTitle = await fetchJobTitleById(id);
            setJobTitle(fetchedJobTitle);
        };
        fetchJobTitle();
    }, [id, setJobTitle]);

    return <CreateJobTitleForm initialJobTitle={jobTitle} />;
};