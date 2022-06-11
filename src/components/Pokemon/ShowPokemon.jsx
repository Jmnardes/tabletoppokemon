import { useEffect, useState } from "react"

import pokemon from '../../assets/json/pokemons.json'

import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { pokemonBaseStat } from '../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../util'
import PokemonTable from "./Table/PokemonTable"
import Types from "./Table/Types"

function ShowPokemon({ pokemonId, nature, shiny }) {
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
                border={ shiny.shiny ? `4px ridge ${colorByType}` : `4px solid ${colorByType}`}
                borderRadius={6}
                width={44}
                height={40}
                m={1}
                p={1}
                backgroundColor={ shiny.shiny ? '#FFFFFF50' : `${colorByType}35` }
                background={ shiny.shiny ? `linear-gradient(165deg, ${colorByType}05 15%, ${colorByType} 50%, ${colorByType}05 85%)` : ''}
                _hover={{
                    backgroundColor: `${colorByType}70`,
                    border: `${shiny.shiny ? '6px ridge' : '6px outset'} ${colorByType}`,
                    cursor: "pointer"
                }}
            >
                <Box textAlign="center" display="flex" alignItems="center">
                    <Text mb={1} fontWeight="bold">{stringToUpperCase(pokemon[pokemonId].name)}</Text>
                </Box>
                <Flex width="100%" justifyContent="space-between">
                    <Image 
                        w={28}
                        title={stringToUpperCase(pokemon[pokemonId].name)}
                        backgroundColor={`${colorByType}90`}
                        borderRadius="50%"
                        src={pokemon[pokemonId].sprite[`${shiny.shiny ? 'shiny' : 'default'}`]}
                    />
                    <Flex justifyContent="end" px={2} pt={1}>
                        <Types 
                            types={pokemon[pokemonId].type} 
                            shiny={shiny.shiny}
                            tier={pokemon[pokemonId].tier} 
                            nature={nature} 
                            showingType={'roll'}
                        />
                    </Flex>
                </Flex>

                <PokemonTable
                    health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', nature, shiny)}
                    attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', nature, shiny)}
                    defense={pokemonBaseStat(pokemon[pokemonId].stats, 'def', nature, shiny)}
                    speed={pokemonBaseStat(pokemon[pokemonId].stats, 'spd', nature, shiny)}
                    tier={pokemon[pokemonId].tier}
                    type={pokemon[pokemonId].type}
                    nature={nature}
                    name={pokemon[pokemonId].name}
                    shiny={shiny.shiny}
                    showingType={'roll'}
                />
            </Flex>
        </>
    )    
}

export default ShowPokemon