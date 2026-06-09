import { useContext, useState } from "react"
import { Flex, Text, Image, Button, SimpleGrid, Box, Badge, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"

const EXP_TO_LEVEL = 5

export default function JourneySelection() {
    const { player, teamIds, pokemonData, updateGame, session, game } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [selectedIds, setSelectedIds] = useState([])
    const [loading, setLoading] = useState(false)

    const allPokemon = teamIds
        .map(id => pokemonData[id])
        .filter(Boolean)

    const maxSelectable = Math.min(session?.journeyTeamLength || 3, allPokemon.length)
    const wildPreview = game.journeyWildPreview || []
    const journeyProgress = game.journeyProgress || 0

    const toggleSelect = (pokeId) => {
        setSelectedIds(prev => {
            if (prev.includes(pokeId)) {
                return prev.filter(id => id !== pokeId)
            }
            if (prev.length >= maxSelectable) return prev
            return [...prev, pokeId]
        })
    }

    const moveUp = (pokeId) => {
        setSelectedIds(prev => {
            const idx = prev.indexOf(pokeId)
            if (idx <= 0) return prev
            const next = [...prev]
            ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
            return next
        })
    }

    const moveDown = (pokeId) => {
        setSelectedIds(prev => {
            const idx = prev.indexOf(pokeId)
            if (idx === -1 || idx >= prev.length - 1) return prev
            const next = [...prev]
            ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
            return next
        })
    }

    const startJourney = () => {
        if (selectedIds.length === 0 || selectedIds.length > maxSelectable) return
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: { selectedIds },
        }

        socket.emit('journey-start', request, (res) => {
            setLoading(false)
            if (res?.success) {
                updateGame({
                    openJourneySelection: false,
                    isInJourney: true,
                    journeyBagLocked: true,
                    journeyData: res.result.journey,
                })
            }
        })
    }

    const bgCard = colorMode === 'light' ? 'gray.100' : 'gray.700'
    const bgSelected = colorMode === 'light' ? 'green.100' : 'green.800'
    const borderSelected = 'green.400'

    return (
        <Flex flex="1" flexDirection="column" alignItems="center" p={4} overflowY="auto">
            <Text fontSize="sm" mb={4} textAlign="center" color="gray.400">
                Select {maxSelectable} Pokémon for your journey. Order matters — first will fight first.
            </Text>

            {/* Journey level */}
            <Badge colorScheme="purple" fontSize="sm" mb={3} p={2} borderRadius={8}>
                Journey Level: {session.level ?? 0} — Pokemon {journeyProgress + 1}/10
            </Badge>

            {/* Wild pokemon preview */}
            {wildPreview.length > 0 && (
                <Box mb={4} w="100%" maxW="900px">
                    <Text fontSize="xs" fontWeight="bold" color="red.300" mb={2} textAlign="center">
                        Wild Pokémon you will face
                    </Text>
                    <Flex gap={2} justifyContent="center" flexWrap="wrap">
                        {wildPreview.map((wild, idx) => {
                            const alreadyDefeated = idx < journeyProgress
                            const isCurrent = idx === journeyProgress
                            return (
                                <Flex
                                    key={wild.id}
                                    direction="column"
                                    align="center"
                                    bg={alreadyDefeated ? 'gray.700' : (colorMode === 'light' ? 'red.50' : 'red.900')}
                                    border={isCurrent ? '2px solid' : '1px solid'}
                                    borderColor={alreadyDefeated ? 'gray.500' : (isCurrent ? 'orange.400' : 'red.400')}
                                    borderRadius={8}
                                    p={2}
                                    w="80px"
                                    opacity={alreadyDefeated ? 0.4 : 0.9}
                                >
                                    <Badge colorScheme={alreadyDefeated ? 'gray' : (isCurrent ? 'orange' : 'red')} fontSize="2xs" mb={1}>{idx + 1}</Badge>
                                    <Image src={wild.sprite} w="32px" h="32px" filter={alreadyDefeated ? 'grayscale(1)' : 'none'} />
                                    <Text fontSize="2xs" noOfLines={1}>{wild.name}</Text>
                                    <Flex gap={1} mt={1}>
                                        {wild.types?.map(t => (
                                            <Element key={t} element={t} w={3} h={3} />
                                        ))}
                                    </Flex>
                                    <Text fontSize="2xs" color="gray.400">Lv.{wild.level}</Text>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Box>
            )}

            {/* Selected order */}
            {selectedIds.length > 0 && (
                <Flex mb={4} gap={2} flexWrap="wrap" justifyContent="center">
                    {selectedIds.map((id, idx) => {
                        const poke = pokemonData[id]
                        if (!poke) return null
                        return (
                            <Flex
                                key={id}
                                direction="column"
                                align="center"
                                bg={bgSelected}
                                border="2px solid"
                                borderColor={borderSelected}
                                borderRadius={8}
                                p={2}
                                w="80px"
                            >
                                <Badge colorScheme="green" mb={1}>{idx + 1}</Badge>
                                <Image src={poke.sprites?.front || poke.sprites?.main} w="32px" h="32px" />
                                <Text fontSize="2xs" noOfLines={1}>{poke.name}</Text>
                                <Flex gap={1} mt={1}>
                                    <Button size="xs" variant="ghost" onClick={() => moveUp(id)} isDisabled={idx === 0}>↑</Button>
                                    <Button size="xs" variant="ghost" onClick={() => moveDown(id)} isDisabled={idx === selectedIds.length - 1}>↓</Button>
                                </Flex>
                            </Flex>
                        )
                    })}
                </Flex>
            )}

            {/* Available pokemon grid */}
            <SimpleGrid columns={[3, 4, 5, 6]} spacing={3} w="100%" maxW="900px">
                {allPokemon.map(poke => {
                    const isSelected = selectedIds.includes(poke.id)
                    const orderIdx = selectedIds.indexOf(poke.id)

                    return (
                        <Flex
                            key={poke.id}
                            direction="column"
                            align="center"
                            bg={isSelected ? bgSelected : bgCard}
                            border="2px solid"
                            borderColor={isSelected ? borderSelected : 'transparent'}
                            borderRadius={8}
                            p={2}
                            cursor="pointer"
                            onClick={() => toggleSelect(poke.id)}
                            opacity={!isSelected && selectedIds.length >= maxSelectable ? 0.4 : 1}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.15s"
                            position="relative"
                        >
                            {isSelected && (
                                <Badge position="absolute" top={1} left={1} colorScheme="green" fontSize="xs">
                                    {orderIdx + 1}
                                </Badge>
                            )}
                            <Image src={poke.sprites?.front || poke.sprites?.main} w="40px" h="40px" />
                            <Text fontSize="2xs" noOfLines={1} fontWeight="bold">{poke.name}</Text>
                            <Flex gap={1} mt={1}>
                                {poke.types?.map(t => (
                                    <Element key={t} element={t} />
                                ))}
                            </Flex>
                            <Text fontSize="2xs" color="gray.400">Lv.{poke.level}</Text>
                            <Text fontSize="2xs" color="cyan.400">EXP: {poke.exp ?? 0}/{EXP_TO_LEVEL}</Text>
                        </Flex>
                    )
                })}
            </SimpleGrid>

            {/* Start button */}
            <Button
                mt={6}
                colorScheme="green"
                size="lg"
                isDisabled={selectedIds.length === 0}
                isLoading={loading}
                onClick={startJourney}
            >
                Start Journey ({selectedIds.length}/{maxSelectable})
            </Button>
        </Flex>
    )
}
