import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Image, Button, SimpleGrid, Box, Badge, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"
import PokeStats from "@features/pokemon/PokeStats"

const EXP_TO_LEVEL = 5

export default function JourneySelection() {
    const { t } = useTranslation()
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
                {t('journey.selectPokemon', { max: maxSelectable })}
            </Text>

            {/* Journey level */}
            <Badge colorScheme="purple" fontSize="sm" mb={3} p={2} borderRadius={8}>
                {t('journey.level', { level: session.level ?? 0, current: journeyProgress + 1, total: 10 })}
            </Badge>

            {/* Wild pokemon preview */}
            {wildPreview.length > 0 && (
                <Box mb={4} w="100%" maxW="900px">
                    <Text fontSize="xs" fontWeight="bold" color="red.300" mb={2} textAlign="center">
                        {t('journey.wildPokemon')}
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
                                        {wild.types?.map(el => (
                                            <Element key={el} element={el} w={3} h={3} />
                                        ))}
                                    </Flex>
                                    <Text fontSize="2xs" color="gray.400">Lv.{wild.level}</Text>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Box>
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
                                {poke.types?.map(el => (
                                    <Element key={el} element={el} />
                                ))}
                            </Flex>
                            <Text fontSize="2xs" color="gray.400">Lv.{poke.level}</Text>
                            <Text fontSize="2xs" color="cyan.400">EXP: {poke.exp ?? 0}/{EXP_TO_LEVEL}</Text>

                            {/* Stats */}
                            <PokeStats poke={poke} isMini hideIndicators />
                        </Flex>
                    )
                })}
            </SimpleGrid>

            {/* Start button */}
            <Button
                mt={6}
                colorScheme="green"
                size="lg"
                isDisabled={selectedIds.length < maxSelectable}
                isLoading={loading}
                onClick={startJourney}
            >
                {t('journey.startJourney', { selected: selectedIds.length, max: maxSelectable })}
            </Button>
        </Flex>
    )
}
