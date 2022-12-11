import { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack } from '@chakra-ui/react'
import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, options, typeColor } from '../../util'
import { shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
import Inventary from "./Inventary/Inventary"
import Team from "./Inventary/Team"
import { FaWindowClose, FaPlusSquare, FaDice, FaDiceD20 } from "react-icons/fa";
import pokemonJSON from '../../assets/json/pokemons.json'
import { pokemonBaseStat } from '../pokemonFunctions'
import PokeDex from "./PokeDex"
import { PokeRoll } from "./PokeRoll"
import PokeItems from "./PokeItems"
import { TeamRocket } from "./TeamRocket"
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch"
import { SimpleGrid } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield,
} from "react-icons/gi";

function PokePage() {
    const [tier, setTier] = useState(10)
    const [nature, setNature] = useState(0)
    const [catchDiceRoll, setCatchDiceRoll] = useState(0)
    const [turn, setTurn] = useState(0)
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [shiny, setShiny] = useState([])
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disableDiceRoll, setDisableDiceRoll] = useState(false)
    const shinyPercentage = 50

    const handlePokemonRoll = () => {
        let pokemon = []

        setCatchDiceRoll(0)
        setDisableDiceRoll(false)

        pokemon = sortPokemon(tier)

        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
        setPokemonArray(() => [...pokemonArray, {
            pokemonId: pokemon,
            nature: nature,
            shiny: shiny
        }])

        if (pokemonArray.length === 3) {
            setDisableDiceRoll(false)
        } else {
            setDisableDiceRoll(true)
        }
    }
        
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
        
        handlePokemonRollClean()
        closeRollModal()
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
        setEndTurnButton(false)
        setCatchDiceRoll(result + 1)
    }

    const handlePokemonRollClean = () => {
        setEndTurnButton(true)
        setTurn(() => turn + 1)
        setPokemonArray([])
    }

    const handleTeamStats = (statType) => {
        let total = 0

        for(let i=0 ;i <= 5; i++) {
            if(pokemonsTeam[i]) {
                total += pokemonBaseStat(
                    pokemonJSON[pokemonsTeam[i]?.pokemonId]?.stats, 
                    statType, 
                    pokemonsTeam[i]?.nature, 
                    pokemonsTeam[i]?.shiny
                )
            }
        }

        return total
    }

    const closeRollModal = () => {
        return (
            <PokeRoll></PokeRoll>
        )
    }

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
    }, [])

    return (
        <>
            <Box p={2} display="flex" backgroundColor={"gray.600"}>
                <Flex justifyContent="space-between" width="100%">
                    <Flex direction="column" textAlign="center">
                        <Flex direction="row">
                            <Box mx={2} textAlign="center" w={28}>
                                <Select
                                    placeholder={'Tier'}
                                    mx={2}
                                    variant='outline'
                                    options={options}
                                    onChange={(e) => setTier(e.value)}
                                />
                            </Box>

                            <PokeRoll>
                                <Flex justifyContent="center">
                                    <Button
                                        mx={2}
                                        title="Roll"
                                        isDisabled={pokemonArray.length < 4 ? false : true}
                                        onClick={() => handlePokemonRoll()}
                                    >
                                        <FaDice size="18px"/>
                                    </Button>
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
                                    <Button 
                                        mx={4}
                                        title="Clean"
                                        disabled={endTurnButton}
                                        onClick={() => handlePokemonRollClean()}
                                    >
                                        End Turn!
                                    </Button>
                                </Flex>

                                <Flex py={1} mt={1} minHeight="11rem" justifyContent="center">
                                    <SimpleGrid columns={2} spacing={5} mt={4}>
                                        {pokemonArray?.map((data) => {
                                            return (
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
                            
                            <Text
                                fontSize='2xl'
                                ml={2}
                                borderRadius={4}
                                textAlign="center"
                            >Turnos: {turn}</Text>
                        </Flex>
                    </Flex>

                    <Box textAlign="center">
                        <Flex>
                            <TeamRocket />
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
            
            <Flex flexDir="column" py={2} mt={2} minHeight="12rem" height="100%" backgroundColor={"gray.600"}>
                <Flex flexDir="row" justifyContent="center">
                    <Flex justifyContent="center" alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold" m={2}>Team stats: </Text>
                        <GiHearts title="Health" color="#d61717" size={32} style={{marginRight: 4}}/> {
                            <Text fontSize="2xl" m={2}>{handleTeamStats('hp')}</Text>
                        }
                        <GiBroadsword title="Attack" color="#4b4b4b" size={32} style={{marginRight: 4}}/> {
                            <Text fontSize="2xl" m={2}>{handleTeamStats('atk')}</Text>
                        }
                        <GiShield title="Defense" color="#c8c815" size={32} style={{marginRight: 4}}/> {
                            <Text fontSize="2xl" m={2}>{handleTeamStats('def')}</Text>
                        }
                        <GiWingfoot title="Speed" color="#874B0F" size={32} style={{marginRight: 4}}/> {
                            <Text fontSize="2xl" m={2}>{handleTeamStats('spd')}</Text>
                        }
                    </Flex>
                </Flex>
                <SimpleGrid columns={3} spacingX={4} spacingY={2} mr={2} mt={2}>
                    {pokemonsTeam?.map((poke) => {
                        return (
                            <Box onClick={() => handleRemovePokeFromTeam(poke)} mb={2}>
                                <Team savedPokemon={poke} />
                            </Box>
                        )
                    })}
                </SimpleGrid>
            </Flex>
        </>
    )
}

export default PokePage