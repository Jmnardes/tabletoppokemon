import { useContext, useEffect, useState } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import BattleContent from "../Battle/BattleContent"
import socket from "@client"
import GenericModal from "@components/Modal/GenericModal"

export default function BattleModal({ battleId, participants, event }) {
    const { player, setLoading } = useContext(PlayerContext)
    const [opponent, setOpponent] = useState()
    const [opponentTrainer, setOpponentTrainer] = useState()
    const [isPokemonBattling, setIsPokemonBattling] = useState(false)
    const [battleLog, setBattleLog] = useState([])
    const [turnWinner, setTurnWinner] = useState()
    
    const battleTurnUpdate = (res) => {
        const players = res.players
        const log = res.result?.log
        const winner = res.result?.winner.pokemonId
        
        setBattleLog(log)
        setTurnWinner(winner)

        players.forEach(battlingPlayer => {
            if(battlingPlayer.player !== player.id && battlingPlayer.pokemon) {
                // setOpponents(old => [...old, {...battlingPlayer.pokemon, hp: battlingPlayer.hp}])
                
                battlingPlayer.pokemon && setOpponent({
                    ...battlingPlayer.pokemon,
                    hp: battlingPlayer.hp
                })
            }

            if(battlingPlayer.player === player.id) {
                if(battlingPlayer.pokemon) {
                    setLoading({ loading: false })
                    setIsPokemonBattling(true)
                }
            }
        })
    }

    useEffect(() => {
        if (participants) {
            const trainerOpponent = participants.find(participant => participant.id !== player.id);
            setOpponentTrainer(trainerOpponent);
        }
    }, [participants, player]);

    useEffect(() => {
        socket.on('battle-update', res => battleTurnUpdate(res))

        return () => {
            socket.off('battle-update', battleTurnUpdate)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <GenericModal title={"Poke Battle"}>
            <BattleContent
                battleId={battleId}
                opponentTrainer={opponentTrainer}
                opponent={opponent}
                isPokemonBattling={isPokemonBattling}
                battleLog={battleLog}
                turnWinner={turnWinner}
                event={event}
            />
        </GenericModal>
    )
}