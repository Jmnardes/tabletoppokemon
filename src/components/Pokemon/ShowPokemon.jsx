import { useEffect, useState } from "react"
import PokemonTable from "./Table/PokemonTable"

import { pokemonBaseStat } from '../pokemonFunctions'
import { typeColor } from '../../util'
import pokemon from '../../assets/json/pokemons.json'
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Types from "./Table/Types"
import { FaStar } from "react-icons/fa";

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
                border={ shiny.shiny ? `8px groove ${colorByType}` : `4px solid ${colorByType}`}
                borderRadius={4}
                width={60}
                height={64}
                m={1}
                p={ shiny.shiny ? 0 : 1}
                backgroundColor={ shiny.shiny ? '#FFFFFF50' : `${colorByType}20` }
                background={ shiny.shiny ? `linear-gradient(165deg, ${colorByType}05 15%, ${colorByType} 50%, ${colorByType}05 85%)` : ''}
                shadow="dark-lg"
            >
                <Flex width="100%" justifyContent="space-between" px={2} pt={1}>
                    <Box>{ shiny.shiny && <FaStar title="Shiny" color={colorByType} size={20}/>}</Box>
                    <Types types={pokemon[pokemonId].type} />
                </Flex>
                <Image width={32} alt={pokemon[pokemonId].tier} src={pokemon[pokemonId].sprite[`${shiny.shiny ? 'shiny' : 'default'}`]} />
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