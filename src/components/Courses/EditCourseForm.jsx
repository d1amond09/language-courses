import { useParams } from "react-router-dom";
import { fetchCourseById, updateCourse } from "../../services/courses";
import CreateCourseFrom from "./CreateCourseForm";
import { useEffect, useState } from "react";

export default function EditCourseForm() {
    const [course, setCourse] = useState(null);
    const { id } = useParams();

    const onUpdateCourse = async (course) => {
        await updateCourse(course);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            const fetchedCourse = await fetchCourseById(id);
            setCourse(fetchedCourse);
        };
        fetchCourse();
    }, [id, setCourse]);

    return <CreateCourseFrom initialCourse={course} />;
};