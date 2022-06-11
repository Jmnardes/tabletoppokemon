import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { pokemonBaseStat } from '../../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../../util'
import pokemon from '../../../assets/json/pokemons.json'
import { Box, Flex, Image } from "@chakra-ui/react"
import Types from "../Table/Types"
import { FaStar } from "react-icons/fa";

function Team({ savedPokemon }) {
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
                border={ savedPokemon.shiny.shiny ? `2px ridge ${colorByType}` : `2px solid ${colorByType}`}
                borderRadius={8}
                width={52}
                height={56}
                m={1}
                p={1}
                backgroundColor={ `${colorByType}90` }
                background={ savedPokemon.shiny.shiny ? `linear-gradient(165deg, ${colorByType}15 15%, ${colorByType} 50%, ${colorByType}15 85%)` : ''}
                shadow="dark-lg"
                _hover={{
                    backgroundColor: `${colorByType}70`,
                    border: `${savedPokemon.shiny.shiny ? '3px ridge' : '3px outset'} ${colorByType}`,
                    cursor: "pointer"
                }}
            >

                <Flex width="100%" justifyContent="space-between">
                    <Image
                        width={36}
                        title={stringToUpperCase(pokemon[savedPokemon.pokemonId].name)} 
                        src={pokemon[savedPokemon.pokemonId].sprite[`${savedPokemon.shiny.shiny ? 'shiny' : 'default'}`]} 
                    />
                    <Flex justifyContent="end" px={1/2} pt={1/2}>
                        <Types
                            types={pokemon[savedPokemon.pokemonId].type} 
                            shiny={savedPokemon.shiny.shiny}
                            tier={pokemon[savedPokemon.pokemonId].tier} 
                            nature={savedPokemon.nature}
                            showingType={'team'}
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
                    showingType={'team'}
                />
            </Flex>
        </>
    )    
}

export default Team