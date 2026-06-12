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
import { useTranslation } from "react-i18next"

function ConfirmationModal({ children, event, modalTitle, modalText, ...props }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { t } = useTranslation()
    const title = modalTitle || t('common.areYouSure')

    return (
        <>
            <Button onClick={onOpen} {...props}>
                {children}
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        <Text fontSize={"sm"} my={8}>{modalText}</Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center" gap={4}>
                        <Button w={24} onClick={() => {
                            event()
                            onClose()
                        }} backgroundColor="red.700" mx={2}>
                        {t('common.yes')}
                        </Button>
                        <Button w={24} onClick={onClose}>{t('common.no')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmationModal