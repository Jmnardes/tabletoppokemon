import {
    Modal,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react"
import PokeBag from "./PokeBag"

export default function PokeBoxModal() {
    return (
        <>
            <Modal isOpen size="full" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <PokeBag />
                </ModalContent>
            </Modal>
        </>
    )
}