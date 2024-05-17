import { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import BattleContent from "../../Battle/BattleContent"
import socket from "../../../../client"

export default function BattleModal({ battleId }) {
    const { player, setLoadingApi } = useContext(PlayerContext)
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [myPokemonHp, setMyPokemonHp] = useState()
    const [opponents, setOpponents] = useState([])
    const [isPokemonBattling, setIsPokemonBattling] = useState(false)
    
    const battleTurnUpdate = (res) => {
        let players = res.players
        setIsMyTurn(res.yourTurn)

        players.forEach(battling_player => {
            if(battling_player.player !== player.id && battling_player.pokemon) {
                setOpponents(old => [...old, {...battling_player.pokemon, hp: battling_player.hp}])
            }

            if(battling_player.player === player.id) {
                setMyPokemonHp(battling_player.hp)

                if(battling_player.pokemon) {
                    setLoadingApi(false)
                    setIsPokemonBattling(true)
                }

                if(battling_player.turn) {
                    setIsMyTurn(true)
                }

                if(battling_player.hp === 0) {
                    setIsPokemonBattling(false)
                }
            }
        })
    }

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
                        battleId={battleId}
                        myPokemonHp={myPokemonHp}
                        isMyTurn={isMyTurn}
                        opponents={opponents}
                        isPokemonBattling={isPokemonBattling}
                    />
                </ModalContent>
            </Modal>
        </>
    )
}