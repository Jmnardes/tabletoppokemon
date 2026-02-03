import { useContext, useEffect, useState } from "react"
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalCloseButton,
    Grid,
    Box,
    Image,
    Text,
    Center,
    useColorMode,
    Tooltip,
    VStack,
    HStack
} from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import Element from "@components/Elements/Element"

// Lista de todas as badges disponíveis no jogo
const ALL_BADGES = [
    'balance_badge',
    'beacon_badge',
    'boulder_badge',
    'cascade_badge',
    'coal_badge',
    'cobble_badge',
    'dynamo_badge',
    'earth_badge',
    'feather_badge',
    'fen_badge',
    'fog_badge',
    'forest_badge',
    'glacier_badge',
    'heat_badge',
    'hive_badge',
    'icicle_badge',
    'knuckle_badge',
    'marsh_badge',
    'mind_badge',
    'mineral_badge',
    'mine_badge',
    'plain_badge',
    'rainbow_badge',
    'rain_badge',
    'relic_badge',
    'rising_badge',
    'soul_badge',
    'stone_badge',
    'storm_badge',
    'thunder_badge',
    'volcano_badge',
    'zephyr_badge'
]

// Helper para pegar o ícone da badge
const getBadgeIcon = (badgeName) => {
    try {
        return require(`@assets/images/badges/${badgeName}.png`)
    } catch (e) {
        return null
    }
}

const getLeaderIcon = (leaderId) => {
    if (!leaderId) return null
    try {
        return require(`@assets/images/leaders/${leaderId}.png`)
    } catch (e) {
        return null
    }
}

export default function BadgeCollectionModal() {
    const { updateGame, emit } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [defeatedGyms, setDefeatedGyms] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.700"
    const borderColor = colorMode === 'light' ? "gray.300" : "gray.600"

    useEffect(() => {
        socket.on('gym-check-badges', (response) => {
            if (response?.defeatedGyms) {
                setDefeatedGyms(Array.isArray(response.defeatedGyms) ? response.defeatedGyms : [])
            } else {
                setDefeatedGyms([])
            }
            setIsLoading(false)
        })

        emit('gym-check-badges')
            .catch(() => {
                setDefeatedGyms([])
                setIsLoading(false)
            })
        return () => {
            socket.off('gym-check-badges')
        }
    }, [emit])

    const handleClose = () => {
        updateGame({ openBadgeCollectionModal: false })
    }

    const getBadgeInfo = (badgeId) => {
        return defeatedGyms.find(gym => gym.badgeId === badgeId)
    }

    return (
        <Modal 
            isOpen={true} 
            onClose={handleClose}
            size="4xl"
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Center>
                        <Text fontSize="2xl" fontWeight="bold">
                            🏆 Badge Collection
                        </Text>
                    </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {isLoading ? (
                        <Center py={10}>
                            <Text>Loading badges...</Text>
                        </Center>
                    ) : (
                        <>
                            <Center mb={4}>
                                <Text fontSize="md" color="gray.500">
                                    {defeatedGyms.length} / {ALL_BADGES.length} Badges Earned
                                </Text>
                            </Center>
                            <Grid 
                                templateColumns="repeat(auto-fill, minmax(120px, 1fr))" 
                                gap={4}
                                mb={4}
                            >
                                {ALL_BADGES.map((badgeId) => {
                                    const badgeIcon = getBadgeIcon(badgeId)
                                    const badgeInfo = getBadgeInfo(badgeId)
                                    const isEarned = !!badgeInfo
                                    
                                    return (
                                        <Tooltip
                                            key={badgeId}
                                            label={
                                                isEarned ? (
                                                    <HStack spacing={3} align="start">
                                                        {badgeInfo.leaderId && getLeaderIcon(badgeInfo.leaderId) && (
                                                            <Image
                                                                src={getLeaderIcon(badgeInfo.leaderId)}
                                                                w="64px"
                                                                h="64px"
                                                                borderRadius="md"
                                                                objectFit="cover"
                                                            />
                                                        )}
                                                        <VStack spacing={1} align="start">
                                                            <Text fontWeight="bold">{badgeInfo.name}</Text>
                                                            <Text fontSize="sm">Leader: {badgeInfo.leader}</Text>
                                                            <Text fontSize="sm">Badge: {badgeInfo.badge}</Text>
                                                            <Element element={badgeInfo.element} size="sm" />
                                                        </VStack>
                                                    </HStack>
                                                ) : null
                                            }
                                            isDisabled={!isEarned}
                                            placement="top"
                                            hasArrow
                                        >
                                            <Box
                                                p={3}
                                                borderRadius="md"
                                                borderWidth="2px"
                                                borderColor={isEarned ? "yellow.400" : borderColor}
                                                bg={bgColor}
                                                textAlign="center"
                                                transition="all 0.2s"
                                                _hover={{
                                                    transform: "scale(1.05)",
                                                    boxShadow: "lg"
                                                }}
                                            >
                                                {badgeIcon && (
                                                    <Image
                                                        src={badgeIcon}
                                                        alt={badgeId}
                                                        w="64px"
                                                        h="64px"
                                                        mx="auto"
                                                        opacity={isEarned ? 1 : 0.3}
                                                        filter={isEarned ? "none" : "grayscale(100%)"}
                                                    />
                                                )}
                                            </Box>
                                        </Tooltip>
                                    )
                                })}
                            </Grid>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
