import { useState } from "react"
import Logo from "./Logo"
import MenuLinks from "./MenuLinks"
import MenuToggle from "./MenuToggle"
import NavBarContainer from "./NavBarContainer"
import AuthDisplay from "../Authentication/AuthDisplay"

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggle = () => setIsOpen(!isOpen)
  
    return (
      <NavBarContainer {...props}>
        <Logo
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
        <AuthDisplay />
      </NavBarContainer>
    )
  }