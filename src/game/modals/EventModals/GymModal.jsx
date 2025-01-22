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
import PlayerContext from "@Contexts/PlayerContext"
import GymBlock from "../../Event/GymBlock"


export default function GymModal() {
    const { updateGame } = useContext(PlayerContext)

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center justifyContent="space-between">
                            <Flex />
                            <Text ml={8}>Gym</Text>
                            <CloseButton onClick={() => updateGame({ openGymModal: false })} />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <GymBlock gymTier={0} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}