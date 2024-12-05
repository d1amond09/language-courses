import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CreateButton({link}) {
    return (
        <Link to={`/${link}/create`}>
            <Button size="lg" colorScheme="blue" variant="solid" width="full" mt={5}> Создать запись </Button>
        </Link>
    );
}