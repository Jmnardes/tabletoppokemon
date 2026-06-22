import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { VStack, HStack, Flex, Text, Progress, Image, Badge, Box, Button, useColorMode, Tooltip } from "@chakra-ui/react"
import Element from "@features/elements/Element"
import { journeyHitAnimation, journeyCritHitAnimation, journeyDefAnimation, missAnimation, textAnimation, lungeRightAnimation, lungeLeftAnimation, projectileRightAnimation, projectileLeftAnimation } from "@utils/animations"
import { getAttackSprite } from "@utils/attackSprites"
import { colorByHitType } from "@utils/battle"
import { fmt } from "@utils"

const animSecs = 0.8

const getDefenderAnim = (hitType) => {
    switch (hitType) {
        case 'crit': return `${journeyCritHitAnimation} ${animSecs}s ease-in-out`
        case 'half': return `${journeyDefAnimation} ${animSecs}s ease-in-out`
        case 'miss': return `${missAnimation} ${animSecs}s ease-in-out`
        default: return `${journeyHitAnimation} ${animSecs}s ease-in-out`
    }
}

export default function GymBattleScreen({ 
    playerTeam, 
    leaderTeam, 
    battleLog, 
    currentPlayerPokemon, 
    currentLeaderPokemon, 
    onBattleLogComplete, 
    hasBattleResult,
    needsChoice,
    onChoosePokemon,
    onNext
}) {
    const { colorMode } = useColorMode()
    const { t } = useTranslation()
    const [showContinueButton, setShowContinueButton] = useState(false)

    // Animation state
    const [playerAnim, setPlayerAnim] = useState("")
    const [leaderAnim, setLeaderAnim] = useState("")
    const [lastDamage, setLastDamage] = useState(null)
    const [projectile, setProjectile] = useState(null)
    const [logIndex, setLogIndex] = useState(0)
    const [playbackDone, setPlaybackDone] = useState(false)
    const [displayedLogs, setDisplayedLogs] = useState([])
    const [playerHp, setPlayerHp] = useState(null)
    const [leaderHp, setLeaderHp] = useState(null)
    const animating = useRef(false)
    const logEndRef = useRef(null)

    const defeatedBg = colorMode === 'light' ? "red.200" : "red.900"
    const activeBg = colorMode === 'light' ? "blue.500" : "blue.600"
    const slotBg = colorMode === 'light' ? "gray.100" : "gray.700"
    const borderColor = colorMode === 'light' ? "gray.200" : "gray.600"
    const logBg = colorMode === 'light' ? "white" : "gray.900"

    // Initialize HP when battle log arrives (compute starting HP from log)
    useEffect(() => {
        if (!battleLog || battleLog.length === 0 || !currentPlayerPokemon || !currentLeaderPokemon) return

        let pDmgTaken = 0
        let lDmgTaken = 0
        for (const entry of battleLog) {
            if (entry.defender?.id === currentPlayerPokemon.id) {
                pDmgTaken += entry.damage
            } else {
                lDmgTaken += entry.damage
            }
        }

        const pFinalHp = currentPlayerPokemon.currentHp !== undefined ? currentPlayerPokemon.currentHp : (currentPlayerPokemon.hp || currentPlayerPokemon.stats?.hp || 1)
        const lFinalHp = currentLeaderPokemon.currentHp !== undefined ? currentLeaderPokemon.currentHp : (currentLeaderPokemon.hp || currentLeaderPokemon.stats?.hp || 1)

        setPlayerHp(Math.max(0, pFinalHp) + pDmgTaken)
        setLeaderHp(Math.max(0, lFinalHp) + lDmgTaken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battleLog])

    // Reset playback when new battleLog arrives
    useEffect(() => {
        setLogIndex(0)
        setPlaybackDone(false)
        setDisplayedLogs([])
        animating.current = false
        setLastDamage(null)
        setProjectile(null)
        setPlayerAnim("")
        setLeaderAnim("")
    }, [battleLog])

    // Playback loop — sequenced: lunge → projectile → impact → advance
    useEffect(() => {
        const timers = []

        if (playbackDone || !battleLog || battleLog.length === 0 || logIndex >= battleLog.length) {
            if (battleLog && battleLog.length > 0 && logIndex >= battleLog.length && !playbackDone) {
                setPlaybackDone(true)
            }
            return
        }

        if (animating.current) return
        animating.current = true

        const entry = battleLog[logIndex]
        const isPlayerDefender = entry.defender?.id === currentPlayerPokemon?.id

        // Phase 1: Attacker lunge
        timers.push(setTimeout(() => {
            if (isPlayerDefender) {
                setLeaderAnim(`${lungeLeftAnimation} 0.25s ease-out`)
            } else {
                setPlayerAnim(`${lungeRightAnimation} 0.25s ease-out`)
            }

            // Phase 2: Fire projectile
            timers.push(setTimeout(() => {
                setProjectile({
                    moveType: entry.attacker?.moveType,
                    direction: isPlayerDefender ? 'left' : 'right',
                    key: logIndex,
                })

                // Phase 3: Impact
                const impactDelay = 380
                timers.push(setTimeout(() => {
                    // Apply HP
                    if (isPlayerDefender) {
                        setPlayerHp(prev => Math.max(0, prev - entry.damage))
                        setPlayerAnim(getDefenderAnim(entry.hitType))
                    } else {
                        setLeaderHp(prev => Math.max(0, prev - entry.damage))
                        setLeaderAnim(getDefenderAnim(entry.hitType))
                    }

                    // Show damage text
                    setLastDamage({ damage: entry.damage, hitType: entry.hitType, defenderId: entry.defender?.id, index: logIndex })

                    // Add to displayed logs
                    setDisplayedLogs(prev => [...prev, entry])

                    // Phase 4: Advance
                    timers.push(setTimeout(() => {
                        animating.current = false
                        setLogIndex(prev => prev + 1)
                    }, 700))
                }, impactDelay))
            }, 300))
        }, 16))

        return () => {
            timers.forEach(clearTimeout)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logIndex, playbackDone, battleLog])

    // Auto-scroll log
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [displayedLogs])

    // Show continue button only after playback is done
    useEffect(() => {
        if (hasBattleResult && playbackDone && battleLog?.length > 0) {
            setShowContinueButton(true)
        }
    }, [hasBattleResult, playbackDone, battleLog])

    // Reset continue button on non-final logs
    useEffect(() => {
        if (!hasBattleResult) {
            setShowContinueButton(false)
        }
    }, [battleLog, hasBattleResult])

    const PokemonSlot = ({ pokemon, isActive, isDefeated, isHidden = false, onClick, isClickable = false, side = "player" }) => {
        const canClick = isClickable && !isDefeated && !isActive && onClick
        const showTooltip = side === "player" && pokemon && !isDefeated

        if (!pokemon && isHidden) {
            return (
                <Flex
                    bg={slotBg}
                    p={1}
                    borderRadius={6}
                    w="60px"
                    h="60px"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid"
                    borderColor={borderColor}
                >
                    <Text fontSize="xl" fontWeight="bold">?</Text>
                </Flex>
            )
        }

        if (!pokemon) return null

        const slotContent = (
            <Flex
                bg={isDefeated ? defeatedBg : (isActive ? activeBg : slotBg)}
                p={1}
                borderRadius={6}
                flexDirection="column"
                alignItems="center"
                opacity={isDefeated ? 0.3 : (isActive ? 1 : 0.7)}
                position="relative"
                w="60px"
                h="60px"
                border="2px solid"
                borderColor={isActive ? "blue.400" : borderColor}
                cursor={canClick ? "pointer" : "default"}
                onClick={canClick ? onClick : undefined}
                _hover={canClick ? { 
                    transform: "scale(1.15)", 
                    borderColor: "green.400",
                    opacity: 1,
                    boxShadow: "0 0 12px rgba(72, 187, 120, 0.6)"
                } : {}}
                transition="all 0.2s"
                animation={canClick ? "pulse 2s infinite" : undefined}
                sx={canClick ? {
                    '@keyframes pulse': {
                        '0%, 100%': { boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.4)' },
                        '50%': { boxShadow: '0 0 8px 4px rgba(72, 187, 120, 0.2)' }
                    }
                } : {}}
            >
                <Image
                    src={pokemon.sprites?.front}
                    w="40px"
                    h="40px"
                    filter={isDefeated ? "grayscale(100%)" : "none"}
                />
                {isDefeated && (
                    <Text position="absolute" fontSize="3xl" fontWeight="bold" color="red.500" top="10px">
                        ✕
                    </Text>
                )}
                {canClick && (
                    <Box 
                        position="absolute" 
                        bottom="2px" 
                        fontSize="2xs" 
                        bg="green.500" 
                        px={1} 
                        borderRadius={2}
                        color="white"
                        fontWeight="bold"
                    >
                        {t('gym.click')}
                    </Box>
                )}
            </Flex>
        )

        if (showTooltip) {
            const maxHp = pokemon.hp || pokemon.stats?.hp || 1
            const currentHp = pokemon.currentHp !== undefined ? pokemon.currentHp : maxHp
            
            return (
                <Tooltip
                    label={
                        <VStack align="start" spacing={1}>
                            <HStack>
                                <Text fontWeight="bold">{pokemon.name}</Text>
                                <Badge colorScheme="yellow" bgColor="GrayText" fontSize="xs">Lv {pokemon.level}</Badge>
                            </HStack>
                            <HStack spacing={1}>
                                {pokemon.types?.slice(0, 2).map((type, idx) => (
                                    <Element key={idx} element={type} size={12} />
                                ))}
                            </HStack>
                            <Text fontSize="xs">HP: {Math.max(0, Math.floor(currentHp))} / {maxHp}</Text>
                        </VStack>
                    }
                    placement="top"
                    hasArrow
                >
                    {slotContent}
                </Tooltip>
            )
        }

        return slotContent
    }

    const ActivePokemonDisplay = ({ pokemon, isPlayer, anim, setAnim, hp, maxHp }) => {
        if (!pokemon) {
            return null
        }

        const finalMaxHp = maxHp || pokemon.hp || pokemon.stats?.hp || 1
        const currentHp = hp !== null && hp !== undefined ? hp : (pokemon.currentHp !== undefined ? pokemon.currentHp : finalMaxHp)
        const hpPercentage = finalMaxHp > 0 ? (currentHp / finalMaxHp) * 100 : 0
        const pokeId = pokemon.id
        const showDamage = lastDamage && lastDamage.defenderId === pokeId

        return (
            <VStack spacing={3}>
                <VStack spacing={1}>
                    <HStack spacing={2}>
                        <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
                            {pokemon.name}
                        </Text>
                        <Badge colorScheme="yellow" bgColor="GrayText" fontSize="xs">Lv {pokemon.level}</Badge>
                    </HStack>
                    
                    <Box
                        position="relative"
                        w="180px"
                        h="180px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        animation={anim || undefined}
                        onAnimationEnd={() => setAnim && setAnim("")}
                    >
                        <Image
                            src={isPlayer ? pokemon.sprites?.back : pokemon.sprites?.front}
                            w="180px"
                            h="180px"
                            objectFit="contain"
                            sx={{ imageRendering: 'pixelated' }}
                        />
                        {showDamage && (
                            <Text
                                key={`dmg-${lastDamage.index}`}
                                position="absolute"
                                fontSize="2xl"
                                fontWeight="bold"
                                top={-1}
                                right={isPlayer ? -6 : undefined}
                                left={isPlayer ? undefined : -6}
                                color={colorByHitType(lastDamage.hitType)}
                                animation={`${textAnimation} 0.6s ease-in-out forwards`}
                                textShadow="0 0 6px rgba(0,0,0,0.8)"
                                onAnimationEnd={() => setLastDamage(null)}
                            >
                                {lastDamage.damage > 0 ? `${fmt(lastDamage.damage)}` : "MISS"}
                            </Text>
                        )}
                    </Box>

                    {/* HP Bar */}
                    <VStack spacing={0} w="180px">
                        <HStack justify="space-between" w="full" mb={1}>
                            <HStack spacing={1}>
                                {pokemon.types?.slice(0, 2).map((type, idx) => (
                                    <Element key={idx} element={type} size={14} />
                                ))}
                            </HStack>
                            <Text fontSize="xs" fontWeight="bold">
                                {Math.max(0, Math.floor(currentHp))} / {finalMaxHp} HP
                            </Text>
                        </HStack>
                        
                        <Progress
                            value={Math.max(0, hpPercentage)}
                            colorScheme={hpPercentage > 50 ? "green" : hpPercentage > 25 ? "yellow" : "red"}
                            size="sm"
                            w="full"
                            borderRadius={4}
                            transition="value 0.3s ease"
                        />
                    </VStack>
                </VStack>
            </VStack>
        )
    }

    const BattleLogDisplay = () => {
        if (!battleLog || battleLog.length === 0) {
            return (
                <Box
                    bg={logBg}
                    p={4}
                    borderRadius={8}
                    w="100%"
                    h="100%"
                    minH="200px"
                    maxH="300px"
                    border="2px solid"
                    borderColor={borderColor}
                >
                    <Text fontWeight="bold" mb={2} textAlign="center">{t('battle.battleLog')}</Text>
                    <Text color="gray.500" textAlign="center">{t('gym.waitingBattle')}</Text>
                </Box>
            )
        }

        return (
            <Box
                bg={logBg}
                p={4}
                borderRadius={8}
                w="100%"
                h="100%"
                minH="200px"
                maxH="300px"
                border="2px solid"
                borderColor={borderColor}
                display="flex"
                flexDirection="column"
            >
                <Text fontSize="md" fontWeight="bold" mb={2} textAlign="center">{t('battle.battleLog')}</Text>
                <VStack 
                    align="stretch" 
                    spacing={2} 
                    flex="1" 
                    overflowY="auto" 
                    pr={2}
                    sx={{
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-track': { bg: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { bg: borderColor, borderRadius: '4px' }
                    }}
                >
                    {displayedLogs.map((log, idx) => {
                        const hitColor = 
                            log.hitType === 'crit' ? 'red.400' :
                            log.hitType === 'miss' ? 'gray.400' :
                            log.hitType === 'half' ? 'yellow.400' : 
                            colorMode === 'light' ? 'gray.700' : 'gray.200'

                        return <TextLogDisplay key={idx} log={log} idx={idx} hitColor={hitColor} />
                    })}
                    <div ref={logEndRef} />
                </VStack>
            </Box>
        )
    }

    const TextLogDisplay = ({ log, idx, hitColor }) => {
        const isPlayerAttacking = log.attacker?.id === currentPlayerPokemon?.id;

        return (
            <Box
                key={idx}
                pb={2}
                borderBottom="1px solid"
                borderColor={borderColor}
                textAlign={isPlayerAttacking ? "left" : "right"}
                >
                <Text fontSize="x-small" color={hitColor} fontWeight="600">
                    {isPlayerAttacking
                    ? `${log.attacker?.name} ${t('gym.enemy')}`
                    : `${log.defender?.name} ← ${log.attacker?.name}`}
                </Text>

                <Text
                    fontSize="x-small"
                    color={hitColor}
                    pl={isPlayerAttacking ? 2 : 0}
                    pr={!isPlayerAttacking ? 2 : 0}
                >
                    {log.damage > 0
                        ? (log.hpBefore != null
                            ? `${fmt(log.hpBefore)}-${fmt(log.damage)}=${fmt(log.hpAfter)}`
                            : `${fmt(log.damage)} ${t('gym.dmg')}`)
                        : "MISS"}
                    {log.hitType === "crit" && ` • ${t('gym.crit')}`}
                    {log.hitType === "half" && ` • ${t('gym.resisted')}`}
                </Text>

                {log.fainted && (
                    <Text
                    fontSize="x-small"
                    color="red.500"
                    fontWeight="bold"
                    pl={isPlayerAttacking ? 2 : 0}
                    pr={!isPlayerAttacking ? 2 : 0}
                    >
                    {log.defender?.name} {t('gym.fainted')}
                    </Text>
                )}
            </Box>
        )
    }

    return (
        <VStack w="100%" h="100%" p={4} spacing={4} overflow="hidden">
            {/* Battle Arena - Pokemon Display and Battle Log in same row */}
            <Flex gap={4} align="center" justify="center" flex="1" w="100%">
                {/* Player Side */}
                <Flex direction="column" align="center" gap={3}>
                    
                    {/* Player mini team */}
                    <HStack spacing={2}>
                        {playerTeam?.map((poke, idx) => (
                            <PokemonSlot
                                key={poke?.id || idx}
                                pokemon={poke}
                                isActive={currentPlayerPokemon?.id === poke?.id}
                                isDefeated={poke?.defeated}
                                onClick={() => needsChoice && playbackDone && onChoosePokemon && onChoosePokemon(idx)}
                                isClickable={needsChoice && playbackDone}
                                side="player"
                            />
                        ))}
                    </HStack>

                    {/* Active Player Pokemon */}
                    <ActivePokemonDisplay 
                        pokemon={currentPlayerPokemon} 
                        isPlayer={true} 
                        anim={playerAnim}
                        setAnim={setPlayerAnim}
                        hp={playerHp}
                        maxHp={currentPlayerPokemon?.hp || currentPlayerPokemon?.stats?.hp}
                    />
                </Flex>

                {/* VS Section with Projectile */}
                <Flex align="center" justify="center" position="relative" minW="80px">
                    <Text fontSize="4xl" fontWeight="bold" opacity={0.4}>VS</Text>
                    {projectile && (
                        <Image
                            key={`proj-${projectile.key}`}
                            src={getAttackSprite(projectile.moveType)}
                            alt="attack"
                            position="absolute"
                            w="36px"
                            h="36px"
                            top="50%"
                            left="50%"
                            mt="-18px"
                            ml="-18px"
                            sx={{ imageRendering: 'pixelated' }}
                            pointerEvents="none"
                            zIndex={10}
                            animation={`${projectile.direction === 'right' ? projectileRightAnimation : projectileLeftAnimation} 0.4s ease-out forwards`}
                            onAnimationEnd={() => setProjectile(null)}
                        />
                    )}
                </Flex>

                {/* Leader Side */}
                <Flex direction="column" align="center" gap={3}>
                    
                    {/* Active Leader Pokemon */}
                    <ActivePokemonDisplay 
                        pokemon={currentLeaderPokemon} 
                        isPlayer={false} 
                        anim={leaderAnim}
                        setAnim={setLeaderAnim}
                        hp={leaderHp}
                        maxHp={currentLeaderPokemon?.hp || currentLeaderPokemon?.stats?.hp}
                    />

                    {/* Leader mini team */}
                    <HStack spacing={2}>
                        {leaderTeam?.map((poke, idx) => (
                            <PokemonSlot
                                key={poke?.id || idx}
                                pokemon={poke}
                                isActive={currentLeaderPokemon?.id === poke?.id}
                                isDefeated={poke?.defeated}
                                isHidden={!poke?.revealed}
                                side="leader"
                            />
                        ))}
                    </HStack>
                </Flex>

                {/* Battle Log - Same row */}
                <Flex align="center" w="350px" h="100%" maxH="600px" ml={6}>
                    <BattleLogDisplay />
                </Flex>
            </Flex>

            {/* Action buttons — only show after playback completes */}
            <VStack spacing={2}>
                {needsChoice && playbackDone && (
                    <Box bg="yellow.500" px={4} py={2} borderRadius={8} textAlign="center" w="fit-content">
                        <Text fontSize="sm" fontWeight="bold" color="black" whiteSpace="nowrap">
                            {t('gym.chooseNextTop')}
                        </Text>
                    </Box>
                )}

                {!needsChoice && !hasBattleResult && playbackDone && battleLog?.length > 0 && onNext && (
                    <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={onNext}
                    >
                        {t('gym.nextOpponent')}
                    </Button>
                )}

                {showContinueButton && hasBattleResult && (
                    <Button
                        colorScheme="green"
                        size="lg"
                        onClick={() => {
                            setShowContinueButton(false)
                            if (onBattleLogComplete) {
                                onBattleLogComplete()
                            }
                        }}
                    >
                        {t('gym.continueBtn')}
                    </Button>
                )}
            </VStack>
        </VStack>
    )
}
