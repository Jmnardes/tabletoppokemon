import { useState, useEffect } from "react"
import { VStack, HStack, Flex, Text, Progress, Image, Badge, Box, Button, useColorMode } from "@chakra-ui/react"
import Element from "@components/Elements/Element"

export default function GymBattleScreen({ playerTeam, leaderTeam, battleLog, currentPlayerPokemon, currentLeaderPokemon, onSkipLogs }) {
    const { colorMode } = useColorMode()
    const [animatingLog, setAnimatingLog] = useState([])
    const [currentLogIndex, setCurrentLogIndex] = useState(0)

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.800"
    const defeatedBg = colorMode === 'light' ? "red.200" : "red.900"
    const activeBg = colorMode === 'light' ? "blue.500" : "blue.600"
    const slotBg = colorMode === 'light' ? "gray.100" : "gray.700"
    const cardBg = colorMode === 'light' ? "gray.100" : "gray.800"
    const borderColor = colorMode === 'light' ? "gray.200" : "gray.600"

    // Animar battle log
    useEffect(() => {
        if (battleLog && battleLog.length > 0 && currentLogIndex < battleLog.length) {
            const timer = setTimeout(() => {
                setAnimatingLog(prev => [...prev, battleLog[currentLogIndex]])
                setCurrentLogIndex(prev => prev + 1)
            }, 800) // Delay entre cada log

            return () => clearTimeout(timer)
        }
    }, [battleLog, currentLogIndex])

    // Reset ao receber novo battle log
    useEffect(() => {
        setAnimatingLog([])
        setCurrentLogIndex(0)
    }, [battleLog])

    // Função para pular animação dos logs
    const handleSkipLogs = () => {
        setAnimatingLog(battleLog)
        setCurrentLogIndex(battleLog.length)
        if (onSkipLogs) {
            onSkipLogs()
        }
    }

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

        const currentHp = pokemon.currentHp !== undefined ? pokemon.currentHp : pokemon.hp
        const hpPercentage = pokemon.hp > 0 ? (currentHp / pokemon.hp) * 100 : 0

        return (
            <Flex
                bg={cardBg}
                p={4}
                borderRadius={12}
                flexDirection="column"
                w="250px"
                gap={2}
                border="2px solid"
                borderColor={borderColor}
            >
                <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">{pokemon.name}</Text>
                    <Badge colorScheme="blue">Lv {pokemon.level}</Badge>
                </HStack>
                
                <Image
                    src={isPlayer ? pokemon.sprites?.back : pokemon.sprites?.front}
                    w="120px"
                    h="120px"
                    alignSelf="center"
                />

                <HStack spacing={1}>
                    {pokemon.types?.map((type, idx) => (
                        <Element key={idx} element={type} size={16} />
                    ))}
                </HStack>

                <VStack spacing={1} align="stretch">
                    <HStack justify="space-between">
                        <Text fontSize="xs">HP</Text>
                        <Text fontSize="xs">{Math.max(0, currentHp)} / {pokemon.hp}</Text>
                    </HStack>
                    <Progress
                        value={Math.max(0, hpPercentage)}
                        colorScheme={hpPercentage > 50 ? "green" : hpPercentage > 25 ? "yellow" : "red"}
                        size="sm"
                        borderRadius={4}
                    />
                </VStack>
            </Flex>
        )
    }

    const BattleLogDisplay = () => {
        const isAnimating = currentLogIndex < battleLog.length
        
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
                <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="bold">Battle Log:</Text>
                    {isAnimating && onSkipLogs && (
                        <Button size="xs" colorScheme="blue" onClick={handleSkipLogs}>
                            Skip ⏩
                        </Button>
                    )}
                </HStack>
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

            {/* Battle Arena */}
            <Flex w="100%" justify="space-around" align="center" minH="200px">
                <ActivePokemonDisplay pokemon={currentPlayerPokemon} isPlayer={true} />
                <Text fontSize="2xl" fontWeight="bold">VS</Text>
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
        </VStack>
    )
}
