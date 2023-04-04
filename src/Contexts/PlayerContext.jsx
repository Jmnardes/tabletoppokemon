import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import socket from '../client'

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const toast = useToast()
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [waitingForPlayers, setWaitingForPlayers] = useState(false)
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [status, setStatus] = useState({
        trainerName: '',
        level: 0,
        experience: 0,
        catches: 0,
        shinyCatches: 0,
        walkedBlocks: 0,
        highestAmount: 0,
        criticals: 0,
    })
    const [pokeTeam, setPokeTeam] = useState([])
    const [pokeBox, setPokeBox] = useState([])
    const [currency, setCurrency] = useState({
        coins: 0,
        stars: 0,
        crowns: 0,
    })
    const [balls, setBalls] = useState({
        pokeball: 0,
        greatball: 0,
        ultraball: 0,
        masterball: 0,
    })
    const [items, setItems] = useState({
        steal: 0,
        fight: 0,
        pokemonEgg: 0,
        incubator: 0,
        incense: 0
    })
    
    const handleToast = (id, title, description, icon, type = 'info', duration = 6000) => {
        if (!toast.isActive(id)) {
        toast({
            id: id,
            icon: icon,
            title: title,
            description: description,
            status: type,
            duration: duration,
            isClosable: true,
        })
        }
    }

    const updateStatus = (prevData, newData) => {
        setStatus({...prevData, ...newData});
    }
    
    const updatePokeTeam = (prevData, newData) => {
        setPokeTeam([...prevData, ...newData]);
    }
    
    const updatePokeBox = (prevData, newData) => {
        setPokeBox([...prevData, ...newData]);
    }

    const updateCurrency = (prevData, newData) => {
        setCurrency({...prevData, ...newData});
    }

    const updateBalls = (prevData, newData) => {
        setBalls({...prevData, ...newData});
    }

    const updateItems = (prevData, newData) => {
        setItems({...prevData, ...newData});
    }

    useEffect(() => {
        socket.on('generic-error', res => {
            console.log('error:' ,res)
        })

        socket.on('session-join', (res) => {
            setSession(res.session)
            setOpponents(res.opponents)
            setPlayer(res.player)

            localStorage.setItem('session', JSON.stringify(res.session))

            updateStatus(status, res.player.status)
            updateCurrency(currency, res.player.currency)
            updateBalls(balls, res.player.balls)
            updateItems(items, res.player.items)
        })

        socket.on('lobby-ready', res => {
            setPlayer(old => ({ ...old, ready: res }))
        })

        socket.on('session-join-other', res => {
            setOpponents(old => ([ ...(old ?? []), res ]))
        })

        socket.on('lobby-ready-other', res => {
            setOpponents(old => (old.map(opponent => opponent.id === res.id ? { ...opponent, ready: res.ready } : opponent)))
        })

        socket.on('lobby-start', () => {
            setHasGameStarted(true)
        })

        // receiveng other players turn ready
        socket.on('turn-end', res => {
            setOpponents(old => (old.map(opponent => opponent.id === res ? { ...opponent, turnReady: true } : opponent)))
        })

        // everyone has ended turn, and will start another one
        socket.on('turn-start', res => {
            setOpponents(old => (old.map(opponent => ({ ...opponent, turnReady: true }))))

            // event
            console.log(res)

            setWaitingForPlayers(false)
        })
    }, [])

    return (
        <PlayerContext.Provider value={{
            handleToast,

            session,
            setSession,

            opponents,
            setOpponents,

            player,
            setPlayer,

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,

            status, 
            updateStatus,

            pokeTeam,
            updatePokeTeam,

            pokeBox,
            updatePokeBox,

            currency,
            updateCurrency,

            balls,
            updateBalls,
            
            items,
            updateItems,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;