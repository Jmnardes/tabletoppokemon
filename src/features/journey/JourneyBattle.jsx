import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Box, Image, Progress, Badge, Center, Button, VStack } from "@chakra-ui/react"
import { journeyHitAnimation, journeyCritHitAnimation, journeyDefAnimation, missAnimation, winAnimation, littleBounceAnimation, textAnimation, lungeRightAnimation, lungeLeftAnimation, projectileRightAnimation, projectileLeftAnimation, shinySparkleAnimation } from "@utils/animations"
import { colorByHitType } from "@utils/battle"
import { stringToUpperCase, fmt } from "@utils"
import { getAttackSprite } from "@utils/attackSprites"
import i18n from "../../i18n/i18n"

const THREAT_LABELS = [
    { key: 'threatCalm', color: 'green' },
    { key: 'threatAlert', color: 'yellow' },
    { key: 'threatAnnoyed', color: 'yellow' },
    { key: 'threatHeated', color: 'red' },
    { key: 'threatEnraged', color: 'red' },
    { key: 'threatAggro', color: 'gray' },
]

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

const SHINY_SPARKLE_POSITIONS = [
    { top: '8px', right: '6px', delay: '0s' },
    { top: '40%', left: '2px', delay: '0.8s' },
    { bottom: '12px', right: '14px', delay: '1.6s' },
]

const PokemonBox = ({ poke, hp, maxHp, anim, setAnim, isPlayer, pokeId, lastDamage, setLastDamage, shiny }) => {
    const sprite = isPlayer
        ? (poke.sprites?.back || poke.sprites?.front || poke.sprites?.main)
        : (poke.sprites?.front || poke.sprites?.main || poke.sprite)

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
                        filter: shiny ? 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.5))' : undefined,
                    }}
                />
                {shiny && SHINY_SPARKLE_POSITIONS.map((pos, i) => (
                    <Text
                        key={`sparkle-${i}`}
                        position="absolute"
                        fontSize="xs"
                        color="gold"
                        style={pos}
                        animation={`${shinySparkleAnimation} 2.5s ease-in-out ${pos.delay} infinite`}
                        pointerEvents="none"
                        zIndex={2}
                    >
                        ✦
                    </Text>
                ))}
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
                        onAnimationEnd={() => setLastDamage(null)}
                    >
                        {lastDamage.damage > 0 ? `${fmt(lastDamage.damage)}` : "MISS"}
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
                    {fmt(Math.max(0, hp))}/{fmt(maxHp)}
                </Text>
            </Box>
        </Center>
    )
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
    const [projectile, setProjectile] = useState(null) // { moveType, direction, key }
    const [battleDone, setBattleDone] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showFinalResult] = useState(false)
    const [logMessages, setLogMessages] = useState([])
    const logEndRef = useRef(null)
    const animating = useRef(false)

    const fights = fightResult.fights || []
    const currentFight = fights[fightIndex]
    const playerPoke = currentFight ? (currentFight.playerWon ? currentFight.winner : currentFight.loser) : null
    const wildPoke = currentFight ? (currentFight.playerWon ? currentFight.loser : currentFight.winner) : null

    const animSecs = 0.8

    const getDefenderAnim = (hitType) => {
        switch (hitType) {
            case 'crit': return `${journeyCritHitAnimation} ${animSecs}s ease-in-out`
            case 'half': return `${journeyDefAnimation} ${animSecs}s ease-in-out`
            case 'miss': return `${missAnimation} ${animSecs}s ease-in-out`
            default: return `${journeyHitAnimation} ${animSecs}s ease-in-out`
        }
    }

    // Initialize HP for current fight
    useEffect(() => {
        if (!currentFight || !currentFight.log || currentFight.log.length === 0) {
            setBattleDone(true)
            setShowResult(true)
            return
        }

        const log = currentFight.log
        const pPoke = currentFight.playerWon ? currentFight.winner : currentFight.loser
        const wPoke = currentFight.playerWon ? currentFight.loser : currentFight.winner

        // Use hpBefore from the first log entry where each pokemon is the defender
        // to get the exact starting HP. This avoids overkill damage inflating the
        // reconstructed HP above maxHp (e.g. showing 17/12).
        const firstPlayerHit = log.find(e => e.defender?.id === pPoke.id)
        const firstWildHit = log.find(e => e.defender?.id === wPoke.id)

        const pHp = firstPlayerHit?.hpBefore ?? pPoke.maxHp
        const wHp = firstWildHit?.hpBefore ?? wPoke.maxHp

        setPlayerHp(pHp)
        setWildHp(wHp)
        setPlayerMaxHp(pPoke.maxHp || pHp)
        setWildMaxHp(wPoke.maxHp || wHp)
        setLogIndex(0)
        setBattleDone(false)
        setShowResult(false)
        setLogMessages([])
        animating.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fightIndex, fightResult])

    // Show result after battle ends
    useEffect(() => {
        if (!battleDone) return
        const timer = setTimeout(() => setShowResult(true), 500)
        return () => clearTimeout(timer)
    }, [battleDone])

    // Playback loop — sequenced: lunge → projectile → impact → advance
    useEffect(() => {
        const timers = []

        const log = currentFight?.log
        if (battleDone || !log || logIndex >= log.length) {
            if (log && logIndex >= log.length && !battleDone) {
                setBattleDone(true)
            }
            return
        }

        // Prevent double-fire from React strict mode or re-renders
        if (animating.current) return
        animating.current = true

        const entry = log[logIndex]
        const pPoke = currentFight.playerWon ? currentFight.winner : currentFight.loser
        const attackerName = stringToUpperCase(entry.attacker?.name || '')
        const isPlayerDefender = entry.defender?.id === pPoke.id
        const isMiss = entry.hitType === 'miss'

        // Accumulate log messages immediately
        const isPlayerAttacker = entry.attacker?.id === pPoke.id
        const tag = hitTypeTag(entry.hitType)
        const icon = hitTypeIcon(entry.hitType)
        const hpInfo = !isMiss && entry.hpBefore != null
            ? `${fmt(entry.hpBefore)}-${fmt(entry.damage)}=${fmt(entry.hpAfter)}`
            : (!isMiss ? `(${fmt(entry.damage)})` : '')
        const compactMsg = isPlayerAttacker
            ? `${icon} ${attackerName} → ${tag}${!isMiss ? ` ${hpInfo}` : ''}`
            : `${!isMiss ? `${hpInfo} ` : ''}${tag} ← ${icon} ${attackerName}`

        setLastLogMessage(compactMsg)
        setLastHitType(entry.hitType)
        setLogMessages(prev => [...prev, {
            message: compactMsg,
            hitType: entry.hitType,
            isPlayer: isPlayerAttacker,
        }])

        // Phase 1: Attacker lunge (in timeout so cleanup can cancel)
        timers.push(setTimeout(() => {
            if (isPlayerDefender) {
                setWildAnim(`${lungeLeftAnimation} 0.25s ease-out`)
            } else {
                setPlayerAnim(`${lungeRightAnimation} 0.25s ease-out`)
            }

            // Phase 2: Fire projectile after lunge
            timers.push(setTimeout(() => {
                setProjectile({
                    moveType: entry.attacker?.moveType,
                    direction: isPlayerDefender ? 'left' : 'right',
                    key: logIndex,
                })

                // Phase 3: Impact after projectile arrives
                const impactDelay = 380
                timers.push(setTimeout(() => {
                    // Apply HP
                    if (isPlayerDefender) {
                        setPlayerHp(prev => Math.max(0, prev - entry.damage))
                    } else {
                        setWildHp(prev => Math.max(0, prev - entry.damage))
                    }

                    // Defender animation based on hit type
                    if (isPlayerDefender) {
                        setPlayerAnim(getDefenderAnim(entry.hitType))
                    } else {
                        setWildAnim(getDefenderAnim(entry.hitType))
                    }

                    // Show damage text
                    setLastDamage({ damage: entry.damage, hitType: entry.hitType, defenderId: entry.defender?.id, index: logIndex })

                    // Phase 4: Advance after damage display
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
                <Flex w="100%" h="100%" mx={8} flexDirection="row" align="center" justify="center" position="relative">
                    <Center w="100%" h="100%">
                        <PokemonBox
                            poke={playerPoke}
                            hp={playerHp}
                            maxHp={playerMaxHp}
                            anim={playerAnim}
                            setAnim={setPlayerAnim}
                            isPlayer={true}
                            pokeId={playerPoke?.id}
                            lastDamage={lastDamage}
                            setLastDamage={setLastDamage}
                        />
                    </Center>
                    {/* Attack projectile */}
                    {projectile && (
                        <Image
                            key={`proj-${projectile.key}`}
                            src={getAttackSprite(projectile.moveType)}
                            alt="attack"
                            position="absolute"
                            w="40px"
                            h="40px"
                            left={projectile.direction === 'right' ? '30%' : '70%'}
                            top="50%"
                            mt="-20px"
                            sx={{ imageRendering: 'pixelated' }}
                            pointerEvents="none"
                            zIndex={10}
                            animation={`${projectile.direction === 'right' ? projectileRightAnimation : projectileLeftAnimation} 0.4s ease-out forwards`}
                            onAnimationEnd={() => setProjectile(null)}
                        />
                    )}
                    <Center w="100%" h="100%">
                        <PokemonBox
                            poke={wildPoke}
                            hp={wildHp}
                            maxHp={wildMaxHp}
                            anim={wildAnim}
                            setAnim={setWildAnim}
                            isPlayer={false}
                            pokeId={wildPoke?.id}
                            lastDamage={lastDamage}
                            setLastDamage={setLastDamage}
                            shiny={wildPoke?.shiny}
                        />
                    </Center>
                </Flex>

                {/* Result overlay — shown in place of the hit message when fight ends */}
                {showResult ? (
                    <Box
                        bg="blackAlpha.600"
                        borderRadius={8}
                        px={4}
                        py={5}
                        mt={1}
                        mx={4}
                        w="90%"
                        minH="200px"
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
                                ? t('battle.victoryDesc', { name: stringToUpperCase(playerPoke.name), exp: currentFight.expGain ?? 1 })
                                : t('battle.defeatedDesc', { name: stringToUpperCase(playerPoke.name), next: fightIndex < fights.length - 1 ? t('battle.nextIncoming') : '' })
                            }
                        </Text>
                        {/* Show EXP for assisters (pokemon that fought but didn't defeat) */}
                        {currentFight.playerWon && fightResult.expPreview?.filter(e => !e.defeater).map(e => (
                            <Text key={e.id} fontSize="xs" color="yellow.300" mt={1}>
                                {stringToUpperCase(e.name)} (+{e.exp} EXP)
                            </Text>
                        ))}
                        {currentFight.playerWon && currentFight.leveledUp && (
                            <Badge colorScheme="yellow" fontSize="sm" p={1} borderRadius={6} mt={1}>
                                {t('battle.leveledUp', { name: stringToUpperCase(playerPoke.name), level: currentFight.newLevel })}
                            </Badge>
                        )}
                        {currentFight.playerWon && fightResult.threat > 0 && fightIndex === fights.length - 1 && (
                            <Text fontSize="xs" color="orange.300" mt={2}>
                                {t('journey.threatTitle')}: {t(`journey.${THREAT_LABELS[fightResult.threat - 1]?.key || 'threatCalm'}`)} → {t(`journey.${THREAT_LABELS[fightResult.threat]?.key || 'threatAggro'}`)}
                            </Text>
                        )}
                        <Button
                            colorScheme={currentFight.playerWon ? 'green' : 'blue'}
                            size="lg"
                            mt={4}
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
