import { useEffect, useState } from "react"

import Select from '../Chakra/chakra-react-select'
import { Button, Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { options, generationOptions, colorsByType, diceRoll } from '../../util'
import { whatNaturePokemonIs } from "../pokemonFunctions"

function PokeRoll() {
    const [tier, setTier] = useState(1)
    const [chosedGeneration, setChosedGeneration] = useState(1)
    const [pokemonArray, setPokemonArray] = useState([])
    const [nature, setNature] = useState(0)
    const [shiny, setShiny] = useState(0)

    const handlePokemonRoll = () => {
        let pokemon = []

        pokemon = sortPokemon(tier, chosedGeneration)
        rollShinyPokemon()
        setNature(() => whatNaturePokemonIs())
        setPokemonArray(() => [...pokemonArray, {
            pokemonId: pokemon,
            nature: nature,
            shiny: shiny
        }])
    }

    const rollShinyPokemon = () => {
        let shinyRoll = diceRoll(10)
        shinyRoll === 0 ? setShiny(true) : setShiny(false)
    }

    const handleGeneration = (e) => {
        let gen = Number(e.value)
        setChosedGeneration(() => gen + 1)
    }

    useEffect(() => {
        rollShinyPokemon()
        setNature(() => whatNaturePokemonIs())
    }, [])

    return (
        <>
            <Box w="25" p={2} display="flex">
                <Box mx={2} textAlign="center">
                    <Text>Tier</Text>
                    <Select
                        placeholder={'Tier'}
                        size='sm'
                        mx={2}
                        options={options}
                        onChange={(e) => setTier(e.value)}
                    />
                </Box>
                <Box mx={2} textAlign="center">
                    <Text>Generation</Text>
                    <Select
                        placeholder={'Gen'}
                        size='sm'
                        options={generationOptions}
                        onChange={(e) => handleGeneration(e)}
                    />
                </Box>
                <Box mx={2} textAlign="center">
                    <Text>Type</Text>
                    <Select
                        placeholder={'Type'}
                        size='sm'
                        options={colorsByType}
                        onChange={(e) => handleGeneration(e)}
                    />
                </Box>
                <Flex direction="column" textAlign="center">
                    <Text>Roll pokemon</Text>
                    <Flex direction="row">
                        <Button 
                            size='sm'
                            mx={2}
                            isDisabled={ pokemonArray.length < 8 ? false : true}
                            onClick={() => handlePokemonRoll()}
                        >
                            Roll
                        </Button>
                        <Button 
                            size='sm'
                            mx={2}
                            onClick={() => setPokemonArray([])}
                        >
                            Clear
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <SimpleGrid columns={[1/2, 1, 2, 3, 4]} spacing={1}>
                {pokemonArray.length > 0 && pokemonArray.map((data) => {
                    return <ShowPokemon pokemonId={data.pokemonId} nature={data.nature.nature} shiny={data.shiny} />
                })}
            </SimpleGrid>
        </>
    )
}

export default PokeRoll