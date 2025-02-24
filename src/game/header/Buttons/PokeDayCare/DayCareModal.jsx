import { useContext } from "react"
import { Center, Image, Text } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import DayCareContent from "./DayCareContent"
import GenericModal from "@components/Modal/GenericModal"

import daycare from '@assets/images/background/daycare.jpg'

export default function DayCareModal() {
    const { updateGame, pokeBox, setLoadingApi, emit } = useContext(PlayerContext)

    const handleTrade = (pokemon) => {
        emit('player-pokemon-trade', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
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
            <Center flex flexDir={"column"} gap={4} px={36}>
                <Text fontSize={"small"} textAlign={"center"}>
                Welcome to the Daycare! Your Pokémon will be well cared for, and we're always looking for the best trainer to support and help them become a lifelong friend on their journey.
                </Text>
                <Image w="30vw" src={daycare} />
            </Center>
        </GenericModal>
    )
}