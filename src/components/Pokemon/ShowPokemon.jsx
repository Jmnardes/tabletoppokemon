import { useEffect, useState } from "react"
import PokemonTable from "./Table/PokemonTable"

import { pokemonBaseStat, whatNaturePokemonIs } from '../pokemonFunctions'
import { diceRoll, stringToUpperCase, typeColor } from '../../util'
import pokemon from '../../assets/json/pokemons.json'
import { Flex, Image, Text } from "@chakra-ui/react"
import { mixColors } from '../../util/colorMix'

function ShowPokemon({ pokemonId }) {
    const [pokemonNature, setPokemonNature] = useState('')
    const [isShiny, setIsShiny] = useState(false)
    const [colorByType, setColorByType] = useState('#000000')
    
    

    useEffect(() => {
        let shinyRoll = diceRoll(50)
        let color = typeColor(pokemon[pokemonId].type)
        setColorByType(color)
        setPokemonNature(whatNaturePokemonIs())
        shinyRoll === 0 ? setIsShiny(true) : setIsShiny(false)
    }, [pokemonId])

    return (
        <>
            <Flex 
                alignItems="center" 
                flexDirection="column" 
                border={ isShiny ? '6px groove #EBCA37' : `2px solid ${colorByType}`}
                borderRadius={4} 
                m={1}
                p={2}
                backgroundColor={ isShiny ? '#FFFFFF50' : `${colorByType}20` }
            >
                <Text fontSize='2xl' textAlign="center" color={isShiny ? '#EBCA37' : ''}>{(isShiny ? '★ ' : '') + stringToUpperCase(pokemon[pokemonId].name)}</Text>
                <Image alt={pokemon[pokemonId].name} src={pokemon[pokemonId].sprite[`${isShiny ? 'shiny' : 'default'}`]} />
                <PokemonTable
                    health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', pokemonNature, isShiny)}
                    attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', pokemonNature, isShiny)}
                    defense={pokemonBaseStat(pokemon[pokemonId].stats, 'def', pokemonNature, isShiny)}
                    speed={pokemonBaseStat(pokemon[pokemonId].stats, 'spd', pokemonNature, isShiny)}
                    tier={pokemon[pokemonId].tier}
                    type={pokemon[pokemonId].type}
                    nature={pokemonNature.nature}
                />
            </Flex>
        </>
    )    
}

export default ShowPokemon