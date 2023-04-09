import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    ModalFooter,
    ModalOverlay,
    Text,
    Flex,
    Center,
    useColorMode,
    Box,
    Divider,
    keyframes,
    Tooltip,
    Image
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import FirstPlaceIcon from "../../../Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "../../../Icons/places/SecondPlaceIcon"
import SuccessIcon from "../../../Icons/SuccessIcon"
import ThirdPlaceIcon from "../../../Icons/places/ThirdPlaceIcon"
import SixSidesDiceIcon from "../../../Icons/dices/SixSidesDice"
import OpponentsResult from "./OpponentsResult"
import { diceRoll } from "../../../../util"
import { FaInfoCircle } from "react-icons/fa";
import coinIcon from '../../../../assets/images/game/coin.png'
import starIcon from '../../../../assets/images/game/star.png'
import crownIcon from '../../../../assets/images/game/crown.png'
import pokemon from '../../../../assets/json/pokemons.json'

export default function ChallengeModal({ pokeTeam }) {
    const { updateGame, event } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { onClose } = useDisclosure()
    const [rollResult, setRollResult] = useState(0)
    const [disableCloseModalButton, setDisableCloseModalButton] = useState(true)
    const bonus = useRef(0)

    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(0deg)'
        />
    )

    const [overlay, setOverlay] = useState(<Overlay />)

    const PrizeIcon = ({ type }) => {
        switch (type) {
            case 'coins':
                return <Image src={coinIcon} title="Coin" w="20px" ml={2} />
            case 'stars':
                return <Image src={starIcon} title="Poke star" w="20px" ml={2} />
            case 'crowns':
                return <Image src={crownIcon} title="Poke crown" w="20px" ml={2} />
            default:
                return
        }
    }

    const PlaceBox = ({ icon, prize }) => {
        return (
            <Flex alignItems="center" w="100%" minW={32} mr={6} bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
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
        bonus.current = pokeTeam.reduce((acc, poke) => {
            const pokemonData = pokemon[poke.pokemonId]

            if(event.advantage.type === 'element') {
                return acc + (pokemonData.type).reduce((acc, element) => {
                    const checkIfElementIncludes = event.advantage.value.includes(element)

                    return acc + checkIfElementIncludes
                }, 0)
            }

            if(event.advantage.type === 'nature') {
                const checkIfNatureIncludes = event.advantage.value.includes(poke.nature.nature)

                return acc + checkIfNatureIncludes
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

    const shake = keyframes`
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    `;
    const diceShakeAnimation = `${shake} 1s ease-in-out infinite`;

    useEffect(() => {
        setOverlay(<Overlay />)
        checkChallengeBonus(pokeTeam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                {overlay}
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        {event.title}
                        <Tooltip 
                            label={`You roll a dice with ${event.dice.max}x sides and sum the advantages, the highest value wins the prize!`} 
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
                        <OpponentsResult />
                        <Text textAlign="center" fontSize="3xl">
                            {rollResult}
                        </Text>
                        <Button 
                            h={16}
                            _hover={{'animation': diceShakeAnimation}}
                            onClick={() => {
                                setRollResult(diceRoll(event.dice.max) + 1)
                                setDisableCloseModalButton(false)
                            }}
                        >
                            <SixSidesDiceIcon w={12} h={12} />
                        </Button>
                    </Center>

                    <Divider my={4}  mb={6} />

                    <ModalFooter p={0}>

                        <Flex w="100%" justifyContent="space-between">
                            <Flex>
                                <PlaceBox icon={<FirstPlaceIcon />} prize={event.prizes[0]} />
                                <PlaceBox icon={<SecondPlaceIcon />} prize={event.prizes[1]} />
                                <PlaceBox icon={<ThirdPlaceIcon />} prize={event.prizes[2]} />
                            </Flex>

                            <Button h={12} isDisabled={disableCloseModalButton} onClick={() => {
                                updateGame({ openChallengeModal: false })
                                onClose()
                                setDisableCloseModalButton(true)
                            }}><SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} /></Button>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}