import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Button,
    useDisclosure,
    ModalFooter,
    ModalBody,
    Text,
} from "@chakra-ui/react"

function ConfirmationModal({ children, event, modalTitle = "Are you sure?", modalText, ...props }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} {...props}>
                {children}
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        <Text fontSize={"sm"} my={8}>{modalText}</Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center" gap={4}>
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