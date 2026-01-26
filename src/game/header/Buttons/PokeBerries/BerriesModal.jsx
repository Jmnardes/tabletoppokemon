import { useContext, useEffect, useMemo, useState } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import {
    Center,
    CloseButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react"
import PokeList from "@components/Pokemon/PokeList"
import BerriesPage from "./BerriesPage"

export default function BerriesModal() {
    const { updateGame, teamWithData, boxWithData } = useContext(PlayerContext)
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    const allPokemon = useMemo(
        () => [...teamWithData, ...boxWithData],
    [teamWithData, boxWithData]);

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
                            <Text>Berries</Text>
                            <CloseButton
                                position="absolute" 
                                right="20px"
                                title={'Fechar'}
                                onClick={() => updateGame({ openBerriesModal: false })}
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Text textAlign={"center"} mt={4}>Select the pokemon you wanna use your berry</Text>
                        <PokeList pokemons={allPokemon} setSelectedPokemon={setSelectedPokemon} />

                        <BerriesPage selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}