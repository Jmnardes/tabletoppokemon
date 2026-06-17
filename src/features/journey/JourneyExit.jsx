import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Button, Badge, Box, Image, Progress, HStack, VStack } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

const EXP_TO_LEVEL = 10

export default function JourneyExit({ journeyState, onLeave }) {
    const { t } = useTranslation()
    const { player, session, setPlayer, syncPokemonsFromServer, updateGame } = useContext(PlayerContext)
    const [exiting, setExiting] = useState(false)
    const [expSummary, setExpSummary] = useState(null)

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
                    journeyLevel: result.journeyLevel ?? 0,
                })
                setExpSummary(result.expSummary || [])
            }
        })
    }

    const handleLeave = () => {
        onLeave()
    }

    // After EXP summary is loaded, show summary screen
    if (expSummary) {
        return (
            <Flex flex="1" direction="column" align="center" p={4} w="100%" maxW="500px" overflowY="auto">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {t('journey.expSummaryTitle')}
                </Text>
                <Badge colorScheme="blue" fontSize="md" mb={4} p={2} borderRadius={8}>
                    {t('journey.roundReached', { round: journeyState.round })}
                </Badge>

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
        <Flex flex="1" direction="column" align="center" justify="center" p={4} w="100%" maxW="500px">
            <Text fontSize="xl" mb={2}>
                {t('journey.complete')}
            </Text>
            <Badge colorScheme="blue" fontSize="md" mb={4} p={2} borderRadius={8}>
                {t('journey.roundReached', { round: journeyState.round })}
            </Badge>

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
