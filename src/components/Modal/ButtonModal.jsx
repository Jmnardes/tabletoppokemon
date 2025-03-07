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
import { useEffect } from "react"
import { stringToUpperCase } from "@utils"

export default function ButtonModal({ title, button, children, size, modalClose, disableModalClose, setCloseModal, disableButton }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if(modalClose) {
            onClose()
            setCloseModal(false)
        }
    }, [modalClose, onClose, setCloseModal])

    return (
        <>
            <Button 
                mx={1}
                title={title}
                onClick={onOpen}
                isDisabled={disableButton}
            >
                {button}
            </Button>

            <Modal isOpen={isOpen} onClose={disableModalClose ? null : onClose} size={size}>
                <ModalOverlay />
                <ModalContent minWidth={size ? "" : "35rem"} minHeight={size ? "" : "35rem"}>
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    {!disableModalClose && <ModalCloseButton />}
                    <ModalBody flex="1">
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}