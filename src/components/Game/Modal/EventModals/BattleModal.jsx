import { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    Button,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import BattleContent from "../../Battle/BattleContent"
import socket from "../../../../client"

export default function BattleModal({ battleId }) {
    const { updateGame } = useContext(PlayerContext)
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [myPokemonHp, setMyPokemonHp] = useState()
    const [pokemonOther, setPokemonOther] = useState()

    const battleEnd = () => {
        updateGame({ openBattleModal: false, openEncounterModal: true })
    }

    const battleChoosePokemonOther = (res) => {
        setPokemonOther(res)
    }
    
    const battleTurnUpdate = (res) => {
        setIsMyTurn(res.yourTurn)
        setPokemonOther(res.pokemonOther)
        setMyPokemonHp(res.pokemonHp)
    }

    useEffect(() => {
        socket.on('battle-end', battleEnd)
        socket.on('battle-choose-pokemon-other', res => battleChoosePokemonOther(res))
        socket.on('battle-turn-update', res => battleTurnUpdate(res))

        setPokemonOther({
            hp: {
                total: 5,
                actual: 4,
            },
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            roll: 5,
        })

        return () => {
            socket.off('battle-end', battleEnd)
            socket.off('battle-choose-pokemon-other', battleChoosePokemonOther)
            socket.off('battle-turn-update', battleTurnUpdate)
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
                        pokemonOther={pokemonOther}
                        isMyTurn={isMyTurn}
                    />

                    <Button mt={6} h={12} onClick={() => {
                        updateGame({ openBattleModal: false })
                    }}>
                        Close
                    </Button>
                </ModalContent>
            </Modal>
        </>
    )
}