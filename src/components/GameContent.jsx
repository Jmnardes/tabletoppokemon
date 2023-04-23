import { Flex } from "@chakra-ui/react";
import Items from "./Pokemon/Inventary/Items";
import Opponents from "./Pokemon/Opponents/Opponents";
import ElementsList from "./Pokemon/Team/ElementsList";
import TeamContainer from "./Pokemon/Team/TeamContainer";
import PokeBox from "./Pokemon/Trainer/PokeBox";

export default function GameContent({ pokeTeam }) {
    return (
        <Flex flex="1">
            <Flex flex="1" flexDir="column" overflow="hidden">
                <PokeBox />

                <ElementsList />
                <Items pokeTeam={pokeTeam} />
                
                <TeamContainer />
            </Flex>
            <Opponents />
        </Flex>
    )
}