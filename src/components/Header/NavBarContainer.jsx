import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function NavBarContainer ({ children, ...props }) {
  const textColor = useColorModeValue("black", "white");
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p={8}
        pt={2}
        pb={0}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={textColor}
        {...props}
      >
        {children}
      </Flex>
    )
  }