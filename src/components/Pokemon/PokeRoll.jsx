import { useEffect, useState } from "react"

import Select from '../Chakra/chakra-react-select'
import { Button, Box, Flex, Text, Switch, Stack } from '@chakra-ui/react'

import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { options, generationOptions, colorsByType, typeColor } from '../../util'
import { shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
import Inventary from "./Inventary/Inventary"
import Team from "./Inventary/Team"
import { FaWindowClose, FaPlusSquare } from "react-icons/fa";
import pokemonJSON from '../../assets/json/pokemons.json'
import PokeModal from "./Modal/Modal"

function PokeRoll() {
    const [tier, setTier] = useState(1)
    const [chosedGeneration, setChosedGeneration] = useState(1)
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [nature, setNature] = useState(0)
    const [shiny, setShiny] = useState([])
    const [pokemonType, setPokemonType] = useState('')
    const [halfTier, setHalfTier] = useState(false)
    const [inventary, setInventary] = useState(false)
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
        
    const handleAddInventory = ({pokemonId, nature, shiny}) => {
        setSavedPokemons(() => [{
            pokemonId,
            nature,
            shiny,
        }, ...savedPokemons])
        setInventary(true)
    }

    const handleAddPokemonTeam = ({pokemonId, nature, shiny}) => {
        setPokemonsTeam(() => [{
            pokemonId,
            nature,
            shiny,
        }, ...pokemonsTeam])

        handleRemovePokeFromInventory({
            pokemonId,
            nature,
            shiny,
        })
    }

    const handleRemovePokeFromInventory = (poke) => {
        let array = savedPokemons

        savedPokemons.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setSavedPokemons([...array])
            }
            return null
        })

        if (savedPokemons.length === 0) {
            setInventary(false)
        }
    }

    const handleRemovePokeFromTeam = (poke) => {
        let array = pokemonsTeam

        pokemonsTeam.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setPokemonsTeam([...array])
            }
            return null
        })

        handleAddInventory(poke)
    }

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
    }, [])

    return (
        <>
            <Box w="25" p={2} display="flex" backgroundColor={"gray.600"}>

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
                            isDisabled={ pokemonArray.length < 10 ? false : true}
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
                <Box mx={2} textAlign="center">
                    <Text>Modals</Text>
                    <PokeModal title={'cards'}/>
                    <PokeModal title={'pokedex'}/>
                </Box>
            </Box>

            <Flex py={1} mt={1} minHeight="11rem">
                <Stack 
                    direction={['column', 'row']} 
                    spacing={1} 
                    overflowX="auto"
                    css={{
                        "&::-webkit-scrollbar": {
                            height: "14px",
                            width: "2px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "2px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#4A5568",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {pokemonArray.length > 0 && pokemonArray.map((data) => {
                        return (
                            <Box onClick={() => handleAddInventory(data)}>
                                <ShowPokemon 
                                    key={data.pokemonId + data.nature.nature} 
                                    pokemonId={data.pokemonId} 
                                    nature={data.nature} 
                                    shiny={data.shiny}
                                />
                            </Box>
                        )
                    })}
                </Stack>
            </Flex>

            <Flex flexDir="column" py={2} mt={4} minHeight="9rem">
                <Text fontSize="2xl" lineHeight="48px" pl={2} mb={2} backgroundColor={"gray.600"} w="100%">Inventário</Text>
                <Stack 
                    direction={['column', 'row']} 
                    spacing={1} 
                    overflowX="auto"
                    css={{
                        "&::-webkit-scrollbar": {
                            height: "14px",
                            width: "2px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "2px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#4A5568",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {inventary && savedPokemons.map((poke) => {
                        return (
                            <Box mb={2}>
                                <Inventary title={pokemonJSON[poke.pokemonId].name} savedPokemon={poke} />
                                <Box display="flex" justifyContent="center">
                                    <Button 
                                        size="sm" 
                                        width="50%" 
                                        borderRadius="0 0 0 16px"
                                        borderLeft={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                        borderBottom={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                        _hover={{
                                            backgroundColor: `#2EC92E40`,
                                            cursor: "pointer",
                                            borderLeft: "2px solid #2EC92E40",
                                            borderBottom: "2px solid #2EC92E40"
                                        }}
                                        isDisabled={pokemonsTeam.length > 5 ? true : false}
                                        onClick={() => handleAddPokemonTeam(poke)}
                                    >
                                        <FaPlusSquare size="16px" style={{ color: "#2EC92E", marginRight: "4px" }}/>
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        width="50%" 
                                        borderRadius="0 0 16px 0"
                                        borderRight={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                        borderBottom={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                        _hover={{
                                            backgroundColor: "#D7373750",
                                            cursor: "pointer",
                                            borderRight: "2px solid #D7373750",
                                            borderBottom: "2px solid #D7373750"
                                        }}
                                        onClick={() => handleRemovePokeFromInventory(poke)}
                                    >
                                        <FaWindowClose size="16px" style={{ color: "#D73737" }}/>
                                    </Button>
                                </Box>
                            </Box>
                        )
                    })}
                </Stack>
            </Flex>
            
            <Flex flexDir="column" py={2} mt={2} minHeight="12rem">
                <Text fontSize="2xl" lineHeight="48px" pl={2} mb={2} backgroundColor={"gray.600"} w="100%">Team</Text>
                <Stack 
                    direction={['column', 'row']} 
                    spacing={1}
                >
                    {pokemonsTeam && pokemonsTeam.map((poke) => {
                        return (
                            <Box onClick={() => handleRemovePokeFromTeam(poke)} mb={2}>
                                <Team savedPokemon={poke} />
                            </Box>
                        )
                    })}
                </Stack>
            </Flex>
        </>
    )
}

export default PokeRoll