import { useEffect, useState } from "react"
import PokemonTable from "./Table/PokemonTable"

import { pokemonBaseStat, whatNaturePokemonIs } from '../pokemonFunctions'
import { diceRoll, typeColor } from '../../util'
import pokemon from '../../assets/json/pokemons.json'
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Types from "./Table/Types"

function ShowPokemon({ pokemonId, nature, shiny, dex }) {
    const [pokemonNature, setPokemonNature] = useState('')
    const [isShiny, setIsShiny] = useState(false)
    const [colorByType, setColorByType] = useState('#000000')
    
    useEffect(() => {
        let shinyRoll = diceRoll(50)
        let color = typeColor(pokemon[pokemonId].type)
        setColorByType(color)
        setPokemonNature(whatNaturePokemonIs())
        shinyRoll === 0 ? setIsShiny(true) : setIsShiny(false)
        if (dex) shiny ? setIsShiny(true) : setIsShiny(false)
    }, [pokemonId])

    return (
        <>
            <Flex
                alignItems="center" 
                flexDirection="column" 
                border={ isShiny ? `8px groove ${colorByType}` : `2px solid ${colorByType}`}
                borderRadius={4}
                width={80}
                height={80}
                m={2}
                p={ isShiny ? 0 : 2}
                backgroundColor={ isShiny ? '#FFFFFF50' : `${colorByType}20` }
                background={ isShiny ? `radial-gradient(ellipse at bottom, ${colorByType} 20%, #4a4a4a50 70%)` : ''}
                key={pokemonId}
            >
                <Box position="absolute"><Text fontSize="5xl" color={colorByType}>{(isShiny ? '★ ' : '')}</Text></Box>
                <Flex width="100%" justifyContent="space-between" px={2} pt={1}>
                    <Box backgroundColor={colorByType} borderRadius="full" width={7} height={7} textAlign="center">
                        <Text fontSize="2x1" fontWeight="bold">{pokemon[pokemonId].tier}</Text>
                    </Box>
                    <Types types={pokemon[pokemonId].type} />
                </Flex>
                <Image width={40} alt={pokemon[pokemonId].tier} src={pokemon[pokemonId].sprite[`${isShiny ? 'shiny' : 'default'}`]} />
                <PokemonTable
                    health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', pokemonNature, isShiny)}
                    attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', pokemonNature, isShiny)}
                    defense={pokemonBaseStat(pokemon[pokemonId].stats, 'def', pokemonNature, isShiny)}
                    speed={pokemonBaseStat(pokemon[pokemonId].stats, 'spd', pokemonNature, isShiny)}
                    tier={pokemon[pokemonId].tier}
                    type={pokemon[pokemonId].type}
                    nature={nature ? nature : pokemonNature.nature}
                    name={pokemon[pokemonId].name}
                    shiny={isShiny}
                />
            </Flex>
        </>
    )    
}

export default ShowPokemon