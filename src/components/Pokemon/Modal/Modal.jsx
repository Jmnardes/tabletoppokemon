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
import { stringToUpperCase } from "../../../util"

function PokeModal({ title, button, children, size, modalClose }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if(modalClose) {
            onClose()
        }
    }, [modalClose, onClose])

    return (
        <>
            <Button 
                ml={2}
                title={title}
                onClick={onOpen}
            >
                {button}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalOverlay />
                <ModalContent minWidth={size ? "" : "35rem"} minHeight={size ? "" : "35rem"}>
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