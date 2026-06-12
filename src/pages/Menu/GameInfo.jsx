import {
    Badge,
    Center,
    CloseButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export default function GameInfo({ setGameInfoModal }) {
    const { t } = useTranslation()

    return (
        <>
            <Modal isOpen size="lg" isCentered onOverlayClick={() => setGameInfoModal(false)}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center>
                            <Text>{t('gameInfo.title')}</Text>
                            <CloseButton
                                position="absolute" 
                                right="20px"
                                title={t('common.close')}
                                onClick={() => setGameInfoModal(false)}
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody p={4} m={4}>
                        <Badge py={2} px={4} mb={2} w={"full"} textAlign={"center"}>{t('gameInfo.purpose')}</Badge>
                        <Text fontSize={"sm"}>{t('gameInfo.purposeText')}</Text>
                        
                        <Badge py={2} px={4} my={2} mt={6} w={"full"} textAlign={"center"}>{t('gameInfo.objective')}</Badge>
                        <Text fontSize={"sm"}>{t('gameInfo.objectiveText')}</Text>

                        <Badge py={2} px={4} my={2} mt={6} w={"full"} textAlign={"center"}>{t('gameInfo.howItWorks')}</Badge>
                        <Text fontSize={"sm"}>{t('gameInfo.howItWorksText')}</Text>

                        <Text fontSize={"x-small"} mt={4} textAlign={"center"} textDecoration={"underline"}>{t('gameInfo.inviteFriends')}</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}