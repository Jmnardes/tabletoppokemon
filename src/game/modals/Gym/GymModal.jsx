import { useContext, useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Text, Center, Flex, Button, Badge, Image, useColorMode, VStack, HStack, Divider, Tooltip } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import GenericModal from "@components/Modal/GenericModal"
import Element from "@features/elements/Element"
import PrizeIcon from "@features/prizes/PrizeIcon"
import socket from "@client"

import GymPreBattle from "./GymPreBattle"
import GymBattleScreen from "./GymBattleScreen"
import GymBattleResult from "./GymBattleResult"

import gymTicketIcon from '@assets/images/game/gym-ticket.png'

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
    const { gym, nextGym, updateGame, session, emit, setLoading, getPokemon, lastGymBattleTurn, setLastGymBattleTurn, setGym, setNextGym, teamIds, getCurrentPhase, advancePhase, player, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const [battleState, setBattleState] = useState('pre-battle')
    const [playerTeam, setPlayerTeam] = useState([])
    const [leaderTeam, setLeaderTeam] = useState([])
    const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState(null)
    const [currentLeaderPokemon, setCurrentLeaderPokemon] = useState(null)
    const [battleLog, setBattleLog] = useState([])
    const [availablePokemons, setAvailablePokemons] = useState([])
    const [needsChoice, setNeedsChoice] = useState(false)
    const [battleResult, setBattleResult] = useState(null)
    const loadingTimeoutRef = useRef(null)
    const [shouldClearGym, setShouldClearGym] = useState(false)
    const [victoryRewards, setVictoryRewards] = useState(null)

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

    const displayGym = gym || nextGym
    const isAvailable = !!gym

    useEffect(() => {
        socket.on('gym-battle-fight-result', (res) => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
                loadingTimeoutRef.current = null
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

            // Update gym tickets from response
            if (res.gymTickets != null) setPlayer(prev => ({ ...prev, gymTickets: res.gymTickets }))

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
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
                loadingTimeoutRef.current = null
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
            // Update gym tickets from response
            if (res.gymTickets != null) setPlayer(prev => ({ ...prev, gymTickets: res.gymTickets }))
            setLoading({ loading: false })
        })

        socket.on('gym-battle-error', (error) => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
                loadingTimeoutRef.current = null
            }
            setLoading({ loading: false })
            setBattleState('info')
        })

        socket.on('gym-victory', (res) => {
            setShouldClearGym(true)
            setNextGym(res.nextGym || null)
            setVictoryRewards({
                leveledUpPokemons: res.leveledUpPokemons || [],
            })
        })

        return () => {
            socket.off('gym-battle-fight-result')
            socket.off('gym-battle-result')
            socket.off('gym-battle-error')
            socket.off('gym-victory')
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
            }
        }
    }, [setLoading, getPokemon, setGym, setNextGym, setPlayer])

    const handleStartBattle = (pokemonIds) => {
        emit('gym-battle-start', { playerPokemonIds: pokemonIds })
        
        setLastGymBattleTurn(session.turns)
        setBattleState('battling')
        setLoading({ loading: true, text: t('gym.startingBattle') })

        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = setTimeout(() => {
            setLoading({ loading: false })
            setBattleState('info')
        }, 15000)
    }

    const handleChoosePokemon = (arrayIndex) => {
        const selectedPokemon = availablePokemons[arrayIndex]
        const pokemonIndex = selectedPokemon?.index !== undefined ? selectedPokemon.index : arrayIndex
        
        // Update current player pokemon optimistically
        if (selectedPokemon) {
            setCurrentPlayerPokemon(selectedPokemon)
        }
        
        setNeedsChoice(false)
        setLoading({ loading: true, text: t('gym.selectingPokemon') })
        
        emit('gym-battle-choose', { pokemonIndex })
        
        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = setTimeout(() => {
            setLoading({ loading: false })
        }, 15000)
    }

    const handleNext = () => {
        setLoading({ loading: true, text: t('gym.continuingBattle') })
        
        emit('gym-battle-next', {})
        
        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = setTimeout(() => {
            setLoading({ loading: false })
        }, 15000)
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
        setBattleState('pre-battle')
        setPlayerTeam([])
        setLeaderTeam([])
        setBattleLog([])
        setBattleResult(null)
        setNeedsChoice(false)
        setAvailablePokemons([])

        // If we're in a gym phase, advance to the next phase
        if (getCurrentPhase() === 'gym') {
            advancePhase()
        }
    }

    const handleChallenge = () => {
        setBattleState('pre-battle')
    }

    if (!gym && !nextGym) {
        return null
    }

    const modalTitle = 
        battleState === 'pre-battle' ? t('gym.selectTeam', { name: displayGym?.name }) :
        battleState === 'battling' ? t('gym.battle', { name: displayGym?.name }) :
        battleState === 'result' ? (battleResult?.victory ? t('gym.victory') : t('gym.defeat')) :
        isAvailable ? displayGym?.name : t('gym.nextGym', { name: displayGym?.name })

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
                                    {t('gym.leader')}
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
                                        {t('gym.leaderName', { name: displayGym.leader })}
                                    </Text>
                                    <Text fontSize="md" color="gray.400">
                                        {t('gym.badgeName', { name: displayGym.badge })}
                                    </Text>
                                </VStack>
                                <Element element={displayGym.element} size={24} />
                            </HStack>

                            {displayGym.attempts > 0 && (
                                <HStack justify="center">
                                    <Badge colorScheme="orange" fontSize="xs">
                                        {t('gym.attempts', { count: displayGym.attempts })}
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
                                    {t('common.reward')}
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
                            {t('gym.leaderTeam')}
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
                                    {t('gym.teamUnavailable')}
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
                                    {t('gym.comeBackOnTurn', { turn: displayGym.turnStart })}
                                </Text>
                            </Center>
                        ) : (
                            <>
                                <Tooltip
                                    label={
                                        !(player.gymTickets > 0)
                                            ? t('gym.needTicket')
                                            : lastGymBattleTurn === session.turns
                                            ? t('gym.alreadyChallenged')
                                            : ''
                                    }
                                    isDisabled={player.gymTickets > 0 && lastGymBattleTurn !== session.turns}
                                    placement="top"
                                >
                                    <Button
                                        colorScheme="green"
                                        size="lg"
                                        onClick={handleChallenge}
                                        isDisabled={lastGymBattleTurn === session.turns || (teamIds && teamIds.length < 3) || !(player.gymTickets > 0)}
                                    >
                                        {lastGymBattleTurn === session.turns 
                                            ? t('gym.alreadyChallenged') 
                                            : (teamIds && teamIds.length < 3)
                                            ? t('gym.needPokemon')
                                            : !(player.gymTickets > 0)
                                            ? t('gym.needTicket')
                                            : t('gym.challengeLeader', { leader: displayGym.leader })}
                                    </Button>
                                </Tooltip>
                                <HStack spacing={1}>
                                    <Image src={gymTicketIcon} w="20px" h="20px" />
                                    <Text fontSize="sm" fontWeight="bold">
                                        {player.gymTickets || 0} / 2
                                    </Text>
                                </HStack>
                                {displayGym.attempts > 0 && (
                                    <Text fontSize="xs" color="gray.400">
                                        {t('gym.challengeCount', { count: displayGym.attempts })}
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
                    leveledUpPokemons={victoryRewards?.leveledUpPokemons}
                />
            )}
        </GenericModal>
    )
}
