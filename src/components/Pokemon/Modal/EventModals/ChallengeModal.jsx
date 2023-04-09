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
    Tooltip
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import FirstPlaceIcon from "../../../Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "../../../Icons/places/SecondPlaceIcon"
import SuccessIcon from "../../../Icons/SuccessIcon"
import ThirdPlaceIcon from "../../../Icons/places/ThirdPlaceIcon"
import SixSidesDiceIcon from "../../../Icons/dices/SixSidesDice"
import OpponentsResult from "./OpponentsResult"
import { diceRoll } from "../../../../util"
import { FaInfoCircle } from "react-icons/fa";

export default function ChallengeModal() {
    const { updateGame, game, event } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rollResult, setRollResult] = useState(0)
    const [disableCloseModalButton, setDisableCloseModalButton] = useState(true)

    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(0deg)'
        />
    )

    const [overlay, setOverlay] = useState(<Overlay />)

    const PlaceBox = ({ icon, place }) => {
        return (
            <Flex alignItems="center" w="100%" minW={32} mr={6} bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                <Box position="absolute" bottom="45px" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius="50%">
                    {icon}
                </Box>
                <Text w="100%" textAlign="center" mx={2}>{place}</Text>
            </Flex>
        )
    }

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
        if(game.openEventModal) {
            setOverlay(<Overlay />)
            onOpen()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.openEventModal])

    return (
        <>
            <Modal isOpen={isOpen} size="xl" isCentered>
                {overlay}
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        {event.title}
                        <Tooltip 
                            label={`You roll a dice with ${event.title} sides and sum the advantages, the highest value wins the prize!`} 
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
                                    {event.description}
                                    </Text>

                                <Text color="green.400">
                                    (THIS NATURES have advantages on this challenge!)
                                </Text>
                                <Text color="red.400">
                                    (THIS NATURES have disadvantages on this challenge!)
                                </Text>

                                <Divider my={2} />

                                <Flex>
                                    Your bonus for this challange is:
                                    <Text ml={2} fontWeight="bold">
                                        BONUS
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
                                setRollResult(diceRoll(10) + 1)
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
                                <PlaceBox icon={<FirstPlaceIcon />} place={event.first} />
                                <PlaceBox icon={<SecondPlaceIcon />} place={event.second} />
                                <PlaceBox icon={<ThirdPlaceIcon />} place={event.third} />
                            </Flex>

                            <Button h={12} isDisabled={disableCloseModalButton} onClick={() => {
                                updateGame({ openEventModal: false })
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