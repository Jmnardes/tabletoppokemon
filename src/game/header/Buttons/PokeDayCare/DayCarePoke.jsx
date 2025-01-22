import { useEffect, useState } from "react"
import { Tooltip, Image, Center, Text } from "@chakra-ui/react"
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
        <Center flexDir={"column"} backgroundColor={"gray.600"} borderRadius={8} w={52}>
            <ConfirmationModal
                bh={32}
                event={() => handleTrade(pokemon)}
                text={`Are you sure to leave ${stringToUpperCase(pokemon.name)} on Day Care for good?`}
            >
                <Text position={"absolute"} mt={24}>{stringToUpperCase(pokemon.name)}</Text>
                <Tooltip label={pokeStatsTooltip} background="none">
                    <Image w={36}
                        title={stringToUpperCase(pokemon.name)} 
                        src={pokemon.sprites.front}
                    />
                </Tooltip>
            </ConfirmationModal>
        </Center>
    )
}