import { Flex, Stack } from '@chakra-ui/react';
import { headers } from './data';
import HeaderButton from './HeaderButton';

export default function Header() {
    return (
        <header>
            <Flex
                direction="row"
                spacing={75}
                align="center"
                justify="center"
                bg={'blackAlpha.400'}
                p={3}
            >
                <Stack direction="row" spacing={75} align={"center"} alignItems={"center"}>
                {headers.map((header, index) => (
                    <HeaderButton key={index} {...header} />
                ))}
                </Stack>
            </Flex>
        </header>
    );
}