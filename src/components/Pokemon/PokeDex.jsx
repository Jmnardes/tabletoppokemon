import { useState } from "react"
import axios from "axios"

import Select from '../Chakra/chakra-react-select'
import { Box, Button, Flex, Input, Switch, Text } from '@chakra-ui/react'

import { natureOptions} from '../../util'
import ShowPokemon from "./ShowPokemon"

function PokeDex() {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState([])
    const [nature, setNature] = useState(0)
    const [shiny, setShiny] = useState(0)

    const getPokemon = async () => {
        const toArray = []
        try {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          const res = await axios.get(url)
          
          toArray.push(res.data)
          setPokemonData(toArray)
        } catch(e) {
          console.log(e)
        }
    }

    const handleShiny = (e) => {
        setShiny(e.target.checked)
        console.log(shiny)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        getPokemon()
    }

    return (
        <>
            <Box w="25" p={2} display="flex">
                <Box mx={2} textAlign="center">
                    <Text>Nature</Text>
                    <Select
                        placeholder={'Nat'}
                        size='sm'
                        options={natureOptions}
                        onChange={(e) => setNature(e.value)}
                    />
                </Box>
                <Box mx={2} textAlign="center">
                    <Text>Shiny</Text>
                    <Switch mt={1} onChange={(e) => handleShiny(e)}/>
                </Box>
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
                        <Button mt={6} size="sm" onClick={(e) => handleSearch(e)}>Search</Button>
                    </Box>
                </form>
            </Box>
            <Flex>
            {pokemonData && pokemonData.map((data) => {
                return (
                    <ShowPokemon
                        pokemonId={data.id - 1}
                        nature={nature}
                        shiny={shiny}
                        dex={true}
                    />
                )
            })}
            </Flex>
        </>
    )
}

export default PokeDex