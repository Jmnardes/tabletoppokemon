import { useEffect, useState } from "react"
import PokemonTable from "./Table/PokemonTable"

import { pokemonBaseStat, whatNaturePokemonIs } from '../pokemonFunctions'
import { diceRoll, typeColor } from '../../util'
import pokemon from '../../assets/json/pokemons.json'
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Types from "./Table/Types"

function ShowPokemon({ pokemonId, nature, shiny, type }) {
    const [colorByType, setColorByType] = useState('#000000')
    
    useEffect(() => {
        let color = typeColor(pokemon[pokemonId].type)
        setColorByType(color)
    }, [pokemonId])

    return (
        <>
            <Flex
                alignItems="center" 
                flexDirection="column" 
                border={ shiny.shiny ? `8px groove ${colorByType}` : `2px solid ${colorByType}`}
                borderRadius={4}
                width={80}
                height={80}
                m={2}
                p={ shiny.shiny ? 0 : 2}
                backgroundColor={ shiny.shiny ? '#FFFFFF50' : `${colorByType}20` }
                background={ shiny.shiny ? `radial-gradient(ellipse at bottom, ${colorByType} 20%, #4a4a4a50 70%)` : ''}
            >
                <Box position="absolute"><Text fontSize="4xl" color={colorByType}>{(shiny.shiny ? '★ ' : '')}</Text></Box>
                <Flex width="100%" justifyContent="space-between" px={2} pt={1}>
                    <Box backgroundColor={colorByType} borderRadius="full" width={7} height={7} textAlign="center">
                        <Text fontSize="2x1" fontWeight="bold">{pokemon[pokemonId].tier}</Text>
                    </Box>
                    <Types types={pokemon[pokemonId].type} />
                </Flex>
                <Image width={40} alt={pokemon[pokemonId].tier} src={pokemon[pokemonId].sprite[`${shiny.shiny ? 'shiny' : 'default'}`]} />
                <PokemonTable
                    health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', nature, shiny)}
                    attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', nature, shiny)}
                    defense={pokemonBaseStat(pokemon[pokemonId].stats, 'def', nature, shiny)}
                    speed={pokemonBaseStat(pokemon[pokemonId].stats, 'spd', nature, shiny)}
                    tier={pokemon[pokemonId].tier}
                    type={pokemon[pokemonId].type}
                    nature={nature.nature}
                    name={pokemon[pokemonId].name}
                    shiny={shiny.shiny}
                />
            </Flex>
        </>
    )    
}

export default ShowPokemon