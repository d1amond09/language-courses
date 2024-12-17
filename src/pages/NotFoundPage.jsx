import { Heading, Text, VStack } from "@chakra-ui/react";

export default function NotFoundPage() {
    return (
        <VStack spacing={5} align="center" p={5}>
            <Heading fontSize="2xl" fontWeight="bold">
                Ошибка 404
            </Heading>
            <Text fontSize="lg" textAlign="center">
                Страница не найдена
            </Text>
        </VStack>
    );
}