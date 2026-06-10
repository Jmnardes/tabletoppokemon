import { useContext, useState } from "react"
import { Flex, Text, Image, Button, HStack, VStack, Badge, Box, useColorMode, IconButton } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"
import ThrowGame from "@pages/MiniGame/ThrowGame"

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
    const [selectedBall, setSelectedBall] = useState(null)
    const [captureResult, setCaptureResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [throwDone, setThrowDone] = useState(false)

    const defeatedWild = lastFightResult?.defeatedWild
    const bgCard = colorMode === 'light' ? 'gray.100' : 'gray.700'

    const handleThrowFinish = (throwBonus) => {
        setThrowDone(true)
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {
                wildPokemonId: defeatedWild?.id,
                ballType: selectedBall,
                throwBonus,
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
                if (result.captured && result.pokeTeam) {
                    syncPokemonsFromServer(result.pokeTeam, result.pokeBox || [])
                }
                if (result.captured && result.playerTeamStatus) {
                    setJourneyState(prev => ({
                        ...prev,
                        playerTeamStatus: result.playerTeamStatus,
                    }))
                }
            }
        })
    }

    if (!defeatedWild) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>No pokemon to capture</Text>
                <Button mt={4} onClick={onComplete}>Continue</Button>
            </Flex>
        )
    }

    // Result phase
    if (captureResult) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center" w="100%" maxW="500px">
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

                <Button mt={2} colorScheme="gray" onClick={onComplete}>
                    Continue
                </Button>
            </Flex>
        )
    }

    // Main phase: pokemon card (left) + ThrowGame (right) + ball selector (below)
    return (
        <Flex flex="1" direction="column" align="center" justify="center">
            <HStack spacing={4} align="flex-start">
                {/* Pokemon card */}
                <VStack
                    bg={bgCard}
                    border="2px solid"
                    borderColor="orange.400"
                    borderRadius={12}
                    p={4}
                    spacing={2}
                    minW="120px"
                    mt={8}
                >
                    <Image src={defeatedWild.sprite} w="64px" h="64px" />
                    <Text fontWeight="bold" fontSize="sm">{defeatedWild.name}</Text>
                    <HStack>
                        {defeatedWild.types?.map(t => (
                            <Element key={t} element={t} size="sm" />
                        ))}
                    </HStack>
                    <Badge>Lv. {defeatedWild.level}</Badge>
                </VStack>

                {/* ThrowGame */}
                <VStack spacing={2}>
                    <ThrowGame
                        externalBall={selectedBall}
                        targetSprite={defeatedWild.sprite}
                        onFinish={handleThrowFinish}
                    />
                    {loading && <Text fontSize="sm" color="gray.400">Capturing...</Text>}
                    {/* Ball selector below */}
                    {!throwDone && (
                        <HStack spacing={4} mt={2} flexWrap="wrap" justify="center">
                            {BALL_TYPES.map(ball => {
                                const count = player.balls?.[ball.key] || 0
                                const isSelected = selectedBall === ball.key
                                return (
                                    <VStack key={ball.key} spacing={1}>
                                        <IconButton
                                            w="4rem"
                                            h="4rem"
                                            bg="none"
                                            title={ball.label}
                                            icon={<Image src={ball.icon} w="32px" />}
                                            onClick={() => setSelectedBall(ball.key)}
                                            isDisabled={count <= 0}
                                            border="2px solid"
                                            borderColor={isSelected ? "blue.400" : "transparent"}
                                            borderRadius="md"
                                        />
                                        <Text fontSize="2xs" color="gray.400">
                                            {ball.key === 'pokeball' ? '(∞)' : `(${count})`}
                                        </Text>
                                    </VStack>
                                )
                            })}
                        </HStack>
                    )}
                </VStack>
            </HStack>
        </Flex>
    )
}
