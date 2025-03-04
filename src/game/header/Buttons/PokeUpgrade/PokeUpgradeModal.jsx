import { useContext, useState } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import { Text } from "@chakra-ui/react"
import PokeList from "@components/Pokemon/PokeList"
import PokeUpgrade from "./PokeUpgrade"
import GenericModal from "@components/Modal/GenericModal"

export default function PokeUpgradeModal() {
    const { updateGame, pokeTeam } = useContext(PlayerContext)
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    return (
        <GenericModal 
            title={"Poke Upgrade"}
            closeButton={true}
            onModalClose={() => updateGame({ openPokeUpgradeModal: false })}
        >
            <Text fontSize={"small"} textAlign={"center"} mt={4}>Select the pokemon you wanna use your item</Text>
            <PokeList allPokemon={pokeTeam} setSelectedPokemon={setSelectedPokemon} />

            <PokeUpgrade selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        </GenericModal>
    )
}