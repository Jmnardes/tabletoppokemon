import { useContext, useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Center, Flex, Button, Tooltip } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

import GymPreBattle from "./GymPreBattle"
import GymBattleScreen from "./GymBattleScreen"
import GymBattleResult from "./GymBattleResult"

export default function GymScreen() {
    const {
        gym,
        nextGym,
        session,
        emit,
        setLoading,
        getPokemon,
        setPlayer,
        lastGymBattleTurn,
        setLastGymBattleTurn,
        setGym,
        setNextGym,
        advancePhase,
        handleToast,
    } = useContext(PlayerContext)
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

    const displayGym = gym || nextGym

    // Auto-advance if no gym available
    useEffect(() => {
        if (!displayGym) {
            advancePhase()
        }
    }, [displayGym, advancePhase])

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
                currentLeaderPokemon,
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
                if (activePokemon) setCurrentPlayerPokemon(activePokemon)
            }

            if (currentLeaderPokemon) {
                setCurrentLeaderPokemon(currentLeaderPokemon)
            } else if (leaderPokemons && leaderPokemons.length > 0) {
                const activePokemon = leaderPokemons.find(p => !p.defeated && p.currentHp > 0)
                if (activePokemon) setCurrentLeaderPokemon(activePokemon)
            }

            if (leaderPokemons && leaderPokemons.length > 0) {
                setLeaderTeam(leaderPokemons.map(p => ({
                    ...p,
                    id: p.id || p.name,
                    revealed: p.defeated || p.currentHp < p.hp,
                })))
            }

            if (availablePokemons && availablePokemons.length > 0) {
                setPlayerTeam(availablePokemons.map(p => ({
                    ...p,
                    defeated: p.defeated || false,
                })))
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
                    availablePokemons,
                } = res.battleState || {}

                setBattleLog(log)

                if (currentPlayerPokemon) {
                    setCurrentPlayerPokemon(currentPlayerPokemon)
                } else if (availablePokemons && availablePokemons.length > 0) {
                    const lastActivePokemon = availablePokemons.find(p => p.currentHp >= 0)
                    if (lastActivePokemon) setCurrentPlayerPokemon(lastActivePokemon)
                }

                if (currentLeaderPokemon) {
                    setCurrentLeaderPokemon(currentLeaderPokemon)
                } else if (leaderPokemons && leaderPokemons.length > 0) {
                    const lastActivePokemon = leaderPokemons.find(p => p.currentHp >= 0)
                    if (lastActivePokemon) setCurrentLeaderPokemon(lastActivePokemon)
                }

                if (leaderPokemons && leaderPokemons.length > 0) {
                    setLeaderTeam(leaderPokemons.map(p => ({
                        ...p,
                        id: p.id || p.name,
                        revealed: true,
                    })))
                }

                if (availablePokemons && availablePokemons.length > 0) {
                    setPlayerTeam(availablePokemons)
                }
            }

            setBattleResult(res)
            setLoading({ loading: false })
        })

        socket.on('gym-battle-error', () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
                loadingTimeoutRef.current = null
            }
            setLoading({ loading: false })
            setBattleState('pre-battle')
        })

        socket.on('gym-victory', (res) => {
            setShouldClearGym(true)
            setNextGym(res.nextGym || null)
            if (res.boxes) {
                setPlayer(prev => ({ ...prev, boxes: res.boxes }))
            }
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
        emit('gym-battle-start', { playerPokemonIds: pokemonIds }).catch(() => {
            if (loadingTimeoutRef.current) { clearTimeout(loadingTimeoutRef.current); loadingTimeoutRef.current = null }
            setLoading({ loading: false })
            setBattleState('pre-battle')
            handleToast({
                id: 'gym-start-error',
                title: t('common.error'),
                description: t('toast.connectionError'),
                status: 'error',
                position: 'top',
            })
        })
        setLastGymBattleTurn(session.turns)
        setBattleState('battling')
        setLoading({ loading: true, text: t('gym.startingBattle') })

        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = setTimeout(() => {
            setLoading({ loading: false })
            setBattleState('pre-battle')
        }, 15000)
    }

    const handleChoosePokemon = (arrayIndex) => {
        const selectedPokemon = availablePokemons[arrayIndex]
        const pokemonIndex = selectedPokemon?.index !== undefined ? selectedPokemon.index : arrayIndex

        if (selectedPokemon) setCurrentPlayerPokemon(selectedPokemon)

        setNeedsChoice(false)
        setLoading({ loading: true, text: t('gym.selectingPokemon') })
        emit('gym-battle-choose', { pokemonIndex }).catch(() => {
            if (loadingTimeoutRef.current) { clearTimeout(loadingTimeoutRef.current); loadingTimeoutRef.current = null }
            setLoading({ loading: false })
            handleToast({
                id: 'gym-choose-error',
                title: t('common.error'),
                description: t('toast.connectionError'),
                status: 'error',
                position: 'top',
            })
        })

        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = setTimeout(() => {
            setLoading({ loading: false })
        }, 15000)
    }

    const handleNext = () => {
        setLoading({ loading: true, text: t('gym.continuingBattle') })
        emit('gym-battle-next', {}).catch(() => {
            if (loadingTimeoutRef.current) { clearTimeout(loadingTimeoutRef.current); loadingTimeoutRef.current = null }
            setLoading({ loading: false })
            handleToast({
                id: 'gym-next-error',
                title: t('common.error'),
                description: t('toast.connectionError'),
                status: 'error',
                position: 'top',
            })
        })

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

        setBattleState('pre-battle')
        setPlayerTeam([])
        setLeaderTeam([])
        setBattleLog([])
        setBattleResult(null)
        setNeedsChoice(false)
        setAvailablePokemons([])

        advancePhase()
    }

    const handleSkip = () => {
        advancePhase()
    }

    if (!displayGym) return null

    return (
        <Flex flex="1" flexDir="column" w="100%" h="100%">
            {/* Pre-battle: Pokémon selection */}
            {battleState === 'pre-battle' && (
                <Flex flex="1" flexDir="column">
                    <GymPreBattle
                        gym={displayGym}
                        onStartBattle={handleStartBattle}
                    />
                    <Center py={3}>
                        <Tooltip label={t('gym.skipGymHint')} hasArrow placement="top">
                            <Button
                                colorScheme="gray"
                                variant="outline"
                                size="md"
                                onClick={handleSkip}
                            >
                                {t('gym.skipGym')}
                            </Button>
                        </Tooltip>
                    </Center>
                </Flex>
            )}

            {/* Battling */}
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

            {/* Result */}
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
        </Flex>
    )
}
