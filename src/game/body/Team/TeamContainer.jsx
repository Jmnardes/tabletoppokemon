import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";

import PokeTeam from "./PokeTeam";

export default function TeamContainer() {
    return (
        <Flex flex="1" flexDir="column">
            <PokeTeam />
        </Flex>
    )
}