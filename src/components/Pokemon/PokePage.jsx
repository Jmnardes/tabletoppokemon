import { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack } from '@chakra-ui/react'
import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, typeColor } from '../../util'
import { catchExp, endTurnExp, experiencePerLevel, expToNextLevel, shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
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
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield,
} from "react-icons/gi";
import { PokeLife } from "./PokeLife"
import { TrainerBar } from "./TreinerBar"
import { Coins } from "./Coins"

function PokePage() {
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [shiny, setShiny] = useState([])
    const [tier, setTier] = useState(0)
    const [level, setLevel] = useState(0)
    const [experience, setExperience] = useState(0)
    const [experienceToNextLevel, setExperienceToNextLevel] = useState(0)
    const [nature, setNature] = useState(0)
    const [resultDiceRoll, setResultDiceRoll] = useState(0)
    const [catchDiceRoll, setCatchDiceRoll] = useState(0)
    const [turn, setTurn] = useState(0)
    const [bonusOnCatch, setBonusOnCatch] = useState(0)
    const [coins, setCoins] = useState(0)
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disableDiceRoll, setDisableDiceRoll] = useState(true)
    const [greatBall, setGreatBall] = useState(true)
    const [superBall, setSuperBall] = useState(true)
    const [ultraBall, setUltraBall] = useState(true)
    const shinyPercentage = 100
    const maxTurns = 60

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
        
    const handleAddInventory = ({pokemonId, nature, shiny}, sorted) => {
        setSavedPokemons(() => [{
            pokemonId,
            nature,
            shiny,
        }, ...savedPokemons])

        if(sorted) {
            handleRemovePokeFromSorted({
                pokemonId,
                nature,
                shiny,
            }, true)
        }
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
        }, false)
    }

    const handleRemovePokeFromSorted = (poke, pokemonCaught) => {
        let array = pokemonArray

        pokemonArray.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setPokemonArray([...array])
            }
            return null
        })
        
        handlePokemonRollClean(pokemonCaught)
    }

    const handleRemovePokeFromInventory = (poke, addCoin) => {
        let array = savedPokemons

        savedPokemons.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setSavedPokemons([...array])
            }
            return null
        })

        if (addCoin) setCoins(() => coins + 1)
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

        handleAddInventory(poke, false)
    }

    const handleCatchDiceRoll = () => {
        let result = diceRoll(20)

        setDisableDiceRoll(true)
        setCatchDiceRoll(result + 1)
        setResultDiceRoll(bonusOnCatch + result + 1)
        setGreatBall(false)
        setSuperBall(false)
        setUltraBall(false)
        setEndTurnButton(false)
    }

    const handlePokemonRollClean = (pokemonCaught) => {
        setEndTurnButton(true)
        setTurn(() => turn + 1)

        if(pokemonCaught) {
            setExperience(() => catchExp() + experience)
        } else {
            setExperience(() => endTurnExp() + experience)
        }


        setGreatBall(true)
        setSuperBall(true)
        setUltraBall(true)
        setBonusOnCatch(0)
        setResultDiceRoll(0)

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

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())

        setLevel(experiencePerLevel(experience))
        setExperienceToNextLevel(expToNextLevel(level + 1))
        setTier(level)

        if(pokemonsTeam.length > 0) localStorage.setItem('pokeTeam', JSON.stringify(pokemonsTeam))
        if(savedPokemons.length > 0) localStorage.setItem('inventory', JSON.stringify(savedPokemons))
        if(turn > 0) localStorage.setItem('turn', JSON.stringify(turn))
        if(level > 0) localStorage.setItem('level', JSON.stringify(level))
        if(experience > 0) localStorage.setItem('experience', JSON.stringify(experience))
        if(coins > 0) localStorage.setItem('coins', JSON.stringify(coins))
    }, [experience, level, turn, coins, setExperience,pokemonsTeam, savedPokemons])

    useEffect(() => {
        const pokeTeam = JSON.parse(localStorage.getItem('pokeTeam'));
        const pokeInventory = JSON.parse(localStorage.getItem('inventory'));
        const pokeTurn = JSON.parse(localStorage.getItem('turn'));
        const pokeLevel = JSON.parse(localStorage.getItem('level'));
        const pokeExp = JSON.parse(localStorage.getItem('experience'));
        const pokeCoins = JSON.parse(localStorage.getItem('coins'));

        if (pokeTeam) setPokemonsTeam([...pokeTeam]);
        if (pokeInventory) setSavedPokemons([...pokeInventory]);
        if (pokeTurn) setTurn(pokeTurn);
        if (pokeLevel) setLevel(pokeLevel);
        if (pokeExp) setExperience(pokeExp);
        if (pokeCoins) setCoins(pokeCoins);
      }, []);

    return (
        <>
            <Box p={2} display="flex" backgroundColor={"gray.600"}>
                <Flex justifyContent="space-between" width="100%">
                    <Flex direction="column" textAlign="center">
                        <Flex direction="row">
                            {turn < maxTurns ? (
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
                                            title="Great Ball"
                                            disabled={!greatBall}
                                            onClick={() => {
                                                setGreatBall(false)
                                                setBonusOnCatch(2)
                                            }}
                                        >
                                            +2
                                        </Button>
                                        <Button 
                                            mx={2}
                                            title="Super Ball"
                                            disabled={!superBall}
                                            onClick={() => {
                                                setSuperBall(false)
                                                setBonusOnCatch(3)
                                            }}
                                        >
                                            +3
                                        </Button>
                                        <Button 
                                            mx={2}
                                            title="Ultra Ball"
                                            disabled={!ultraBall}
                                            onClick={() => {
                                                setUltraBall(false)
                                                setBonusOnCatch(5)
                                            }}
                                        >
                                            +5
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
                                        >{resultDiceRoll}</Text>
                                    </Flex>
    
                                    <Flex justifyContent="center">
                                        <SimpleGrid columns={2} mt={2}>
                                            {pokemonArray?.map((data, i) => {
                                                return (
                                                    <ShowPokemon 
                                                        key={data.pokemonId + i} 
                                                        pokemonId={data.pokemonId} 
                                                        nature={data.nature} 
                                                        shiny={data.shiny}
                                                        diceRollResult={resultDiceRoll}
                                                        handleAddInventory={() => handleAddInventory(data, true)}
                                                    />
                                                )
                                            })}
                                        </SimpleGrid>
                                    </Flex>
                                    
                                    <Flex justifyContent="center" alignItems="center" mt={4} mb={4}>
                                        <Button 
                                            mx={4}
                                            w={40}
                                            title="Clean"
                                            disabled={endTurnButton}
                                            onClick={() => handlePokemonRollClean()}
                                            >
                                                End Turn!
                                        </Button>
                                    </Flex>
                                </PokeRoll>
    
                            ) : (
                                <Button color="red" onClick={() => {
                                    localStorage.clear()
                                    document.location.reload(true)
                                }}>RESET!</Button>
                            )}
                            {/* FAZER APARECER O BOSS */}
                            <TrainerBar turn={turn} level={level} exp={experience} nextLevel={experienceToNextLevel} />
                        </Flex>
                    </Flex>
                    <Button color="red" onClick={() => {
                        localStorage.clear()
                        document.location.reload(true)
                    }}>RESET!</Button>                                    
                    <Box textAlign="center">
                        <Flex>
                            <Coins 
                                coins={coins} 
                                handleAddOneCoin={() => setCoins(coins + 1)} 
                                handleRemoveOneCoin={() => setCoins(coins - 1)} 
                                handleAddFiveCoins={() => setCoins(coins + 5)} 
                                handleRemoveFiveCoins={() => setCoins(coins - 5)} 
                            />
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
                    {savedPokemons?.map((poke, i) => {
                        return (
                            <Box mb={2} key={poke+i}>
                                <Inventary key={poke+i} title={pokemonJSON[poke.pokemonId].name} savedPokemon={poke} />
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
                                        onClick={() => handleRemovePokeFromInventory(poke, true)}
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
                <Flex flexDir="row" justifyContent="space-evenly">
                    <Flex alignItems="center">
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
                    <PokeLife total={handleTeamStats('hp')} buttonSize={"md"} lifeSize={"2xl"} iconSize={"24px"} />
                </Flex>
                <SimpleGrid columns={[2, 2, 2, 3, 3, 4, 5]} spacingX={4} spacingY={2} mr={2} mt={2}>
                    {pokemonsTeam?.map((poke, i) => {
                        return <Team key={poke+i} savedPokemon={poke} removeFromTeam={() => handleRemovePokeFromTeam(poke)} />
                    })}
                </SimpleGrid>
            </Flex>
        </>
    )
}

export default PokePage