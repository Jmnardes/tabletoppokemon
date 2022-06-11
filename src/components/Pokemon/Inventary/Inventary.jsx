import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { pokemonBaseStat } from '../../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../../util'
import pokemon from '../../../assets/json/pokemons.json'
import { Box, Flex, Image } from "@chakra-ui/react"
import Types from "../Table/Types"
import { FaStar } from "react-icons/fa";

function Inventary({ savedPokemon }) {
    const [colorByType, setColorByType] = useState('#000000')

    useEffect(() => {
        let color = typeColor(pokemon[savedPokemon.pokemonId].type)

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
                width={40}
                height={32}
                p={1}
                backgroundColor={ savedPokemon.shiny.shiny ? '#FFFFFF50' : `${colorByType}35` }
                background={ savedPokemon.shiny.shiny ? `linear-gradient(165deg, ${colorByType}05 15%, ${colorByType} 50%, ${colorByType}05 85%)` : ''}
            >

                <Flex width="100%" justifyContent="space-between">
                    <Flex width="100%" px={1/2} pt={1/2}>
                        <Box>{ savedPokemon.shiny.shiny && <FaStar title="Shiny" color={colorByType} size={16}/>}</Box>
                    </Flex>
                    <Image 
                        width={16} 
                        title={stringToUpperCase(pokemon[savedPokemon.pokemonId].name)} 
                        src={pokemon[savedPokemon.pokemonId].sprite[`${savedPokemon.shiny.shiny ? 'shiny' : 'default'}`]} 
                    />
                    <Flex width="100%" justifyContent="end" px={1/2} pt={1/2}>
                        <Types types={pokemon[savedPokemon.pokemonId].type} inventaryPoke={true} />
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
                    inventaryPoke={true}
                />
            </Flex>
        </>
    )    
}

export default Inventary