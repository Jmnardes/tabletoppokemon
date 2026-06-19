import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Button, Badge, Box, Image, Progress, HStack, VStack, Tooltip } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Card from "@features/pokemon/Card"
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

const EXP_TO_LEVEL = 10

const THREAT_LABELS = [
    { key: 'threatCalm', color: 'green', descKey: 'threatDescCalm' },
    { key: 'threatAnnoyed', color: 'yellow', descKey: 'threatDescAnnoyed' },
    { key: 'threatHeated', color: 'orange', descKey: 'threatDescHeated' },
    { key: 'threatEnraged', color: 'red', descKey: 'threatDescEnraged' },
    { key: 'threatFurious', color: 'purple', descKey: 'threatDescFurious' },
]

const BALL_ICONS = { pokeball: pokeballIcon, greatball: greatballIcon, ultraball: ultraballIcon, masterball: masterballIcon }

export default function JourneyExit({ journeyState, onLeave }) {
    const { t } = useTranslation()
    const { player, session, setPlayer, syncPokemonsFromServer, updateGame } = useContext(PlayerContext)
    const [exiting, setExiting] = useState(false)
    const [expSummary, setExpSummary] = useState(null)
    const [summary, setSummary] = useState(null)

    const threat = player.threat ?? 0
    const threatData = THREAT_LABELS[threat] || THREAT_LABELS[0]
    const threatLabel = t(`journey.${threatData.key}`)
    const threatColor = threatData.color

    const handleExit = () => {
        setExiting(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {},
        }

        socket.emit('journey-exit', request, (res) => {
            setExiting(false)
            if (res?.success) {
                const result = res.result
                if (result.pokeTeam) {
                    syncPokemonsFromServer(result.pokeTeam, result.pokeBox || [])
                }
                if (result.balls) {
                    setPlayer(prev => ({ ...prev, balls: result.balls }))
                }
                updateGame({
                    journeyProgress: result.journeyProgress ?? 0,
                    journeyWildDefeatedCount: result.journeyWildDefeatedCount ?? 0,
                    journeyWildPreview: result.journeyWildPreview || [],
                    journeyLevel: result.journeyLevel ?? 1,
                })
                setSummary(result.summary || {})
                setExpSummary(result.expSummary || [])
            }
        })
    }

    const handleLeave = () => {
        onLeave()
    }

    // After EXP summary is loaded, show summary screen
    if (expSummary) {
        const defeatedCount = summary?.totalWildDefeated ?? journeyState?.wildDefeatedCount ?? 0
        const stagesToWin = summary?.stagesToWin ?? journeyState?.stagesToWin ?? 5

        return (
            <Flex flex="1" direction="column" align="center" p={4} w="100%" maxW="500px" overflowY="auto">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {t('journey.expSummaryTitle')}
                </Text>
                <Badge colorScheme="blue" fontSize="md" mb={2} p={2} borderRadius={8}>
                    {t('journey.roundReachedFull', { round: journeyState.round, defeated: defeatedCount, total: stagesToWin })}
                </Badge>
                <Text fontSize="2xs" color="gray.400" mb={4}>
                    {t('journey.expBonusAlive')}
                </Text>

                <VStack spacing={3} w="100%" mb={4}>
                    {expSummary.map((poke) => (
                        <HStack
                            key={poke.id}
                            w="100%"
                            p={3}
                            borderRadius={8}
                            border="2px solid"
                            borderColor={poke.leveledUp ? "yellow.400" : "whiteAlpha.300"}
                            bg={poke.leveledUp ? "whiteAlpha.200" : "whiteAlpha.100"}
                            spacing={3}
                        >
                            <Image
                                src={poke.sprites?.front}
                                alt={poke.name}
                                boxSize="48px"
                                objectFit="contain"
                            />
                            <VStack align="start" spacing={0} flex="1" minW={0}>
                                <HStack spacing={2}>
                                    <Text fontSize="sm" fontWeight="bold" isTruncated>
                                        {poke.name}
                                    </Text>
                                    {poke.defeated && (
                                        <Tooltip label={t('journey.defeatedNoBonus')}>
                                            <Text cursor="help">💀</Text>
                                        </Tooltip>
                                    )}
                                    <Badge colorScheme="green" fontSize="xs">
                                        +{poke.expGained} EXP
                                    </Badge>
                                    {poke.leveledUp && (
                                        <Badge colorScheme="yellow" fontSize="xs">
                                            Lv.{poke.prevLevel} → {poke.newLevel}
                                        </Badge>
                                    )}
                                </HStack>
                                <Box position="relative" w="100%" mt={1}>
                                    <Progress
                                        value={poke.newExp % EXP_TO_LEVEL}
                                        max={EXP_TO_LEVEL}
                                        size="sm"
                                        w="100%"
                                        colorScheme="cyan"
                                        borderRadius="full"
                                    />
                                    <Text
                                        position="absolute"
                                        top="50%" left="50%"
                                        transform="translate(-50%, -50%)"
                                        fontSize="xx-small"
                                    >
                                        {poke.newExp % EXP_TO_LEVEL}/{EXP_TO_LEVEL}
                                    </Text>
                                </Box>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>

                <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={handleLeave}
                >
                    {t('journey.leaveJourney')}
                </Button>
            </Flex>
        )
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center" p={4} w="100%" maxW="600px">
            <Text fontSize="xl" mb={2}>
                {t('journey.complete')}
            </Text>
            <Badge colorScheme="blue" fontSize="md" mb={3} p={2} borderRadius={8}>
                {t('journey.roundReached', { round: journeyState.round })}
            </Badge>

            <VStack spacing={2} mb={3} w="100%" align="center">
                <HStack spacing={2}>
                    <Text>⚔️</Text>
                    <Text fontSize="sm">{t('journey.summaryDefeated', { count: journeyState?.wildDefeatedCount || 0, total: journeyState?.stagesToWin || 5 })}</Text>
                </HStack>
                <HStack spacing={2}>
                    <Text>🎯</Text>
                    <Text fontSize="sm">{t('journey.summaryThreat')}:</Text>
                    <Badge colorScheme={threatColor}>{threatLabel}</Badge>
                </HStack>
                {journeyState?.ballsUsedMap && Object.keys(journeyState.ballsUsedMap).length > 0 && (
                    <HStack spacing={3}>
                        {Object.entries(journeyState.ballsUsedMap).map(([type, count]) => (
                            <HStack key={type} spacing={1}>
                                <Image src={BALL_ICONS[type]} w="20px" h="20px" />
                                <Text fontSize="sm" fontWeight="bold">x{count}</Text>
                            </HStack>
                        ))}
                    </HStack>
                )}
                {journeyState?.capturedPokemonList?.length > 0 && (
                    <VStack spacing={2} w="100%">
                        <Text fontSize="sm" fontWeight="bold">{t('journey.summaryCaptured')}:</Text>
                        {journeyState.capturedPokemonList.length <= 5 ? (
                            <Flex gap={2} flexWrap="nowrap" justifyContent="center">
                                {journeyState.capturedPokemonList.map((poke) => (
                                    <Card key={poke.id} poke={poke} size="M" />
                                ))}
                            </Flex>
                        ) : (
                            <Flex gap={2} flexWrap="wrap" justifyContent="center" maxW="400px">
                                {journeyState.capturedPokemonList.map((poke) => (
                                    <Tooltip key={poke.id} label={<Card poke={poke} tooltip />} placement="top" hasArrow>
                                        <Flex
                                            direction="column"
                                            align="center"
                                            bg="whiteAlpha.100"
                                            border="1px solid"
                                            borderColor="whiteAlpha.300"
                                            borderRadius={8}
                                            p={1}
                                            cursor="pointer"
                                            _hover={{ bg: "whiteAlpha.200" }}
                                        >
                                            <Image src={poke.sprites?.front || poke.sprites?.main} w="40px" h="40px" />
                                            <Text fontSize="2xs" noOfLines={1}>{poke.name}</Text>
                                        </Flex>
                                    </Tooltip>
                                ))}
                            </Flex>
                        )}
                    </VStack>
                )}
            </VStack>

            <Button
                colorScheme="blue"
                size="lg"
                onClick={handleExit}
                isLoading={exiting}
            >
                {t('journey.leaveJourney')}
            </Button>
        </Flex>
    )
}
