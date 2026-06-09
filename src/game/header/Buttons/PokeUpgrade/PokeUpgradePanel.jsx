import { useContext, useState } from "react"
import PlayerContext from "@context/PlayerContext"
import { Flex, Text } from "@chakra-ui/react"
import PokeList from "@features/pokemon/PokeList"
import PokeUpgrade from "./PokeUpgrade"

export default function PokeUpgradePanel() {
    const { getTeamPokemons } = useContext(PlayerContext)
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Poke Upgrade</Text>
            <Text fontSize="small" textAlign="center" mt={2}>Select the pokemon you wanna use your item</Text>
            <PokeList pokemons={getTeamPokemons()} onSelect={setSelectedPokemon} />
            <PokeUpgrade selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        </Flex>
    )
}
