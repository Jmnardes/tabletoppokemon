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

export default function GameInfo({ setGameInfoModal }) {
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
                            <Text>Game Info</Text>
                            <CloseButton
                                position="absolute" 
                                right="20px"
                                title={'Fechar'}
                                onClick={() => setGameInfoModal(false)}
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody p={4} m={4}>
                        <Badge py={2} px={4} mb={2} w={"full"} textAlign={"center"}>Purpose</Badge>
                        <Text fontSize={"sm"}>This is a non-financial game made by a fan of the Pókemon series.</Text>
                        
                        <Badge py={2} px={4} my={2} mt={6} w={"full"} textAlign={"center"}>Objective</Badge>
                        <Text fontSize={"sm"}>The objective of the game is to be the best Pókemon Master, in this path you must earn points in the Pókemon League Ranking.</Text>

                        <Badge py={2} px={4} my={2} mt={6} w={"full"} textAlign={"center"}>How it works</Badge>
                        <Text fontSize={"sm"}>You play against others to earn points by winning battles, catching Pókemons, completing tasks and more.</Text>

                        <Text fontSize={"x-small"} mt={4} textAlign={"center"} textDecoration={"underline"}>Invite your friends and play now!</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}