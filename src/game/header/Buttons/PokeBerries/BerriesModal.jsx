import { useContext, useEffect, useState } from "react"
import PlayerContext from "@context/PlayerContext"
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
import PokeList from "@features/pokemon/PokeList"
import BerriesPage from "./BerriesPage"

export default function BerriesModal() {
    const { updateGame, getAllPokemons } = useContext(PlayerContext)
    const [ allPokemon, setAllPokemon ] = useState([])
    const [ selectedPokemon, setSelectedPokemon ] = useState(null)

    useEffect(() => {
        setAllPokemon(getAllPokemons())
    }, [getAllPokemons])

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
                        <PokeList pokemons={allPokemon} onSelect={setSelectedPokemon} />

                        <BerriesPage selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}