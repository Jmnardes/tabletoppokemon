import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    ModalFooter,
    ModalOverlay,
    Text,
    Flex,
    Center,
    useColorMode,
    Box,
    Divider,
    Tooltip,
    Image
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import FirstPlaceIcon from "../../../Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "../../../Icons/places/SecondPlaceIcon"
import SuccessIcon from "../../../Icons/SuccessIcon"
import ThirdPlaceIcon from "../../../Icons/places/ThirdPlaceIcon"
import OpponentsResult from "./OpponentsResult"
import { FaInfoCircle } from "react-icons/fa";
import coinIcon from '../../../../assets/images/game/coin.png'
import starIcon from '../../../../assets/images/game/star.png'
import crownIcon from '../../../../assets/images/game/crown.png'
import DiceButton from '../../DiceButton/DiceButton'
import socket from "../../../../client"
import SadIcon from "../../../Icons/emote/SadIcon"

export default function ChallengeModal({ event }) {
    const { updateGame, emit, opponents, updateCurrency, pokeTeam } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [opponentsRoll, setOpponentsRoll] = useState([])
    const [showAwarding, setShowAwarding] = useState(false)
    const bonus = useRef(0)
    const myRoll = useRef(0)
    const myPlacing = useRef(0)
    const hasIRolled = useRef(false)
    const won = useRef(false)

    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(0deg)'
        />
    )

    const [overlay, setOverlay] = useState(<Overlay />)

    const PrizeIcon = ({ type, size = '20px' }) => {
        switch (type) {
            case 'coins':
                return <Image src={coinIcon} w={size} title="Coin" ml={2} />
            case 'stars':
                return <Image src={starIcon} w={size} title="Poke star" ml={2} />
            case 'crowns':
                return <Image src={crownIcon} w={size} title="Poke crown" ml={2} />
            default:
                return
        }
    }

    const PlaceBox = ({ icon, prize }) => {
        return (
            <Flex alignItems="center" w="100%" minW={32} mx={6} bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                <Box position="absolute" bottom="45px" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius="50%">
                    {icon}
                </Box>

                <Flex w="100%" justifyContent="center" mx={2}>
                    <Text>{prize.amount}x</Text>
                    <PrizeIcon type={prize.name} />
                </Flex>

            </Flex>
        )
    }

    const checkChallengeBonus = (pokeTeam) => {
        bonus.current = pokeTeam?.reduce((acc, poke) => {
            if(event.advantage.type === 'element') {
                return acc + (poke.types).reduce((acc2, element) => {
                    const checkIfAdvIncludes = event.advantage.value.includes(element)
                    const checkIfDisIncludes = event.disadvantage?.value.includes(element)

                    if(checkIfAdvIncludes) return acc2 + 1
                    if(checkIfDisIncludes) {
                        return acc2 - 1
                    } else {
                        return acc2
                    }
                }, 0)
            }

            if(event.advantage.type === 'nature') {
                const checkIfNatureIncludes = event.advantage.value.includes(poke.nature)
                const checkIfNatureDontIncludes = event.disadvantage?.value.includes(poke.nature)

                return (acc + checkIfNatureIncludes) - checkIfNatureDontIncludes
            }
            // if(event.advantage.type === 'stats_all') {
            // }

            // if(event.advantage.type === 'stats_highest') {
            // }

            // if(event.advantage.type === 'stats_sum') {
            // }
        }, 0);
    }

    const joinArr = (arr) => {if(arr) return arr.join(', ')}

    const awardDistribution = () => {
        const resultArray = []

        resultArray.push(myRoll.current)

        opponentsRoll.forEach(roll => {
            resultArray.push(roll.roll)
        })

        resultArray.sort(function(a, b){return b-a})

        if(myRoll.current === resultArray[0]) {
            awarding(0)
            return
        }

        if(myRoll.current === resultArray[1]) {
            awarding(1)
            return
        }

        if(opponents.length > 1) {
            if(myRoll.current === resultArray[2]) {
                awarding(2)
                return
            }
        }
    }

    const awarding = (place) => {
        won.current = true
        myPlacing.current = place
        updateCurrency(event.prizes[place].amount, event.prizes[place].name)
    }

    useEffect(() => {
        if(opponents.length === opponentsRoll.length && hasIRolled.current) {
            awardDistribution()
            setShowAwarding(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opponentsRoll, myRoll.current])

    useEffect(() => {
        setOverlay(<Overlay />)
        checkChallengeBonus(pokeTeam)

        socket.on('event-roll-other', res => {
            setOpponentsRoll(old => [...old, res])
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                {overlay}
                <ModalContent p={4}>
                    {
                        showAwarding ? (
                            <>
                                <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                                    Awarding
                                </ModalHeader>

                                <Center flexDirection="column">
                                    <ModalBody p={2} w="100%" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                                        {
                                            won.current ? (
                                                <>
                                                    <Center flexDirection="column">
                                                        <Text my={4} fontSize="2xl" fontWeight="bold">Congratulations!</Text>

                                                        {myPlacing.current === 0 && (
                                                            <FirstPlaceIcon h={16} w={16} />
                                                        )}
                                                        {myPlacing.current === 1 && (
                                                            <SecondPlaceIcon h={16} w={16} />
                                                        )}
                                                        {myPlacing.current === 2 && (
                                                            <ThirdPlaceIcon h={16} w={16} />
                                                        )}
                                                        
                                                        <Text my={4} fontSize="2xl" fontWeight="bold" color="green.400">
                                                            You won 
                                                        </Text>
                                                    </Center>
                                                        
                                                    <Divider my={2} mb={4} />

                                                    <Center>
                                                        {event.prizes[myPlacing.current].amount}x
                                                        <PrizeIcon type={event.prizes[myPlacing.current].name} size={8}/>
                                                    </Center>
                                                </>
                                            ): (
                                                <Center flexDirection="column">
                                                    <Text my={4}>Sorry...</Text>

                                                    <SadIcon h={16} w={16} />
                                                    
                                                    <Text my={4} fontSize="2xl" fontWeight="bold" color="red.400">You lose</Text>
                                                </Center>
                                            )
                                        }
                                    </ModalBody>
                                </Center>

                                <ModalFooter px={0}>

                                    <Button h={12} isDisabled={!showAwarding} onClick={() => {
                                        updateGame({ openChallengeModal: false, openEncounterModal: true })
                                    }}><SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} /></Button>

                                </ModalFooter>
                            </>
                        ) : (
                            <>
                                <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                                    {event.title}
                                    <Tooltip 
                                        label={
                                            `You roll a dice with ${event.dice.max}x sides and sum the advantages, the highest value wins the award!` +
                                            `\n\nPS: On ties, all of the tieing participants win the award`
                                        } 
                                        bg="#89CFF0"
                                    >
                                        <span>
                                            <FaInfoCircle color="#89CFF0" style={{
                                                'position': 'absolute',
                                                'top': '30px',
                                                'right': '25px'
                                                }} size={20} />
                                        </span>
                                    </Tooltip>
                                </ModalHeader>
                                <Center flexDirection="column">
                                    <ModalBody p={2} w="100%" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                                        <Center flexDirection="column">
                                            <Text fontSize="2xl" mb={2} textAlign="center">
                                                {event.label}
                                            </Text>

                                            <Flex color="green.400">
                                                Advantages on this challenge:
                                                <Text ml={2} fontWeight="bold">
                                                    {joinArr(event.advantage?.value)}
                                                </Text>
                                            </Flex>

                                            {event.disadvantage?.value && (
                                                <Flex color="red.400">
                                                    Disadvantages on this challenge: 
                                                    <Text ml={2} fontWeight="bold">
                                                        {joinArr(event.disadvantage?.value)}
                                                    </Text>
                                                </Flex>
                                            )}

                                            <Flex>
                                                Your bonus for this challange is:
                                                <Text ml={2} fontWeight="bold">
                                                    {bonus.current}
                                                </Text>
                                            </Flex>
                                        </Center>
                                    </ModalBody>
                                </Center>

                                <Divider my={4} />

                                <Center 
                                    p={2} 
                                    bg={colorMode === 'light' ? "gray.200" : "gray.650"} 
                                    borderRadius={8}
                                    flex
                                    justifyContent="space-between"
                                >
                                    <OpponentsResult opponentsRoll={opponentsRoll} />
                                    <DiceButton bonus={bonus.current} onRoll={(roll) => {
                                        myRoll.current = roll + bonus.current
                                        hasIRolled.current = true
                                        emit('event-roll', roll + bonus.current)
                                    }} />
                                </Center>

                                <Divider my={4}  mb={6} />

                                <ModalFooter p={0}>

                                    <Flex w="100%" h={12} justifyContent="space-between">
                                            <PlaceBox icon={<FirstPlaceIcon />} prize={event.prizes[0]} />
                                            <PlaceBox icon={<SecondPlaceIcon />} prize={event.prizes[1]} />
                                            {opponents.length > 1 && (
                                                <PlaceBox icon={<ThirdPlaceIcon />} prize={event.prizes[2]} />
                                            )}
                                    </Flex>

                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}