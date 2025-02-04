import { useEffect, useState } from "react"
import { Tooltip, Image, Text } from "@chakra-ui/react"
import { stringToUpperCase } from "@utils"
import Card from "@components/Pokemon/Card"
import ConfirmationModal from "@components/Modal/ConfirmationModal"

export default function DayCareBoxPoke({ pokemon, handleTrade }) {
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Card poke={pokemon} tooltip={true} />
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        PokemonTooltip()
    }, [pokemon])

    return (
        <ConfirmationModal
            event={() => handleTrade(pokemon)}
            modalTitle={`Are you sure?`}
            modalText={`Confirming you gonna leave ${stringToUpperCase(pokemon.name)} on Day Care for good, you will only receive ${pokemon.rarity.rarity + 1} Dusts`}
            h={36}
            m={4}
        >
            <Text position={"absolute"} mt={24}>{stringToUpperCase(pokemon.name)}</Text>
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image w={36}
                    title={stringToUpperCase(pokemon.name)} 
                    src={pokemon.sprites.front}
                />
            </Tooltip>
        </ConfirmationModal>
    )
}