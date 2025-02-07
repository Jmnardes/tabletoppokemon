import { useContext, useEffect, useState } from "react"
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
    const { updateGame, pokeBox, pokeTeam } = useContext(PlayerContext)
    const [ allPokemon, setAllPokemon ] = useState([ ...pokeTeam, ...pokeBox ])
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    useEffect(() => {
        setAllPokemon([ ...pokeTeam, ...pokeBox ])
    }, [pokeBox, pokeTeam])

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
                        <PokeList allPokemon={allPokemon} setSelectedPokemon={setSelectedPokemon} />

                        <BerriesPage selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}