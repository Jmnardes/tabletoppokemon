import { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import BattleContent from "../../Battle/BattleContent"
import socket from "../../../../client"

export default function BattleModal({ battleId, participants, event }) {
    const { player, setLoadingApi } = useContext(PlayerContext)
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [myPokemonHp, setMyPokemonHp] = useState()
    const [opponent, setOpponent] = useState()
    const [opponentTrainer, setOpponentTrainer] = useState()
    const [isPokemonBattling, setIsPokemonBattling] = useState(false)
    const [battleLog, setBattleLog] = useState([])
    const [turnWinner, setTurnWinner] = useState()
    
    const battleTurnUpdate = (res) => {
        const players = res.players
        const log = res.result?.log
        const winner = res.result?.winner.pokemonId
        
        setIsMyTurn(res.yourTurn)
        setBattleLog(log)
        setTurnWinner(winner)

        players.forEach(battling_player => {
            if(battling_player.player !== player.id && battling_player.pokemon) {
                // setOpponents(old => [...old, {...battling_player.pokemon, hp: battling_player.hp}])
                
                battling_player.pokemon && setOpponent({
                    ...battling_player.pokemon,
                    hp: battling_player.hp
                })
            }

            if(battling_player.player === player.id) {
                setMyPokemonHp(battling_player.hp)

                if(battling_player.pokemon) {
                    setLoadingApi(false)
                    setIsPokemonBattling(true)
                }

                // if(battling_player.turn) {
                //     setIsMyTurn(true)
                // }

                // if(battling_player.hp === 0) {
                //     setIsPokemonBattling(false)
                // }
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
        <>
            <Modal isOpen size={"full"} isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <BattleContent
                        trainerName={player.status.trainerName}
                        battleId={battleId}
                        myPokemonHp={myPokemonHp}
                        isMyTurn={isMyTurn}
                        opponentTrainer={opponentTrainer}
                        opponent={opponent}
                        isPokemonBattling={isPokemonBattling}
                        battleLog={battleLog}
                        turnWinner={turnWinner}
                        event={event}
                    />
                </ModalContent>
            </Modal>
        </>
    )
}