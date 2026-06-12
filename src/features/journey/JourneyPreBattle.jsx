import { useContext, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Image, Button, Box, Badge, VStack, HStack, Progress, useColorMode, IconButton, Tooltip, Divider } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import Element from "@features/elements/Element"
import Card from "@features/pokemon/Card"
import { healAnimation } from "@utils/animations"

import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'

const EXP_TO_LEVEL = 5

const POTIONS = [
    { key: 'potion', label: 'Potion', tKey: 'journey.potion', healText: '25%', icon: potionIcon },
    { key: 'superPotion', label: 'Super Potion', tKey: 'journey.superPotionName', healText: '50%', icon: superPotionIcon },
    { key: 'hyperPotion', label: 'Hyper Potion', tKey: 'journey.hyperPotion', healText: '80%', icon: hyperPotionIcon },
]

export default function JourneyPreBattle({ journeyState, onFightStart, setJourneyState }) {
    const { t } = useTranslation()
    const { player, session, setPlayer, pokemonData } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [loading, setLoading] = useState(false)
    const [healingPoke, setHealingPoke] = useState(null)
    const [playerOrder, setPlayerOrder] = useState(() => {
        // Only alive pokemon — defeated ones are excluded from reorder
        const status = journeyState.playerTeamStatus || journeyState.playerTeam
        return status.filter(p => !p.defeated && p.currentHp !== 0).map(p => p.id)
    })

    // Remove newly defeated pokémon from playerOrder when status updates
    useEffect(() => {
        const status = journeyState.playerTeamStatus
        if (!status) return
        setPlayerOrder(prev => prev.filter(id => {
            const p = status.find(s => s.id === id)
            return p && !p.defeated && p.currentHp !== 0
        }))
    }, [journeyState.playerTeamStatus])

    // Derive defeated pokémon list from current status
    const defeatedPokes = (() => {
        const status = journeyState.playerTeamStatus || journeyState.playerTeam
        if (!status) return []
        return status.filter(p => p.defeated || p.currentHp === 0).map(p => p.id)
    })()

    const wildIndex = journeyState.currentWildIndex || 0
    const currentWild = journeyState.wildTeam?.[wildIndex]

    const bgCard = colorMode === 'light' ? 'gray.100' : 'gray.700'
    const bgActive = colorMode === 'light' ? 'blue.100' : 'blue.800'
    const bgWild = colorMode === 'light' ? 'red.50' : 'red.900'

    const getPlayerPokemonData = (pokeId) => {
        const fromTeam = journeyState.playerTeam?.find(p => p.id === pokeId)
        const fromStatus = journeyState.playerTeamStatus?.find(p => p.id === pokeId)
        return { ...fromTeam, ...fromStatus }
    }

    const isPokeDefeated = (pokeId) => {
        const poke = getPlayerPokemonData(pokeId)
        return poke?.defeated || poke?.currentHp === 0
    }

    const moveUp = (pokeId) => {
        setPlayerOrder(prev => {
            const idx = prev.indexOf(pokeId)
            if (idx <= 0 || isPokeDefeated(pokeId) || isPokeDefeated(prev[idx - 1])) return prev
            const next = [...prev]
            ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
            return next
        })
    }

    const moveDown = (pokeId) => {
        setPlayerOrder(prev => {
            const idx = prev.indexOf(pokeId)
            if (idx === -1 || idx >= prev.length - 1 || isPokeDefeated(pokeId) || isPokeDefeated(prev[idx + 1])) return prev
            const next = [...prev]
            ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
            return next
        })
    }

    const applyPotion = (potionType, pokemonId) => {
        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: { potionType, pokemonId },
        }

        socket.emit('journey-use-potion', request, (res) => {
            if (res?.success) {
                const result = res.result
                if (result.playerTeamStatus) {
                    setJourneyState(prev => ({
                        ...prev,
                        playerTeamStatus: result.playerTeamStatus,
                    }))
                }
                if (result.potions) {
                    setPlayer(prev => ({ ...prev, potions: result.potions }))
                }
                setHealingPoke(pokemonId)
                setTimeout(() => setHealingPoke(null), 1000)
            }
        })
    }

    const startFight = () => {
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: { playerOrder: playerOrder.filter(id => !isPokeDefeated(id)) },
        }

        socket.emit('journey-fight', request, (res) => {
            setLoading(false)
            if (res?.success) {
                const result = res.result
                // Update journey state with team status
                if (result.playerTeamStatus) {
                    setJourneyState(prev => ({
                        ...prev,
                        playerTeamStatus: result.playerTeamStatus,
                        currentWildIndex: result.allWildDefeated
                            ? prev.wildTeam.length
                            : (prev.currentWildIndex || 0) + (result.playerWon ? 1 : 0),
                    }))
                }
                onFightStart(result)
            }
        })
    }

    return (
        <Flex flex="1" direction="column" align="center" w="100%" maxW="900px">
            <Text fontSize="xl" mb={1}>
                {t('journey.round', { round: journeyState.round, current: wildIndex + 1, total: journeyState.wildTeam?.length || 10 })}
            </Text>
            <Text fontSize="xs" color="gray.400" mb={4}>
                {t('journey.levelN', { level: journeyState.level })}
            </Text>

            {/* Main layout: Player left, Wild right */}
            <Flex w="100%" direction={{ base: 'column', md: 'row' }} gap={6} mb={4} align="flex-start">
                {/* Player Team Order - LEFT */}
                <Flex direction="column" flex="1" align="center">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>{t('journey.yourBattleOrder')}</Text>
                    <Text fontSize="2xs" color="gray.400" mb={3}>{t('journey.reorderBefore')}</Text>

                    <VStack spacing={2} w="100%" maxW="400px">
                        {playerOrder.map((pokeId, idx) => {
                            const poke = getPlayerPokemonData(pokeId)
                            if (!poke) return null
                            const isDefeated = poke.defeated || poke.currentHp === 0
                            const maxHp = poke.maxHp ?? poke.stats?.hp ?? 1
                            const currentHp = isDefeated ? 0 : (poke.currentHp ?? maxHp)
                            const hpPercent = Math.round((currentHp / maxHp) * 100)
                            const isDamaged = !isDefeated && currentHp < maxHp
                            const isHealing = healingPoke === pokeId

                            return (
                                <HStack
                                    key={pokeId}
                                    w="100%"
                                    bg={isDefeated ? 'gray.600' : (idx === 0 ? bgActive : bgCard)}
                                    border={isDefeated ? '1px solid' : (idx === 0 ? '2px solid' : '1px solid')}
                                    borderColor={isDefeated ? 'gray.500' : (idx === 0 ? 'blue.400' : 'transparent')}
                                    borderRadius={8}
                                    p={2}
                                    spacing={3}
                                    opacity={isDefeated ? 0.5 : 1}
                                    animation={isHealing ? `${healAnimation} 1s ease-in-out` : undefined}
                                >
                                    <Badge colorScheme={isDefeated ? 'red' : (idx === 0 ? 'blue' : 'gray')}>{isDefeated ? '✗' : idx + 1}</Badge>
                                    <Tooltip
                                        label={pokemonData[pokeId] ? <Card poke={pokemonData[pokeId]} tooltip /> : poke.name}
                                        fontSize="xs"
                                        placement="right"
                                        hasArrow={false}
                                        bg="transparent"
                                        p={0}
                                    >
                                        <Image
                                            src={poke.sprites?.front || poke.sprites?.main}
                                            w="32px" h="32px"
                                            filter={isDefeated ? 'grayscale(1)' : 'none'}
                                            fallback={<Text fontSize="xl" w="32px" h="32px" textAlign="center">?</Text>}
                                        />
                                    </Tooltip>
                                    <VStack align="start" spacing={0} flex="1">
                                        <Text fontSize="xs" fontWeight="bold">{poke.level} - {poke.name}</Text>
                                        {/* HP Bar */}
                                        <HStack spacing={1} w="100%">
                                            <Text fontSize="2xs" color={hpPercent > 50 ? 'green.400' : (hpPercent > 20 ? 'yellow.400' : 'red.400')}>HP</Text>
                                            <Progress
                                                value={currentHp} max={maxHp}
                                                size="xs" flex="1"
                                                colorScheme={hpPercent > 50 ? 'green' : (hpPercent > 20 ? 'yellow' : 'red')}
                                                borderRadius="full"
                                            />
                                            <Text fontSize="2xs" color={hpPercent > 50 ? 'green.400' : (hpPercent > 20 ? 'yellow.400' : 'red.400')}>
                                                {currentHp}/{maxHp}
                                            </Text>
                                        </HStack>
                                        {!isDefeated && (
                                            <HStack spacing={1} w="100%">
                                                <Text fontSize="2xs" color="cyan.400">EXP</Text>
                                                <Progress
                                                    value={poke.exp ?? 0} max={EXP_TO_LEVEL}
                                                    size="xs" flex="1"
                                                    colorScheme="cyan"
                                                    borderRadius="full"
                                                />
                                                <Text fontSize="2xs" color="cyan.400">{poke.exp ?? 0}/{EXP_TO_LEVEL}</Text>
                                            </HStack>
                                        )}
                                        {/* Potion buttons — only for alive damaged pokemon */}
                                        {isDamaged && (
                                            <HStack spacing={1} mt={1}>
                                                {POTIONS.map(pot => {
                                                    const count = player.potions?.[pot.key] ?? 0
                                                    return (
                                                        <Tooltip key={pot.key} label={t('journey.potionTooltip', { label: t(pot.tKey), heal: pot.healText, count })} fontSize="xs">
                                                            <IconButton
                                                                size="xs"
                                                                variant="ghost"
                                                                icon={<Image src={pot.icon} w="18px" h="18px" />}
                                                                isDisabled={count <= 0}
                                                                onClick={() => applyPotion(pot.key, pokeId)}
                                                                aria-label={t(pot.tKey)}
                                                                p={0}
                                                                minW="24px"
                                                                h="24px"
                                                            />
                                                        </Tooltip>
                                                    )
                                                })}
                                            </HStack>
                                        )}
                                    </VStack>
                                    <HStack spacing={1}>
                                        <Button size="xs" variant="ghost" onClick={() => moveUp(pokeId)} isDisabled={isDefeated || idx === 0}>↑</Button>
                                        <Button size="xs" variant="ghost" onClick={() => moveDown(pokeId)} isDisabled={isDefeated || idx === playerOrder.length - 1}>↓</Button>
                                    </HStack>
                                </HStack>
                            )
                        })}
                    </VStack>

                    {/* Defeated Pokémon Section */}
                    {defeatedPokes.length > 0 && (
                        <>
                            <Divider my={3} borderColor="red.400" opacity={0.5} />
                            <Text fontSize="xs" fontWeight="bold" color="red.400" mb={2}>
                                {t('journey.defeated', { count: defeatedPokes.length })}
                            </Text>
                            <VStack spacing={2} w="100%" maxW="400px">
                                {defeatedPokes.map((pokeId) => {
                                    const poke = getPlayerPokemonData(pokeId)
                                    if (!poke) return null
                                    const maxHp = poke.maxHp ?? poke.stats?.hp ?? 1

                                    return (
                                        <HStack
                                            key={pokeId}
                                            w="100%"
                                            bg="gray.600"
                                            border="1px solid"
                                            borderColor="gray.500"
                                            borderRadius={8}
                                            p={2}
                                            spacing={3}
                                            opacity={0.5}
                                        >
                                            <Badge colorScheme="red">✗</Badge>
                                            <Image
                                                src={poke.sprites?.front || poke.sprites?.main}
                                                w="32px" h="32px"
                                                filter="grayscale(1)"
                                                fallback={<Text fontSize="xl" w="32px" h="32px" textAlign="center">?</Text>}
                                            />
                                            <VStack align="start" spacing={0} flex="1">
                                                <Text fontSize="xs" fontWeight="bold">{poke.level} - {poke.name}</Text>
                                                <HStack spacing={1} w="100%">
                                                    <Text fontSize="2xs" color="red.400">HP</Text>
                                                    <Progress
                                                        value={0} max={maxHp}
                                                        size="xs" flex="1"
                                                        colorScheme="red"
                                                        borderRadius="full"
                                                    />
                                                    <Text fontSize="2xs" color="red.400">0/{maxHp}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    )
                                })}
                            </VStack>
                        </>
                    )}
                </Flex>

                {/* Wild Pokemon - RIGHT */}
                <Flex direction="column" align="center" minW="220px">
                    {currentWild && (
                        <Flex
                            direction="column"
                            align="center"
                            bg={bgWild}
                            border="2px solid"
                            borderColor="red.400"
                            borderRadius={12}
                            p={4}
                            mb={4}
                            w="200px"
                        >
                            <Text fontSize="xs" color="red.300" fontWeight="bold" mb={1}>{t('journey.opponent')}</Text>
                            <Image src={currentWild.sprite} w="64px" h="64px" />
                            <Text fontWeight="bold" fontSize="sm">{currentWild.name}</Text>
                            <HStack mt={1}>
                                {currentWild.types?.map(el => (
                                    <Element key={el} element={el} />
                                ))}
                            </HStack>
                            <Badge mt={1}>Lv. {currentWild.level}</Badge>
                        </Flex>
                    )}

                    {/* Wild team preview */}
                    <HStack spacing={1}>
                        {journeyState.wildTeam?.map((wild, idx) => (
                            <Tooltip
                                key={wild.id}
                                label={
                                    <Box p={1} fontSize="2xs">
                                        <Text fontWeight="bold">{wild.name}</Text>
                                        <Text>Lv. {wild.level}</Text>
                                        <HStack spacing={1} mt={1}>
                                            {wild.types?.map(el => (
                                                <Element key={el} element={el} />
                                            ))}
                                        </HStack>
                                    </Box>
                                }
                                fontSize="xs"
                            >
                                <Box
                                    w="32px" h="32px"
                                    borderRadius={4}
                                    bg={idx < wildIndex ? 'red.500' : (idx === wildIndex ? 'orange.400' : bgCard)}
                                    opacity={idx < wildIndex ? 0.3 : 1}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image src={wild.sprite} w="24px" h="24px" filter={idx < wildIndex ? 'grayscale(1)' : 'none'} />
                                </Box>
                            </Tooltip>
                        ))}
                    </HStack>
                </Flex>
            </Flex>

            <Button
                colorScheme="red"
                size="lg"
                onClick={startFight}
                isLoading={loading}
            >
                {t('journey.fight')}
            </Button>
        </Flex>
    )
}
