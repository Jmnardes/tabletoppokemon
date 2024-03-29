import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { pokemonBaseStat } from '../../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../../util'
import pokemon from '../../../assets/json/pokemons.json'
import { Flex, Image, Text, CloseButton } from "@chakra-ui/react"
import Types from "../Table/Types"

function Team({ savedPokemon, removeFromTeam }) {
    const [colorByType, setColorByType] = useState('#000000')

    useEffect(() => {
        let color = typeColor(pokemon[savedPokemon.pokemonId].type)

        setColorByType(color)
    }, [savedPokemon.pokemonId])

    return (
        <Flex
            alignItems="center" 
            flexDirection="column"
            border={ savedPokemon.shiny.shiny ? `8px ridge ${colorByType}` : `8px ridge ${colorByType}`}
            borderRadius={8}
            width={64}
            height={72}
            m={1}
            p={1}
            backgroundColor={ `${colorByType}90` }
            background={ savedPokemon.shiny.shiny ? `linear-gradient(165deg, ${colorByType}15 15%, ${colorByType} 50%, ${colorByType}15 85%)` : ''}
            shadow="dark-lg"
            _hover={{
                backgroundColor: `${colorByType}70`
            }}
        >
            <Flex flexDir="row" width="100%">
                <Flex width="100%" textAlign="center" flexDirection={"column"}>
                    <Text fontWeight="bold" letterSpacing={2}>{stringToUpperCase(pokemon[savedPokemon.pokemonId].name)}</Text>
                    <Text fontSize={"sm"}>({savedPokemon.nature.nature})</Text>
                </Flex>
                <CloseButton onClick={removeFromTeam} size="sm" />
            </Flex>
            <Flex justifyContent="space-between" flexDirection="column">
                <Flex justifyContent="space-between">
                    <Flex>
                        <Image
                            w={44}
                            title={stringToUpperCase(pokemon[savedPokemon.pokemonId].name)} 
                            src={pokemon[savedPokemon.pokemonId].sprite[`${savedPokemon.shiny.shiny ? 'shiny' : 'default'}`]} 
                        />
                    </Flex>
                    <Flex justifyContent="end" px={1/2} pt={1/2} width="20%">
                        <Types
                            types={pokemon[savedPokemon.pokemonId].type} 
                            shiny={savedPokemon.shiny.shiny}
                            tier={pokemon[savedPokemon.pokemonId].tier} 
                            nature={savedPokemon.nature}
                            color={`${colorByType}`}
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
                />
            </Flex>
        </Flex>
    )    
}

export default Team