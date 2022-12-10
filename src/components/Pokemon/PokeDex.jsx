import { useState } from "react"
import axios from "axios"

import { Box, Button, Flex, Input, SimpleGrid } from '@chakra-ui/react'

import Team from "./Inventary/Team"
import PokeModal from "./Modal/Modal"
import { FaSearch } from "react-icons/fa";

function PokeDex() {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState([])

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

        if(pokemon !== '' && pokemon !== undefined && pokemonData.length < 4) {
            getPokemon()
        }
    }

    const handleClear = (e) => {
        e.preventDefault()
        setPokemonData([])
        setPokemon('')
    }

    return (
        <PokeModal title={'Pokedex'} button={<FaSearch size="20px"/>}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" mb={4}>
                <Box w="50" p={2} display="flex">
                    <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                        <Flex mx={2} direction="column" textAlign="center">
                            <Input 
                                placeholder="Pokemon name"
                                size="sm"
                                onChange={(e) => setPokemon((e.target.value).toLowerCase())}
                            />
                        </Flex>
                        <Box mx={2} textAlign="center">
                            <Button
                                size="sm" 
                                isDisabled={ pokemonData.length < 4 ? false : true} 
                                onClick={(e) => handleSearch(e)}
                            >
                                Search
                            </Button>
                        </Box>
                    </form>
                    <Box mx={2} textAlign="center">
                        <Button size="sm" onClick={(e) => handleClear(e)}>Clear</Button>
                    </Box>
                </Box>
                <SimpleGrid columns={[1]}>
                    {pokemonData && pokemonData.map((data) => {
                        data = {
                            pokemonId: (data.id -1),
                            nature: '',
                            shiny: false,
                        }
                        return (
                            <Team
                                savedPokemon={data}
                                pokedex={true}
                            />
                        )
                    })}
                </SimpleGrid>
            </Flex>
        </PokeModal>
    )
}

export default PokeDex