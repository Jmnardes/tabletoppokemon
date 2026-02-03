import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import socket from '@client'
import { getBerryIcon } from "@utils/berryIcon"

import starIcon from '@assets/images/game/star.png'
import tokenIcon from '@assets/images/game/coin.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import dustIcon from '@assets/images/items/dust.png'

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const toast = useToast()
    const [loading, setLoading] = useState({ loading: false, text: 'Loading...' })
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [waitingForPlayers, setWaitingForPlayers] = useState(false)
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [connected, setConnected] = useState(socket.connected)
    const [encounter, setEncounter] = useState({})
    const [pokemonData, setPokemonData] = useState({})
    const [teamIds, setTeamIds] = useState([])
    const [boxIds, setBoxIds] = useState([])
    const [daycarePokes, setDaycarePokes] = useState([])
    const [tasks, setTasks] = useState([])
    const [berries, setBerries] = useState([])
    const [gym, setGym] = useState(null)
    const [nextGym, setNextGym] = useState(null)
    const [lastGymBattleTurn, setLastGymBattleTurn] = useState(null)
    const [results, setResults] = useState({})
    const [nextEvent, setNextEvent] = useState('Walk')
    const [version, setVersion] = useState(0)
    const [game, setGame] = useState({
        gameEnded: false,
        isPokemonRollDisabled: false,
        showBagLength: false,
        openChallengeModal: false,
        openWalkModal: false,
        openGymModal: false,
        openEncounterModal: false,
        openSelectScreenModal: false,
        openPokeBoxModal: false,
        openBattleModal: false,
        openDayCareModal: false,
        openPokeItemModal: false,
        openPokeUpgradeModal: false,
        openBerriesModal: false,
        openPokemonCaptureModal: false,
        openNewTasksModal: false,
        openAugmentsModal: false,
    })

    const emit = useCallback((name, data, timeout = 5000) => {
        return new Promise((resolve, reject) => {
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
    }, [player, session])
    
    const handleToast = (args) => {
        let bgColor = "gray.400"

        if(args.status === 'error') bgColor = 'red.400'
        if(args.status === 'warning') bgColor = 'orange.400'
        if(args.status === 'success') bgColor = 'green.400'
        if(args.status === 'info') bgColor = 'blue.400'

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
            if (prev.length >= (session?.teamLength || 3)) {
                console.warn('Time já está cheio')
                return prev
            }
            if (prev.includes(pokemon.id)) return prev
            return [...prev, pokemon.id]
        })
    }, [session?.teamLength, setPokemon])

    const addToBox = useCallback((pokemon) => {
        setPokemon(pokemon)
        setBoxIds(prev => {
            if (prev.includes(pokemon.id)) return prev
            return [...prev, pokemon.id]
        })
    }, [setPokemon])

    const moveToBox = useCallback((pokemonId) => {
        setTeamIds(prev => prev.filter(id => id !== pokemonId))
        setBoxIds(prev => {
            if (prev.includes(pokemonId)) return prev
            return [...prev, pokemonId]
        })
    }, [])

    const moveToTeam = useCallback((pokemonId) => {
        setBoxIds(prev => prev.filter(id => id !== pokemonId))
        setTeamIds(prev => {
            if (prev.length >= (session?.teamLength || 3)) {
                console.warn('Time já está cheio')
                return prev
            }
            if (prev.includes(pokemonId)) return prev
            return [...prev, pokemonId]
        })
    }, [session?.teamLength])

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

    // Sincroniza estrutura antiga com nova quando receber dados do servidor
    const syncPokemonsFromServer = useCallback((teamArray, boxArray) => {
        const allPokemon = [...(teamArray || []), ...(boxArray || [])]
        setPokemons(allPokemon)
        setTeamIds((teamArray || []).map(p => p.id))
        setBoxIds((boxArray || []).map(p => p.id))
    }, [setPokemons])
    
    const syncTeamFromServer = useCallback((teamArray) => {
        if (!teamArray) return
        setPokemons(teamArray)
        setTeamIds(teamArray.map(p => p.id))
    }, [setPokemons])
    
    const syncBoxFromServer = useCallback((boxArray) => {
        if (!boxArray) return
        setPokemons(boxArray)
        setBoxIds(boxArray.map(p => p.id))
    }, [setPokemons])

    const changeBall = (amount, type) => updatePlayer(amount, 'balls', type)
    const updateBall = (amount, type) => updatePlayer(amount, 'balls', type)

    const updatePokeball = (amount) => updateBall(amount, 'pokeball')
    const updateGreatball = (amount) => updateBall(amount, 'greatball')
    const updateUltraball = (amount) => updateBall(amount, 'ultraball')
    const updateMasterball = (amount) => updateBall(amount,'masterball')

    const changeItem = (amount, type) => updatePlayer(amount, 'items', type)
    const updateItem = (amount, type) => updatePlayer(amount, 'items', type)

    const updateStatus = (type) => updatePlayer(1, 'status', type)
    const updateStatusAmount = (amount, type) => updatePlayer(amount, 'status', type)

    const updateDaycareToken = (amount) => updatePlayer(amount, 'daycare', 'token')

    useEffect(() => {
        if (player.status) {
            emit('player-update-status', { ...player.status })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.status])

    useEffect(() => {
        socket.on('error', res => {
            if(Object.keys(res)) {
                handleToast({
                    id: 'error',
                    title: 'Error',
                    description: res,
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
                title: `${res.status.trainerName} joined the room`,
                status: 'info',
            })
            newOpponent(res)
        })

        socket.on('session-leave-other', res => {
            handleToast({
                id: 'opponent-left',
                title: `${res.name} left the room`,
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
            setEncounter([...res.starters])
            setTasks([...res.initialTasks])
            setHasGameStarted(true)
            updateGame({ openEncounterModal: true })
        })

        socket.on('turn-end-other', res => {
            updateOpponent(res, true, 'turnReady')
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

        socket.on('daycare-pokemon-release', res => {
            setLoading({ loading: false })
            
            if (res) {
                syncBoxFromServer(res.pokeBox)
                updateDaycareToken(res.token)
                setDaycarePokes(prevPokes => [...prevPokes, res.pokemon])
                handleToast({
                    title: 'Daycare Token',
                    description: `Your ${res.pokemon.name} will be treated with kindness, you received ${res.token} token(s)`,
                    status: 'info',
                    duration: 6000,
                    icon:<Image src={tokenIcon} w={12}></Image>
                })
            }
        })

        socket.on('daycare-buy-item', res => {
            updateDaycareToken(-res.price)

            switch (res.item) {
                case 'greatball':
                    handleToast({
                        title: 'Greatball',
                        description: `A new Greatball has been added to your bag`,
                        status: 'info',
                        duration: 4000,
                        icon:<Image src={greatballIcon} w={12}></Image>
                    })
                    updateBall(1, res.item)
                    break
                case 'ultraball':
                    handleToast({
                        title: 'Ultraball',
                        description: `A new Ultraball has been added to your bag`,
                        status: 'info',
                        duration: 4000,
                        icon:<Image src={ultraballIcon} w={12}></Image>
                    })
                    updateBall(1, res.item)
                    break
                case 'dust':
                    handleToast({
                        title: 'Dust',
                        description: `A new Dust has been added to your bag`,
                        status: 'info',
                        duration: 4000,
                        icon:<Image src={dustIcon} w={12}></Image>
                    })
                    updateItem(1, res.item)
                    break
                case 'berry':
                    break
                default:
                    break
            }

            setLoading({ loading: false })
        })

        socket.on('player-update-task', res => {
            setTasks([...res.tasks])
            if (res.ranking > 0) {
                handleToast({
                    id: 'task-done',
                    title: "You've completed a task",
                    description: `You gained ${res.ranking} ranking points for this task!`,
                    icon: <Image 
                            width="32px"
                            src={starIcon} 
                            fallbackSrc={starIcon}
                        ></Image>,
                    position: 'top',
                    status: 'success',
                })
            }
            updatePlayer(res.ranking, 'status', 'ranking')
        })

        socket.on('player-use-berry', ({ berry, pokemon }) => {
            setBerries(prevBerries => {
                const usedBerryIndex = prevBerries.findIndex(prevBerry => prevBerry.type === berry.type);
    
                if (usedBerryIndex !== -1) {
                    if (prevBerries[usedBerryIndex].amount > 1) {
                        prevBerries[usedBerryIndex].amount--
                    } else {
                        prevBerries.splice(usedBerryIndex, 1)
                    }
                }
    
                return [...prevBerries]
            })

            if (pokemon?.id) {
                updatePokemon(pokemon.id, pokemon)
            }
            setLoading({ loading: false })
        })

        socket.on('player-gain-berry', ({ berries, newBerry }) => {
            setBerries(berries)

            handleToast({
                title: newBerry.name,
                description: `A new Berry has been added to your bag`,
                status: 'info',
                duration: 4000,
                icon:<Image src={getBerryIcon(newBerry.type)} w={12}></Image>
            })

            setLoading({ loading: false })
        })

        socket.on('player-use-dust', ({ pokemon, amount }) => {
            updateItem(-amount, 'dust')
            if (pokemon?.id) {
                updatePokemon(pokemon.id, pokemon)
            }
            setLoading({ loading: false })
        })

        socket.on('player-win-prize', ({ amount, key, type }) => {
            updatePlayer(amount, key, type)
            setLoading({ loading: false })
        })

        socket.on('player-update-team', res => {
            syncTeamFromServer(res.pokeTeam)
        })
        
        socket.on('player-update-box', res => {
            syncBoxFromServer(res.pokeBox)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        function onConnect() {
            console.log('✅ Connected to server') 
            setConnected(true)
            setLoading({
                loading: false
            })
        }

        function onDisconnect(reason) {
            console.log('❌ Disconnected:', reason) 
            setConnected(false)
            if (reason !== 'io client disconnect') {
                setLoading({
                    loading: true,
                    text: 'Connection lost. Reconnecting...'
                })
            }
        }

        function onReconnecting(attempt) {
            console.log(`🔄 Reconnecting... Attempt ${attempt}`) 
            setLoading({
                loading: true,
                text: `Reconnecting... (${attempt})`
            })
        }

        function onReconnected(data) {
            console.log('✅ Reconnected successfully!', data)
            if (data.player) 
                setPlayer(data.player) 
            if (data.session) 
                setSession(data.session) 
            setLoading({
                loading: false
            })
        }

        function onSessionExpired() {
            console.log('⚠️ Session expired') 
            setLoading({
                loading: false
            })
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
    }, [])

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

            nextEvent,
            setNextEvent,

            encounter,
            setEncounter,

            tasks,
            setTasks,

            berries,
            setBerries,

            gym,
            setGym,
            nextGym,
            setNextGym,
            lastGymBattleTurn,
            setLastGymBattleTurn,

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,

            game,
            updateGame,
            version,

            pokemonData,
            teamIds,
            boxIds,
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

            results,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;