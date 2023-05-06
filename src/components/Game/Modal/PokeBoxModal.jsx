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
import PlayerContext from "../../../Contexts/PlayerContext"
import PokeBox from "../Trainer/PokeBox"
import PokeTeam from "../Trainer/PokeTeam"

export default function PokeBoxModal() {
    const { updateGame, pokeTeam, pokeBox, emit } = useContext(PlayerContext)

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
                            <Text>Poke Bag</Text>
                            <CloseButton 
                                position="absolute" 
                                right="20px"
                                isDisabled={pokeTeam.length !== 3 && (pokeBox.length + pokeTeam.length) >= 3}
                                title={pokeTeam.length !== 3 ? 'Você precisa de 3 pokemons no time' : 'Fechar'}
                                onClick={() => {
                                    updateGame({ openPokeBoxModal: false, showBagLength: false })
                                    emit('player-update-bag', pokeTeam)
                                }} 
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <PokeBox />

                        <PokeTeam bag={true} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}