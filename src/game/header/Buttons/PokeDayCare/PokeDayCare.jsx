import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    CloseButton,
    Center,
    ModalBody,
} from "@chakra-ui/react"

import PlayerContext from "@Contexts/PlayerContext"
import DayCareContent from "./DayCareContent"

export default function PokeDayCare() {
    const { updateGame, pokeBox, setLoadingApi, emit } = useContext(PlayerContext)

    const handleTrade = (pokemon) => {
        emit('player-pokemon-trade', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
        setLoadingApi(true)
    };

    return (
        <>
            <Modal isOpen size="full" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center>
                            <Text>Pokémon Day Care</Text>
                            <CloseButton 
                                position="absolute" 
                                right="20px"
                                title={'Fechar'}
                                onClick={() => updateGame({ openDayCareModal: false }) } 
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Text textAlign={"center"}>Select a pokémon to leave it in Day Care dependencies</Text>
                        <DayCareContent handleTrade={handleTrade} pokeBox={pokeBox} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}