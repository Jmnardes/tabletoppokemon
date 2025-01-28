import {
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
            <Modal isOpen size="lg" isCentered>
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
                    
                    <ModalBody p={8}>
                        <Text textAlign={"center"} mt={4}>
                            This is a fan made based on pokemon
                            <br/>
                            The game is a multiplayer game where you can play with your friends, the goal is to catch and level up your pokemons to battle and conquest the gyms.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}