import { useContext, useEffect } from "react"
import { CloseButton } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"

import TeamInBox from "./TeamInBox"
import PokeTeam from "@game/body/Team/PokeTeam"
import GenericModal from "@components/Modal/GenericModal"

export default function PokeBagModal() {
    const { updateGame, teamIds, boxIds, emit } = useContext(PlayerContext)

    const playerUpdateBag = () => {
        updateGame({ openPokeBoxModal: false, showBagLength: false })
    }

    useEffect(() => {
        socket.on('player-update-bag', playerUpdateBag)

        return () => {
            socket.off('player-update-bag', playerUpdateBag)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const totalPokemons = teamIds.length + boxIds.length

    return (
        <GenericModal
            title={"Poke Bag"}
            rewriteCloseButton={(
                <CloseButton 
                    position="absolute" 
                    right="20px"
                    isDisabled={teamIds.length !== 3 && totalPokemons >= 3}
                    title={teamIds.length !== 3 ? 'Você precisa de 3 pokemons no time' : 'Fechar'}
                    onClick={() => {
                        emit('player-update-bag', { newTeamIds: teamIds })
                    }} 
                />
            )}
        >
            <TeamInBox />

            <PokeTeam bag={true} />
        </GenericModal>
    )
}