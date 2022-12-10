import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from "@chakra-ui/react"
import { stringToUpperCase } from "../../../util"

function PokeModal({ title, button, rollNewPokemon, cleanPokemonRoll, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleEventOnOpenModal = () => {
        rollNewPokemon()
        onOpen()
    }

    const handleEventOnCloseModal = () => {
        cleanPokemonRoll()
        onClose()
    }

    return (
        <>
            <Button 
                title={title} 
                mr={4} 
                onClick={rollNewPokemon ? handleEventOnOpenModal : onOpen}
            >
                {button}
            </Button>

            <Modal isOpen={isOpen} onClose={cleanPokemonRoll ? handleEventOnCloseModal : onClose}>
                <ModalOverlay />
                <ModalContent minWidth="35rem" minHeight="35rem">
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal