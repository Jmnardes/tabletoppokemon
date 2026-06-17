import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Image, Button, Box, Badge, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"
import PokeStats from "@features/pokemon/PokeStats"
import { PokeRarity } from "@features/pokemon/PokemonRarity"

const EXP_TO_LEVEL = 10

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
    const stagesToWin = session?.stagesPerJourney || 5
    const wildDefeatedCount = game.journeyWildDefeatedCount || journeyProgress
    const visibleCount = 3

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
                {t('journey.level', { level: (session.level ?? 0) + 1, current: wildDefeatedCount + 1, total: stagesToWin })}
            </Badge>

            {/* Wild pokemon preview */}
            {wildPreview.length > 0 && (() => {
                const allRemainingWild = wildPreview.slice(journeyProgress)
                const visibleWild = allRemainingWild.slice(0, visibleCount)
                const hiddenCount = allRemainingWild.length - visibleWild.length

                return (
                    <Box mb={4} w="100%" maxW="900px">
                        <Text fontSize="xs" fontWeight="bold" color="red.300" mb={2} textAlign="center">
                            {t('journey.wildPokemon')}
                        </Text>

                        {/* Visible wild pokemon */}
                        <Flex gap={2} justifyContent="center" flexWrap="wrap" mb={2}>
                            {visibleWild.map((wild) => {
                                return (
                                    <Flex
                                        key={wild.id}
                                        direction="column"
                                        align="center"
                                        bg={colorMode === 'light' ? 'red.50' : 'red.900'}
                                        border={'1px solid'}
                                        borderColor={'red.400'}
                                        borderRadius={8}
                                        p={2}
                                        w="100px"
                                    >
                                        <Image src={wild.sprite} w="64px" h="64px" />
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

                        {/* Hidden wild pokemon */}
                        {hiddenCount > 0 && (
                            <Flex gap={1} justifyContent="center" flexWrap="wrap">
                                {Array.from({ length: hiddenCount }).map((_, idx) => (
                                    <Flex
                                        key={`hidden-${idx}`}
                                        align="center"
                                        justify="center"
                                        bg="gray.700"
                                        border="1px solid"
                                        borderColor="whiteAlpha.200"
                                        borderRadius={6}
                                        w="32px"
                                        h="32px"
                                    >
                                        <Text fontSize="sm" color="whiteAlpha.400">?</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        )}

                        {/* Defeated count */}
                        {wildDefeatedCount > 0 && (
                            <Text fontSize="2xs" color="green.400" textAlign="center" mt={2}>
                                {t('journey.previewDefeated')}: {wildDefeatedCount}/{stagesToWin}
                            </Text>
                        )}
                    </Box>
                )
            })()}

            {/* Available pokemon grid */}
            <Flex gap={3} w="100%" maxW="900px" justifyContent="center" flexWrap="nowrap">
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

                            {/* Rank */}
                            <PokeRarity rarity={poke.rarity?.rarity ?? 0} />

                            {/* Stats */}
                            <PokeStats poke={poke} isMini hideIndicators />
                        </Flex>
                    )
                })}
            </Flex>

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
