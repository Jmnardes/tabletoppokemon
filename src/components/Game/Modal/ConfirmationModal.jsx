import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Button,
    useDisclosure,
    ModalFooter,
} from "@chakra-ui/react"

function PokeModal({ children, event }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button h={12} m={4} onClick={onOpen}>
                {children}
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Tem certeza disso?</ModalHeader>
                <ModalCloseButton />
                <ModalFooter justifyContent="center">
                    <Button w={24} onClick={event} backgroundColor="red.700" mx={2}>
                    Sim
                    </Button>
                    <Button w={24} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal