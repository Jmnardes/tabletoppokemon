import { useState, useEffect } from "react"
import { VStack, HStack, Flex, Text, Progress, Image, Badge, Box, Button, useColorMode } from "@chakra-ui/react"
import Element from "@components/Elements/Element"
import { hitAnimation, missAnimation, textAnimation } from "@utils/animations"
import { colorByHitType } from "@utils/battle"

export default function GymBattleScreen({ playerTeam, leaderTeam, battleLog, currentPlayerPokemon, currentLeaderPokemon, onSkipLogs, onBattleLogComplete, hasBattleResult }) {
    const { colorMode } = useColorMode()
    const [animatingLog, setAnimatingLog] = useState([])
    const [currentLogIndex, setCurrentLogIndex] = useState(0)
    const [playerHp, setPlayerHp] = useState(0)
    const [leaderHp, setLeaderHp] = useState(0)
    const [playerHitAnimation, setPlayerHitAnimation] = useState("")
    const [leaderHitAnimation, setLeaderHitAnimation] = useState("")
    const [playerDamageText, setPlayerDamageText] = useState("")
    const [leaderDamageText, setLeaderDamageText] = useState("")
    const [damageTextAnimation, setDamageTextAnimation] = useState("")
    const [showContinueButton, setShowContinueButton] = useState(false)
    const animationInSecondsDuration = 0.5

    const defeatedBg = colorMode === 'light' ? "red.200" : "red.900"
    const activeBg = colorMode === 'light' ? "blue.500" : "blue.600"
    const slotBg = colorMode === 'light' ? "gray.100" : "gray.700"
    const cardBg = colorMode === 'light' ? "gray.100" : "gray.800"
    const borderColor = colorMode === 'light' ? "gray.200" : "gray.600"

    // Initialize HP when pokemon change
    useEffect(() => {
        if (currentPlayerPokemon) {
            const maxHp = currentPlayerPokemon.hp || currentPlayerPokemon.stats?.hp || 1
            const currentHp = currentPlayerPokemon.currentHp !== undefined ? currentPlayerPokemon.currentHp : maxHp
            setPlayerHp(currentHp)
        }
        if (currentLeaderPokemon) {
            const maxHp = currentLeaderPokemon.hp || currentLeaderPokemon.stats?.hp || 1
            const currentHp = currentLeaderPokemon.currentHp !== undefined ? currentLeaderPokemon.currentHp : maxHp
            setLeaderHp(currentHp)
        }
    }, [currentPlayerPokemon, currentLeaderPokemon])

    // Animar battle log com animações de hit e damage
    useEffect(() => {
        if (battleLog && battleLog.length > 0 && currentLogIndex < battleLog.length) {
            const timer = setTimeout(() => {
                const currentLog = battleLog[currentLogIndex]
                
                // Aplicar animações e dano
                if (currentLog.damage > 0) {
                    // Reduzir HP
                    if (currentLog.defender?.id === currentPlayerPokemon?.id) {
                        setPlayerHp(prev => Math.max(0, prev - currentLog.damage))
                        setPlayerHitAnimation(`${hitAnimation} ${animationInSecondsDuration}s ease-in-out`)
                        setPlayerDamageText(`-${currentLog.damage}`)
                    } else {
                        setLeaderHp(prev => Math.max(0, prev - currentLog.damage))
                        setLeaderHitAnimation(`${hitAnimation} ${animationInSecondsDuration}s ease-in-out`)
                        setLeaderDamageText(`-${currentLog.damage}`)
                    }
                    setDamageTextAnimation(`${textAnimation} ${animationInSecondsDuration}s ease-in-out`)
                } else {
                    // Miss animation
                    if (currentLog.defender?.id === currentPlayerPokemon?.id) {
                        setPlayerHitAnimation(`${missAnimation} ${animationInSecondsDuration}s ease-in-out`)
                        setPlayerDamageText("MISS")
                    } else {
                        setLeaderHitAnimation(`${missAnimation} ${animationInSecondsDuration}s ease-in-out`)
                        setLeaderDamageText("MISS")
                    }
                    setDamageTextAnimation(`${textAnimation} ${animationInSecondsDuration}s ease-in-out`)
                }
                
                setAnimatingLog(prev => [...prev, currentLog])
                setCurrentLogIndex(prev => prev + 1)
            }, 800) // Delay entre cada log

            return () => clearTimeout(timer)
        } else if (battleLog && battleLog.length > 0 && currentLogIndex >= battleLog.length) {
            // Animação completada
            if (hasBattleResult) {
                // Se há resultado final, mostrar botão Continue
                const showButtonTimer = setTimeout(() => {
                    setShowContinueButton(true)
                }, 1500)
                return () => clearTimeout(showButtonTimer)
            }
        }
    }, [battleLog, currentLogIndex, currentPlayerPokemon, currentLeaderPokemon, animationInSecondsDuration, hasBattleResult])

    // Reset ao receber novo battle log
    useEffect(() => {
        setAnimatingLog([])
        setCurrentLogIndex(0)
        setShowContinueButton(false)
    }, [battleLog])

    const PokemonSlot = ({ pokemon, isActive, isDefeated, isHidden = false }) => {
        if (!pokemon && isHidden) {
            return (
                <Flex
                    bg={slotBg}
                    p={2}
                    borderRadius={8}
                    w="80px"
                    h="80px"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid"
                    borderColor={borderColor}
                >
                    <Text fontSize="2xl" fontWeight="bold">?</Text>
                </Flex>
            )
        }

        if (!pokemon) return null

        return (
            <Flex
                bg={isDefeated ? defeatedBg : (isActive ? activeBg : slotBg)}
                p={2}
                borderRadius={8}
                flexDirection="column"
                alignItems="center"
                opacity={isDefeated ? 0.4 : (isActive ? 1 : 0.6)}
                position="relative"
                w="80px"
                border="2px solid"
                borderColor={isActive ? "blue.400" : borderColor}
            >
                <Image
                    src={pokemon.sprites?.mini || pokemon.sprites?.front}
                    w="48px"
                    h="48px"
                    filter={isDefeated ? "grayscale(100%)" : "none"}
                />
                {isDefeated && (
                    <Text position="absolute" fontSize="4xl" fontWeight="bold" color="red.500">
                        ✕
                    </Text>
                )}
            </Flex>
        )
    }

    const ActivePokemonDisplay = ({ pokemon, isPlayer }) => {
        if (!pokemon) return null

        const displayHp = isPlayer ? playerHp : leaderHp
        const maxHp = pokemon.hp || pokemon.stats?.hp || 1
        const hpPercentage = maxHp > 0 ? (displayHp / maxHp) * 100 : 0
        const currentAnimation = isPlayer ? playerHitAnimation : leaderHitAnimation
        const damageText = isPlayer ? playerDamageText : leaderDamageText

        return (
            <VStack spacing={2} position="relative">
                <Text fontSize="md" fontWeight="bold" textTransform="uppercase">
                    {pokemon.name}
                </Text>
                
                {/* Damage Text */}
                {damageText && animatingLog.length > 0 && (
                    <Text
                        position="absolute"
                        fontSize="4xl"
                        fontWeight="bold"
                        top="120px"
                        zIndex={10}
                        opacity={0}
                        color={damageText === "MISS" ? "gray.400" : colorByHitType(animatingLog[animatingLog.length - 1]?.hitType)}
                        animation={damageTextAnimation}
                        onAnimationStart={(e) => e.target.style.opacity = 1}
                        onAnimationEnd={(e) => {
                            setDamageTextAnimation('')
                            e.target.style.opacity = 0
                            if (isPlayer) {
                                setPlayerDamageText('')
                            } else {
                                setLeaderDamageText('')
                            }
                        }}
                    >
                        {damageText}
                    </Text>
                )}
                
                <Image
                    src={isPlayer ? pokemon.sprites?.back : pokemon.sprites?.front}
                    w="180px"
                    h="180px"
                    objectFit="contain"
                    animation={currentAnimation}
                    onAnimationEnd={() => {
                        if (isPlayer) {
                            setPlayerHitAnimation('')
                        } else {
                            setLeaderHitAnimation('')
                        }
                    }}
                    style={{
                        animationFillMode: 'forwards',
                        pointerEvents: 'none',
                    }}
                />

                <VStack spacing={1} w="120px">
                    <HStack justify="space-between" w="full">
                        <Badge colorScheme="blue" fontSize="xs">Lv {pokemon.level}</Badge>
                        <HStack spacing={1}>
                            {pokemon.types?.slice(0, 2).map((type, idx) => (
                                <Element key={idx} element={type} size={14} />
                            ))}
                        </HStack>
                    </HStack>
                    
                    <Progress
                        value={Math.max(0, hpPercentage)}
                        colorScheme={hpPercentage > 50 ? "green" : hpPercentage > 25 ? "yellow" : "red"}
                        size="lg"
                        w="full"
                        borderRadius={4}
                        transition="all 0.3s ease-in-out"
                    />
                    <Text fontSize="xs" textAlign="center" mt={-1}>
                        {Math.max(0, Math.floor(displayHp))} / {maxHp} HP
                    </Text>
                </VStack>
            </VStack>
        )
    }

    const BattleLogDisplay = () => {
        return (
            <Box
                bg={cardBg}
                p={3}
                borderRadius={8}
                w="100%"
                maxH="150px"
                overflowY="auto"
                border="2px solid"
                borderColor={borderColor}
            >
                <Text fontSize="sm" fontWeight="bold" mb={2}>Battle Log:</Text>
                <VStack align="stretch" spacing={1}>
                    {animatingLog.map((log, idx) => {
                        const hitColor = 
                            log.hitType === 'crit' ? 'red.400' :
                            log.hitType === 'miss' ? 'gray.400' :
                            log.hitType === 'half' ? 'yellow.400' : 'white'

                        return (
                            <Text key={idx} fontSize="xs" color={hitColor}>
                                {log.attacker?.name} → {log.defender?.name}: {log.damage} dmg
                                {log.hitType === 'crit' && ' CRIT!'}
                                {log.hitType === 'miss' && ' MISS!'}
                                {log.fainted && ` (${log.defender?.name} fainted!)`}
                            </Text>
                        )
                    })}
                </VStack>
            </Box>
        )
    }

    return (
        <VStack spacing={4} p={4} w="100%">

            {/* Player Pokemon Slots */}
            <HStack spacing={2}>
                <Text fontSize="sm" fontWeight="bold">Your Team:</Text>
                {playerTeam.map((pokemon, idx) => (
                    <PokemonSlot
                        key={idx}
                        pokemon={pokemon}
                        isActive={currentPlayerPokemon?.id === pokemon?.id}
                        isDefeated={pokemon?.defeated}
                    />
                ))}
            </HStack>

            {/* Battle Arena - More spacious */}
            <Flex w="100%" justify="space-around" align="center" minH="280px" position="relative">
                <ActivePokemonDisplay pokemon={currentPlayerPokemon} isPlayer={true} />
                <VStack position="absolute" spacing={0}>
                    <Text fontSize="4xl" fontWeight="bold" opacity={0.3}>VS</Text>
                </VStack>
                <ActivePokemonDisplay pokemon={currentLeaderPokemon} isPlayer={false} />
            </Flex>

            {/* Leader Pokemon Slots */}
            <HStack spacing={2}>
                <Text fontSize="sm" fontWeight="bold">Leader:</Text>
                {leaderTeam.map((pokemon, idx) => (
                    <PokemonSlot
                        key={idx}
                        pokemon={pokemon}
                        isActive={currentLeaderPokemon?.id === pokemon?.id}
                        isDefeated={pokemon?.defeated}
                        isHidden={!pokemon?.revealed}
                    />
                ))}
            </HStack>

            {/* Battle Log */}
            <BattleLogDisplay />

            {/* Continue Button - aparece quando a batalha final termina */}
            {showContinueButton && hasBattleResult && (
                <Button
                    colorScheme="green"
                    size="lg"
                    w="100%"
                    onClick={() => {
                        setShowContinueButton(false)
                        if (onBattleLogComplete) {
                            onBattleLogComplete()
                        }
                    }}
                >
                    Continue →
                </Button>
            )}
        </VStack>
    )
}
