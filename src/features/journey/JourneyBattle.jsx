import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Box, Progress, Badge, Center, Button, VStack } from "@chakra-ui/react"
import { journeyHitAnimation, missAnimation, winAnimation, littleBounceAnimation, textAnimation, lungeRightAnimation, lungeLeftAnimation } from "@utils/animations"
import { colorByHitType } from "@utils/battle"
import { stringToUpperCase } from "@utils"
import i18n from "../../i18n/i18n"

const hitTypeTag = (type) => {
    switch (type) {
        case 'crit': return i18n.t('battle.crit')
        case 'hit': return i18n.t('battle.hit')
        case 'half': return i18n.t('battle.half')
        case 'miss': return i18n.t('battle.miss')
        default: return '...'
    }
}

const hitTypeIcon = (type) => {
    switch (type) {
        case 'crit': return '💥'
        case 'hit': return '⚔️'
        case 'half': return '🛡️'
        case 'miss': return '💨'
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
    const { t } = useTranslation()
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
    const [lastDamage, setLastDamage] = useState(null) // { damage, hitType, defenderId, index }
    const [battleDone, setBattleDone] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showFinalResult] = useState(false)
    const [logMessages, setLogMessages] = useState([])
    const timerRef = useRef(null)
    const logEndRef = useRef(null)

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
        setLogMessages([])
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
        const isPlayerDefender = entry.defender?.id === pPoke.id
        if (isPlayerDefender) {
            setPlayerHp(prev => Math.max(0, prev - entry.damage))
            if (entry.damage > 0) {
                setPlayerAnim(`${journeyHitAnimation} ${animSecs}s ease-in-out`)
            } else {
                setPlayerAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            }
            // Attacker lunge animation (wild lunges left toward player)
            setWildAnim(`${lungeLeftAnimation} ${animSecs * 0.6}s ease-out`)
        } else {
            setWildHp(prev => Math.max(0, prev - entry.damage))
            if (entry.damage > 0) {
                setWildAnim(`${journeyHitAnimation} ${animSecs}s ease-in-out`)
            } else {
                setWildAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            }
            // Attacker lunge animation (player lunges right toward wild)
            setPlayerAnim(`${lungeRightAnimation} ${animSecs * 0.6}s ease-out`)
        }
        // Accumulate log messages
        const isPlayerAttacker = entry.attacker?.id === pPoke.id
        const tag = hitTypeTag(entry.hitType)
        const icon = hitTypeIcon(entry.hitType)
        const compactMsg = isPlayerAttacker
            ? `${icon} ${attackerName} → ${tag}${entry.hitType !== 'miss' ? ` (${entry.damage})` : ''}`
            : `${entry.hitType !== 'miss' ? `(${entry.damage}) ` : ''}${tag} ← ${icon} ${attackerName}`

        setLastLogMessage(compactMsg)
        setLastHitType(entry.hitType)
        setLastDamage({ damage: entry.damage, hitType: entry.hitType, defenderId: entry.defender?.id, index: logIndex })

        setLogMessages(prev => [...prev, {
            message: compactMsg,
            hitType: entry.hitType,
            isPlayer: isPlayerAttacker,
        }])

        // Advance log after the turn delay
        timerRef.current = setTimeout(() => {
            setLogIndex(prev => prev + 1)
        }, turnMs)

        return () => clearTimeout(timerRef.current)
    }, [logIndex, battleDone, currentFight])

    // After showing fight result, wait for user to click Continue
    // (no auto-advance)

    // Final result waits for user to click Continue
    // (no auto-advance)

    // Auto-scroll log to bottom
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [logMessages])

    if (!currentFight || !playerPoke || !wildPoke) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>{t('journey.loadingBattle')}</Text>
            </Flex>
        )
    }

    const PokemonBox = ({ poke, hp, maxHp, anim, setAnim, isPlayer }) => {
        const sprite = isPlayer
            ? (poke.sprites?.back || poke.sprites?.front || poke.sprites?.main)
            : (poke.sprites?.front || poke.sprites?.main || poke.sprite)

        if (isPlayer) {
            console.log('[JourneyBattle] Player sprites:', JSON.stringify(poke.sprites), '| Using:', sprite)
        }

        const pokeId = isPlayer ? playerPoke?.id : wildPoke?.id
        const showDamage = lastDamage && lastDamage.defenderId === pokeId
        const spriteSize = isPlayer ? '160px' : '120px'

        return (
            <Center
                flexDir="column"
                mx={2}
                position="relative"
                mt={isPlayer ? 16 : 0}
                mb={isPlayer ? 0 : 16}
            >
                <Text mb={1} fontWeight="bold" fontSize={isPlayer ? 'md' : 'sm'}>{stringToUpperCase(poke.name)}</Text>
                <Box
                    w={isPlayer ? 40 : 32}
                    h={isPlayer ? 40 : 32}
                    display="flex" alignItems="center" justifyContent="center"
                    animation={anim}
                    onAnimationEnd={() => setAnim('')}
                    position="relative"
                >
                    <img
                        src={sprite}
                        alt={poke.name}
                        style={{
                            width: spriteSize,
                            height: spriteSize,
                            imageRendering: 'pixelated',
                        }}
                    />
                    {showDamage && (
                        <Text
                            key={`dmg-${lastDamage.index}`}
                            position="absolute"
                            fontSize="3xl"
                            fontWeight="bold"
                            top={-2}
                            right={isPlayer ? -8 : undefined}
                            left={isPlayer ? undefined : -8}
                            color={colorByHitType(lastDamage.hitType)}
                            animation={`${textAnimation} 0.6s ease-in-out forwards`}
                            textShadow="0 0 6px rgba(0,0,0,0.8)"
                        >
                            {lastDamage.damage > 0 ? `-${lastDamage.damage}` : "MISS"}
                        </Text>
                    )}
                </Box>
                <Box mt={2}>
                    <Progress
                        value={Math.max(0, hp)} max={maxHp}
                        size="lg" w={isPlayer ? 40 : 32}
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
                    {fightResult.playerWon ? t('journey.wildDefeated') : t('journey.allDefeated')}
                </Text>
                <Button
                    colorScheme={fightResult.playerWon ? 'green' : 'blue'}
                    size="lg"
                    mt={4}
                    onClick={() => onBattleEnd(fightResult)}
                >
                    {t('common.continue')}
                </Button>
            </Flex>
        )
    }

    return (
        <Flex flex="1" direction="row" w="100%" maxW="900px" gap={4}>
            {/* Battle arena — left side */}
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text fontSize="lg" mb={2}>{t('journey.battleBtn')}</Text>

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

                {/* Result overlay — shown in place of the hit message when fight ends */}
                {showResult ? (
                    <Box
                        bg="blackAlpha.600"
                        borderRadius={8}
                        px={4}
                        py={3}
                        mt={1}
                        mx={4}
                        w="90%"
                        minH="100px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Badge
                            colorScheme={currentFight.playerWon ? 'green' : 'red'}
                            fontSize="md"
                            p={2}
                            borderRadius={8}
                            mb={2}
                        >
                            {currentFight.playerWon ? t('battle.victory') : t('battle.defeated')}
                        </Badge>
                        <Text fontSize="xs" color="gray.400">
                            {currentFight.playerWon
                                ? t('battle.victoryDesc', { name: stringToUpperCase(playerPoke.name) })
                                : t('battle.defeatedDesc', { name: stringToUpperCase(playerPoke.name), next: fightIndex < fights.length - 1 ? t('battle.nextIncoming') : '' })
                            }
                        </Text>
                        {currentFight.playerWon && currentFight.leveledUp && (
                            <Badge colorScheme="yellow" fontSize="sm" p={1} borderRadius={6} mt={1}>
                                {t('battle.leveledUp', { name: stringToUpperCase(playerPoke.name), level: currentFight.newLevel })}
                            </Badge>
                        )}
                        <Button
                            colorScheme={currentFight.playerWon ? 'green' : 'blue'}
                            size="sm"
                            mt={3}
                            onClick={() => {
                                if (fightIndex < fights.length - 1) {
                                    setFightIndex(prev => prev + 1)
                                } else {
                                    onBattleEnd(fightResult)
                                }
                            }}
                        >
                            {t('common.continue')}
                        </Button>
                    </Box>
                ) : lastLogMessage ? (
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
                            {hitTypeIcon(lastHitType)} {hitTypeTag(lastHitType)}
                        </Text>
                        <Text fontSize="sm" color="gray.300" textAlign="center">
                            {lastLogMessage}
                        </Text>
                    </Box>
                ) : null}
            </Flex>

            {/* Battle log — right side */}
            <Box
                w="300px"
                minW="280px"
                bg="blackAlpha.400"
                borderRadius={8}
                p={3}
                display="flex"
                flexDirection="column"
            >
                <Text fontSize="xs" fontWeight="bold" mb={2} textAlign="center">{t('battle.battleLog')}</Text>
                <VStack
                    spacing={1}
                    align="stretch"
                    flex="1"
                    overflowY="auto"
                    maxH="400px"
                    css={{
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-thumb': { background: '#555', borderRadius: '4px' },
                    }}
                >
                    {logMessages.map((log, idx) => (
                        <Box
                            key={idx}
                            bg={log.isPlayer ? 'blue.900' : 'red.900'}
                            borderRadius={4}
                            px={2}
                            py={1}
                            opacity={idx === logMessages.length - 1 ? 1 : 0.7}
                            textAlign={log.isPlayer ? 'left' : 'right'}
                        >
                            <Text fontSize="2xs" color="white">
                                {log.message}
                            </Text>
                        </Box>
                    ))}
                    <div ref={logEndRef} />
                </VStack>
            </Box>
        </Flex>
    )
}
