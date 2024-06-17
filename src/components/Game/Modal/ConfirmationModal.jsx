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

function ConfirmationModal({ children, event, text = "Are you sure?", bh = 12}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button h={bh} m={4} onClick={onOpen}>
                {children}
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>{text}</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter justifyContent="center">
                        <Button w={24} onClick={() => {
                            event()
                            onClose()
                        }} backgroundColor="red.700" mx={2}>
                        Yes
                        </Button>
                        <Button w={24} onClick={onClose}>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmationModal