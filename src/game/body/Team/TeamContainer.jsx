import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";

import PokeTeam from "./PokeTeam";
import PokeList from "@features/pokemon/PokeList";

export default function TeamContainer() {
    const { boxIds, pokemonData, moveToTeam, teamIds, session } = useContext(PlayerContext)

    const boxPokemons = boxIds.map(id => pokemonData[id]).filter(Boolean)
    const teamFull = teamIds?.length >= (session?.teamLength || 3)
    const hasBox = boxPokemons.length > 0

    return (
        <Flex flex="1" flexDir="column">
            {hasBox && (
                <>
                    <Text fontSize="sm" fontWeight="bold" textAlign="center" mt={2}>
                        Pokemons in bag
                    </Text>
                    <PokeList
                        pokemons={boxPokemons}
                        onSelect={(poke) => moveToTeam(poke.id)}
                        size="xs"
                        sprite="mini"
                        isDisabled={teamFull}
                        containerProps={{ h: 14 }}
                    />
                </>
            )}
            <PokeTeam bag={hasBox} />
        </Flex>
    )
}