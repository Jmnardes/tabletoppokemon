import { useEffect, useState } from "react"
import {
    Image,
    Flex,
    Tooltip,
    Text,
    Box
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import pokemon from '../../../assets/json/pokemons.json'
import PokemonTable from "../Table/PokemonTable"
import Types from "../Table/Types"
import { pokemonBaseStat } from "../../pokemonFunctions"
import { FaStar } from "react-icons/fa";

function Inventary({ title, savedPokemon }) {
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <>
                    <Flex flexDirection="column" justifyContent="center" alignItems="center">
                        <Flex justifyContent="space-between" width="100%">
                            <Box mb={48}>
                                <Image
                                    w={28}
                                    width="80%"
                                    position="absolute"
                                    left="28px"
                                    title={stringToUpperCase(pokemon[savedPokemon.pokemonId].name)} 
                                    src={pokemon[savedPokemon.pokemonId].sprite[`${savedPokemon.shiny.shiny ? 'shiny' : 'default'}`]} 
                                />
                            </Box>
                            <Flex justifyContent="end" px={1/2} pt={1/2} width="20%">
                                <Types
                                    types={pokemon[savedPokemon.pokemonId].type} 
                                    shiny={savedPokemon.shiny.shiny}
                                    tier={pokemon[savedPokemon.pokemonId].tier} 
                                    nature={savedPokemon.nature}
                                />
                            </Flex>
                        </Flex>
        
                        <PokemonTable
                            health={pokemonBaseStat(pokemon[savedPokemon.pokemonId].stats, 'hp', savedPokemon.nature, savedPokemon.shiny)}
                            attack={pokemonBaseStat(pokemon[savedPokemon.pokemonId].stats, 'atk', savedPokemon.nature, savedPokemon.shiny)}
                            defense={pokemonBaseStat(pokemon[savedPokemon.pokemonId].stats, 'def', savedPokemon.nature, savedPokemon.shiny)}
                            speed={pokemonBaseStat(pokemon[savedPokemon.pokemonId].stats, 'spd', savedPokemon.nature, savedPokemon.shiny)}
                            tier={pokemon[savedPokemon.pokemonId].tier}
                            type={pokemon[savedPokemon.pokemonId].type}
                            nature={savedPokemon.nature}
                            name={pokemon[savedPokemon.pokemonId].name}
                            shiny={savedPokemon.shiny.shiny}
                            showingType={'inventary'}
                        />
                    </Flex>
                </>
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        let color = typeColor(pokemon[savedPokemon.pokemonId].type)
        
        PokemonTooltip()
        setColorByType(color)
    }, [savedPokemon.pokemonId])

    return (
        <>
            <Flex
                alignItems="center" 
                flexDirection="column" 
                borderTop={ `2px solid ${colorByType}`}
                borderRight={ `2px solid ${colorByType}`}
                borderLeft={ `2px solid ${colorByType}`}
                borderRadius="8px 8px 0 0"
            >
                <Tooltip label={pokeStatsTooltip} borderRadius={16}>
                    <Text 
                        borderRadius={0} 
                        width="max-content"
                        textAlign="center" 
                        fontWeight="bold" 
                        p={1}
                        _hover={{
                            cursor: 'pointer'
                        }}
                    >
                        <Flex>
                            {(savedPokemon.shiny.shiny &&
                                <Box mr={1} display="flex" alignItems="center" justifyContent="center">
                                    <FaStar title="Shiny" size={10}/>
                                </Box>
                            )}
                            {`(${pokemon[savedPokemon.pokemonId].tier})` + 
                            ' ' + 
                            stringToUpperCase(title)}
                        </Flex>
                    </Text>
                </Tooltip>
            </Flex>
        </>
    )
}

export default Inventary