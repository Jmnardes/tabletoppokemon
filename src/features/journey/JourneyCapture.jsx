import { useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Button } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"
import ThrowCatchGame from "@pages/MiniGame/ThrowCatchGame"

export default function JourneyCapture({ lastFightResult, journeyState, setJourneyState, onComplete }) {
    const { t } = useTranslation()
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
                        ballsUsedMap: { ...(prev.ballsUsedMap || {}), [ballType]: ((prev.ballsUsedMap || {})[ballType] || 0) + 1 },
                        capturedPokemonList: [...(prev.capturedPokemonList || []), result.pokemon],
                    }))
                } else {
                    // Ball used but capture failed
                    setJourneyState(prev => ({
                        ...prev,
                        ballsUsedMap: { ...(prev.ballsUsedMap || {}), [ballType]: ((prev.ballsUsedMap || {})[ballType] || 0) + 1 },
                    }))
                }
                callback({ captured: result.captured, fled: result.fled })
            } else {
                callback({ captured: false, fled: true })
            }
        })
    }, [player.id, session.sessionCode, defeatedWild, setPlayer, syncPokemonsFromServer, setJourneyState])

    const handleFinish = useCallback(() => {
        onComplete()
    }, [onComplete])

    if (!defeatedWild) {
        return (
            <Flex flex="1" direction="column" align="center" justify="center">
                <Text>{t('journey.noPokemonToCapture')}</Text>
                <Button mt={4} onClick={onComplete}>{t('common.continue')}</Button>
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
                berryBonuses={lastFightResult?.berryBonuses}
                minigameBonus={player.status?.minigameBonus || 0}
                isShiny={defeatedWild?.rarity === 3}
            />
        </Flex>
    )
}
