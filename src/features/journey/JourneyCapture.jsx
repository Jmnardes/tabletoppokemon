import { useContext, useState } from "react"
import { Flex, Text, Image, Button, HStack, VStack, Badge, Box, useColorMode, IconButton } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"

import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

const BALL_TYPES = [
    { key: 'pokeball', label: 'Poké Ball', bonus: 0, icon: pokeballIcon },
    { key: 'greatball', label: 'Great Ball', bonus: 3, icon: greatballIcon },
    { key: 'ultraball', label: 'Ultra Ball', bonus: 6, icon: ultraballIcon },
    { key: 'masterball', label: 'Master Ball', bonus: 10, icon: masterballIcon },
]

export default function JourneyCapture({ lastFightResult, journeyState, setJourneyState, onComplete }) {
    const { player, session, setPlayer, syncPokemonsFromServer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [captureResult, setCaptureResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const defeatedWild = lastFightResult?.defeatedWild

    const throwBall = (ballType) => {
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {
                wildPokemonId: defeatedWild?.id,
                ballType,
            },
        }

        socket.emit('journey-capture', request, (res) => {
            setLoading(false)
            if (res?.success) {
                const result = res.result
                setCaptureResult(result)
                if (result.balls) {
                    setPlayer(prev => ({ ...prev, balls: result.balls }))
                }
                // Sync team/box so captured pokemon appears immediately
                if (result.captured && result.pokeTeam) {
                    syncPokemonsFromServer(result.pokeTeam, result.pokeBox || [])
                }
                // Update journey team status so captured pokemon shows in battle order
                if (result.captured && result.playerTeamStatus) {
                    setJourneyState(prev => ({
                        ...prev,
                        playerTeamStatus: result.playerTeamStatus,
                    }))
                }
            }
        })
    }

    const bgCard = colorMode === 'light' ? 'gray.100' : 'gray.700'

    if (!defeatedWild) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>No pokemon to capture</Text>
                <Button mt={4} onClick={onComplete}>Continue</Button>
            </Flex>
        )
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center" w="100%" maxW="500px">
            <Text fontSize="lg" mb={4}>Capture?</Text>

            {/* Wild pokemon display */}
            <VStack
                bg={bgCard}
                border="2px solid"
                borderColor="orange.400"
                borderRadius={12}
                p={4}
                mb={4}
                spacing={2}
            >
                <Image src={defeatedWild.sprite} w="64px" h="64px" />
                <Text fontWeight="bold">{defeatedWild.name}</Text>
                <HStack>
                    {defeatedWild.types?.map(t => (
                        <Element key={t} element={t} />
                    ))}
                </HStack>
                <Badge>Lv. {defeatedWild.level}</Badge>
            </VStack>

            {/* Capture result */}
            {captureResult && (
                <Box mb={4} textAlign="center">
                    {captureResult.captured ? (
                        <Badge colorScheme="green" fontSize="md" p={2} borderRadius={8}>
                            ✓ Captured!
                        </Badge>
                    ) : (
                        <Badge colorScheme="red" fontSize="md" p={2} borderRadius={8}>
                            ✗ Escaped!
                        </Badge>
                    )}
                </Box>
            )}

            {/* Ball selection */}
            {!captureResult && (
                <HStack spacing={4} mb={4} flexWrap="wrap" justify="center">
                    {BALL_TYPES.map(ball => {
                        const count = player.balls?.[ball.key] || 0
                        return (
                            <VStack key={ball.key} spacing={1}>
                                <IconButton
                                    w="4rem"
                                    h="4rem"
                                    bg="none"
                                    title={ball.label}
                                    icon={<Image src={ball.icon} w="32px" />}
                                    onClick={() => throwBall(ball.key)}
                                    isDisabled={count <= 0 || loading}
                                    isLoading={loading}
                                />
                                <Text fontSize="2xs" color="gray.400">({count})</Text>
                            </VStack>
                        )
                    })}
                </HStack>
            )}

            {/* Continue / Skip */}
            <Button
                mt={2}
                colorScheme="gray"
                onClick={onComplete}
            >
                {captureResult ? 'Continue' : 'Skip Capture'}
            </Button>
        </Flex>
    )
}
