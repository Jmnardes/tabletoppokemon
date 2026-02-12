import { useState, useEffect } from "react"
import { VStack, HStack, Flex, Text, Progress, Image, Badge, Box, Button, useColorMode, Tooltip } from "@chakra-ui/react"
import Element from "@components/Elements/Element"
import { colorByHitType } from "@utils/battle"

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
    const [showContinueButton, setShowContinueButton] = useState(false)

    const defeatedBg = colorMode === 'light' ? "red.200" : "red.900"
    const activeBg = colorMode === 'light' ? "blue.500" : "blue.600"
    const slotBg = colorMode === 'light' ? "gray.100" : "gray.700"
    const cardBg = colorMode === 'light' ? "gray.100" : "gray.800"
    const borderColor = colorMode === 'light' ? "gray.200" : "gray.600"
    const logBg = colorMode === 'light' ? "white" : "gray.900"

    // Mostrar botão continue quando há resultado de batalha
    useEffect(() => {
        if (hasBattleResult && battleLog?.length > 0) {
            setShowContinueButton(true)
        }
    }, [hasBattleResult, battleLog])

    // Reset ao receber novo battle log (mas não se for resultado final)
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
                    src={pokemon.sprites?.mini || pokemon.sprites?.front}
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
                        CLICK
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

    const ActivePokemonDisplay = ({ pokemon, isPlayer, team }) => {
        if (!pokemon) {
            return null
        }

        const maxHp = pokemon.hp || pokemon.stats?.hp || 1
        const currentHp = pokemon.currentHp !== undefined ? pokemon.currentHp : maxHp
        const hpPercentage = maxHp > 0 ? (currentHp / maxHp) * 100 : 0

        return (
            <VStack spacing={3}>
                {/* Pokemon sprite and name */}
                <VStack spacing={1}>
                    <HStack spacing={2}>
                        <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
                            {pokemon.name}
                        </Text>
                        <Badge colorScheme="yellow" bgColor="GrayText" fontSize="xs">Lv {pokemon.level}</Badge>
                    </HStack>
                    
                    <Image
                        src={isPlayer ? pokemon.sprites?.back : pokemon.sprites?.front}
                        w="180px"
                        h="180px"
                        objectFit="contain"
                    />

                    {/* HP Bar */}
                    <VStack spacing={0} w="180px">
                        <HStack justify="space-between" w="full" mb={1}>
                            <HStack spacing={1}>
                                {pokemon.types?.slice(0, 2).map((type, idx) => (
                                    <Element key={idx} element={type} size={14} />
                                ))}
                            </HStack>
                            <Text fontSize="xs" fontWeight="bold">
                                {Math.max(0, Math.floor(currentHp))} / {maxHp} HP
                            </Text>
                        </HStack>
                        
                        <Progress
                            value={Math.max(0, hpPercentage)}
                            colorScheme={hpPercentage > 50 ? "green" : hpPercentage > 25 ? "yellow" : "red"}
                            size="sm"
                            w="full"
                            borderRadius={4}
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
                    <Text fontWeight="bold" mb={2} textAlign="center">Battle Log</Text>
                    <Text color="gray.500" textAlign="center">Waiting for battle...</Text>
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
                <Text fontSize="md" fontWeight="bold" mb={2} textAlign="center">Battle Log</Text>
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
                    {battleLog.map((log, idx) => {
                        const hitColor = 
                            log.hitType === 'crit' ? 'red.400' :
                            log.hitType === 'miss' ? 'gray.400' :
                            log.hitType === 'half' ? 'yellow.400' : 
                            colorMode === 'light' ? 'gray.700' : 'gray.200'

                        return <TextLogDisplay key={idx} log={log} idx={idx} hitColor={hitColor} />
                    })}
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
                    ? `${log.attacker?.name} → inimigo`
                    : `${log.defender?.name} ← ${log.attacker?.name}`}
                </Text>

                <Text
                    fontSize="x-small"
                    color={hitColor}
                    pl={isPlayerAttacking ? 2 : 0}
                    pr={!isPlayerAttacking ? 2 : 0}
                >
                    {log.damage > 0 ? `${log.damage} dmg` : "MISS"}
                    {log.hitType === "crit" && " • CRIT"}
                    {log.hitType === "half" && " • Resisted"}
                </Text>

                {log.fainted && (
                    <Text
                    fontSize="x-small"
                    color="red.500"
                    fontWeight="bold"
                    pl={isPlayerAttacking ? 2 : 0}
                    pr={!isPlayerAttacking ? 2 : 0}
                    >
                    {log.defender?.name} fainted!
                    </Text>
                )}
            </Box>
        )
    }

    return (
        <VStack w="100%" h="100%" p={4} spacing={4} overflow="hidden">
            {/* Battle Arena - Pokemon Display and Battle Log in same row */}
            <Flex gap={4} align="center" justify="center" flex="1" w="100%">
                {/* Player Side (em cima - mais perto) */}
                <Flex direction="column" align="center" gap={3}>
                    
                    {/* Player mini team (em cima) */}
                    <HStack spacing={2}>
                        {playerTeam?.map((poke, idx) => (
                            <PokemonSlot
                                key={poke?.id || idx}
                                pokemon={poke}
                                isActive={currentPlayerPokemon?.id === poke?.id}
                                isDefeated={poke?.defeated}
                                onClick={() => needsChoice && onChoosePokemon && onChoosePokemon(idx)}
                                isClickable={needsChoice}
                                side="player"
                            />
                        ))}
                    </HStack>

                    {/* Active Player Pokemon */}
                    <ActivePokemonDisplay 
                        pokemon={currentPlayerPokemon} 
                        isPlayer={true} 
                        team={[]}
                    />
                </Flex>

                {/* VS Section */}
                <Flex align="center" justify="center">
                    <Text fontSize="4xl" fontWeight="bold" opacity={0.4}>VS</Text>
                </Flex>

                {/* Leader Side (em baixo - mais longe) */}
                <Flex direction="column" align="center" gap={3}>
                    
                    {/* Active Leader Pokemon */}
                    <ActivePokemonDisplay 
                        pokemon={currentLeaderPokemon} 
                        isPlayer={false} 
                        team={[]}
                    />

                    {/* Leader mini team (em baixo) */}
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

            {/* Action buttons */}
            <VStack spacing={2}>
                {needsChoice && (
                    <Box bg="yellow.500" px={4} py={2} borderRadius={8} textAlign="center" w="fit-content">
                        <Text fontSize="sm" fontWeight="bold" color="black" whiteSpace="nowrap">
                            ☝️ Choose your next Pokémon! ☝️
                        </Text>
                    </Box>
                )}

                {!needsChoice && !hasBattleResult && battleLog?.length > 0 && onNext && (
                    <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={onNext}
                    >
                        Next Opponent →
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
                        Continue →
                    </Button>
                )}
            </VStack>
        </VStack>
    )
}
