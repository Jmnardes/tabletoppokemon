import { Flex, Text, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import socket from '@client'
import logger from '@utils/logger'

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const toast = useToast()
    const { t } = useTranslation()
    const loadingWatchdogRef = useRef(null) // Watchdog timer to prevent infinite loading
    const isReconnectingRef = useRef(false) // Prevent double resync on reconnection
    const [loading, setLoading] = useState({ loading: false, text: 'Loading...' })
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [waitingForPlayers, setWaitingForPlayers] = useState(false)
    const waitingForPlayersRef = useRef(false)
    useEffect(() => { waitingForPlayersRef.current = waitingForPlayers }, [waitingForPlayers])
    const [waitingSnapshot, setWaitingSnapshot] = useState(null)
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [connected, setConnected] = useState(socket.connected)
    const [encounter, setEncounter] = useState({})
    const [pokemonData, setPokemonData] = useState({})
    const [teamIds, setTeamIds] = useState([])
    const [boxIds, setBoxIds] = useState([])
    const [daycarePokes, setDaycarePokes] = useState([])
    const [trainingCamp, setTrainingCamp] = useState([])
    const [tasks, setTasks] = useState([])
    const [berries, setBerries] = useState([])
    const [berryShop, setBerryShop] = useState(null)
    const [berryTradeUsed, setBerryTradeUsed] = useState(false)
    const [berryPurchaseUsed, setBerryPurchaseUsed] = useState(false)
    const [farm, setFarm] = useState(null)
    const [craft, setCraft] = useState(null)
    const [gym, setGym] = useState(null)
    const [nextGym, setNextGym] = useState(null)
    const [gymRoute, setGymRoute] = useState([])
    const [lastGymBattleTurn, setLastGymBattleTurn] = useState(null)
    const [results, setResults] = useState({})
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [activeTab, setActiveTab] = useState('bag')
    const [turnPhases, setTurnPhases] = useState([])
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
    // nextEvent removed — no longer shown in header
    const [version, setVersion] = useState(0)
    const [game, setGame] = useState({
        gameEnded: false,
        isPokemonRollDisabled: false,
        showBagLength: false,
        openGymModal: false,
        openEncounterModal: false,
        openSelectScreenModal: false,
        openPokeBoxModal: false,
        openBattleModal: false,
        openPokeItemModal: false,
        openPokemonCaptureModal: false,
        openAugmentsModal: false,
        openStarterKitModal: false,
        openJourneySelection: false,
        isInJourney: false,
        journeyBagLocked: false,
        tutorialStep: null,
    })

    // Pokemon management functions - defined early for use in resync
    const setPokemon = useCallback((pokemon) => {
        setPokemonData(prev => ({
            ...prev,
            [pokemon.id]: pokemon
        }))
    }, [])

    const setPokemons = useCallback((pokemons) => {
        const newData = pokemons.reduce((acc, pokemon) => {
            acc[pokemon.id] = pokemon
            return acc
        }, {})
        setPokemonData(prev => ({ ...prev, ...newData }))
    }, [])

    const syncPokemonsFromServer = useCallback((teamArray, boxArray) => {
        const allPokemon = [...(teamArray || []), ...(boxArray || [])].filter(Boolean)
        setPokemons(allPokemon)
        setTeamIds((teamArray || []).map(p => p?.id).filter(Boolean))
        setBoxIds((boxArray || []).map(p => p?.id).filter(Boolean))
    }, [setPokemons])
    
    const syncTeamFromServer = useCallback((teamArray) => {
        if (!teamArray) return
        const validTeam = teamArray.filter(Boolean)
        setPokemons(validTeam)
        setTeamIds(validTeam.map(p => p?.id).filter(Boolean))
    }, [setPokemons])
    

    const syncBoxFromServer = useCallback((boxArray) => {
        if (!boxArray) return
        setPokemons(boxArray)
        setBoxIds(boxArray.map(p => p?.id).filter(Boolean))
    }, [setPokemons])

    // Update box and pokemonData with trainedCamp (array of pokes)
    // const updateTrainedCamp = useCallback((trainedCamp) => {
    //     if (!trainedCamp || !Array.isArray(trainedCamp)) return;
    //     setPokemons(trainedCamp);
    //     setBoxIds(prev => {
    //         const trainedIds = trainedCamp.map(p => p.id);
    //         // Ensure no duplicates
    //         return Array.from(new Set([...prev, ...trainedIds]));
    //     });
    // }, [setPokemons]);

    const emit = useCallback((name, data, timeout = 5000) => {
        let cancelled = false
        const promise = new Promise((resolve, reject) => {
            if (!socket.connected) {
                reject(new Error('Socket not connected')) 
                return
            }
            if (!player?.id || !session?.sessionCode) {
                reject(new Error('Invalid player or session')) 
                return
            }
            const request = {
                id: player.id,
                sessionCode: session.sessionCode,
                data,
            }
            const timer = setTimeout(() => {
                if (!cancelled) reject(new Error(`Timeout on ${name}`))
            }, timeout) 
            socket.emit(name, request, (response) => {
                clearTimeout(timer)
                if (cancelled) return
                if (response?.success) {
                    resolve(response.result)
                } else {
                    reject(new Error(response?.error || 'Unknown error'))
                }
            })
        })
        promise.cancel = () => { cancelled = true }
        return promise
    }, [player, session])

    /**
     * Emit that reads credentials from localStorage instead of React state.
     * Used only during reconnection bootstrap when React state is still empty.
     */
    const reconnectEmit = useCallback((name, data, timeout = 8000) => {
        return new Promise((resolve, reject) => {
            if (!socket.connected) {
                reject(new Error('Socket not connected'))
                return
            }
            const playerId = localStorage.getItem('playerId')
            const sessionCode = localStorage.getItem('sessionCode')
            if (!playerId || !sessionCode) {
                reject(new Error('No stored credentials'))
                return
            }
            const request = {
                id: playerId,
                sessionCode: sessionCode,
                data,
            }
            const timer = setTimeout(() => {
                reject(new Error(`Timeout on ${name}`))
            }, timeout)
            socket.emit(name, request, (response) => {
                clearTimeout(timer)
                if (response?.success) {
                    resolve(response.result)
                } else {
                    reject(new Error(response?.error || 'Unknown error'))
                }
            })
        })
    }, [])

    /**
     * RESYNC STRATEGY: Request full session snapshot from server
     * This prevents the UI from getting stuck when critical events are lost during disconnection.
     * Called automatically on reconnection and can be called manually when state seems inconsistent.
     * 
     * @param {Object} options
     * @param {boolean} options.useStoredCredentials - When true, uses localStorage credentials 
     *   instead of React state. Required when reconnecting after tab close (React state is empty).
     */
    const resync = useCallback(async ({ useStoredCredentials = false } = {}) => {
        logger.info('Requesting session resync...', { useStoredCredentials })
        try {
            const emitFn = useStoredCredentials ? reconnectEmit : emit
            const snapshot = await emitFn('session-resync', {}, 8000)
            
            // Apply the complete snapshot from server
            if (snapshot?.session) {
                setSession(snapshot.session)
                // If game has already started (session is no longer open), restore game screen
                if (snapshot.session.open === false) {
                    setHasGameStarted(true)
                }
                if (snapshot.session.gameEnded) {
                    updateGame({ gameEnded: true })
                }
            }
            if (snapshot?.player) {
                setPlayer(snapshot.player)
                setBerries(snapshot.player.berries || [])
                setTasks(snapshot.player.tasks || [])
                if (snapshot.player.berryShop) setBerryShop(snapshot.player.berryShop)
                setBerryTradeUsed(snapshot.player.berryTradeUsed || false)
                setBerryPurchaseUsed(snapshot.player.berryPurchaseUsed || false)
                if (snapshot.player.farm) setFarm(snapshot.player.farm)
                if (snapshot.player.craft) setCraft(snapshot.player.craft)
                if (snapshot.player.trainingCamp) setTrainingCamp(snapshot.player.trainingCamp)
                
                // Sync Pokemon data
                if (snapshot.player.pokeTeam || snapshot.player.pokeBox) {
                    syncPokemonsFromServer(
                        snapshot.player.pokeTeam || [],
                        snapshot.player.pokeBox || []
                    )
                }

                // Restore encounter (pokemon available for capture this turn)
                setEncounter(snapshot.player.encounter || [])

                // Restore gym battle turn tracker
                setLastGymBattleTurn(snapshot.player.lastGymDefeatedTurn ?? null)

                // Restore waiting state based on whether player already ended their turn
                setWaitingForPlayers(snapshot.player.turnReady === true)
                if (snapshot.player.turnReady && snapshot.opponents) {
                    const playerCard = {
                        id: snapshot.player.id,
                        status: snapshot.player.status,
                        online: true,
                        turnReady: true,
                        journeyLevel: snapshot.player.journeyLevel ?? 1,
                        journeyProgress: snapshot.player.journeyProgress ?? 0,
                        daycareToken: snapshot.player.daycare?.token ?? 0,
                        isPlayer: true,
                    }
                    setWaitingSnapshot([playerCard, ...snapshot.opponents.map(o => ({ ...o }))])
                }

                // Restore mid-turn state: phases, battle data, and journey preview
                if (!snapshot.player.turnReady && snapshot.session?.open === false && !snapshot.session?.gameEnded) {
                    const restoredPhases = snapshot.player.turnPhases?.length > 0
                        ? snapshot.player.turnPhases
                        : ['freeActions']
                    setTurnPhases(restoredPhases)
                    setCurrentPhaseIndex(0)
                    updateGame({
                        battleData: snapshot.player.battleData || null,
                        journeyWildPreview: snapshot.player.journeyWildPreview || [],
                    })
                }

                // Restore journey-related game flags
                if (snapshot.player.currentJourney) {
                    updateGame({ isInJourney: true, journeyBagLocked: true })
                }
            }
            if (snapshot?.opponents) setOpponents(snapshot.opponents)
            if (snapshot?.version !== undefined) setVersion(snapshot.version)

            // Restore gym data from player object
            if (snapshot?.player?.currentGym !== undefined) setGym(snapshot.player.currentGym)
            if (snapshot?.player?.nextGym !== undefined) setNextGym(snapshot.player.nextGym)
            if (snapshot?.player?.gymRoute) setGymRoute(snapshot.player.gymRoute)

            // Restore game results if game has ended
            if (snapshot?.gameResults) {
                setResults(snapshot.gameResults)
            }

            // Restore journey mid-state if player was in a journey
            if (snapshot?.journeySnapshot) {
                updateGame({
                    isInJourney: true,
                    journeyBagLocked: true,
                    journeyData: snapshot.journeySnapshot,
                })
            }
            
            // Clear loading state after successful resync
            setLoading({ loading: false })
            
            logger.info('Resync completed successfully')
            return snapshot
        } catch (error) {
            logger.error('Resync failed', { error: error?.message, stack: error?.stack })
            
            const msg = error?.message || ''
            const isStaleSession = 
                msg.includes('not found') ||
                msg.includes('Session not found') ||
                msg.includes('Player not found') ||
                msg.includes('Sessão inválida') ||
                msg.includes('Jogador inválido') ||
                msg.includes('No stored credentials')

            if (isStaleSession) {
                // Stale localStorage credentials — clean up silently, no scary toast
                logger.info('Stale session credentials, clearing localStorage')
                localStorage.removeItem('playerId')
                localStorage.removeItem('sessionCode')
                setLoading({ loading: false })
                return
            }

            if (msg.includes('expired')) {
                handleToast({
                    id: 'session-expired',
                    title: t('toast.sessionExpired'),
                    description: t('toast.sessionExpiredDesc'),
                    status: 'warning',
                    position: 'top'
                })
                localStorage.removeItem('playerId')
                localStorage.removeItem('sessionCode')
                setTimeout(() => {
                    window.location.href = '/lobby'
                }, 1500)
            } else {
                handleToast({
                    id: 'resync-error',
                    title: t('toast.syncError'),
                    description: t('toast.syncErrorDesc'),
                    status: 'error',
                    position: 'top'
                })
                setLoading({ loading: false })
            }
            throw error
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emit, reconnectEmit, syncPokemonsFromServer])
    
    const MAX_NOTIFICATIONS = 20

    const handleToast = (args) => {
        let bgColor = "gray.400"

        if(args.status === 'error') bgColor = 'red.400'
        if(args.status === 'warning') bgColor = 'orange.400'
        if(args.status === 'success') bgColor = 'green.400'
        if(args.status === 'info') bgColor = 'blue.400'

        // Push to notification history
        setNotifications(prev => {
            const entry = { title: args.title, description: args.description, status: args.status, timestamp: Date.now() }
            const next = [entry, ...prev]
            return next.length > MAX_NOTIFICATIONS ? next.slice(0, MAX_NOTIFICATIONS) : next
        })
        setUnreadCount(prev => prev + 1)

        if (!toast.isActive(args.id)) {
            toast({
                ...args, 
                duration: args.duration ?? 6000,
                render: ({ onClose }) => (
                    <Flex p={4} borderRadius={8} bg={bgColor} onClick={onClose}>
                        {args.icon && args.icon}
                        <Flex ml={2} flexDir="column">
                            <Text mb={2}>{args.title}</Text>
                            <Text fontSize="2xs">{args.description}</Text>
                        </Flex>
                    </Flex>
                ),
            })
        }
    }

    const markNotificationsRead = () => setUnreadCount(0)

    /* TOAST PROPS
        id,
        title,
        description,
        status,
        icon,
        position,
        duration,
        isClosable */

    const updateGame = (newData) => {setGame(old => ({...old, ...newData}))}

    const getCurrentPhase = useCallback(() => {
        return turnPhases[currentPhaseIndex] || null
    }, [turnPhases, currentPhaseIndex])

    const buildPlayerCard = useCallback(() => ({
        id: player.id,
        status: player.status,
        online: true,
        turnReady: true,
        journeyLevel: game.journeyLevel ?? 1,
        journeyProgress: game.journeyProgress ?? 0,
        daycareToken: player.daycare?.token ?? 0,
        isPlayer: true,
    }), [player.id, player.status, player.daycare, game.journeyLevel, game.journeyProgress])

    const advancePhase = useCallback(async () => {
        const nextIndex = currentPhaseIndex + 1
        if (nextIndex >= turnPhases.length) {
            // All phases done — finish turn
            setWaitingSnapshot([buildPlayerCard(), ...opponents.map(o => ({ ...o }))])
            setWaitingForPlayers(true)
            emit('turn-end')
        } else {
            setCurrentPhaseIndex(nextIndex)
        }
    }, [currentPhaseIndex, turnPhases, emit, setWaitingForPlayers, buildPlayerCard, opponents])

    // Merge only turnReady into the frozen snapshot so card colors update live
    useEffect(() => {
        setWaitingSnapshot(prev => {
            if (!prev) return prev
            return prev.map(card => {
                if (card.isPlayer) return card
                const live = opponents.find(o => o.id === card.id)
                if (live && live.turnReady !== card.turnReady) {
                    return { ...card, turnReady: live.turnReady }
                }
                return card
            })
        })
    }, [opponents])

    // Clear snapshot when waiting ends
    useEffect(() => {
        if (!waitingForPlayers) setWaitingSnapshot(null)
    }, [waitingForPlayers])

    const updatePlayer = useCallback((amount, key, type) => {
        if(type) {
            setPlayer(prevPlayer => {
                const newPlayerKey = { ...prevPlayer[key] }
                newPlayerKey[type] += amount

                return {...prevPlayer, [key]: newPlayerKey}
            })
        } else {
            setPlayer(prevPlayer => ({...prevPlayer, [key]: amount}))
        }
    }, [])

    const updateOpponent = useCallback((id, value, key, type = null) => {
        if(type) {
            setOpponents((old => old.map(opponent => {
                if (opponent.id === id) {
                    const newObj = { ...opponent[key] }
                    newObj[type] = value
                    return { ...opponent, [key]: newObj }
                }
                else return opponent
            })))
        } else {
            setOpponents((old => old.map(opponent => {
                return (opponent.id === id) ? { ...opponent, [key]: value } : opponent
            })))
        }
    }, [])
    const updateOpponents = useCallback((value, key, type = null) => {
        if(type) {
            setOpponents((old => old.map(opponent => {
                const newObj = { ...opponent[key] }
                newObj[type] = value
                return { ...opponent, [key]: newObj }
            })))
        } else {
            setOpponents((old => old.map(opponent => ({ ...opponent, [key]: value }))))
        }
    }, [])
    const newOpponent = (opponent) => setOpponents(old => [...old, opponent])
    const removeOpponentById = (id) => setOpponents(old => old.filter(player => player.id!== id))

    const updatePokemon = useCallback((pokemonId, updates) => {
        setPokemonData(prev => ({
            ...prev,
            [pokemonId]: { ...prev[pokemonId], ...updates }
        }))
    }, [])

    const removePokemon = useCallback((pokemonId) => {
        setPokemonData(prev => {
            const newData = { ...prev }
            delete newData[pokemonId]
            return newData
        })
        setTeamIds(prev => prev.filter(id => id !== pokemonId))
        setBoxIds(prev => prev.filter(id => id !== pokemonId))
    }, [])

    const addToTeam = useCallback((pokemon) => {
        setPokemon(pokemon)
        setTeamIds(prev => {
            if (prev.length >= 6) {
                console.warn('Time já está cheio')
                return prev
            }
            if (prev.includes(pokemon.id)) return prev
            return [...prev, pokemon.id]
        })
    }, [setPokemon])

    const addToBox = useCallback((pokemon) => {
        setPokemon(pokemon)
        setBoxIds(prev => {
            if (prev.includes(pokemon.id)) return prev
            return [...prev, pokemon.id]
        })
    }, [setPokemon])

    const moveToBox = useCallback(async (pokemonId) => {
        const newTeamIds = teamIds.filter(id => id !== pokemonId)
        if (newTeamIds.length < 3) return // min team size

        // Optimistic update
        setTeamIds(newTeamIds)
        setBoxIds(prev => {
            if (prev.includes(pokemonId)) return prev
            return [...prev, pokemonId]
        })

        try {
            await emit('player-update-bag', { newTeamIds })
        } catch (err) {
            // Rollback
            setTeamIds(prev => {
                if (prev.includes(pokemonId)) return prev
                return [...prev, pokemonId]
            })
            setBoxIds(prev => prev.filter(id => id !== pokemonId))
        }
    }, [teamIds, emit])

    const moveToTeam = useCallback(async (pokemonId) => {
        if (teamIds.length >= 6) return // max team size

        const newTeamIds = [...teamIds, pokemonId]

        // Optimistic update
        setBoxIds(prev => prev.filter(id => id !== pokemonId))
        setTeamIds(newTeamIds)

        try {
            await emit('player-update-bag', { newTeamIds })
        } catch (err) {
            // Rollback
            setTeamIds(prev => prev.filter(id => id !== pokemonId))
            setBoxIds(prev => {
                if (prev.includes(pokemonId)) return prev
                return [...prev, pokemonId]
            })
        }
    }, [teamIds, emit])

    const getTeamPokemons = useCallback(() => {
        return teamIds.map(id => pokemonData[id]).filter(Boolean)
    }, [teamIds, pokemonData])

    const getBoxPokemons = useCallback(() => {
        return boxIds.map(id => pokemonData[id]).filter(Boolean)
    }, [boxIds, pokemonData])

    const getAllPokemons = useCallback(() => {
        return [...getTeamPokemons(), ...getBoxPokemons()]
    }, [getTeamPokemons, getBoxPokemons])

    const getPokemon = useCallback((pokemonId) => {
        return pokemonData[pokemonId]
    }, [pokemonData])

    const changeBall = async (amount, type) => {
        const result = await emit('player-update-balls', { [type]: amount })
        if (result?.balls) {
            setPlayer(prev => ({ ...prev, balls: result.balls }))
        }
        return result
    }
    const updateBall = async (amount, type) => {
        const result = await emit('player-update-balls', { [type]: amount })
        if (result?.balls) {
            setPlayer(prev => ({ ...prev, balls: result.balls }))
        }
        return result
    }

    const updatePokeball = (amount) => updateBall(amount, 'pokeball')
    const updateGreatball = (amount) => updateBall(amount, 'greatball')
    const updateUltraball = (amount) => updateBall(amount, 'ultraball')
    const updateMasterball = (amount) => updateBall(amount,'masterball')

    const changeItem = async (amount, type) => {
        const result = await emit('player-update-status', { [type]: amount })
        // Atualiza status e items com o retorno do backend
        if (result?.status) {
            setPlayer(prev => ({ ...prev, status: result.status }))
        }
        if (result?.items) {
            setPlayer(prev => ({ ...prev, items: result.items }))
        }
        return result
    }
    const updateItem = async (amount, type) => {
        const result = await emit('player-update-status', { [type]: amount })
        // Atualiza status e items com o retorno do backend
        if (result?.status) {
            setPlayer(prev => ({ ...prev, status: result.status }))
        }
        if (result?.items) {
            setPlayer(prev => ({ ...prev, items: result.items }))
        }
        return result
    }

    const updateStatus = async (type) => {
        const result = await emit('player-update-status', { [type]: 1 })
        if (result?.status) {
            setPlayer(prev => ({ ...prev, status: result.status }))
        }
        if (result?.items) {
            setPlayer(prev => ({ ...prev, items: result.items }))
        }
        if (result?.augments) {
            setPlayer(prev => ({ ...prev, augments: result.augments }))
        }
        return result
    }
    const updateStatusAmount = async (amount, type) => {
        const result = await emit('player-update-status', { [type]: amount })

        if (result?.status) {
            setPlayer(prev => ({ ...prev, status: result.status }))
        }
        if (result?.items) {
            setPlayer(prev => ({ ...prev, items: result.items }))
        }

        if (result?.augments) {
            setPlayer(prev => ({ ...prev, augments: result.augments }))
        }
        return result
    }

    const updateDaycareToken = async (amount) => {
        const result = await emit('player-update-daycare', { token: amount })

        if (result?.daycare) {
            setPlayer(prev => ({ ...prev, daycare: result.daycare }))
        }
        return result
    }

    const playerWinPrize = async (prize) => {
        const result = await emit('player-win-prize', { prize })
        if (result) {
            const { amount, key, type } = result
            if (type) {
                setPlayer(prev => ({
                    ...prev,
                    [key]: { ...prev[key], [type]: prev[key][type] + amount }
                }))
            } else {
                setPlayer(prev => ({ ...prev, [key]: prev[key] + amount }))
            }
        }
        return result
    }

    useEffect(() => {
        socket.on('error', res => {
            const message = res?.message || (typeof res === 'string' ? res : '')
            if(message) {
                handleToast({
                    id: 'error',
                    title: t('common.error'),
                    description: message,
                    status: 'error',
                    position: 'top'
                })
            }
        })

        socket.on('session-join', (res) => {
            setSession(res.session)
            setOpponents(res.opponents)
            setPlayer(res.player)
            setVersion(res.version)
            setBerries(res.player.berries)
            if (res.player.farm) setFarm(res.player.farm)
            if (res.player.craft) setCraft(res.player.craft)
            if (res.player.trainingCamp) setTrainingCamp(res.player.trainingCamp)
            
            // Apenas como fallback se vier no session-join
            if (res.gym !== undefined) setGym(res.gym)
            if (res.nextGym !== undefined) setNextGym(res.nextGym)

            if (res.player.pokeTeam || res.player.pokeBox) {
                const team = res.player.pokeTeam || []
                const box = res.player.pokeBox || []
                syncPokemonsFromServer(team, box)
            }

            localStorage.setItem('session', JSON.stringify(res.session))
        })

        socket.on('session-join-other', res => {
            handleToast({
                id: 'opponent-join',
                title: t('lobby.playerJoined', { name: res.status.trainerName }),
                status: 'info',
            })
            newOpponent(res)
        })

        socket.on('session-leave-other', res => {
            handleToast({
                id: 'opponent-left',
                title: t('lobby.playerLeft', { name: res.name }),
                status: 'info',
            })
            removeOpponentById(res.id)
        })

        socket.on('lobby-ready', res => {
            setPlayer(old => ({ ...old, ready: res }))
        })

        socket.on('lobby-ready-other', res => {
            updateOpponent(res.id, res.ready, 'ready')
        })

        socket.on('lobby-start', (res) => {
            setEncounter(res.starters)
            setTasks([...res.initialTasks])
            if (res.berryShop) setBerryShop(res.berryShop)
            setHasGameStarted(true)
            updateGame({ openEncounterModal: true })
        })

        socket.on('turn-end-other', res => {
            updateOpponent(res, true, 'turnReady')
            setOpponents(prev => {
                const allReady = prev.every(op => op.id === res ? true : op.turnReady)
                if (allReady && !waitingForPlayersRef.current) {
                    handleToast({
                        id: 'everyone-waiting',
                        title: t('lobby.everyoneWaiting'),
                        status: 'info',
                    })
                }
                return prev
            })
        })

        socket.on('turn-end-other-return', res => {
            updateOpponent(res, false, 'turnReady')
        })

        socket.on('game-end', res => {
            setResults(res)
            updateGame({ gameEnded: true })
        })

        socket.on('player-update-status-other', res => {
            updateOpponent(res.id, res.data, 'status')
        })

        socket.on('journey-update-other', res => {
            updateOpponent(res.id, res.journeyProgress, 'journeyProgress')
            updateOpponent(res.id, res.journeyLevel, 'journeyLevel')
        })

        socket.on('player-update-status', res => {
            if (res?.status) {
                setPlayer(prev => ({ ...prev, status: res.status }))
            }
        })

        socket.on('player-update-task', res => {
            setTasks([...res.tasks])
            if (res.boxesEarned && Object.keys(res.boxesEarned).length > 0) {
                handleToast({
                    id: 'task-done',
                    title: t('taskBoard.taskComplete'),
                    description: t('taskBoard.boxEarned'),
                    position: 'top',
                    status: 'success',
                })
            }
            if (res.boxes) {
                setPlayer(prev => ({ ...prev, boxes: res.boxes }))
            }
        })


        // New: Update all items from server
        socket.on('player-update-items', res => {
            if (res?.items) {
                setPlayer(prev => ({ ...prev, items: res.items }))
            }
        })

        socket.on('player-update-daycare', res => {
            if (res?.daycare) {
                setPlayer(prev => ({ ...prev, daycare: res.daycare }));
            }
        });

        socket.on('player-update-team', res => {
            syncTeamFromServer(res.pokeTeam)
        })
        
        socket.on('player-update-box', res => {
            syncBoxFromServer(res.pokeBox)
        })

        return () => {
            socket.off('error')
            socket.off('session-join')
            socket.off('session-join-other')
            socket.off('session-leave-other')
            socket.off('lobby-ready')
            socket.off('lobby-ready-other')
            socket.off('lobby-start')
            socket.off('turn-end-other')
            socket.off('turn-end-other-return')
            socket.off('game-end')
            socket.off('player-update-status-other')
            socket.off('journey-update-other')
            socket.off('player-update-status')
            socket.off('player-update-task')
            socket.off('player-use-berry')
            socket.off('player-update-items')
            socket.off('player-update-team')
            socket.off('player-update-box')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * WATCHDOG: Anti-infinite loading mechanism
     * If loading persists for too long (8s), automatically trigger resync
     */
    useEffect(() => {
        // Clear any existing timer
        if (loadingWatchdogRef.current) {
            clearTimeout(loadingWatchdogRef.current)
            loadingWatchdogRef.current = null
        }

        // Start watchdog timer when loading begins
        if (loading.loading && player?.id && session?.sessionCode) {
            loadingWatchdogRef.current = setTimeout(() => {
                logger.warn('Loading timeout detected — triggering resync')
                resync().catch(err => {
                    logger.error('Watchdog resync failed', { error: err?.message, stack: err?.stack })
                })
            }, 8000) // 8 seconds timeout
        }

        // Cleanup on unmount or when loading changes
        return () => {
            if (loadingWatchdogRef.current) {
                clearTimeout(loadingWatchdogRef.current)
                loadingWatchdogRef.current = null
            }
        }
    }, [loading.loading, player?.id, session?.sessionCode, resync])

    useEffect(() => {
        function onConnect() {
            logger.info('Connected to server') 
            setConnected(true)
            
            // Automatically resync on connection if we have session data
            if (player?.id && session?.sessionCode) {
                // Normal reconnect (same tab, network drop) — React state is populated
                if (!isReconnectingRef.current) {
                    isReconnectingRef.current = true
                    resync().catch(err => {
                        logger.error('Connect resync failed', { error: err?.message, stack: err?.stack })
                        setLoading({ loading: false })
                    }).finally(() => { isReconnectingRef.current = false })
                }
            } else {
                // React state is empty — check localStorage for tab-close reconnection
                const storedPlayerId = localStorage.getItem('playerId')
                const storedSessionCode = localStorage.getItem('sessionCode')
                if (storedPlayerId && storedSessionCode && !isReconnectingRef.current) {
                    logger.info('Attempting reconnection from stored credentials', { storedPlayerId, storedSessionCode })
                    isReconnectingRef.current = true
                    setLoading({ loading: true, text: 'Reconnecting...' })
                    handleToast({
                        id: 'reconnecting',
                        title: t('toast.reconnecting'),
                        status: 'info',
                        position: 'top',
                        duration: 3000,
                    })
                    resync({ useStoredCredentials: true }).catch(err => {
                        logger.error('Stored credentials resync failed', { error: err?.message, stack: err?.stack })
                        // If session no longer exists, clean up localStorage
                        localStorage.removeItem('playerId')
                        localStorage.removeItem('sessionCode')
                        setLoading({ loading: false })
                    }).finally(() => { isReconnectingRef.current = false })
                } else {
                    setLoading({ loading: false })
                }
            }
        }

        function onDisconnect(reason) {
            logger.warn('Disconnected from server', { reason }) 
            setConnected(false)
            if (reason !== 'io client disconnect') {
                setLoading({
                    loading: true,
                    text: 'Connection lost. Reconnecting...'
                })
            }
        }

        function onReconnecting(attempt) {
            logger.info('Reconnecting...', { attempt }) 
            setLoading({
                loading: true,
                text: `Reconnecting... (${attempt})`
            })
        }

        function onReconnected(data) {
            logger.info('Reconnected successfully')
            
            if (isReconnectingRef.current) {
                logger.info('Resync already in progress, skipping duplicate from player-session-reconnected')
                return
            }
            isReconnectingRef.current = true

            // Determine which resync strategy to use
            const hasReactState = !!player?.id && !!session?.sessionCode
            resync({ useStoredCredentials: !hasReactState }).catch(err => {
                logger.error('Reconnect resync failed', { error: err?.message, stack: err?.stack })
                // Fallback to event data if resync fails
                if (data?.player) setPlayer(data.player)
                if (data?.session) setSession(data.session)
                // If game was in progress, restore game screen
                if (data?.session?.open === false) setHasGameStarted(true)
                setLoading({ loading: false })
            }).finally(() => { isReconnectingRef.current = false })
        }

        function onSessionExpired() {
            logger.warn('Session expired') 
            isReconnectingRef.current = false
            setLoading({ loading: false })
            localStorage.removeItem('playerId') 
            localStorage.removeItem('sessionCode') 
            setPlayer({}) 
            setSession({})
            window.location.href = '/lobby'
        }

        socket.on('connect', onConnect) 
        socket.on('disconnect', onDisconnect) 
        socket.io.on('reconnect_attempt', onReconnecting) 
        socket.on('player-session-reconnected', onReconnected) 
        socket.on('session-expired', onSessionExpired)
        return () => {
            socket.off('connect', onConnect) 
            socket.off('disconnect', onDisconnect) 
            socket.io.off('reconnect_attempt', onReconnecting) 
            socket.off('player-session-reconnected', onReconnected) 
            socket.off('session-expired', onSessionExpired)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player?.id, session?.sessionCode, resync])

    useEffect(() => {
        if (player?.id) {
            localStorage.setItem('playerId', player.id)
        }
        if (session?.sessionCode) {
            localStorage.setItem('sessionCode', session.sessionCode)
        }
    }, [player, session])

    return (
        <PlayerContext.Provider value={{
            emit,
            resync, // Exposed for manual resync if needed
            handleToast,

            loading,
            setLoading,
            connected,

            session,
            setSession,

            opponents,
            setOpponents,
            updateOpponent,
            updateOpponents,

            player,
            setPlayer,
            updatePlayer,



            encounter,
            setEncounter,

            tasks,
            setTasks,

            berries,
            setBerries,

            berryShop,
            setBerryShop,
            berryTradeUsed,
            setBerryTradeUsed,
            berryPurchaseUsed,
            setBerryPurchaseUsed,

            farm,
            setFarm,

            craft,
            setCraft,

            gym,
            setGym,
            nextGym,
            setNextGym,
            gymRoute,
            setGymRoute,
            lastGymBattleTurn,
            setLastGymBattleTurn,

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,
            waitingSnapshot,

            game,
            updateGame,
            version,

            activeTab,
            setActiveTab,

            turnPhases,
            setTurnPhases,
            currentPhaseIndex,
            setCurrentPhaseIndex,
            getCurrentPhase,
            advancePhase,

            pokemonData,
            teamIds,
            boxIds,
            setBoxIds,
            setPokemon,
            setPokemons,
            updatePokemon,
            removePokemon,
            addToTeam,
            addToBox,
            moveToBox,
            moveToTeam,
            getTeamPokemons,
            getBoxPokemons,
            getAllPokemons,
            getPokemon,
            syncPokemonsFromServer,
            syncTeamFromServer,
            syncBoxFromServer,

            updateDaycareToken,
            daycarePokes,
            setDaycarePokes,

            trainingCamp,
            setTrainingCamp,

            updateBall,
            changeBall,
            updatePokeball,
            updateGreatball,
            updateUltraball,
            updateMasterball,
            
            updateItem,
            changeItem,

            updateStatus,
            updateStatusAmount,

            playerWinPrize,

            results,

            notifications,
            unreadCount,
            markNotificationsRead,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;