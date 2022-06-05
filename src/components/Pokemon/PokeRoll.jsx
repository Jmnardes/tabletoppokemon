import { useState } from "react"

import Select from '../Chakra/chakra-react-select'
import { Button, Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { options, generationOptions, colorsByType } from '../../util'

function PokeRoll() {
    const [tier, setTier] = useState(1)
    const [chosedGeneration, setChosedGeneration] = useState(3)
    const [howMuchPokemonToRoll, setHowMuchPokemonToRoll] = useState(1)
    const [pokemonArray, setPokemonArray] = useState([])

    const handlePokemonRoll = () => {
        let pokemon = []
        pokemon = sortPokemon(tier, chosedGeneration, 1)
        setPokemonArray(() => [...pokemonArray, pokemon])
        
        return
    }

    const handleGeneration = (e) => {
        let gen = Number(e.value)
        setChosedGeneration(gen + 1)
    }

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
                        { pokemonArray.length < 8 &&
                            <Button 
                                size='sm'
                                mx={2}
                                onClick={() => handlePokemonRoll(howMuchPokemonToRoll)}
                            >
                                Roll
                            </Button>
                        }
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
            <SimpleGrid columns={4} spacing={1}>
                {pokemonArray.length > 0 && pokemonArray.map((data) => {
                    return <ShowPokemon pokemonId={data[0]} />
                })}
            </SimpleGrid>
        </>
    )
}

export default PokeRoll