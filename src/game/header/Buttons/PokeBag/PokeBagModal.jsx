import { useContext, useEffect } from "react"
import { CloseButton } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

import PokeList from "@features/pokemon/PokeList"
import PokeTeam from "@game/body/Team/PokeTeam"
import GenericModal from "@components/Modal/GenericModal"

export default function PokeBagModal() {
    const { updateGame, teamIds, boxIds, pokemonData, moveToTeam, session, emit } = useContext(PlayerContext)

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
    const boxPokemons = boxIds.map(id => pokemonData[id]).filter(Boolean)
    const teamFull = teamIds?.length === session.teamLength

    return (
        <GenericModal
            title={"Poke Bag"}
            rewriteCloseButton={(
                <CloseButton 
                    position="absolute" 
                    right="20px"
                    isDisabled={!teamFull && totalPokemons >= (session?.teamLength || 6)}
                    title={!teamFull ? `Você precisa de ${session?.teamLength || 6} pokemons no time` : 'Fechar'}
                    onClick={() => {
                        emit('player-update-bag', { newTeamIds: teamIds })
                    }} 
                />
            )}
        >
            <PokeList
                pokemons={boxPokemons}
                onSelect={(poke) => moveToTeam(poke.id)}
                size="xs"
                sprite="mini"
                isDisabled={teamFull}
                containerProps={{ h: 14 }}
            />

            <PokeTeam bag={true} />
        </GenericModal>
    )
}