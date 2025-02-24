import {
    Text,
    Center,
    Flex,
    Badge,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import AugmentData from "./AugmentData"
import socket from "@client"
import GenericModal from "@components/Modal/GenericModal"

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
        <GenericModal title={"Choose a new Augment"}>
            <Center flex flexDir={"column"} gap={12} h={"100%"} p={40}>
                <Text textAlign={"center"}>
                    Augments are special features that give you bonuses until the end of the game.
                </Text>
                <Flex direction={"row"} justifyContent={"space-around"} gap={8}>
                    {augments?.map((augment, index) => (
                        <AugmentContainer key={index} augment={augment} />
                    ))}
                </Flex>
            </Center>
        </GenericModal>
    )
}