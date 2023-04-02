import { createContext, useEffect, useState } from "react";
import socket from '../client'

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const [session, setSession] = useState({})
    const [player, setPlayer] = useState({})
    const [status, setStatus] = useState({
        trainerName: 'trainer',
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
        socket.on(`session-join`, (res) => {
            setSession(res.session)
            setPlayer(res.player)
        })

        socket.on(`session-new`)
    }, [])

    return (
        <PlayerContext.Provider value={{ 
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