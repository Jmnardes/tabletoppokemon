import { useState } from "react"

import Select from '../Chakra/chakra-react-select'
import { Button, Box, Flex, Text } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { options, generationOptions, natureOptions, colorsByType } from '../../util'
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch"

function Pokemon() {
    const [tier, setTier] = useState(1)
    const [chosedGeneration, setChosedGeneration] = useState(3)
    const [howMuchPokemonToRoll, setHowMuchPokemonToRoll] = useState(1)
    const [onePokemonRoll, setOnePokemonRoll] = useState(null)
    const [twoPokemonRoll, setTwoPokemonRoll] = useState(null)
    const [threePokemonRoll, setThreePokemonRoll] = useState(null)
    const [howMuch, setHowMuch] = useState(0)
    const [nature, setNature] = useState(0)

    const handlePokemonRoll = (howMuchBtn) => {
        let pokemon = []
        setHowMuch(howMuchBtn)

        if ( howMuchBtn === 1) { 
            pokemon = sortPokemon(tier, chosedGeneration, 1)
            setOnePokemonRoll(pokemon[0])
        }

        if ( howMuchBtn === 2) { 
            pokemon = sortPokemon(tier, chosedGeneration, 2)
            setOnePokemonRoll(pokemon[0])
            setTwoPokemonRoll(pokemon[1])
        }

        if ( howMuchBtn === 3) { 
            pokemon = sortPokemon(tier, chosedGeneration, 3)
            setOnePokemonRoll(pokemon[0])
            setTwoPokemonRoll(pokemon[1])
            setThreePokemonRoll(pokemon[2])
        }
        
        return
    }

    const handleGeneration = (e) => {
        let gen = Number(e.value)
        setChosedGeneration(gen + 1)
    }

    return (
        <>
            <Box w="25" p={4} display="flex">
                <ThemeSwitch/>
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
                <Box mx={2} textAlign="center">
                    <Text>Nature</Text>
                    <Select
                        placeholder={'Nat'}
                        size='sm'
                        options={natureOptions}
                        onChange={(e) => setNature(e.value)}
                    />
                </Box>
                <Flex direction="column" textAlign="center">
                    <Text>Roll pokemon</Text>
                    <Flex direction="row">
                        <Select
                            placeholder={'Roll'}
                            size='sm'
                            options={[{label: 1, value: 1},{label: 2, value: 2},{label: 3, value: 3}]}
                            onChange={(e) => setHowMuchPokemonToRoll(e.value)}
                        />
                        <Button 
                            size='sm'
                            mx={2}
                            onClick={() => handlePokemonRoll(howMuchPokemonToRoll)}
                        >
                            Roll
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <Flex>
                { howMuch === 1  && (
                    <ShowPokemon pokemonId={onePokemonRoll} />
                )}
                { howMuch === 2 && (
                    <>
                        <ShowPokemon pokemonId={onePokemonRoll} />
                        <ShowPokemon pokemonId={twoPokemonRoll} />
                    </>
                )}
                { howMuch === 3 && (
                    <>
                        <ShowPokemon pokemonId={onePokemonRoll} />
                        <ShowPokemon pokemonId={twoPokemonRoll} />
                        <ShowPokemon pokemonId={threePokemonRoll} />
                    </>
                )}
            </Flex>
        </>
    )
}

export default Pokemon