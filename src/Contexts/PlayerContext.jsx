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
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [game, setGame] = useState({
        turn: 0,
        gameEnded: false,
        isPokemonRollDisabled: false
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

    const changeBall = (qty, which) => updatePlayer(qty, 'balls', which)
    const updateBall = (qty, which) => updatePlayer(player.balls[which] + qty, 'balls', which)

    const changeItem = (qty, which) => updatePlayer(qty, 'items', which)
    const updateItem = (qty, which) => updatePlayer(player.items[which] + qty, 'items', which)

    const changeCurrency = (qty, which) => updatePlayer(qty, 'currency', which)
    const updateCurrency = (qty, which) => updatePlayer(player.currency[which] + qty, 'currency', which)


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

        socket.on('lobby-start', () => {
            setHasGameStarted(true)
        })

            //TURNS
        // receiveng other players turn ready
        socket.on('turn-end-other', res => {
            updateOpponent(res, true, 'turnReady')
        })

        // everyone has ended turn, and will start another one
        socket.on('turn-start', res => {
            updateOpponents(false, 'turnReady')

            // event
            console.log(res)
            // logic for event type

            setWaitingForPlayers(false)
            setGame(old => ({turn: old.turn + 1, isPokemonRollDisabled: false}))
            // setLoadingApi(false)
        })
        
            //PLAYERS
        socket.on('player-update-status-other', res => {
            updateOpponent(res.id, res.data, 'status')
        })

        socket.on('player-update-currency-other', res => {
            updateOpponent(res.id, res.data, 'currency')
        })

    }, [])

    return (
        <PlayerContext.Provider value={{
            emit,
            handleToast,

            setLoadingApi,
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

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,

            loadingApi,
            loadingText,

            game,
            updateGame,

            changeCurrency,
            updateCurrency,

            updateBall,
            changeBall,
            
            updateItem,
            changeItem,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;