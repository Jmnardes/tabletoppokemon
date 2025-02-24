import { Center, CloseButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"

export default function GenericModal({ children, title, closeButton, onModalClose, size, rewriteCloseButton = null }) {
    return (
        <Modal isOpen isCentered size={size}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(2px) hue-rotate(0deg)'
            />
            <ModalContent  w="80vw" h="90vh" maxW="none">
                <ModalHeader fontSize="3xl" textAlign="center">
                    <Center>
                        <Text>{title}</Text>
                        {rewriteCloseButton}
                        {closeButton && (
                            <CloseButton
                                position="absolute" 
                                right="20px"
                                title={'Fechar'}
                                onClick={onModalClose}
                            />
                        )}
                    </Center>
                </ModalHeader>
                
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}