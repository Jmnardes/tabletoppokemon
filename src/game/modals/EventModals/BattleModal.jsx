import { useContext, useEffect, useState } from "react"
import { Flex, Text } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import BattleContent from "../Battle/BattleContent"
import socket from "@client"

export default function BattleScreen() {
    const { player, setLoading, game, advancePhase } = useContext(PlayerContext)
    const battleData = game.battleData
    const battleId = battleData?.battle?.id
    const participants = battleData?.battle?.participants
    const [opponentTrainer, setOpponentTrainer] = useState()
    const [battlePhase, setBattlePhase] = useState('select') // select | waiting | battle | result
    const [battleResult, setBattleResult] = useState(null)

    useEffect(() => {
        if (participants) {
            const trainerOpponent = participants.find(participant => participant.id !== player.id);
            setOpponentTrainer(trainerOpponent);
        }
    }, [participants, player]);

    useEffect(() => {
        socket.on('battle-team-selected', (res) => {
            // O outro jogador selecionou, continuo esperando
            if (res.playerId !== player.id && battlePhase === 'waiting') {
                // Nada a fazer, ainda esperando
            }
        })

        socket.on('battle-result', (res) => {
            setLoading({ loading: false })
            setBattleResult(res)
            setBattlePhase('battle')
        })

        return () => {
            socket.off('battle-team-selected')
            socket.off('battle-result')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battlePhase])

    // Auto-advance if no battle data for this turn
    useEffect(() => {
        if (!battleData) {
            advancePhase()
        }
    }, [battleData, advancePhase])

    if (!battleData) {
        return null
    }

    return (
        <Flex flex="1" flexDir="column" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">Poke Battle</Text>
            <BattleContent
                battleId={battleId}
                opponentTrainer={opponentTrainer}
                battlePhase={battlePhase}
                setBattlePhase={setBattlePhase}
                battleResult={battleResult}
                event={battleData}
                onBattleComplete={advancePhase}
            />
        </Flex>
    )
}