import { RepeatIcon } from "@chakra-ui/icons";
import classes from "./Loading.module.css";
export default function Loading()
{
    return(
        <RepeatIcon className={`${classes.spin}`}/>
    );
}