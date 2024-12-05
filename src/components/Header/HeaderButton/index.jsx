import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HeaderButton({link, name}) {
    return (
        <Link to={`/${link}`}>
                <Button size="lg" colorScheme="blue" variant="solid" width="full"> {name} </Button>
        </Link>
    );
}