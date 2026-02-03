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
    const { gym, nextGym, updateGame, player, session, emit, setLoading, getPokemon, lastGymBattleTurn, setLastGymBattleTurn } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const [battleState, setBattleState] = useState('info') // 'info', 'pre-battle', 'battling', 'choosing', 'result'
    const [playerTeam, setPlayerTeam] = useState([]) // 3 pokémons selecionados
    const [leaderTeam, setLeaderTeam] = useState([]) // 3 pokémons do líder
    const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState(null)
    const [currentLeaderPokemon, setCurrentLeaderPokemon] = useState(null)
    const [battleLog, setBattleLog] = useState([])
    const [availablePokemons, setAvailablePokemons] = useState([])
    const [battleResult, setBattleResult] = useState(null)
    const [showPokemonChoice, setShowPokemonChoice] = useState(false) // Mostrar escolha dentro da tela de batalha

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const currentTurn = session?.turns || 0

    // Determina qual gym mostrar (antes dos hooks)
    // Se tem gym, mostra ele (já está disponível). Senão, mostra nextGym
    const displayGym = gym || nextGym
    const isAvailable = !!gym // Se gym existe, está disponível
    const turnsUntil = displayGym && !isAvailable && displayGym.turnStart ? displayGym.turnStart - currentTurn : 0

    // Socket listeners (hooks devem vir antes de qualquer return)
    useEffect(() => {
        // Resultado de uma luta
        socket.on('gym-battle-fight-result', (res) => {
            if (!res.fight || !res.battleState) {
                console.warn('Invalid data in gym-battle-fight-result:', res)
                return
            }

            const { winner, loser, winnerSide, log } = res.fight
            const { needsChoice, availablePokemons } = res.battleState

            if (!log || !Array.isArray(log)) {
                console.warn('Invalid log in gym-battle-fight-result:', res)
                return
            }

            setBattleLog(log)

            // Atualizar pokémon atual com dados completos
            if (winnerSide === 'attacker') {
                // Player ganhou, atualizar player pokemon
                setCurrentPlayerPokemon(winner)
                // Leader pokemon foi derrotado
                if (loser) {
                    setCurrentLeaderPokemon({ ...loser, defeated: true })
                    setLeaderTeam(prev => prev.map(p => 
                        p.id === loser.id ? { ...loser, defeated: true, revealed: true } : p
                    ))
                }
                
                // Se player ganhou mas não precisa escolher, significa que o leader 
                // precisa trocar o pokemon dele. Vamos pedir ao backend para continuar.
                if (!needsChoice) {
                    setTimeout(() => {
                        emit('gym-battle-continue', {}).catch(err => console.error('Error gym-battle-continue:', err))
                    }, 1500)
                }
            } else {
                // Leader ganhou, atualizar leader pokemon
                setCurrentLeaderPokemon({ ...winner, revealed: true })
                // Player pokemon foi derrotado
                if (loser) {
                    setCurrentPlayerPokemon({ ...loser, defeated: true })
                    setPlayerTeam(prev => prev.map(p => 
                        p.id === loser.id ? { ...loser, defeated: true } : p
                    ))
                }
                
                // Se leader ganhou mas needsChoice é false, backend não enviou corretamente
                if (!needsChoice) {
                    const alivePokemon = playerTeam.filter(p => !p.defeated && p.id !== loser?.id)
                    if (alivePokemon.length > 0) {
                        setTimeout(() => {
                            emit('gym-battle-continue', {}).catch(err => console.error('Error gym-battle-continue:', err))
                        }, 1500)
                    }
                }
            }

            // Se precisa escolher próximo pokémon
            if (needsChoice && availablePokemons) {
                // Calcular tempo baseado no tamanho do log (800ms por linha + buffer)
                const logAnimationTime = log.length * 800 + 1000
                
                setTimeout(() => {
                    // Mapear availablePokemons com dados completos do playerTeam
                    const fullPokemons = availablePokemons.map(ap => {
                        const fullPokemon = playerTeam.find(p => p.id === ap.id)
                        
                        if (!fullPokemon) {
                            // Fallback: buscar do contexto
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
                    
                    // IMPORTANTE: setar availablePokemons ANTES de showPokemonChoice
                    setAvailablePokemons(fullPokemons)
                    // Aguardar próximo tick para garantir que estado foi atualizado
                    setTimeout(() => {
                        setShowPokemonChoice(true)
                    }, 100)
                }, logAnimationTime) // Delay dinâmico baseado no log
            }

            setLoading({ loading: false })
        })

        // Precisa escolher próximo pokémon (evento separado, se backend enviar)
        socket.on('gym-battle-needs-choice', (res) => {
            setShowPokemonChoice(true)
            
            // Mapear availablePokemons com dados completos
            if (res.availablePokemons) {
                const fullPokemons = res.availablePokemons.map(ap => {
                    const fullPokemon = playerTeam.find(p => p.id === ap.id)
                    return {
                        ...fullPokemon,
                        index: ap.index,
                        defeated: ap.defeated
                    }
                })
                setAvailablePokemons(fullPokemons)
            } else {
                setAvailablePokemons(playerTeam)
            }
        })

        // Resultado final da batalha
        socket.on('gym-battle-result', (res) => {
            setBattleResult(res)
            setBattleState('result')
            setLoading({ loading: false })
        })

        // Atualização de estado da batalha
        socket.on('gym-battle-update', (res) => {
            // Atualizar pokémon atual do player
            if (res.currentPlayerPokemon) {
                setCurrentPlayerPokemon(res.currentPlayerPokemon)
                // Atualizar no team também
                setPlayerTeam(prev => prev.map(p => 
                    p.id === res.currentPlayerPokemon.id ? res.currentPlayerPokemon : p
                ))
            }
            
            // Atualizar pokémon atual do líder
            if (res.currentLeaderPokemon) {
                setCurrentLeaderPokemon({ ...res.currentLeaderPokemon, revealed: true })
                // Atualizar leader team para revelar pokémon
                setLeaderTeam(prev => prev.map((p, idx) => 
                    idx === res.leaderPokemonIndex ? { ...res.currentLeaderPokemon, revealed: true } : p
                ))
            }

            setLoading({ loading: false })
        })

        return () => {
            socket.off('gym-battle-fight-result')
            socket.off('gym-battle-needs-choice')
            socket.off('gym-battle-result')
            socket.off('gym-battle-update')
        }
    }, [currentPlayerPokemon, currentLeaderPokemon, playerTeam, setLoading, getPokemon])

    // Handlers
    const handleStartBattle = (pokemonIds) => {
        emit('gym-battle-start', { gymId: displayGym.id, pokemonIds })
        
        // Inicializar team do player com dados COMPLETOS dos pokémons
        const selectedPokemons = pokemonIds.map(id => {
            const fullPokemon = getPokemon(id) // Buscar pokémon completo do contexto
            if (!fullPokemon) {
                console.warn('Pokemon not found:', id)
                return { id, currentHp: 0, defeated: false }
            }
            return {
                ...fullPokemon,
                currentHp: fullPokemon.hp, // Inicializar com HP máximo
                defeated: false
            }
        })
        
        setPlayerTeam(selectedPokemons)
        setLastGymBattleTurn(session.turns)  // Marca o turno da tentativa
        
        // Inicializar team do líder (escondido)
        setLeaderTeam(displayGym.leaderTeam.map(p => ({ ...p, revealed: false, defeated: false })))
        
        setBattleState('battling')
        setLoading({ loading: true, text: 'Starting gym battle...' })
    }

    const handleChoosePokemon = (arrayIndex) => {
        const selectedPokemon = availablePokemons[arrayIndex]
        const pokemonIndex = selectedPokemon?.index !== undefined ? selectedPokemon.index : arrayIndex
        
        emit('gym-battle-choose', { pokemonIndex })
        
        // Limpa o log e esconde a escolha
        setBattleLog([])
        setShowPokemonChoice(false)
        
        setLoading({ loading: true, text: 'Switching pokémon...' })
    }

    const handleRetry = () => {
        setBattleState('pre-battle')
        setPlayerTeam([])
        setLeaderTeam([])
        setBattleLog([])
        setBattleResult(null)
    }

    const handleClose = () => {
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

    // Early return após todos os hooks
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
