import { useEffect, useState } from "react"
import PokemonTable from "./Table/PokemonTable"

import { pokemonBaseStat, whatNaturePokemonIs, pokemonTypes } from '../pokemonFunctions'
import { diceRoll, stringToUpperCase } from '../../util'
import pokemon from '../../assets/json/pokemons.json'
import { Text } from "@chakra-ui/react"

function ShowPokemon({ pokemonId }) {
    const [pokemonNature, setPokemonNature] = useState('')
    const [isShiny, setIsShiny] = useState(false)
    
    useEffect(() => {
        let shinyRoll = diceRoll(20)

        setPokemonNature(whatNaturePokemonIs())
        shinyRoll === 19 ? setIsShiny(true) : setIsShiny(false)
    }, [pokemonId])

    return (
        <>
            <div className="container">
                <Text fontSize='2xl' textAlign="center" color={isShiny ? 'gold' : ''}>{(isShiny ? '★ ' : '') + stringToUpperCase(pokemon[pokemonId].name)}</Text>
                <div className="dex-container">
                    <img alt={pokemon[pokemonId].name} src={pokemon[pokemonId].sprite[`${isShiny ? 'shiny' : 'default'}`]} />
                    <PokemonTable
                        health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', pokemonNature, isShiny)}
                        attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', pokemonNature, isShiny)}
                        defense={pokemonBaseStat(pokemon[pokemonId].stats, 'ca', pokemonNature, isShiny)}
                        tier={pokemon[pokemonId].tier}
                        type={pokemonTypes(pokemon[pokemonId].type)}
                        speed={pokemon[pokemonId].stats[5].stat}
                        nature={pokemonNature.nature}
                    />
                </div>
            </div>
        </>
    )    
}

export default ShowPokemon