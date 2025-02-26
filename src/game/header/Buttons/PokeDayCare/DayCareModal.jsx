import { useContext } from "react"
import { Text } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import DayCareContent from "./DayCareContent"
import GenericModal from "@components/Modal/GenericModal"

import DayCareShop from "./DayCareShop"

export default function DayCareModal() {
    const { updateGame, pokeBox, setLoadingApi, emit } = useContext(PlayerContext)

    const handleTrade = (pokemon) => {
        emit('daycare-pokemon-release', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
        setLoadingApi(true)
    };

    return (
        <GenericModal
            title={"Poke Day Care"}
            closeButton={true}
            onModalClose={() => updateGame({ openDayCareModal: false })}
        >
            <Text fontSize={"small"} textAlign={"center"}>Select a pokémon to leave in Daycare dependencies</Text>
            <DayCareContent handleTrade={handleTrade} pokeBox={pokeBox} />
            <DayCareShop />
        </GenericModal>
    )
}