import { useEffect, useState } from "react"
import axios from "axios"

import { Box, Button, Flex, Input, SimpleGrid, Text } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"

function PokeDex() {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState([])
    const [keyIndex, setKeyIndex] = useState(100)

    const getPokemon = async () => {
        try {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          const res = await axios.get(url)
          
          setPokemonData(() => [...pokemonData, res.data])
        } catch(e) {
          console.log(e)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        
        if (pokemonData.length < 8)
        getPokemon()
    }

    const handleClear = (e) => {
        e.preventDefault()
        setPokemonData([])
    }

    return (
        <>
            <Box w="25" p={2} display="flex">
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <Flex mx={2} direction="column" textAlign="center">
                        <Text>Pokemon name</Text>
                        <Input 
                            placeholder="Pokemon name"
                            size="sm"
                            onChange={(e) => setPokemon((e.target.value).toLowerCase())}
                        />
                    </Flex>
                    <Box mx={2} textAlign="center">
                        <Button 
                            mt={6} 
                            size="sm" 
                            isDisabled={ pokemonData.length < 8 ? false : true} 
                            onClick={(e) => handleSearch(e)}
                        >
                            Search
                        </Button>
                    </Box>
                </form>
                <Box mx={2} textAlign="center">
                    <Button mt={6} size="sm" onClick={(e) => handleClear(e)}>Clear</Button>
                </Box>
            </Box>
            <SimpleGrid columns={[1/2, 1, 2, 3, 4]} spacing={1}>
                {pokemonData && pokemonData.map((data) => {
                    return (
                        <ShowPokemon
                            pokemonId={data.id - 1}
                            nature={false}
                            shiny={false}
                        />
                    )
                })}
            </SimpleGrid>
        </>
    )
}

export default PokeDex