import { useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import socket from '../client'

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const toast = useToast()
    const [loadingApi, setLoadingApi] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [waitingForPlayers, setWaitingForPlayers] = useState(false)
    const [confetti, setConfetti] = useState(true)
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [encounter, setEncounter] = useState({})
    const [pokeTeam, setPokeTeam] = useState([])
    const [pokeBox, setPokeBox] = useState([])
    const [game, setGame] = useState({
        gameEnded: false,
        isPokemonRollDisabled: false,
        openPokeShop: false,
        updateShop: false,
        openChallengeModal: false,
        openWalkModal: false,
        openGymModal: false,
        openEncounterModal: false,
        openSelectScreenModal: false,
        openPokeBoxModal: false,
        openBattleModal: false
    })

    const emit = useCallback((name, data) => {
        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data,
        }

        socket.emit(name, request)
    }, [player, session])
    
    const handleToast = (args) => {
        if (!toast.isActive(args.id)) {
            toast({
                ...args, 
                duration: args.duration ?? 6000, 
                status: args.status ?? 'info'
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

    const updatePlayer = useCallback((qty, key, type) => {
        if(type) {
            const newObj = { ...player[key] }
    
            newObj[type] = qty
    
            setPlayer({...player, [key]: newObj})
        } else {
            setPlayer({...player, [key]: qty})
        }
    }, [player])

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

    const updatePokeTeam = (poke) => setPokeTeam(old => old ? [...old, poke] : [poke])
    const updatePokeBox = (poke) => setPokeBox(old => old ? [...old, poke] : [poke])
    const removeFromPokeTeam = (poke, arr) => {
        // eslint-disable-next-line array-callback-return
        arr.filter((data, index) => {
            if(data.id === poke.id) {
                arr.splice(index, 1)
            }
            setPokeTeam(arr)
        })
    }
    const removeFromPokeBox = (poke, arr) => {
        // eslint-disable-next-line array-callback-return
        arr.filter((data, index) => {
            if(data.id === poke.id) {
                arr.splice(index, 1)
            }
            setPokeBox(arr)
        })
    }

    const changeBall = (qty, which) => updatePlayer(qty, 'balls', which)
    const updateBall = (qty, which) => updatePlayer(player.balls[which] + qty, 'balls', which)

    const changeItem = (qty, which) => updatePlayer(qty, 'items', which)
    const updateItem = (qty, which) => updatePlayer(player.items[which] + qty, 'items', which)

    const changeCurrency = (qty, which) => updatePlayer(qty, 'currency', which)
    const updateCurrency = (qty, which) => updatePlayer(player.currency[which] + qty, 'currency', which)

    useEffect(() => {
        if (player.status) {
            emit('player-update-status', { level: player.status.level })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.status?.level])

    useEffect(() => {
        if (player.currency) {
            emit('player-update-currency', player.currency)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.currency?.coins, player.currency?.stars, player.currency?.crowns])

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

            // SESSION
        socket.on('session-join', (res) => {
            setSession(res.session)
            setOpponents(res.opponents)
            setPlayer(res.player)

            localStorage.setItem('session', JSON.stringify(res.session))
        })

        socket.on('session-join-other', res => {
            setOpponents(old => ([ ...(old ?? []), res ]))
        })

        socket.on('session-leave-other', res => {
            setOpponents(old => (old.filter(opponent => opponent.id !== res)))
        })

            // LOBBY
        socket.on('lobby-ready', res => {
            setPlayer(old => ({ ...old, ready: res }))
        })

        socket.on('lobby-ready-other', res => {
            updateOpponent(res.id, res.ready, 'ready')
        })

        socket.on('lobby-start', (res) => {
            // setEncounter([...res.starters])
            setHasGameStarted(true)
            // updateGame({ openEncounterModal: true })
        })

            //TURNS
        // receiveng other players turn ready
        socket.on('turn-end-other', res => {
            updateOpponent(res, true, 'turnReady')
        })
        
            //PLAYERS
        socket.on('player-update-status-other', res => {
            updateOpponent(res.id, res.data, 'status')
        })

        socket.on('player-update-currency-other', res => {
            updateOpponent(res.id, res.data, 'currency')
        })

        socket.on('player-capture-pokemon', res => {
            updatePokeTeam(res)

            updateGame({ openEncounterModal: false })
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PlayerContext.Provider value={{
            emit,
            handleToast,

            loadingApi,
            setLoadingApi,
            loadingText,
            setLoadingText,

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

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,

            game,
            updateGame,

            pokeTeam,
            updatePokeTeam,
            removeFromPokeTeam,
            pokeBox,
            updatePokeBox,
            removeFromPokeBox,

            changeCurrency,
            updateCurrency,

            updateBall,
            changeBall,
            
            updateItem,
            changeItem,

            confetti,
            setConfetti
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;