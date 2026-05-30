import { Flex, useColorMode } from "@chakra-ui/react";
import Opponents from "../Opponents/Opponents";

export default function RightPanel() {
    const { colorMode } = useColorMode();

    return (
        <Flex
            padding="0.5rem"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
        >
            <Opponents />
        </Flex>
    );
}