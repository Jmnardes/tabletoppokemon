import { Flex } from "@chakra-ui/react";
import Opponents from "./Opponents/Opponents";
import TeamContainer from "./Team/TeamContainer";

export default function GameContent() {
    return (
        <Flex flex="1">
            <Flex flex="1" flexDir="column" overflow="hidden">
                <TeamContainer />
            </Flex>
            <Opponents />
        </Flex>
    )
}