import { useContext, useState } from "react"
import PlayerContext from "@context/PlayerContext"
import { Text } from "@chakra-ui/react"
import PokeList from "@features/pokemon/PokeList"
import PokeUpgrade from "./PokeUpgrade"
import GenericModal from "@components/Modal/GenericModal"

export default function PokeUpgradeModal() {
    const { updateGame, getTeamPokemons } = useContext(PlayerContext)
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    return (
        <GenericModal 
            title={"Poke Upgrade"}
            closeButton={true}
            onModalClose={() => updateGame({ openPokeUpgradeModal: false })}
        >
            <Text fontSize={"small"} textAlign={"center"} mt={4}>Select the pokemon you wanna use your item</Text>
            <PokeList pokemons={getTeamPokemons()} onSelect={setSelectedPokemon} />

            <PokeUpgrade selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        </GenericModal>
    )
}