import { Outlet } from "react-router-dom";
import { Box, Divider, Flex } from "@chakra-ui/react";
import NavBar from "../Header/NavBar";

const Layout = () => {
    return (
        <>
        <header>
            <NavBar/>
        </header>
        <main>
            <Box m={5} h={"81vh"}>
                <Outlet/>
            </Box>
        </main>
        <footer>
            <Box align="center" w={"100vw"}>
                <Divider w={"90vw"}/>
                
                <p className="text-center">
                    © 2024 — Курсовая работа «Языковые курсы» по дисциплине РПБДИС — студент группы ИТИ-31 Бердников М. М.
                </p>
            </Box>
        </footer> 
        </>
    );
}

export {Layout}