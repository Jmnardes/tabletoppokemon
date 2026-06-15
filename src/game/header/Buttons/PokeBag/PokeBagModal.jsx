import { useContext, useEffect } from "react"
import { CloseButton } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

import PokeList from "@features/pokemon/PokeList"
import PokeTeam from "@game/body/Team/PokeTeam"
import GenericModal from "@components/Modal/GenericModal"
import { useTranslation } from "react-i18next"

export default function PokeBagModal() {
    const { updateGame, teamIds, boxIds, pokemonData, moveToTeam, emit } = useContext(PlayerContext)
    const { t } = useTranslation()

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

    const boxPokemons = boxIds.map(id => pokemonData[id]).filter(Boolean)
    const teamFull = teamIds?.length >= 6
    const teamHasMinimum = teamIds?.length >= 3

    return (
        <GenericModal
            title={t('action.pokeBag')}
            rewriteCloseButton={(
                <CloseButton 
                    position="absolute" 
                    right="20px"
                    isDisabled={!teamHasMinimum}
                    title={!teamHasMinimum ? t('action.needPokemonInTeam', { count: 3 }) : t('common.close')}
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