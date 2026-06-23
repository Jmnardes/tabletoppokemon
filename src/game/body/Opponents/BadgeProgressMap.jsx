import { Box, Center, Flex, Text, useColorMode } from "@chakra-ui/react"
import PlayerBubble from "./PlayerBubble"

export default function BadgeProgressMap({ badgesToWin = 3, players = [], expandedId, onPlayerClick, playerCount }) {
    const { colorMode } = useColorMode()
    const light = colorMode === 'light'

    const nodes = Array.from({ length: badgesToWin }, (_, i) => i + 1)
    const readyCount = players.filter(p => p.turnReady).length

    // Group players by their current badge count (milestone they're at)
    const playersByBadge = {}
    players.forEach(p => {
        const badge = p.status?.badges || 0
        if (!playersByBadge[badge]) playersByBadge[badge] = []
        playersByBadge[badge].push(p)
    })

    return (
        <Flex direction="column" align="center" w="100%" maxW="600px" mx="auto">
            {/* Players positioned above their badge milestone */}
            <Flex w="100%" justify="space-around" align="flex-end" mb={2} minH="80px">
                {nodes.map((badgeNum, idx) => {
                    // Players at this milestone: those with badges === idx (0-indexed milestone)
                    // Badge 0 = before first badge, badge 1 = after first, etc.
                    const playersHere = playersByBadge[idx] || []
                    return (
                        <Flex key={badgeNum} direction="column" align="center" flex={1} gap={1}>
                            <Flex gap={1} justify="center" flexWrap="wrap">
                                {playersHere.map(p => (
                                    <PlayerBubble
                                        key={p.id}
                                        player={p}
                                        isExpanded={expandedId === p.id}
                                        onClick={() => onPlayerClick(p)}
                                        playerCount={playerCount}
                                        readyCount={readyCount}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    )
                })}
                {/* Players who completed all badges (at the end) */}
                {playersByBadge[badgesToWin]?.length > 0 && (
                    <Flex direction="column" align="center" flex={0.5} gap={1}>
                        <Flex gap={1} justify="center" flexWrap="wrap">
                            {playersByBadge[badgesToWin].map(p => (
                                <PlayerBubble
                                    key={p.id}
                                    player={p}
                                    isExpanded={expandedId === p.id}
                                    onClick={() => onPlayerClick(p)}
                                    playerCount={playerCount}
                                    readyCount={readyCount}
                                />
                            ))}
                        </Flex>
                    </Flex>
                )}
            </Flex>

            {/* Badge track */}
            <Flex align="center" w="100%" justify="space-around" position="relative">
                {/* Connecting line */}
                <Box
                    position="absolute"
                    top="50%"
                    left="10%"
                    right="10%"
                    h="2px"
                    bg={light ? 'gray.400' : 'gray.500'}
                    transform="translateY(-50%)"
                    zIndex={0}
                />
                {nodes.map(badgeNum => (
                    <Center
                        key={badgeNum}
                        w="32px"
                        h="32px"
                        borderRadius="full"
                        bg={light ? 'gray.200' : 'gray.600'}
                        border="2px solid"
                        borderColor={light ? 'gray.400' : 'gray.400'}
                        zIndex={1}
                    >
                        <Text fontSize="xs" fontWeight="bold" color={light ? 'gray.700' : 'white'}>
                            {badgeNum}
                        </Text>
                    </Center>
                ))}
            </Flex>
        </Flex>
    )
}
