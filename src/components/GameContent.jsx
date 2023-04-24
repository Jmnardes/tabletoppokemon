import { Flex } from "@chakra-ui/react";
import Opponents from "./Pokemon/Opponents/Opponents";
import TeamContainer from "./Pokemon/Team/TeamContainer";
import PokeBox from "./Pokemon/Trainer/PokeBox";

export default function GameContent({ pokeTeam }) {
    return (
        <Flex flex="1">
            <Flex flex="1" flexDir="column" overflow="hidden">
                {/* <PokeBox /> */}
                
                <TeamContainer />
            </Flex>
            <Opponents />
        </Flex>
    )
}