import { useState, useEffect, useRef } from "react"
import { Flex, Text, Box, Progress, Badge, Center } from "@chakra-ui/react"
import { journeyHitAnimation, missAnimation, winAnimation, littleBounceAnimation, textAnimation } from "@utils/animations"
import { battleLogMessage, colorByHitType } from "@utils/battle"
import { stringToUpperCase } from "@utils"

const hitTypeLabel = (type) => {
    switch (type) {
        case 'crit': return '💥 Critical Hit!'
        case 'hit': return '⚔️ Hit!'
        case 'half': return '🛡️ Resisted...'
        case 'miss': return '💨 Miss!'
        default: return ''
    }
}

const hitTypeColor = (type) => {
    switch (type) {
        case 'crit': return 'green.300'
        case 'hit': return 'white'
        case 'half': return 'yellow.300'
        case 'miss': return 'red.300'
        default: return 'gray.300'
    }
}

export default function JourneyBattle({ fightResult, journeyState, onBattleEnd, setJourneyState }) {
    const [fightIndex, setFightIndex] = useState(0)
    const [logIndex, setLogIndex] = useState(0)
    const [playerHp, setPlayerHp] = useState(0)
    const [wildHp, setWildHp] = useState(0)
    const [playerMaxHp, setPlayerMaxHp] = useState(0)
    const [wildMaxHp, setWildMaxHp] = useState(0)
    const [playerAnim, setPlayerAnim] = useState("")
    const [wildAnim, setWildAnim] = useState("")
    const [lastLogMessage, setLastLogMessage] = useState("")
    const [lastHitType, setLastHitType] = useState("")
    const [damageTextAnim, setDamageTextAnim] = useState("")
    const [battleDone, setBattleDone] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showFinalResult] = useState(false)
    const timerRef = useRef(null)

    const fights = fightResult.fights || []
    const currentFight = fights[fightIndex]
    const playerPoke = currentFight ? (currentFight.playerWon ? currentFight.winner : currentFight.loser) : null
    const wildPoke = currentFight ? (currentFight.playerWon ? currentFight.loser : currentFight.winner) : null

    const turnMs = 1400
    const animSecs = 0.8

    // Initialize HP for current fight
    useEffect(() => {
        if (!currentFight || !currentFight.log || currentFight.log.length === 0) {
            setBattleDone(true)
            setShowResult(true)
            return
        }

        const log = currentFight.log
        const pPoke = currentFight.playerWon ? currentFight.winner : currentFight.loser

        let pHp = 0
        let wHp = 0

        for (const entry of log) {
            if (entry.defender?.id === pPoke.id) {
                pHp += entry.damage
            } else {
                wHp += entry.damage
            }
        }
        pHp += (currentFight.playerWon ? currentFight.winner.currentHp : 0)
        wHp += (currentFight.playerWon ? 0 : currentFight.winner.currentHp)

        setPlayerHp(pHp)
        setWildHp(wHp)
        setPlayerMaxHp(pHp)
        setWildMaxHp(wHp)
        setLogIndex(0)
        setBattleDone(false)
        setShowResult(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fightIndex, fightResult])

    // Playback loop
    useEffect(() => {
        const log = currentFight?.log
        if (battleDone || !log || logIndex >= log.length) {
            if (log && logIndex >= log.length && !battleDone) {
                setBattleDone(true)
                setTimeout(() => setShowResult(true), 500)
            }
            return
        }

        const entry = log[logIndex]
        const pPoke = currentFight.playerWon ? currentFight.winner : currentFight.loser

        // Apply damage and animation immediately
        const attackerName = stringToUpperCase(entry.attacker?.name || '')
        if (entry.defender?.id === pPoke.id) {
            setPlayerHp(prev => Math.max(0, prev - entry.damage))
            if (entry.damage > 0) {
                setPlayerAnim(`${journeyHitAnimation} ${animSecs}s ease-in-out`)
            } else {
                setPlayerAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            }
        } else {
            setWildHp(prev => Math.max(0, prev - entry.damage))
            if (entry.damage > 0) {
                setWildAnim(`${journeyHitAnimation} ${animSecs}s ease-in-out`)
            } else {
                setWildAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            }
        }
        setLastLogMessage(battleLogMessage(entry.hitType, attackerName, entry.damage))
        setLastHitType(entry.hitType)
        setDamageTextAnim(`${textAnimation} 0.6s ease-in-out`)

        // Advance log after the turn delay
        timerRef.current = setTimeout(() => {
            setLogIndex(prev => prev + 1)
        }, turnMs)

        return () => clearTimeout(timerRef.current)
    }, [logIndex, battleDone, currentFight])

    // After showing fight result, advance to next fight or show final result
    useEffect(() => {
        if (!showResult) return

        const timer = setTimeout(() => {
            if (fightIndex < fights.length - 1) {
                // More fights to show
                setFightIndex(prev => prev + 1)
            } else {
                // All fights shown — skip to end
                onBattleEnd(fightResult)
            }
        }, 1500)

        return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showResult])

    // Auto-advance after showing final result
    useEffect(() => {
        if (showFinalResult) {
            const timer = setTimeout(() => {
                onBattleEnd(fightResult)
            }, 2000)
            return () => clearTimeout(timer)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showFinalResult])

    if (!currentFight || !playerPoke || !wildPoke) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>Loading battle...</Text>
            </Flex>
        )
    }

    const currentLog = currentFight?.log?.[logIndex]

    const PokemonBox = ({ poke, hp, maxHp, anim, setAnim, isPlayer }) => {
        const sprite = isPlayer
            ? (poke.sprites?.back || poke.sprites?.front || poke.sprites?.main)
            : (poke.sprites?.front || poke.sprites?.main || poke.sprite)

        const pokeId = isPlayer ? playerPoke?.id : wildPoke?.id
        const isDefender = currentLog && currentLog.defender?.id === pokeId

        return (
            <Center flexDir="column" mx={2} position="relative">
                <Text mb={1} fontWeight="bold">{stringToUpperCase(poke.name)}</Text>
                <Box
                    w={36} h={36}
                    display="flex" alignItems="center" justifyContent="center"
                    animation={anim}
                    onAnimationEnd={() => setAnim('')}
                    position="relative"
                >
                    <img
                        src={sprite}
                        alt={poke.name}
                        style={{
                            width: '144px',
                            height: '144px',
                            imageRendering: 'pixelated',
                        }}
                    />
                    {isDefender && (
                        <Text
                            position="absolute"
                            fontSize="3xl"
                            fontWeight="bold"
                            top={-2}
                            right={isPlayer ? -8 : undefined}
                            left={isPlayer ? undefined : -8}
                            opacity={0}
                            color={colorByHitType(currentLog.hitType)}
                            animation={damageTextAnim}
                            textShadow="0 0 6px rgba(0,0,0,0.8)"
                            onAnimationStart={(e) => e.target.style.opacity = 1}
                            onAnimationEnd={(e) => {
                                setDamageTextAnim('')
                                e.target.style.opacity = 0
                            }}
                        >
                            {currentLog.damage > 0 ? `-${currentLog.damage}` : "MISS"}
                        </Text>
                    )}
                </Box>
                <Box mt={2}>
                    <Progress
                        value={Math.max(0, hp)} max={maxHp}
                        size="lg" w={36}
                        colorScheme={hp / maxHp > 0.5 ? "green" : hp / maxHp > 0.2 ? "yellow" : "red"}
                        borderRadius={4}
                    />
                    <Text
                        position="relative"
                        textAlign="center"
                        w="100%"
                        bottom={3.5}
                        fontSize="x-small"
                    >
                        {Math.max(0, hp)}/{maxHp}
                    </Text>
                </Box>
            </Center>
        )
    }

    // Show final result with winner animation
    if (showFinalResult) {
        const winnerSprite = fightResult.playerWon
            ? (playerPoke.sprites?.front || playerPoke.sprites?.main)
            : (wildPoke.sprites?.front || wildPoke.sprites?.main || wildPoke.sprite)

        return (
            <Flex flex="1" direction="column" align="center" justify="center" w="100%">
                <img
                    src={winnerSprite}
                    alt="winner"
                    style={{
                        width: '192px',
                        imageRendering: 'pixelated',
                        animation: `${winAnimation} 4s ease-in-out infinite`,
                    }}
                />
                <Text mt={2} fontSize="2xl" animation={`${littleBounceAnimation} 10s ease-in-out infinite`}>
                    {fightResult.playerWon ? '🎉 Wild Pokémon Defeated!' : '💀 All Pokémon Defeated!'}
                </Text>
            </Flex>
        )
    }

    // Show fight transition
    if (showResult && !showFinalResult) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center" w="100%">
                <Badge
                    colorScheme={currentFight.playerWon ? 'green' : 'red'}
                    fontSize="lg"
                    p={3}
                    borderRadius={8}
                >
                    {currentFight.playerWon ? '🎉 Victory!' : '💀 Defeated!'}
                </Badge>
                <Text fontSize="sm" mt={2} color="gray.400">
                    {currentFight.playerWon
                        ? `${stringToUpperCase(playerPoke.name)} wins! (+1 EXP)`
                        : `${stringToUpperCase(playerPoke.name)} was defeated${fightIndex < fights.length - 1 ? ' — next pokemon incoming!' : ''}`
                    }
                </Text>
                {currentFight.playerWon && currentFight.leveledUp && (
                    <Badge colorScheme="yellow" fontSize="md" p={2} borderRadius={8} mt={2}>
                        ⬆️ {stringToUpperCase(playerPoke.name)} leveled up to Lv.{currentFight.newLevel}!
                    </Badge>
                )}
            </Flex>
        )
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center" w="100%" maxW="600px">
            <Text fontSize="lg" mb={2}>Battle!</Text>

            {fights.length > 1 && (
                <Text fontSize="2xs" color="gray.400" mb={2}>
                    Fight {fightIndex + 1} / {fights.length}
                </Text>
            )}

            {/* Battle arena — PvP style side-by-side */}
            <Flex w="100%" h="100%" mx={8} flexDirection="row" align="center" justify="center">
                <Center w="100%" h="100%">
                    <PokemonBox
                        poke={playerPoke}
                        hp={playerHp}
                        maxHp={playerMaxHp}
                        anim={playerAnim}
                        setAnim={setPlayerAnim}
                        isPlayer={true}
                    />
                </Center>
                <Center w="100%" h="100%">
                    <PokemonBox
                        poke={wildPoke}
                        hp={wildHp}
                        maxHp={wildMaxHp}
                        anim={wildAnim}
                        setAnim={setWildAnim}
                        isPlayer={false}
                    />
                </Center>
            </Flex>

            {lastLogMessage && (
                <Box
                    bg="blackAlpha.600"
                    borderRadius={8}
                    px={4}
                    py={2}
                    mt={1}
                    mx={4}
                    w="90%"
                    h="100px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text fontSize="xs" fontWeight="bold" color={hitTypeColor(lastHitType)} textTransform="uppercase" mb={1}>
                        {hitTypeLabel(lastHitType)}
                    </Text>
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                        {lastLogMessage}
                    </Text>
                </Box>
            )}
        </Flex>
    )
}
