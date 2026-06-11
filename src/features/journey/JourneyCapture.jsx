import { useContext, useCallback } from "react"
import { Flex, Text, Button } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import ThrowCatchGame from "@pages/MiniGame/ThrowCatchGame"

export default function JourneyCapture({ lastFightResult, journeyState, setJourneyState, onComplete }) {
    const { player, session, setPlayer, syncPokemonsFromServer } = useContext(PlayerContext)

    const defeatedWild = lastFightResult?.defeatedWild

    const handleCatchResolve = useCallback(({ ballType, throwBonus }, callback) => {
        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {
                wildPokemonId: defeatedWild?.id,
                ballType,
                throwBonus,
            },
        }

        socket.emit('journey-capture', request, (res) => {
            if (res?.success) {
                const result = res.result
                if (result.balls) {
                    setPlayer(prev => ({ ...prev, balls: result.balls }))
                }
                if (result.captured && result.pokeTeam) {
                    syncPokemonsFromServer(result.pokeTeam, result.pokeBox || [])
                }
                if (result.captured && result.playerTeamStatus) {
                    setJourneyState(prev => ({
                        ...prev,
                        playerTeamStatus: result.playerTeamStatus,
                    }))
                }
                callback(result.captured)
            } else {
                callback(false)
            }
        })
    }, [player.id, session.sessionCode, defeatedWild, setPlayer, syncPokemonsFromServer, setJourneyState])

    const handleFinish = useCallback(() => {
        onComplete()
    }, [onComplete])

    if (!defeatedWild) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>No pokemon to capture</Text>
                <Button mt={4} onClick={onComplete}>Continue</Button>
            </Flex>
        )
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center">
            <ThrowCatchGame
                onFinish={handleFinish}
                onCatchResolve={handleCatchResolve}
                balls={player.balls}
                targetSprite={defeatedWild.sprite}
                targetName={defeatedWild.name}
            />
        </Flex>
    )
}
