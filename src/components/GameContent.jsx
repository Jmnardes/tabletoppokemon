import { Flex } from "@chakra-ui/react";
import Opponents from "./Pokemon/Opponents/Opponents";
import TeamContainer from "./Pokemon/Team/TeamContainer";

export default function GameContent({ pokeTeam }) {
    return (
        <Flex flex="1">
            <Flex flex="1" flexDir="column" overflow="hidden">
                <TeamContainer />
            </Flex>
            <Opponents />
        </Flex>
    )
}