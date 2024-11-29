import { Button, Input, InputGroup, Select, InputRightElement, Textarea, HStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { fetchAllEmployees } from "../../services/employees";
import { createJobTitle, updateJobTitle, fetchJobTitleById } from "../../services/jobTitles"; 
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateJobTitleForm({ initialJobTitle }) {
    const [jobTitle, setJobTitle] = useState(initialJobTitle || {
        name: "",
        description: "",
        salary: "",
        responsibilities: "",
        requirements: "",
        employeeId: ""
    });

    useEffect(() => {
        setJobTitle(initialJobTitle || {});
    }, [initialJobTitle]);

    const navigate = useNavigate(); 

    const onSubmit = async (e) => {
        e.preventDefault();

        if (initialJobTitle) {
            await updateJobTitle(jobTitle); 
        } else {
            await createJobTitle(jobTitle);
        }

        setJobTitle({});
        navigate('/jobtitles'); 
    }

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialJobTitle ? "Изменение должности" : "Создание должности"}
                </h1>
            </div>
            <Input required
                placeholder="Название должности" 
                value={jobTitle?.name || ""}
                onChange={(e) => setJobTitle({...jobTitle, name: e.target.value})} 
            />
            <HStack gap="5">
                <InputGroup>
                    <Input required
                        type='number' min={0} step={0.01}
                        placeholder="Зарплата"
                        value={jobTitle?.salary || ""}
                        onChange={(e) => setJobTitle({...jobTitle, salary: e.target.value})}     
                    />
                    <InputRightElement pointerEvents='none' color='black.300' fontSize='1.0em' mr="3">
                        BYN
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <Textarea
                maxHeight="200px" resize="vertical" 
                placeholder="Обязанности..." 
                value={jobTitle?.responsibilities || ""}
                onChange={(e) => setJobTitle({...jobTitle, responsibilities: e.target.value})} 
            />
            <Textarea
                maxHeight="200px" resize="vertical" 
                placeholder="Требования..." 
                value={jobTitle?.requirements || ""}
                onChange={(e) => setJobTitle({...jobTitle, requirements: e.target.value})} 
            />

            <Button type="submit" colorScheme="blue">
                {initialJobTitle ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}