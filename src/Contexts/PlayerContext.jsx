import { createContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const [playerData, setPlayerData] = useState({
        trainerName: 'trainer',
        level: 0,
        experience: 0,
        catches: 0,
        shinyCatches: 0,
        walkedBlocks: 0,
        highestAmount: 0,
        criticals: 0,
    })
    const [playerPokemons, setPlayerPokemons] = useState([])
    const [gameStats, setGameStats] = useState({
        coins: 0,
        stars: 0,
        crowns: 0,
    })
    const [pokeballs, setPokeballs] = useState({
        greatball: 0,
        superball: 1,
        ultraball: 0,
        masterball: 0,
    })
    const [items, setItems] = useState({
        steal: 0,
        fight: 0,
        pokemonEgg: 0,
        incubator: 0,
    })

    const updatePlayerData = (prevData, newData) => {
        setPlayerData({...prevData, ...newData});
    }

    const updateGameStats = (prevData, newData) => {
        setGameStats({...prevData, ...newData});
    }

    const updatePokeballs = (prevData, newData) => {
        setPokeballs({...prevData, ...newData});
    }

    const updateItems = (prevData, newData) => {
        setItems({...prevData, ...newData});
    }

    return (
        <PlayerContext.Provider value={{ 
            playerData, 
            updatePlayerData,
            playerPokemons,
            gameStats,
            updateGameStats,
            pokeballs,
            updatePokeballs,
            items,
            updateItems,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;