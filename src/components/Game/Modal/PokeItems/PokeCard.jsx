import { useEffect, useState } from "react"
import { Tooltip, Image, Center } from "@chakra-ui/react"
import { stringToUpperCase } from "../../../../util"
import Card from "../../Pokemon/Card"

export default function PokeCard({ pokemon, setSelectedPokemon }) {
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
        <Center flexDir={"column"} backgroundColor={"gray.600"} w={52} _hover={{ opacity: 0.8 }} cursor={"pointer"} onClick={() => {
            setSelectedPokemon(pokemon)
        }}>
            {/* <Text position={"absolute"} mt={24}>{stringToUpperCase(pokemon.name)}</Text> */}
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image w={36} minH={36} minW={36}
                    title={stringToUpperCase(pokemon.name)} 
                    src={pokemon.sprites.front}
                />
            </Tooltip>
        </Center>
    )
}