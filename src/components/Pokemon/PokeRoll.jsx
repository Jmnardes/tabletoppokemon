import { useEffect, useState } from "react"

import Select from '../Chakra/chakra-react-select'
import { Button, Box, Flex, Text, SimpleGrid, Switch } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { options, generationOptions, colorsByType } from '../../util'
import { shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"

function PokeRoll() {
    const [tier, setTier] = useState(1)
    const [chosedGeneration, setChosedGeneration] = useState(1)
    const [pokemonArray, setPokemonArray] = useState([])
    const [nature, setNature] = useState(0)
    const [shiny, setShiny] = useState([])
    const [pokemonType, setPokemonType] = useState('')
    const [halfTier, setHalfTier] = useState(false)
    const shinyPercentage = 40

    const handlePokemonRoll = () => {
        let pokemon = []

        pokemon = sortPokemon(tier, chosedGeneration, pokemonType, halfTier)
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
        setPokemonArray(() => [...pokemonArray, {
            pokemonId: pokemon,
            nature: nature,
            shiny: shiny
        }])
    }

    const handleGeneration = (e) => {
        let gen = Number(e.value)
        setChosedGeneration(() => gen + 1)
    }

    const handleType = (e) => {
        let typ = e.value
        setPokemonType(() => typ)
    }

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
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
                    <Text>/Tier</Text>
                    <Switch
                        mx={2}
                        mt={2}
                        onChange={(e) => setHalfTier(e.target.checked)}
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
                        onChange={(e) => handleType(e)}
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
            <SimpleGrid columns={[1, 2, 3, 4, 5, 6, 7]} spacing={1}>
                {pokemonArray.length > 0 && pokemonArray.map((data) => {
                    return (
                        <ShowPokemon 
                            key={data.pokemonId + data.nature.nature} 
                            pokemonId={data.pokemonId} 
                            nature={data.nature} 
                            shiny={data.shiny}
                        />
                    )
                })}
            </SimpleGrid>
        </>
    )
}

export default PokeRoll