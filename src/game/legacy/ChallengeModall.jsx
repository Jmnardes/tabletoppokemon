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
    Tooltip
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"

import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import OpponentsResult from "../modals/Challenge/OpponentsResult"
import { taskTypeEnum } from "@enum"
import DiceButton from '@components/AnimatedButton/Dice/DiceButton'

import FirstPlaceIcon from "@components/Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "@components/Icons/places/SecondPlaceIcon"
import SuccessIcon from "@components/Icons/SuccessIcon"
import ThirdPlaceIcon from "@components/Icons/places/ThirdPlaceIcon"
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"
import { FaInfoCircle, FaRedo } from "react-icons/fa";
import { pokemonHasChallengeBerry } from "@utils"

export default function ChallengeModal({ event }) {
    const { updateGame, emit, opponents, pokeTeam, updateStatus, setLoadingApi, player } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [opponentsRoll, setOpponentsRoll] = useState([])
    const [allResultsShown, setAllResultsShown] = useState(false)
    const [showAwarding, setShowAwarding] = useState(false)
    const [refreshResults, setRefreshResults] = useState(false)
    const [hasIRolled, setHasIRolled] = useState(false)
    const bonus = useRef(0)
    const myRoll = useRef(0)
    const myPlacing = useRef(0)
    const won = useRef(false)
    const prizes = event.prizes

    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(0deg)'
        />
    )

    const [overlay, setOverlay] = useState(<Overlay />)

    const PlaceBox = ({ icon, prize }) => {
        return (
            <Flex alignItems="center" w="100%" minW={32} mx={6} bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                <Box position="absolute" bottom="45px" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius="50%">
                    {icon}
                </Box>

                <Flex w="100%" justifyContent="center" mx={2}>
                    <Text fontSize="xs">{prize.amount}</Text>
                    <PrizeIcon type={prize.name} />
                </Flex>

            </Flex>
        )
    }

    const Placing = ({ place }) => {
        if (place === 0)  return <FirstPlaceIcon h={16} w={16} />
        if (place === 1) return <SecondPlaceIcon h={16} w={16} />
        if (place === 2) return <ThirdPlaceIcon h={16} w={16} />
    }

    const checkChallengeBonus = (pokeTeam) => {
        bonus.current = pokeTeam?.reduce((acc, poke) => {
            if(event.advantage.type === 'element') {
                return acc + (poke.types).reduce((acc2, element) => {
                    const checkIfAdvIncludes = event.advantage.value.includes(element)
                    const checkIfDisIncludes = event.disadvantage?.value.includes(element)
                    const challengeBonus = pokemonHasChallengeBerry(poke) ? 1 : 0
                    const augmentBonus = player.status.challengeBonus

                    if(checkIfAdvIncludes) return acc2 + 1 + challengeBonus + augmentBonus
                    if(checkIfDisIncludes) {
                        return acc2 - 1 + challengeBonus + augmentBonus
                    } else {
                        return acc2 + challengeBonus + augmentBonus
                    }
                }, 0)
            }

            if(event.advantage.type === 'nature') {
                const checkIfNatureIncludes = event.advantage.value.includes(poke.nature)
                const checkIfNatureDontIncludes = event.disadvantage?.value.includes(poke.nature)
                const challengeBonus = pokemonHasChallengeBerry(poke) ? 1 : 0
                const augmentBonus = player.status.challengeBonus

                return (acc + checkIfNatureIncludes) - checkIfNatureDontIncludes + challengeBonus + augmentBonus
            }
        }, 0);
    }

    const joinArr = (arr) => {if(arr) return arr.join(', ')}

    const awardDistribution = () => {
        const resultArray = []

        resultArray.push(myRoll.current + bonus.current)

        opponentsRoll.forEach(roll => {
            resultArray.push(roll.roll)
        })

        resultArray.sort(function(a, b){return b-a})
        const resultArrayWithouDuplicates = [...new Set(resultArray)]

        if((myRoll.current + bonus.current) === resultArrayWithouDuplicates[0]) {
            awarding(0)
            return
        }

        if((myRoll.current + bonus.current) === resultArrayWithouDuplicates[1]) {
            awarding(1)
            return
        }

        if(opponents.length > 1) {
            if((myRoll.current + bonus.current) === resultArrayWithouDuplicates[2]) {
                awarding(2)
                return
            }
        }

        myPlacing.current = 4
    }

    const awarding = (place) => {
        won.current = true
        myPlacing.current = place
        
        place === 0 && updateStatus('challenges')
        setLoadingApi(true)
        emit('player-win-prize', { prize: prizes[place] })
    }

    useEffect(() => {
        if(opponents.length === opponentsRoll.length && hasIRolled) {
            setAllResultsShown(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opponentsRoll, myRoll.current, refreshResults])

    useEffect(() => {
        const timer = setTimeout(() => {
            setRefreshResults(true);
        }, 15000);

        setOverlay(<Overlay />)
        checkChallengeBonus(pokeTeam)

        socket.on('event-roll-other', res => {
            setOpponentsRoll(old => [...old, res])
        })

        return () => clearTimeout(timer);
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

                                                        <Placing place={myPlacing.current} />
                                                        
                                                        <Text my={4} fontSize="2xl" fontWeight="bold" color="green.400">
                                                            You won 
                                                        </Text>
                                                    </Center>
                                                        
                                                    <Divider my={2} mb={4} />

                                                    <Center>
                                                        {prizes[myPlacing.current].amount}x
                                                        <PrizeIcon type={prizes[myPlacing.current].name} size={8}/>
                                                    </Center>
                                                </>
                                            ): (
                                                <Center flexDirection="column">
                                                    <Text my={4}>Sorry...</Text>
                                                    
                                                    <Text my={4} fontSize="2xl" fontWeight="bold" color="red.400">You lose</Text>
                                                </Center>
                                            )
                                        }
                                    </ModalBody>
                                </Center>

                                <ModalFooter px={0}>

                                    <Button h={12} isDisabled={!showAwarding} onClick={() => {
                                        if (myPlacing.current === 0) {
                                            emit('player-update-task', { type: taskTypeEnum.winChallenge, amount: 1 })
                                        }
                                        updateGame({ openChallengeModal: false, openEncounterModal: true })
                                    }}><SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} /></Button>

                                </ModalFooter>
                            </>
                        ) : (
                            <>
                                <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                                    {refreshResults && (
                                        <FaRedo 
                                            color="#89CFF0"
                                            title="Refresh results" size={16}
                                            cursor={"pointer"}
                                            style={{
                                                'position': 'absolute',
                                                'top': '32px',
                                                'left': '25px',
                                            }}
                                            onClick={() => setRefreshResults(true)}
                                        />
                                    )}
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
                                            <Text mb={2} textAlign="center">
                                                {event.label}
                                            </Text>

                                            <Flex color="green.400" fontSize="2xs" my={1}>
                                                Advantages:
                                                <Text ml={2} fontWeight="bold">
                                                    {joinArr(event.advantage?.value)}
                                                </Text>
                                            </Flex>

                                            {event.disadvantage?.value && (
                                                <Flex color="red.400" fontSize="2xs" my={1}>
                                                    Disadvantages: 
                                                    <Text ml={2} fontWeight="bold">
                                                        {joinArr(event.disadvantage?.value)}
                                                    </Text>
                                                </Flex>
                                            )}

                                            {player.status.challengeBonus > 0 && (
                                                <Flex color="red.400" fontSize="2xs" my={1}>
                                                    Augment Bonus: 
                                                    <Text ml={2} fontWeight="bold">
                                                    {player.status.challengeBonus}
                                                    </Text>
                                                </Flex>
                                            )}

                                            <Flex fontSize="xs">
                                                Current bonus:
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
                                    <OpponentsResult myRoll={myRoll.current} myBonus={bonus.current} opponentsRoll={opponentsRoll} />
                                    <DiceButton bonus={bonus.current} onRoll={(roll) => {
                                        myRoll.current = roll
                                        setHasIRolled(true)
                                        emit('event-roll', roll + bonus.current)
                                    }} />
                                </Center>

                                <Divider my={4}  mb={6} />

                                <ModalFooter p={0}>

                                    {allResultsShown || (refreshResults && hasIRolled) ? (
                                        <Flex w="100%" h={12} justifyContent="center">
                                            <Button w="100%" onClick={() => {
                                                awardDistribution()
                                                setShowAwarding(true)
                                            }}>
                                                Show results
                                            </Button>
                                        </Flex>
                                    ) : (
                                        <Flex w="100%" h={12} justifyContent="space-between">
                                            <PlaceBox icon={<FirstPlaceIcon />} prize={prizes[0]} />
                                            <PlaceBox icon={<SecondPlaceIcon />} prize={prizes[1]} />
                                            {opponents.length > 1 && (
                                                <PlaceBox icon={<ThirdPlaceIcon />} prize={prizes[2]} />
                                            )}
                                        </Flex>
                                    )}

                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}