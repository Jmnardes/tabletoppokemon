import {
    Text,
    Center,
    Wrap,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import GenericModal from "@components/Modal/GenericModal"
import { augmentColor } from "@utils"
import AugmentContainer from "../../../components/Augments/AugmentContainer"

export default function AugmentsModal({ augments, event }) {
    const { emit, updateGame, setLoading, setPlayer, setBerries } = useContext(PlayerContext)

    const handleSelectAugment = (augment) => {
        setLoading({ loading: true, text: "Selecting augment..." })
        emit('augment-selected', { augment })
    }

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
            setLoading({ loading: false })
        })

        return () => {
            socket.off('augment-selected')
        }
    }, [])

    return (
        <GenericModal title={"Choose a new Augment"}>
            <Center flex flexDir={"column"} gap={4} h={"100%"} px={8}>
                <Text fontSize={"sm"} textAlign={"center"}>
                    Augments are special features that give you bonuses until the end of the game.
                </Text>
                <Text fontSize={"sm"} textAlign={"center"} color={augmentColor(augments.type)}>
                    Augments type: {augments.type}
                </Text>
                <Center h="100%" pb={8}>
                    <Wrap justify={"center"} alignItems={"center"} mx={8}>
                        {augments.list?.map((augment, index) => (
                            <AugmentContainer 
                                key={index} 
                                augment={augment} 
                                handler={() => handleSelectAugment(augment)} 
                                choose={true}
                            />
                        ))}
                    </Wrap>
                </Center>
            </Center>
        </GenericModal>
    )
}