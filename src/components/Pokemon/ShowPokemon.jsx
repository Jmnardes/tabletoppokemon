import { useEffect, useState } from "react"

import pokemon from '../../assets/json/pokemons.json'

import { Box, Flex, Image } from "@chakra-ui/react"
import { pokemonBaseStat } from '../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../util'
import { FaStar } from "react-icons/fa";
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
                border={ shiny.shiny ? `6px ridge ${colorByType}` : `4px solid ${colorByType}`}
                borderRadius={6}
                width={56}
                height={48}
                m={1}
                p={ shiny.shiny ? 0 : 1}
                backgroundColor={ shiny.shiny ? '#FFFFFF50' : `${colorByType}35` }
                background={ shiny.shiny ? `linear-gradient(165deg, ${colorByType}05 15%, ${colorByType} 50%, ${colorByType}05 85%)` : ''}
                _hover={{
                    backgroundColor: `${colorByType}70`,
                    border: `${shiny.shiny ? '8px ridge' : '6px outset'} ${colorByType}`,
                    cursor: "pointer"
                }}
            >
                <Flex width="100%" justifyContent="space-between">
                    <Flex width="100%" justifyContent="space-between" px={2} pt={1}>
                        <Box>{ shiny.shiny && <FaStar title="Shiny" color={colorByType} size={20}/>}</Box>
                        {/* <Types types={pokemon[pokemonId].type} /> */}
                    </Flex>
                    <Image 
                        w={32}
                        title={stringToUpperCase(pokemon[pokemonId].name)} 
                        src={pokemon[pokemonId].sprite[`${shiny.shiny ? 'shiny' : 'default'}`]} 
                    />
                    <Flex width="100%" justifyContent="end" px={2} pt={1}>
                        {/* <Box>{ shiny.shiny && <FaStar title="Shiny" color={colorByType} size={20}/>}</Box> */}
                        <Types types={pokemon[pokemonId].type} />
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
                />
            </Flex>
        </>
    )    
}

export default ShowPokemon