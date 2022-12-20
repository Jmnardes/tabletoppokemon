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

function PokeModal({ title, button, children, size, modalClose, disableModalClose, setCloseModal, disableButton }) {
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
                ml={2}
                title={title}
                onClick={onOpen}
                disabled={disableButton}
            >
                {button}
            </Button>

            <Modal isOpen={isOpen} onClose={disableModalClose ? null : onClose} size={size}>
                <ModalOverlay />
                <ModalContent minWidth={size ? "" : "35rem"} minHeight={size ? "" : "35rem"}>
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    {!disableModalClose && <ModalCloseButton />}
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal