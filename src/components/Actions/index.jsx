import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import classes from "./Actions.module.css"
import { useEffect } from "react";

export default function Actions({link, id, scale}){
    useEffect(() => {
        scale = scale || "lg";
    }, [])
    return (
        <>
            <Link to={`/${link}/edit/${id}`}>
                <IconButton 
                    className={`${classes.iconButton}`}
                    aria-label="Изменить" 
                    icon={<EditIcon />} 
                    colorScheme="blue" 
                    size={scale} 
                    variant="outline" 
                    ml={0}
                />
            </Link>
            <Link to={`/${link}/delete/${id}`}>
                <IconButton 
                    className={`${classes.iconButton} ${classes.delete}`}
                    aria-label="Удалить" 
                    icon={<DeleteIcon />} 
                    colorScheme="red" 
                    size={scale}  
                    variant="outline" 
                    ml={1}
                />
            </Link>
        </>
    );
}