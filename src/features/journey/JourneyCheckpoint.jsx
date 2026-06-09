import { useContext, useState } from "react"
import { Flex, Text, Button, Box, Badge, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

export default function JourneyCheckpoint({ journeyState, onContinue, onExit }) {
    const { player, session, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [loading, setLoading] = useState(false)
    const [chestOpened, setChestOpened] = useState(false)
    const [reward, setReward] = useState(null)

    const handleContinue = () => {
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {},
        }

        socket.emit('journey-continue', request, (res) => {
            setLoading(false)
            if (res?.success) {
                const result = res.result
                // Update player ranking
                if (result.playerRanking != null) {
                    setPlayer(prev => ({
                        ...prev,
                        status: { ...prev.status, ranking: result.playerRanking },
                    }))
                }
                // Update player potions
                if (result.potions) {
                    setPlayer(prev => ({
                        ...prev,
                        potions: result.potions,
                    }))
                }
                // Show reward before advancing
                setReward(result.reward)
                setChestOpened(true)
                // Auto-advance after showing reward
                setTimeout(() => {
                    onContinue(result.journey)
                }, 2000)
            }
        })
    }

    const bgBox = colorMode === 'light' ? 'gray.100' : 'gray.700'

    return (
        <Flex flex="1" direction="column" align="center" justify="center" w="100%" maxW="500px">
            <Text fontSize="2xl" mb={2}>
                Checkpoint!
            </Text>
            <Badge colorScheme="green" fontSize="lg" mb={4} p={2} borderRadius={8}>
                Round {journeyState.round} Complete
            </Badge>

            <Text fontSize="sm" color="gray.400" mb={4} textAlign="center">
                You defeated all 6 wild pokémon!
            </Text>

            {/* Chest */}
            <Box
                bg={bgBox}
                border="2px solid"
                borderColor={chestOpened ? 'green.400' : 'yellow.500'}
                borderRadius={12}
                p={6}
                mb={6}
                textAlign="center"
                cursor={!chestOpened && !loading ? 'pointer' : 'default'}
                onClick={!chestOpened && !loading ? handleContinue : undefined}
                _hover={!chestOpened && !loading ? { borderColor: 'yellow.300', transform: 'scale(1.02)' } : {}}
                transition="all 0.2s"
            >
                {!chestOpened ? (
                    <>
                        <Text fontSize="3xl" mb={2}>🎁</Text>
                        <Text fontSize="sm" color="yellow.300">Click to open chest!</Text>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl" mb={2}>✨</Text>
                        <Badge colorScheme="yellow" fontSize="md" p={2} borderRadius={8}>
                            +{reward?.ranking || 5} Ranking Points!
                        </Badge>
                        <Badge colorScheme="green" fontSize="sm" p={1} borderRadius={8} mt={2}>
                            +{reward?.potions || 2} Poções
                        </Badge>
                        <Badge colorScheme="blue" fontSize="sm" p={1} borderRadius={8} mt={1}>
                            +{reward?.superPotions || 1} Super Poção
                        </Badge>
                    </>
                )}
            </Box>

            {!chestOpened && (
                <Button
                    colorScheme="gray"
                    size="md"
                    variant="outline"
                    onClick={onExit}
                >
                    Exit Journey
                </Button>
            )}
        </Flex>
    )
}
