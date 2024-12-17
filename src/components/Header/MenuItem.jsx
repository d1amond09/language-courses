import { Text } from "@chakra-ui/react"
import { Link, NavLink } from "react-router-dom"
import classes from "./MenuItem.module.css";


export default function MenuItem ({ children, isLast, to = "/", ...rest }) {
  console.log(classes);
  const setActive = ({isActive}) => isActive ? classes.active : '';
  return (
    <NavLink to={to} className={setActive}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </NavLink>
  )
}