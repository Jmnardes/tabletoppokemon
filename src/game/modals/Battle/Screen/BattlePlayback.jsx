import { Box, Center, Flex, Image, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

import { colorByHitType, battleLogMessage } from "@utils/battle";
import { stringToUpperCase } from "@utils";
import { hitAnimation, missAnimation, textAnimation, winAnimation, littleBounceAnimation, slideOutLeft, slideOutRight, slideInLeft, slideInRight } from "@utils/animations";

export default function BattlePlayback({ battleResult, myPlayerId, myTrainerName, opponentTrainerName, onBattleEnd, onPokemonDefeated }) {
    const { fights, winnerId, player1Id } = battleResult
    const iAmPlayer1 = myPlayerId === player1Id

    const [currentFightIndex, setCurrentFightIndex] = useState(0)
    const [currentLogIndex, setCurrentLogIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [myHp, setMyHp] = useState(0)
    const [opponentHp, setOpponentHp] = useState(0)
    const [selfHitAnim, setSelfHitAnim] = useState("")
    const [opponentHitAnim, setOpponentHitAnim] = useState("")
    const [damageTextAnim, setDamageTextAnim] = useState("")
    const [lastLogMessage, setLastLogMessage] = useState("")
    const [fightTransition, setFightTransition] = useState(false)
    const [transitionPhase, setTransitionPhase] = useState(null) // 'slideOut' | 'slideIn' | null
    const [battleFinished, setBattleFinished] = useState(false)
    const timerRef = useRef(null)

    const turnsMs = 800
    const animSecs = 0.5

    const currentFight = fights[currentFightIndex]
    const myPoke = iAmPlayer1 ? currentFight?.player1Pokemon : currentFight?.player2Pokemon
    const oppPoke = iAmPlayer1 ? currentFight?.player2Pokemon : currentFight?.player1Pokemon

    // Start playing when component mounts
    useEffect(() => {
        if (fights.length > 0 && !isPlaying) {
            const fight = fights[0]
            const myFirst = iAmPlayer1 ? fight.player1Pokemon : fight.player2Pokemon
            const oppFirst = iAmPlayer1 ? fight.player2Pokemon : fight.player1Pokemon
            setMyHp(myFirst.startHp)
            setOpponentHp(oppFirst.startHp)
            setIsPlaying(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fights])

    // Main playback loop
    useEffect(() => {
        if (!isPlaying || !currentFight || fightTransition || battleFinished) return

        const log = currentFight.log
        if (currentLogIndex >= log.length) {
            // Notify about defeated pokemon
            onPokemonDefeated?.(currentFight.loserId)

            // Transition to next fight
            if (currentFightIndex < fights.length - 1) {
                setFightTransition(true)
                setTransitionPhase('slideOut')
                timerRef.current = setTimeout(() => {
                    const nextIdx = currentFightIndex + 1
                    const nextFight = fights[nextIdx]
                    setCurrentFightIndex(nextIdx)
                    setCurrentLogIndex(0)
                    const nextMyPoke = iAmPlayer1 ? nextFight.player1Pokemon : nextFight.player2Pokemon
                    const nextOppPoke = iAmPlayer1 ? nextFight.player2Pokemon : nextFight.player1Pokemon
                    setMyHp(nextMyPoke.startHp)
                    setOpponentHp(nextOppPoke.startHp)
                    setTransitionPhase('slideIn')
                    timerRef.current = setTimeout(() => {
                        setFightTransition(false)
                        setTransitionPhase(null)
                    }, 600)
                }, 600)
            } else {
                // All fights done
                setBattleFinished(true)
                onBattleEnd()
            }
            return
        }

        const entry = log[currentLogIndex]

        // Apply damage
        const attackerName = stringToUpperCase(entry.attacker?.name || '')
        if (entry.damage > 0) {
            if (entry.defender.id === myPoke?.id) {
                setMyHp(prev => Math.max(0, prev - entry.damage))
                setSelfHitAnim(`${hitAnimation} ${animSecs}s ease-in-out`)
            } else {
                setOpponentHp(prev => Math.max(0, prev - entry.damage))
                setOpponentHitAnim(`${hitAnimation} ${animSecs}s ease-in-out`)
            }
        } else {
            if (entry.attacker.id === myPoke?.id) {
                setOpponentHitAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            } else {
                setSelfHitAnim(`${missAnimation} ${animSecs}s ease-in-out`)
            }
        }
        setLastLogMessage(battleLogMessage(entry.hitType, attackerName, entry.damage))
        setDamageTextAnim(`${textAnimation} ${animSecs}s ease-in-out`)

        timerRef.current = setTimeout(() => {
            setCurrentLogIndex(prev => prev + 1)
        }, turnsMs)

        return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLogIndex, isPlaying, currentFightIndex, fightTransition, battleFinished])

    if (!currentFight) return null

    const currentLog = currentFight?.log?.[currentLogIndex]

    const PokemonBox = ({ sprite, hp, maxHp, name, isMe }) => (
        <Center flexDir="column" mx={2}>
            <Text mb={1}>{name?.toUpperCase()}</Text>
            <Image
                w={72}
                animation={isMe ? selfHitAnim : opponentHitAnim}
                onAnimationEnd={() => isMe ? setSelfHitAnim('') : setOpponentHitAnim('')}
                src={sprite}
                position="absolute"
                mt={52}
                style={{ animationFillMode: 'forwards', pointerEvents: 'none' }}
            />
            <Box>
                <Progress
                    value={Math.max(0, hp)} max={maxHp}
                    size="lg" w={24}
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

            {currentLog && currentLog.defender.id === (isMe ? myPoke?.id : oppPoke?.id) && (
                <Text
                    position="absolute"
                    fontSize="4xl"
                    mt={48}
                    ml={isMe ? 64 : 0}
                    mr={isMe ? 0 : 64}
                    opacity={0}
                    color={colorByHitType(currentLog.hitType)}
                    animation={damageTextAnim}
                    onAnimationStart={(e) => e.target.style.opacity = 1}
                    onAnimationEnd={(e) => {
                        setDamageTextAnim('')
                        e.target.style.opacity = 0
                    }}
                >
                    {currentLog.damage > 0 ? `-${currentLog.damage}` : "MISS"}
                </Text>
            )}
        </Center>
    )

    if (battleFinished) {
        const iWon = winnerId === myPlayerId
        const winnerSprite = iWon ? myPoke?.sprite : oppPoke?.sprite

        return (
            <Flex flex="1" h="100%" flexDirection="row" overflow="hidden" minH={0}>
                <Center w="100%" flexDir="column">
                    <Image
                        w={48}
                        src={winnerSprite}
                        animation={`${winAnimation} 4s ease-in-out infinite`}
                    />
                    <Text mt={2} fontSize="2xl" animation={`${littleBounceAnimation} 10s ease-in-out infinite`}>
                        {iWon ? 'You won the battle!' : 'You lost the battle...'}
                    </Text>
                </Center>
            </Flex>
        )
    }

    if (fightTransition) {
        const prevFight = fights[currentFightIndex]
        const nextFight = fights[currentFightIndex + 1]
        const prevMyPoke = iAmPlayer1 ? prevFight.player1Pokemon : prevFight.player2Pokemon
        const prevOppPoke = iAmPlayer1 ? prevFight.player2Pokemon : prevFight.player1Pokemon
        const iWonPrevFight = (prevFight.winnerSide === 'player1') === iAmPlayer1
        const nextOppPoke = nextFight ? (iAmPlayer1 ? nextFight.player2Pokemon : nextFight.player1Pokemon) : null
        const nextMyPoke = nextFight ? (iAmPlayer1 ? nextFight.player1Pokemon : nextFight.player2Pokemon) : null

        // Determine which side lost and which pokemon to show
        const showMyPoke = transitionPhase === 'slideOut'
            ? (iWonPrevFight ? prevMyPoke : prevMyPoke)
            : (nextMyPoke || prevMyPoke)
        const showOppPoke = transitionPhase === 'slideOut'
            ? (iWonPrevFight ? prevOppPoke : prevOppPoke)
            : (nextOppPoke || prevOppPoke)

        const mySlideAnim = transitionPhase === 'slideOut' && !iWonPrevFight
            ? `${slideOutLeft} 0.5s ease-in-out forwards`
            : transitionPhase === 'slideIn' && !iWonPrevFight
            ? `${slideInLeft} 0.5s ease-in-out forwards`
            : undefined
        const oppSlideAnim = transitionPhase === 'slideOut' && iWonPrevFight
            ? `${slideOutRight} 0.5s ease-in-out forwards`
            : transitionPhase === 'slideIn' && iWonPrevFight
            ? `${slideInRight} 0.5s ease-in-out forwards`
            : undefined

        return (
            <Flex flex="1" h="100%" flexDirection="column" overflow="hidden" minH={0}>
                <Flex w="100%" justifyContent="space-between" px={4} pt={2}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.300">{myTrainerName}</Text>
                    <Text fontSize="sm" fontWeight="bold" color="red.300">{opponentTrainerName}</Text>
                </Flex>
                <Flex w="100%" h="100%" mx={24} flexDirection="row">
                    <Center w="100%" h="100%">
                        <Image
                            w={72}
                            src={showMyPoke?.backSprite || showMyPoke?.sprite}
                            animation={mySlideAnim}
                            style={{ pointerEvents: 'none' }}
                        />
                    </Center>
                    <Center w="100%" h="100%">
                        <Image
                            w={72}
                            src={showOppPoke?.sprite}
                            animation={oppSlideAnim}
                            style={{ pointerEvents: 'none' }}
                        />
                    </Center>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex flex="1" h="100%" flexDirection="column" overflow="hidden" minH={0}>
            <Flex w="100%" justifyContent="space-between" px={4} pt={2}>
                <Text fontSize="sm" fontWeight="bold" color="blue.300">{myTrainerName}</Text>
                <Text fontSize="sm" fontWeight="bold" color="red.300">{opponentTrainerName}</Text>
            </Flex>
            <Flex w="100%" h="100%" mx={24} flexDirection="row">
                <Center w="100%" h="100%">
                    <PokemonBox
                        sprite={myPoke?.backSprite || myPoke?.sprite}
                        hp={myHp}
                        maxHp={myPoke?.maxHp}
                        name={myPoke?.name}
                        isMe={true}
                    />
                </Center>
                <Center alignItems="start" w="100%" h="100%">
                    <PokemonBox
                        sprite={oppPoke?.sprite}
                        hp={opponentHp}
                        maxHp={oppPoke?.maxHp}
                        name={oppPoke?.name}
                        isMe={false}
                    />
                </Center>
            </Flex>

            {lastLogMessage && (
                <Box
                    bg="blackAlpha.600"
                    borderRadius={8}
                    px={4}
                    py={2}
                    mx={4}
                    mb={2}
                    minH="60px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                        {lastLogMessage}
                    </Text>
                </Box>
            )}
        </Flex>
    )
}
