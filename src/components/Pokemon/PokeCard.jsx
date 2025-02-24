import { useEffect, useState } from "react"
import { Tooltip, Image, Center } from "@chakra-ui/react"
import { stringToUpperCase } from "@utils"
import Card from "@components/Pokemon/Card"

export default function PokeCard ({ pokemon, setSelectedPokemon }) {
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
        <Center 
            flexDir={"column"} 
            backgroundColor={"gray.600"} 
            w={36} 
            _hover={{ opacity: 0.8 }} 
            cursor={"pointer"}
            onClick={() => {
                setSelectedPokemon(pokemon)
            }}
        >
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image w={32} minH={32} minW={32}
                    title={stringToUpperCase(pokemon.name)} 
                    src={pokemon.sprites.front}
                />
            </Tooltip>
        </Center>
    )
}