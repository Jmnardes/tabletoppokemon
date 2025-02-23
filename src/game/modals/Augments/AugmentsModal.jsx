import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ModalBody,
    Center,
    Flex,
    Badge,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import AugmentData from "./AugmentData"
import socket from "@client"

export default function AugmentsModal({ augments, event }) {
    const { emit, updateGame, setLoadingApi, setPlayer, setBerries } = useContext(PlayerContext)

    const handleSelectAugment = (augment) => {
        setLoadingApi(true)
        emit('augment-selected', { augment })
    }

    const AugmentContainer = ({ augment }) => {
        return (
            <Flex 
                direction={"column"} 
                backgroundColor={"gray.600"} 
                borderRadius={8} 
                p={4} gap={4} w={72}
                opacity={0.6}
                _hover={{ opacity: 1 }}
                cursor={"pointer"}
                onClick={() => handleSelectAugment(augment)}
            >
                <Badge p={2} borderRadius={8} textAlign={"center"}>
                    {augment.name}
                </Badge>
                <Center h={"100%"} flex flexDir={"column"} justifyContent={"space-around"} gap={8}>
                    <Text fontSize={"small"} textAlign={"center"}>
                        {augment.description}
                    </Text>
                    <AugmentData augment={augment} />
                </Center>
            </Flex>
        );
    };

    const updateModals = () => {
        updateGame({ openAugmentsModal: false })
        switch (event.type) {
            case 'challenge':
                updateGame({ openChallengeModal: true })
                break
            case 'walk':
                updateGame({ openWalkModal: true })
                break
            case 'battle':
                updateGame({ openBattleModal: true })
                break
            default:
                break
        }
    }

    useEffect(() => {
        socket.on('augment-selected', (res) => {
            setPlayer(res.player)
            setBerries(res.player.berries)
            updateModals()
            setLoadingApi(false)
        })

        return () => {
            socket.off('augment-selected')
        }
    }, [])

    return (
        <>
            <Modal isOpen size="6xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Text textAlign={"center"}>Choose a new Augment</Text>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Text fontSize={"x-small"} textAlign={"center"}>
                            Augments are special features that give you bonuses until the end of the game.
                        </Text>
                        <Flex direction={"row"} justifyContent={"space-around"} p={4}>
                            {augments?.map((augment, index) => (
                                <AugmentContainer key={index} augment={augment} />
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}