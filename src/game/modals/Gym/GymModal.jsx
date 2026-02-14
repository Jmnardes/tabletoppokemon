import { useContext, useState, useEffect } from "react"
import { Text, Center, Flex, Button, Badge, Image, useColorMode, VStack, HStack, Divider } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import GenericModal from "@components/Modal/GenericModal"
import Element from "@components/Elements/Element"
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"
import socket from "@client"

import GymPreBattle from "./GymPreBattle"
import GymBattleScreen from "./GymBattleScreen"
import GymBattleResult from "./GymBattleResult"

const getBadgeIcon = (badgeName) => {
    if (!badgeName) return null
    const iconName = badgeName.toLowerCase().replace(/\s+/g, '_')
    try {
        return require(`@assets/images/badges/${iconName}.png`)
    } catch (e) {
        return null
    }
}

const getLeaderIcon = (leaderId) => {
    if (!leaderId) return null
    try {
        return require(`@assets/images/leaders/${leaderId}.png`)
    } catch (e) {
        return null
    }
}

export default function GymModal() {
    const { gym, nextGym, updateGame, session, emit, setLoading, getPokemon, lastGymBattleTurn, setLastGymBattleTurn, setGym, setNextGym, teamIds, player } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const [battleState, setBattleState] = useState('info')
    const [playerTeam, setPlayerTeam] = useState([])
    const [leaderTeam, setLeaderTeam] = useState([])
    const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState(null)
    const [currentLeaderPokemon, setCurrentLeaderPokemon] = useState(null)
    const [battleLog, setBattleLog] = useState([])
    const [availablePokemons, setAvailablePokemons] = useState([])
    const [needsChoice, setNeedsChoice] = useState(false)
    const [battleResult, setBattleResult] = useState(null)
    const [loadingTimeout, setLoadingTimeout] = useState(null)
    const [shouldClearGym, setShouldClearGym] = useState(false)

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

    const displayGym = gym || nextGym
    const isAvailable = !!gym

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

            const { log } = res.fight
            const { 
                playerTurn, 
                availablePokemons, 
                leaderPokemons, 
                currentPlayerPokemon, 
                currentLeaderPokemon 
            } = res.battleState

            if (!log || !Array.isArray(log)) {
                setLoading({ loading: false })
                return
            }

            setBattleLog(log)

            if (currentPlayerPokemon) {
                setCurrentPlayerPokemon(currentPlayerPokemon)
            } else if (availablePokemons && availablePokemons.length > 0) {
                const activePokemon = availablePokemons.find(p => !p.defeated && p.currentHp > 0)
                if (activePokemon) {
                    setCurrentPlayerPokemon(activePokemon)
                }
            }
            
            if (currentLeaderPokemon) {
                setCurrentLeaderPokemon(currentLeaderPokemon)
            } else if (leaderPokemons && leaderPokemons.length > 0) {
                const activePokemon = leaderPokemons.find(p => !p.defeated && p.currentHp > 0)
                if (activePokemon) {
                    setCurrentLeaderPokemon(activePokemon)
                }
            }

            if (leaderPokemons && leaderPokemons.length > 0) {
                const formattedLeaderTeam = leaderPokemons.map(p => ({
                    ...p,
                    id: p.id || p.name,
                    revealed: p.defeated || p.currentHp < p.hp
                }))
                setLeaderTeam(formattedLeaderTeam)
            }

            if (availablePokemons && availablePokemons.length > 0) {
                const formattedPlayerTeam = availablePokemons.map(p => ({
                    ...p,
                    defeated: p.defeated || false
                }))
                setPlayerTeam(formattedPlayerTeam)
            }

            if (playerTurn && availablePokemons) {
                setAvailablePokemons(availablePokemons)
                setNeedsChoice(true)
            } else {
                setNeedsChoice(false)
            }

            setLoading({ loading: false })
        })

        socket.on('gym-battle-result', (res) => {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
                setLoadingTimeout(null)
            }

            if (res.finalFight && res.finalFight.log) {
                const { log } = res.finalFight
                const { 
                    leaderPokemons, 
                    currentPlayerPokemon, 
                    currentLeaderPokemon,
                    availablePokemons
                } = res.battleState || {}
                
                setBattleLog(log)
                
                // Update final state with full data from server
                if (currentPlayerPokemon) {
                    setCurrentPlayerPokemon(currentPlayerPokemon)
                } else if (availablePokemons && availablePokemons.length > 0) {
                    const lastActivePokemon = availablePokemons.find(p => p.currentHp >= 0)
                    if (lastActivePokemon) {
                        setCurrentPlayerPokemon(lastActivePokemon)
                    }
                }
                
                if (currentLeaderPokemon) {
                    setCurrentLeaderPokemon(currentLeaderPokemon)
                } else if (leaderPokemons && leaderPokemons.length > 0) {
                    const lastActivePokemon = leaderPokemons.find(p => p.currentHp >= 0)
                    if (lastActivePokemon) {
                        setCurrentLeaderPokemon(lastActivePokemon)
                    }
                }

                if (leaderPokemons && leaderPokemons.length > 0) {
                    const formattedLeaderTeam = leaderPokemons.map(p => ({
                        ...p,
                        id: p.id || p.name,
                        revealed: true
                    }))
                    setLeaderTeam(formattedLeaderTeam)
                }

                if (availablePokemons && availablePokemons.length > 0) {
                    setPlayerTeam(availablePokemons)
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
            setNextGym(res.nextGym || null)
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
    }, [setLoading, getPokemon, loadingTimeout, setGym, setNextGym])

    const handleStartBattle = (pokemonIds) => {
        emit('gym-battle-start', { playerPokemonIds: pokemonIds })
        
        setLastGymBattleTurn(session.turns)
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
        
        // Update current player pokemon optimistically
        if (selectedPokemon) {
            setCurrentPlayerPokemon(selectedPokemon)
        }
        
        setNeedsChoice(false)
        setLoading({ loading: true, text: 'Selecting pokémon...' })
        
        emit('gym-battle-choose', { pokemonIndex })
        
        const timeout = setTimeout(() => {
            setLoading({ loading: false })
        }, 15000)
        setLoadingTimeout(timeout)
    }

    const handleNext = () => {
        setLoading({ loading: true, text: 'Continuing battle...' })
        
        emit('gym-battle-next', {})
        
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
        setNeedsChoice(false)
        setAvailablePokemons([])
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
        setNeedsChoice(false)
        setAvailablePokemons([])
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
        battleState === 'result' ? (battleResult?.victory ? 'Victory!' : 'Defeat') :
        isAvailable ? displayGym?.name : `Next Gym: ${displayGym?.name}`

    return (
        <GenericModal
            title={modalTitle}
            closeButton={battleState === 'info' || battleState === 'result'}
            onModalClose={handleClose}
            size={battleState === 'battling' ? 'full' : 'xl'}
        >
            {/* Tela de Informação do Gym */}
            {battleState === 'info' && (
                <VStack spacing={4} p={4}>
                    {/* Informações do Gym com Badge e Leader */}
                    <HStack w="100%" spacing={4} align="start">
                        {/* Imagem do Leader */}
                        <Flex
                            bg={bgColor}
                            w="100px"
                            h="140px"
                            borderRadius={8}
                            alignItems="center"
                            justifyContent="center"
                            borderWidth="2px"
                            borderColor={colorMode === 'light' ? "gray.300" : "gray.600"}
                            overflow="hidden"
                        >
                            {displayGym.leaderId && getLeaderIcon(displayGym.leaderId) ? (
                                <Image
                                    src={getLeaderIcon(displayGym.leaderId)}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                />
                            ) : (
                                <Text fontSize="sm" color="gray.500">
                                    Leader
                                </Text>
                            )}
                        </Flex>

                        {/* Info do Gym */}
                        <Flex
                            flex={1}
                            bg={bgColor}
                            p={4}
                            borderRadius={8}
                            flexDirection="column"
                            gap={3}
                        >
                            <HStack>
                                <Image
                                    src={getBadgeIcon(displayGym.badge)}
                                    w="32px"
                                    h="32px"
                                />
                                <VStack align="start" spacing={0}>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Leader: {displayGym.leader}
                                    </Text>
                                    <Text fontSize="md" color="gray.400">
                                        Badge: {displayGym.badge}
                                    </Text>
                                </VStack>
                                <Element element={displayGym.element} size={24} />
                            </HStack>

                            {displayGym.attempts > 0 && (
                                <HStack justify="center">
                                    <Badge colorScheme="orange" fontSize="xs">
                                        Attempts: {displayGym.attempts}
                                    </Badge>
                                </HStack>
                            )}
                        </Flex>

                        {/* Reward */}
                        {displayGym.reward && (
                            <Flex
                                bg={bgColor}
                                p={4}
                                borderRadius={8}
                                flexDirection="column"
                                alignItems="center"
                                gap={2}
                            >
                                <Text fontSize="md" fontWeight="bold">
                                    Reward
                                </Text>
                                <HStack>
                                    <Text fontSize="lg" fontWeight="bold" color="green.400">
                                        +{displayGym.reward.amount}
                                    </Text>
                                    <PrizeIcon type={displayGym.reward.name} size="24px" />
                                </HStack>
                            </Flex>
                        )}
                    </HStack>

                    <Divider />

                    {/* Team Preview */}
                    <Flex w="100%" flexDirection="column" gap={2}>
                        <Text fontSize="md" fontWeight="bold" textAlign="center">
                            Leader's Team
                        </Text>
                        <Flex wrap="wrap" justify="center" gap={3}>
                            {displayGym.leaderTeam && displayGym.leaderTeam.length > 0 ? (
                                displayGym.leaderTeam.map((pokemon, index) => (
                                    <Flex
                                        key={index}
                                        bg={bgColor}
                                        p={3}
                                        borderRadius={8}
                                        flexDirection="column"
                                        alignItems="center"
                                        minW="120px"
                                    >
                                        <Image
                                            src={pokemon.sprites?.front}
                                            w="96px"
                                            h="96px"
                                            fallback={<Text>?</Text>}
                                        />
                                        <Text fontSize="sm" fontWeight="bold" textAlign="center">
                                            {pokemon.name}
                                        </Text>
                                        <Badge fontSize="xs" colorScheme="blue">
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
                    <Center flexDirection="column" gap={2} pt={2} minH="120px">
                        {!isAvailable ? (
                            <Center flex={1} w="100%">
                                <Text fontSize="xl" fontWeight="bold" color="yellow.400" textAlign="center">
                                    Come back on turn {displayGym.turnStart} to challenge this gym!
                                </Text>
                            </Center>
                        ) : (
                            <>
                                <Button
                                    colorScheme="green"
                                    size="lg"
                                    onClick={handleChallenge}
                                    isDisabled={lastGymBattleTurn === session.turns || (teamIds && teamIds.length < 3)}
                                >
                                    {lastGymBattleTurn === session.turns 
                                        ? 'Already challenged this turn' 
                                        : (teamIds && teamIds.length < 3)
                                        ? 'Need at least 3 Pokémon'
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
                <GymBattleScreen
                    playerTeam={playerTeam}
                    leaderTeam={leaderTeam}
                    battleLog={battleLog}
                    currentPlayerPokemon={currentPlayerPokemon}
                    currentLeaderPokemon={currentLeaderPokemon}
                    onBattleLogComplete={handleBattleLogComplete}
                    hasBattleResult={!!battleResult}
                    needsChoice={needsChoice}
                    onChoosePokemon={handleChoosePokemon}
                    onNext={handleNext}
                />
            )}

            {/* Tela de Resultado */}
            {battleState === 'result' && battleResult && (
                <GymBattleResult
                    victory={battleResult.victory}
                    gym={displayGym}
                    reward={displayGym.reward}
                    onClose={handleClose}
                    onRetry={handleRetry}
                    canRetry={lastGymBattleTurn !== session.turns}
                />
            )}
        </GenericModal>
    )
}
