import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ModalBody,
} from "@chakra-ui/react"
import Capture from "./Capture"

export default function CaptureModal({ capturedPokemon, setCapturedPokemon }) {
    return (
        <>
            <Modal isOpen size="6xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Text>New Pókemon</Text>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Capture capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}