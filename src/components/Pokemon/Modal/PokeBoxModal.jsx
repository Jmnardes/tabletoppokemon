import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    Text,
    CloseButton,
    Center,
    ModalBody,
} from "@chakra-ui/react"
import PlayerContext from "../../../Contexts/PlayerContext"
import PokeBox from "../Trainer/PokeBox"
import PokeTeam from "../Trainer/PokeTeam"

export default function PokeBoxModal() {
    const { updateGame } = useContext(PlayerContext)

    return (
        <>
            <Modal isOpen size="full" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center justifyContent="space-between">
                            <Flex />
                            <Text>Poke Bag</Text>
                            <CloseButton onClick={() => updateGame({ openPokeBoxModal: false })} />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <PokeBox />

                        <PokeTeam />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}