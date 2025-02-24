import { useContext, useEffect, useState } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import { Text } from "@chakra-ui/react"
import PokeList from "@components/Pokemon/PokeList"
import PokeUpgrade from "./PokeUpgrade"
import GenericModal from "@components/Modal/GenericModal"

export default function PokeUpgradeModal() {
    const { updateGame, pokeBox, pokeTeam } = useContext(PlayerContext)
    const [ allPokemon, setAllPokemon ] = useState([ ...pokeTeam, ...pokeBox ])
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    useEffect(() => {
        setAllPokemon(() => {
            const newAllTeam = [ ...pokeTeam, ...pokeBox ]

            if (selectedPokemon) {
                const updatedSelectedPokemon = newAllTeam.find(
                  poke => poke.id === selectedPokemon.id
                )

                if (updatedSelectedPokemon) {
                  setSelectedPokemon(updatedSelectedPokemon)
                }
            }

            return newAllTeam
        })
    }, [pokeBox, pokeTeam])

    return (
        <GenericModal 
            title={"Poke Upgrade"}
            closeButton={true}
            onModalClose={() => updateGame({ openPokeUpgradeModal: false })}
        >
            <Text fontSize={"small"} textAlign={"center"} mt={4}>Select the pokemon you wanna use your item</Text>
            <PokeList allPokemon={allPokemon} setSelectedPokemon={setSelectedPokemon} />

            <PokeUpgrade selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        </GenericModal>
    )
}