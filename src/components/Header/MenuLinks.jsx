import { Box, Stack } from '@chakra-ui/react';
import { headers } from './data';
import MenuItem from './MenuItem';

export default function MenuLinks({isOpen}) {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
                >
                {headers.map((header, index) => (
                    <MenuItem key={index} to={`/${header.link}`} >
                        {header.name}
                    </MenuItem>
                ))}
            </Stack>
        </Box>  
    );
}