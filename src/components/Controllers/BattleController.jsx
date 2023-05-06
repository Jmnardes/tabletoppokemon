import { useContext, useEffect, useState } from "react"
import socket from "../../client"
import PlayerContext from "../../Contexts/PlayerContext"
import BattleModal from "../Game/Modal/Battle/BattleModal";

export default function BattleController({ battleId }) {
    const { 
        game,
    } = useContext(PlayerContext)
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [myPokemonHp, setMyPokemonHp] = useState()
    const [pokemonOther, setPokemonOther] = useState()

    useEffect(() => {
        socket.on('battle-choose-pokemon-other', res => {
            setPokemonOther(res)
        })

        socket.on('battle-turn-update', res => {
            setIsMyTurn(res.yourTurn)
            setPokemonOther(res.pokemonOther)
            setMyPokemonHp(res.pokemonHp)
        })

        setPokemonOther({
            hp: {
                total: 5,
                actual: 4,
            },
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            roll: 5,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {game.openBattleModal && <BattleModal
                battleId={battleId}
                myPokemonHp={myPokemonHp}
                pokemonOther={pokemonOther}
                isMyTurn={isMyTurn}
            />}
        </>
    )
}