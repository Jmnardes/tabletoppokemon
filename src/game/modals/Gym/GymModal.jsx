import { useContext, useState, useEffect } from "react"
import { Text, Center, Flex, Button, Badge, Image, useColorMode, VStack, HStack, Divider } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import GenericModal from "@components/Modal/GenericModal"
import Element from "@components/Elements/Element"
import socket from "@client"

import GymPreBattle from "./GymPreBattle"
import GymBattleScreen from "./GymBattleScreen"
import GymPokemonChoice from "./GymPokemonChoice"
import GymBattleResult from "./GymBattleResult"

export default function GymModal() {
    const { gym, nextGym, updateGame, player, session, emit, setLoading, getPokemon, lastGymBattleTurn, setLastGymBattleTurn, setGym, setNextGym } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const [battleState, setBattleState] = useState('info')
    const [playerTeam, setPlayerTeam] = useState([])
    const [leaderTeam, setLeaderTeam] = useState([])
    const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState(null)
    const [currentLeaderPokemon, setCurrentLeaderPokemon] = useState(null)
    const [battleLog, setBattleLog] = useState([])
    const [availablePokemons, setAvailablePokemons] = useState([])
    const [battleResult, setBattleResult] = useState(null)
    const [showPokemonChoice, setShowPokemonChoice] = useState(false)
    const [loadingTimeout, setLoadingTimeout] = useState(null)
    const [shouldClearGym, setShouldClearGym] = useState(false)

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const currentTurn = session?.turns || 0

    const displayGym = gym || nextGym
    const isAvailable = !!gym
    const turnsUntil = displayGym && !isAvailable && displayGym.turnStart ? displayGym.turnStart - currentTurn : 0

    useEffect(() => {
        socket.on('gym-battle-fight-result', (res) => {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
                setLoadingTimeout(null)
            }

            if (!res.fight || !res.battleState) {
                setLoading({ loading: false })
                return
            }

            const { winner, loser, winnerSide, log } = res.fight
            const { needsChoice, availablePokemons } = res.battleState

            if (!log || !Array.isArray(log)) {
                setLoading({ loading: false })
                return
            }

            setBattleLog(log)

            if (winnerSide === 'attacker') {
                setCurrentPlayerPokemon(winner)
                if (loser) {
                    setCurrentLeaderPokemon({ ...loser, defeated: true })
                    setLeaderTeam(prev => prev.map(p => 
                        p.id === loser.id ? { ...loser, defeated: true, revealed: true } : p
                    ))
                }
            } else {
                setCurrentLeaderPokemon({ ...winner, revealed: true })
                if (loser) {
                    setCurrentPlayerPokemon({ ...loser, defeated: true })
                    setPlayerTeam(prev => prev.map(p => 
                        p.id === loser.id ? { ...loser, defeated: true } : p
                    ))
                }
            }

            if (needsChoice && availablePokemons) {
                const logAnimationTime = log.length * 800 + 1000
                
                setTimeout(() => {
                    const fullPokemons = availablePokemons.map(ap => {
                        const fullPokemon = playerTeam.find(p => p.id === ap.id)
                        
                        if (!fullPokemon) {
                            const fromContext = getPokemon(ap.id)
                            return {
                                ...fromContext,
                                index: ap.index,
                                defeated: ap.defeated,
                                currentHp: ap.currentHp
                            }
                        }
                        
                        return {
                            ...fullPokemon,
                            index: ap.index,
                            defeated: ap.defeated,
                            currentHp: ap.currentHp !== undefined ? ap.currentHp : fullPokemon.currentHp
                        }
                    })
                    
                    setAvailablePokemons(fullPokemons)
                    setTimeout(() => {
                        setShowPokemonChoice(true)
                    }, 100)
                }, logAnimationTime)
            }

            setLoading({ loading: false })
        })

        socket.on('gym-battle-result', (res) => {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
                setLoadingTimeout(null)
            }

            if (res.finalFight && res.finalFight.log) {
                const { winner, loser, winnerSide, log } = res.finalFight
                
                setBattleLog(log)
                
                if (winnerSide === 'attacker') {
                    setCurrentPlayerPokemon(winner)
                    if (loser) {
                        setCurrentLeaderPokemon({ ...loser, defeated: true })
                        setLeaderTeam(prev => prev.map(p => 
                            p.id === loser.id ? { ...loser, defeated: true, revealed: true } : p
                        ))
                    }
                } else {
                    setCurrentLeaderPokemon({ ...winner, revealed: true })
                    if (loser) {
                        setCurrentPlayerPokemon({ ...loser, defeated: true })
                        setPlayerTeam(prev => prev.map(p => 
                            p.id === loser.id ? { ...loser, defeated: true } : p
                        ))
                    }
                }
            }
            
            setBattleResult(res)
            setLoading({ loading: false })
        })

        socket.on('gym-battle-error', (error) => {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
                setLoadingTimeout(null)
            }
            setLoading({ loading: false })
            setBattleState('info')
        })

        socket.on('gym-victory', (res) => {
            setShouldClearGym(true)
            if (res.nextGym) {
                setNextGym(res.nextGym)
            }
        })

        return () => {
            socket.off('gym-battle-fight-result')
            socket.off('gym-battle-result')
            socket.off('gym-battle-error')
            socket.off('gym-victory')
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
            }
        }
    }, [currentPlayerPokemon, currentLeaderPokemon, playerTeam, setLoading, getPokemon, loadingTimeout, setGym, setNextGym])

    const handleStartBattle = (pokemonIds) => {
        emit('gym-battle-start', { gymId: displayGym.id, pokemonIds })
        
        const selectedPokemons = pokemonIds.map(id => {
            const fullPokemon = getPokemon(id)
            if (!fullPokemon) {
                return { id, currentHp: 0, defeated: false }
            }
            return {
                ...fullPokemon,
                currentHp: fullPokemon.hp,
                defeated: false
            }
        })
        
        setPlayerTeam(selectedPokemons)
        setLastGymBattleTurn(session.turns)
        
        setLeaderTeam(displayGym.leaderTeam.map(p => ({ ...p, revealed: false, defeated: false })))
        
        setBattleState('battling')
        setLoading({ loading: true, text: 'Starting gym battle...' })

        const timeout = setTimeout(() => {
            setLoading({ loading: false })
            setBattleState('info')
        }, 15000)
        setLoadingTimeout(timeout)
    }

    const handleChoosePokemon = (arrayIndex) => {
        const selectedPokemon = availablePokemons[arrayIndex]
        const pokemonIndex = selectedPokemon?.index !== undefined ? selectedPokemon.index : arrayIndex
        
        setShowPokemonChoice(false)
        setBattleLog([])
        setLoading({ loading: true, text: 'Selecting pokémon...' })
        
        emit('gym-battle-choose', { pokemonIndex })
        
        const timeout = setTimeout(() => {
            setLoading({ loading: false })
        }, 15000)
        setLoadingTimeout(timeout)
    }

    const handleRetry = () => {
        setBattleState('pre-battle')
        setPlayerTeam([])
        setLeaderTeam([])
        setBattleLog([])
        setBattleResult(null)
    }

    const handleBattleLogComplete = () => {
        if (battleResult) {
            setBattleState('result')
            setLoading({ loading: false })
        }
    }

    const handleClose = () => {
        if (shouldClearGym) {
            setGym(null)
            setShouldClearGym(false)
        }
        
        updateGame({ openGymModal: false })
        setBattleState('info')
        setPlayerTeam([])
        setLeaderTeam([])
        setBattleLog([])
        setBattleResult(null)
    }

    const handleChallenge = () => {
        setBattleState('pre-battle')
    }

    if (!gym && !nextGym) {
        return null
    }

    const modalTitle = 
        battleState === 'pre-battle' ? `Select Team - ${displayGym?.name}` :
        battleState === 'battling' ? `Battle - ${displayGym?.name}` :
        battleState === 'choosing' ? 'Choose Pokémon' :
        battleState === 'result' ? (battleResult?.victory ? 'Victory!' : 'Defeat') :
        isAvailable ? displayGym?.name : `Next Gym: ${displayGym?.name}`

    return (
        <GenericModal
            title={modalTitle}
            closeButton={battleState === 'info' || battleState === 'result'}
            onModalClose={handleClose}
            size="xl"
        >
            {/* Tela de Informação do Gym */}
            {battleState === 'info' && (
                <VStack spacing={4} p={4}>
                    {/* Banner de informação se for próximo gym */}
                    {!isAvailable && turnsUntil > 0 && (
                        <Flex
                            w="100%"
                            bg="blue.500"
                            p={3}
                            borderRadius={8}
                            justifyContent="center"
                        >
                            <Text fontSize="sm" fontWeight="bold" textAlign="center">
                                This gym will be available in {turnsUntil} turn{turnsUntil > 1 ? 's' : ''} (Turn {displayGym.turnStart})
                            </Text>
                        </Flex>
                    )}

                    {/* Informações do Gym */}
                    <Flex
                        w="100%"
                        bg={bgColor}
                        p={4}
                        borderRadius={8}
                        flexDirection="column"
                        gap={2}
                    >
                        <HStack justify="space-between">
                            <Text fontSize="lg" fontWeight="bold">
                                Leader: {displayGym.leader}
                            </Text>
                            <Element element={displayGym.element} size={24} />
                        </HStack>
                        
                        <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.400">
                                Badge: {displayGym.badge}
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {displayGym.element}
                            </Text>
                        </HStack>

                        {displayGym.attempts > 0 && (
                            <HStack justify="center">
                                <Badge colorScheme="orange" fontSize="xs">
                                    Attempts: {displayGym.attempts}
                                </Badge>
                            </HStack>
                        )}
                    </Flex>

                    <Divider />

                    {/* Team Preview */}
                    <Flex w="100%" flexDirection="column" gap={2}>
                        <Text fontSize="md" fontWeight="bold" textAlign="center">
                            Leader's Team
                        </Text>
                        <Flex wrap="wrap" justify="center" gap={2}>
                            {displayGym.leaderTeam && displayGym.leaderTeam.length > 0 ? (
                                displayGym.leaderTeam.map((pokemon, index) => (
                                    <Flex
                                        key={index}
                                        bg={bgColor}
                                        p={2}
                                        borderRadius={6}
                                        flexDirection="column"
                                        alignItems="center"
                                        minW="80px"
                                    >
                                        <Image
                                            src={pokemon.sprites?.front || pokemon.sprites?.mini}
                                            w="48px"
                                            h="48px"
                                            fallback={<Text>?</Text>}
                                        />
                                        <Text fontSize="xs" isTruncated maxW="80px">
                                            {pokemon.name}
                                        </Text>
                                        <Badge fontSize="xx-small" colorScheme="blue">
                                            Lv {pokemon.level}
                                        </Badge>
                                    </Flex>
                                ))
                            ) : (
                                <Text fontSize="sm" color="gray.400">
                                    Team information unavailable
                                </Text>
                            )}
                        </Flex>
                    </Flex>

                    <Divider />

                    {/* Ação */}
                    <Center flexDirection="column" gap={2} pt={2}>
                        {!isAvailable ? (
                            <Text fontSize="sm" color="yellow.400" textAlign="center">
                                Come back on turn {displayGym.turnStart} to challenge this gym!
                            </Text>
                        ) : (
                            <>
                                <Button
                                    colorScheme="green"
                                    size="lg"
                                    onClick={handleChallenge}
                                    isDisabled={lastGymBattleTurn === session.turns}
                                >
                                    {lastGymBattleTurn === session.turns 
                                        ? 'Already challenged this turn' 
                                        : `Challenge ${displayGym.leader}`}
                                </Button>
                                {displayGym.attempts > 0 && (
                                    <Text fontSize="xs" color="gray.400">
                                        You've challenged this gym {displayGym.attempts} time{displayGym.attempts > 1 ? 's' : ''}
                                    </Text>
                                )}
                            </>
                        )}
                    </Center>
                </VStack>
            )}

            {/* Tela de Pré-Batalha (Seleção de Pokémon) */}
            {battleState === 'pre-battle' && (
                <GymPreBattle
                    gym={displayGym}
                    onStartBattle={handleStartBattle}
                />
            )}

            {/* Tela de Batalha */}
            {battleState === 'battling' && (
                <VStack spacing={4} w="full">
                    {!showPokemonChoice ? (
                        <GymBattleScreen
                            playerTeam={playerTeam}
                            leaderTeam={leaderTeam}
                            battleLog={battleLog}
                            currentPlayerPokemon={currentPlayerPokemon}
                            currentLeaderPokemon={currentLeaderPokemon}
                            onSkipLogs={() => {
                                if (availablePokemons && availablePokemons.length > 0) {
                                    setShowPokemonChoice(true)
                                }
                            }}
                            onBattleLogComplete={handleBattleLogComplete}
                            hasBattleResult={!!battleResult}
                        />
                    ) : (
                        availablePokemons && availablePokemons.length > 0 ? (
                            <GymPokemonChoice
                                availablePokemons={availablePokemons}
                                onChoose={handleChoosePokemon}
                            />
                        ) : (
                            <Text color="yellow.400">Loading...</Text>
                        )
                    )}
                </VStack>
            )}

            {/* Tela de Escolha de Pokémon */}
            {battleState === 'choosing' && (
                <GymPokemonChoice
                    availablePokemons={availablePokemons}
                    onChoose={handleChoosePokemon}
                />
            )}

            {/* Tela de Resultado */}
            {battleState === 'result' && battleResult && (
                <GymBattleResult
                    victory={battleResult.victory}
                    gym={displayGym}
                    rewards={battleResult.rewards}
                    onClose={handleClose}
                    onRetry={handleRetry}
                    canRetry={lastGymBattleTurn !== session.turns}
                />
            )}
        </GenericModal>
    )
}
