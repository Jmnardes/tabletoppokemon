import { useEffect, useState } from "react"

import { Button, Box, Flex, Text, Stack } from '@chakra-ui/react'
import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, options, typeColor } from '../../util'
import { shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
import Inventary from "./Inventary/Inventary"
import Team from "./Inventary/Team"
import { FaWindowClose, FaPlusSquare, FaDice, FaDiceD20 } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import pokemonJSON from '../../assets/json/pokemons.json'
import { pokemonBaseStat } from '../pokemonFunctions'
import PokeDex from "./PokeDex"
import { PokeRoll } from "./PokeRoll"
import PokeItems from "./PokeItems"
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch"
import { SimpleGrid } from "@chakra-ui/react"
import { Select } from "chakra-react-select"

function PokePage() {
    const [tier, setTier] = useState(10)
    const [chosedGeneration, setChosedGeneration] = useState(8)
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [nature, setNature] = useState(0)
    const [catchDiceRoll, setCatchDiceRoll] = useState(0)
    const [shiny, setShiny] = useState([])
    const [pokemonType, setPokemonType] = useState('')
    const [halfTier, setHalfTier] = useState(false)
    const [disableDiceRoll, setDisableDiceRoll] = useState(false)
    const shinyPercentage = 50

    const handlePokemonRoll = () => {
        let pokemon = []

        setCatchDiceRoll(0)
        setDisableDiceRoll(false)

        pokemon = sortPokemon(tier, chosedGeneration, pokemonType, halfTier)

        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
        setPokemonArray(() => [...pokemonArray, {
            pokemonId: pokemon,
            nature: nature,
            shiny: shiny
        }])
    }

    // const handleGeneration = (e) => {
    //     let gen = Number(e.value)

    //     setChosedGeneration(() => gen + 1)
    // }

    // const handleType = (e) => {
    //     let typ = e.value

    //     setPokemonType(() => typ)
    // }
        
    const handleAddInventory = ({pokemonId, nature, shiny}) => {
        setSavedPokemons(() => [{
            pokemonId,
            nature,
            shiny,
        }, ...savedPokemons])

        handleRemovePokeFromSorted({
            pokemonId,
            nature,
            shiny,
        })
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

    const handleRemovePokeFromSorted = (poke) => {
        let array = pokemonArray

        pokemonArray.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setPokemonArray([...array])
            }
            return null
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

    const handleCatchDiceRoll = () => {
        let result = diceRoll(20)
        setDisableDiceRoll(true)
        setCatchDiceRoll(result + 1)
    }

    const handlePokemonRollClean = () => {
        setPokemonArray([])
    }

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
    }, [])

    return (
        <>
            <Box p={2} display="flex" backgroundColor={"gray.600"}>
                {/* <Box mx={2} textAlign="center">
                    <Text>/Tier</Text>
                    <Switch
                        mx={2}
                        mt={2}
                        onChange={(e) => setHalfTier(e.target.checked)}
                    />
                </Box> */}
                {/* <Box mx={2} textAlign="center">
                    <Text>Generation</Text>
                    <Select
                        placeholder={'Gen'}
                        size='sm'
                        options={generationOptions}
                        onChange={(e) => handleGeneration(e)}
                    />
                </Box> */}
                {/* <Box mx={2} textAlign="center">
                    <Text>Type</Text>
                    <Select
                        placeholder={'Type'}
                        size='sm'
                        options={colorsByType}
                        onChange={(e) => handleType(e)}
                    />
                </Box> */}
                <Flex justifyContent="space-between" width="100%">
                    <Flex direction="column" textAlign="center">
                        <Flex direction="row">
                            <PokeRoll 
                                rollNewPokemon={() => handlePokemonRoll()}
                                cleanPokemonRoll={() => handlePokemonRollClean()}
                            >
                                <Flex justifyContent="center">
                                    <Box mx={2} textAlign="center" w={28}>
                                        <Select
                                            placeholder={'Tier'}
                                            mx={2}
                                            variant='outline'
                                            options={options}
                                            onChange={(e) => setTier(e.value)}
                                        />
                                    </Box>
                                    {/* <Button
                                        mx={2}
                                        title="Roll"
                                        isDisabled={pokemonArray.length < 4 ? false : true}
                                        onClick={() => handlePokemonRoll()}
                                    >
                                        <FaDice size="18px"/>
                                    </Button>
                                    <Button 
                                        mx={2}
                                        title="Clear"
                                        isDisabled={pokemonArray.length === 0 ? true : false}
                                        onClick={() => setPokemonArray([])}
                                    >
                                        <AiFillDelete size="18px"/>
                                    </Button> */}
                                    <Button 
                                        mx={2}
                                        title="Rolld20"
                                        disabled={disableDiceRoll}
                                        onClick={() => handleCatchDiceRoll()}
                                    >
                                        <FaDiceD20 size="18px"/>
                                    </Button>
                                    <Text
                                        background={
                                            catchDiceRoll === 20 ? "#2EC92E" : "#4A5568"
                                        }
                                        fontSize='2xl'
                                        ml={2}
                                        w={12}
                                        borderRadius={4}
                                        textAlign="center"
                                    >{catchDiceRoll}</Text>
                                </Flex>

                                <Flex py={1} mt={1} minHeight="11rem" justifyContent="center">
                                    <SimpleGrid columns={2} spacing={5} mt={4}>
                                        {pokemonArray?.map((data) => {
                                            return (
                                                    // w={48} 
                                                    // h={48} 
                                                    // background="transparent" 
                                                    // _hover="disabled"
                                                    // disabled={cardRollDisabled}
                                                    // onClick={() => handleAddInventory(data)}
                                                    <ShowPokemon 
                                                        key={data.pokemonId + data.nature.nature} 
                                                        pokemonId={data.pokemonId} 
                                                        nature={data.nature} 
                                                        shiny={data.shiny}
                                                        diceRollResult={catchDiceRoll}
                                                        handleAddInventory={() => handleAddInventory(data)}
                                                    />
                                            )
                                        })}
                                    </SimpleGrid>
                                </Flex>
                            </PokeRoll>
                        </Flex>
                    </Flex>

                    <Box textAlign="center">
                        <Flex>
                            {/* <TeamRocket /> */}
                            <PokeItems />
                            <PokeDex />
                            <ThemeSwitch />
                        </Flex>
                    </Box>
                </Flex>
            </Box>

            <Flex flexDir="column" py={2} mt={4} minHeight="9rem">
                <Text fontSize="2xl" fontWeight="bold" lineHeight="36px" pl={2} mb={2} w="100%">Inventary</Text>
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
                    {savedPokemons?.map((poke) => {
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
                                        isDisabled={pokemonsTeam.length > 3 ? true : false}
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
            
            <Flex flexDir="column" py={2} mt={2} minHeight="12rem" height="100%" backgroundColor={"gray.600"}>
                <Text fontSize="2xl" fontWeight="bold" lineHeight="36px" pl={2} mb={2} w="100%">
                    Pokemon Team{' -> '} Stat sum: {' '}
                    HP {
                        pokemonsTeam[0] && pokemonsTeam[1] && pokemonsTeam[2] ? (
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[0]?.pokemonId]?.stats, 
                                'hp', 
                                pokemonsTeam[0]?.nature, 
                                pokemonsTeam[0]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[1]?.pokemonId]?.stats, 
                                'hp', 
                                pokemonsTeam[1]?.nature, 
                                pokemonsTeam[1]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[2]?.pokemonId]?.stats, 
                                'hp', 
                                pokemonsTeam[2]?.nature, 
                                pokemonsTeam[2]?.shiny
                            )
                        ) : null
                    }{' / '}
                    ATK {
                        pokemonsTeam[0] && pokemonsTeam[1] && pokemonsTeam[2] ? (
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[0]?.pokemonId]?.stats, 
                                'atk', 
                                pokemonsTeam[0]?.nature, 
                                pokemonsTeam[0]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[1]?.pokemonId]?.stats, 
                                'atk', 
                                pokemonsTeam[1]?.nature, 
                                pokemonsTeam[1]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[2]?.pokemonId]?.stats, 
                                'atk', 
                                pokemonsTeam[2]?.nature, 
                                pokemonsTeam[2]?.shiny
                            )
                        ) : null
                    }{' / '}
                    DEF {
                        pokemonsTeam[0] && pokemonsTeam[1] && pokemonsTeam[2] ? (
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[0]?.pokemonId]?.stats, 
                                'def', 
                                pokemonsTeam[0]?.nature, 
                                pokemonsTeam[0]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[1]?.pokemonId]?.stats, 
                                'def', 
                                pokemonsTeam[1]?.nature, 
                                pokemonsTeam[1]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[2]?.pokemonId]?.stats, 
                                'def', 
                                pokemonsTeam[2]?.nature, 
                                pokemonsTeam[2]?.shiny
                            )
                        ) : null
                    }{' / '}
                    SPD {
                        pokemonsTeam[0] && pokemonsTeam[1] && pokemonsTeam[2] ? (
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[0]?.pokemonId]?.stats, 
                                'spd', 
                                pokemonsTeam[0]?.nature, 
                                pokemonsTeam[0]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[1]?.pokemonId]?.stats, 
                                'spd', 
                                pokemonsTeam[1]?.nature, 
                                pokemonsTeam[1]?.shiny
                            ) +
                            pokemonBaseStat(
                                pokemonJSON[pokemonsTeam[2]?.pokemonId]?.stats, 
                                'spd', 
                                pokemonsTeam[2]?.nature, 
                                pokemonsTeam[2]?.shiny
                            )
                        ) : null
                    }
                </Text>
                <Stack 
                    direction={['column', 'row']} 
                    spacing={1}
                >
                    {pokemonsTeam?.map((poke) => {
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

export default PokePage