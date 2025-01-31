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
                            This is a non-financial game made by a fan of the pokemon series
                            <br/>
                            The objective of the game is to be the best pokemon master, to be the best you must earn points in the pokemon league ranking.
                            <br/>
                            You play against your friends and earn points by winning battles, catching pokemons, completing missions and others.
                            <br/>
                            Just create your room, invite your friends and start playing now!
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}