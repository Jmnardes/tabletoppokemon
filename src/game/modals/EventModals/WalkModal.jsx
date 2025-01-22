import { useMemo, useEffect, useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    Button,
    ModalFooter,
    ModalOverlay,
    Text,
    Center,
    useColorMode,
    Divider,
    Flex,
    Image
} from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import SuccessIcon from "@components/Icons/SuccessIcon"
import coinIcon from '@assets/images/game/coin.png'
import starIcon from '@assets/images/game/star.png'
import crownIcon from '@assets/images/game/crown.png'

const PrizeIcon = ({ type }) => {
    switch (type) {
        case 'coins':
            return <Image src={coinIcon} title="Coin" w="20px" ml={1} />
        case 'stars':
            return <Image src={starIcon} title="Poke star" w="20px" ml={1} />
        case 'crowns':
            return <Image src={crownIcon} title="Poke crown" w="20px" ml={1} />
        default:
            return
    }
}

export default function WalkModal({ event }) {
    const { updateGame, updatePlayer, player, pokeTeam } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const prize = event.prizes[0]

    const conditionMet = useMemo(() => {
        const advantage = event.advantage?.value?.[0]
        if (!advantage) return true
        
        return pokeTeam?.reduce((acc, cur) => {
            switch (event.advantage.type) {
                case 'element': {
                    return acc || (cur.types?.includes(advantage))
                }
                case 'nature': {
                    return acc || (cur.nature?.toLowerCase() === advantage)
                }
                default:
                    break
            }
        }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (conditionMet) {
            const newAmount = player[prize.type][prize.name] + prize.amount
            updatePlayer(newAmount, prize.type, prize.name)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditionMet])

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>{event.title}</ModalHeader>
                    <Center
                        p={2}
                        flexDirection="column"
                        bg={colorMode === 'light' ? "gray.200" : "gray.650"}
                        borderRadius={8}
                    >
                        <Text textAlign="center">{event.label}</Text>
                    </Center>
                    
                    <Divider my={4}  mb={6} />

                    <Center
                        p={2}
                        flexDirection="column"
                        bg={colorMode === 'light' ? "gray.200" : "gray.650"}
                        borderRadius={8}
                    >
                        {conditionMet ? (
                            <Flex gap='1rem'>
                                {prize.amount < 0 ? (
                                    <Text textAlign="center" color="red.400" ml={2} fontWeight="bold">
                                        You lost something...
                                    </Text>
                                ) : (
                                    <Text textAlign="center" color="green.400" ml={2} fontWeight="bold">
                                        You earned a prize!
                                    </Text>
                                )}
                                <Center>
                                    <Text>{prize.amount}x</Text>
                                    <PrizeIcon type={prize.name} />
                                </Center>
                            </Flex>
                        ) : (
                            <Flex color="red.400">
                                <Text textAlign="center" ml={2} fontWeight="bold" fontSize="xs">
                                    Condition(s) not met. Better luck next time!
                                </Text>
                            </Flex>
                        )}

                    </Center>

                    <Divider my={4}  mb={6} />

                    <ModalFooter p={0}>

                        <Button h={12} onClick={() => {
                            updateGame({ openWalkModal: false, openEncounterModal: true })
                        }}>
                            <SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} />
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}