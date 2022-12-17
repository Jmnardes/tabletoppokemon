import React, { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack, Image } from '@chakra-ui/react'
import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, typeColor } from '../../util'
import { catchExp, endTurnExp, experiencePerLevel, expToNextLevel, shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
import Inventary from "./Inventary/Inventary"
import Team from "./Inventary/Team"
import { FaWindowClose, FaPlusSquare, FaDice, FaDiceD20 } from "react-icons/fa";
import pokemonJSON from '../../assets/json/pokemons.json'
import { pokemonBaseStat } from '../pokemonFunctions'
// import PokeDex from "./PokeDex"
import { PokeRoll } from "./PokeRoll"
// import PokeItems from "./PokeItems"
// import { TeamRocket } from "./TeamRocket"
import { SimpleGrid } from "@chakra-ui/react"
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield,
} from "react-icons/gi";
import { PokeLife } from "./PokeLife"
import { TrainerBar } from "./TreinerBar"
import { Economy } from "./Economy"

import greatballIcon from '../../assets/images/pokeballs/poke.png'
import superballIcon from '../../assets/images/pokeballs/golden.png'
import ultraballIcon from '../../assets/images/pokeballs/ultra.png'
import { ResetGame } from "./ResetGame"

function PokePage({ maxTurns, shinyPercentage, handleGameReset, hasGameStarted, trainerName }) {
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
    const [medal, setMedal] = useState(0)
    const [trophy, setTrophy] = useState(0)
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disableDiceRoll, setDisableDiceRoll] = useState(true)
    const [disablePokeballs, setDisablePokeballs] = useState(false)
    const [greatball, setGreatBall] = useState(0)
    const [superball, setSuperBall] = useState(0)
    const [ultraball, setUltraBall] = useState(0)

    const handlePokemonRoll = () => {
        let pokemon = []

        pokemon = sortPokemon(tier, 8)

        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())
        setPokemonArray(() => [...pokemonArray, {
            pokemonId: pokemon,
            nature: nature,
            shiny: shiny
        }])

        if (pokemonArray.length > 0 && catchDiceRoll === 0) {
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
        setDisablePokeballs(true)
        setCatchDiceRoll(result + 1)
        setResultDiceRoll(bonusOnCatch + result + 1)
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

        setBonusOnCatch(0)
        setResultDiceRoll(0)
        setCatchDiceRoll(0)
        setDisablePokeballs(false)

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
        if(medal > 0) localStorage.setItem('medal', JSON.stringify(medal))
        if(trophy > 0) localStorage.setItem('trophy', JSON.stringify(trophy))
    }, [experience, level, turn, coins, medal, trophy, setExperience,pokemonsTeam, savedPokemons, shinyPercentage])

    useEffect(() => {
        const pokeTeam = JSON.parse(localStorage.getItem('pokeTeam'));
        const pokeInventory = JSON.parse(localStorage.getItem('inventory'));
        const pokeTurn = JSON.parse(localStorage.getItem('turn'));
        const pokeLevel = JSON.parse(localStorage.getItem('level'));
        const pokeExp = JSON.parse(localStorage.getItem('experience'));
        const pokeCoins = JSON.parse(localStorage.getItem('coins'));
        const pokeMedal = JSON.parse(localStorage.getItem('medal'));
        const pokeTrophy = JSON.parse(localStorage.getItem('trophy'));

        if (pokeTeam) setPokemonsTeam([...pokeTeam]);
        if (pokeInventory) setSavedPokemons([...pokeInventory]);
        if (pokeTurn) setTurn(pokeTurn);
        if (pokeLevel) setLevel(pokeLevel);
        if (pokeExp) setExperience(pokeExp);
        if (pokeCoins) setCoins(pokeCoins);
        if (pokeMedal) setMedal(pokeMedal);
        if (pokeTrophy) setTrophy(pokeTrophy);
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
                                    <Flex justifyContent="center" my={4}>
                                        <Button 
                                            mx={4}
                                            title="Great Ball"
                                            disabled={greatball === 0 || disablePokeballs}
                                            onClick={() => {
                                                if(greatball > 0) {
                                                    setGreatBall(greatball - 1)
                                                    setBonusOnCatch(2)
                                                    setDisablePokeballs(true)
                                                }
                                            }}
                                        >
                                            <Image
                                                src={greatballIcon} 
                                                alt={'greatball'}
                                                w="38px"
                                            ></Image>
                                        </Button>
                                        <Button 
                                            mx={4}
                                            title="Super Ball"
                                            disabled={superball === 0 || disablePokeballs}
                                            onClick={() => {
                                                if(superball > 0) {
                                                    setSuperBall(superball - 1)
                                                    setBonusOnCatch(3)
                                                    setDisablePokeballs(true)
                                                }
                                            }}
                                        >
                                            <Image
                                                src={superballIcon} 
                                                alt={'superball'}
                                                w="38px"
                                            ></Image>
                                        </Button>
                                        <Button 
                                            mx={4}
                                            title="Ultra Ball"
                                            disabled={ultraball === 0 || disablePokeballs}
                                            onClick={() => {
                                                if(ultraball > 0) {
                                                    setUltraBall(ultraball - 1)
                                                    setBonusOnCatch(5)
                                                    setDisablePokeballs(true)
                                                }
                                            }}
                                        >
                                            <Image
                                                src={ultraballIcon} 
                                                alt={'ultraball'}
                                                w="38px"
                                            ></Image>
                                        </Button>
                                    </Flex>
    
                                    <Flex justifyContent="center">
                                        <SimpleGrid columns={2} mt={2}>
                                            {pokemonArray?.map((data, i) => {
                                                return (
                                                    <React.Fragment key={(turn * 100) + i + data.pokemonId}>
                                                        <ShowPokemon
                                                            pokemonId={data.pokemonId}
                                                            nature={data.nature} 
                                                            shiny={data.shiny}
                                                            diceRollResult={resultDiceRoll}
                                                            handleAddInventory={() => handleAddInventory(data, true)}
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </SimpleGrid>
                                    </Flex>
                                </PokeRoll>
    
                            ) : (
                                <Text fontSize="2xl">END GAME!</Text> 
                            )}
                            <TrainerBar turn={turn} level={level} exp={experience} nextLevel={experienceToNextLevel} />
                        </Flex>
                    </Flex>
                    <Text fontSize="2xl">{trainerName}</Text>                                    
                    <Box textAlign="center">
                        <Flex>
                            <Economy 
                                coins={coins} 
                                medal={medal} 
                                trophy={trophy}
                                greatball={greatball}
                                superball={superball}
                                ultraball={ultraball}
                                handleAddOneCoin={() => setCoins(coins + 1)} 
                                handleRemoveOneCoin={() => setCoins(coins - 1)} 
                                handleAddFiveCoins={() => setCoins(coins + 5)} 
                                handleRemoveFiveCoins={() => setCoins(coins - 5)} 
                                handleAddMedal={() => setMedal(medal + 1)} 
                                handleRemoveMedal={() => setMedal(medal - 1)} 
                                handleAddTrophy={() => setTrophy(trophy + 1)} 
                                handleRemoveTrophy={() => setTrophy(trophy - 1)}
                                handleAddGreatball={() => setGreatBall(greatball + 1)}
                                handleAddSuperball={() => setSuperBall(superball + 1)}
                                handleAddUltraball={() => setUltraBall(ultraball + 1)}
                            />
                            {/* <TeamRocket /> */}
                            {/* <PokeItems /> */}
                            {/* <PokeDex /> */}
                            <ResetGame handleGameReset={handleGameReset} />
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
            
            <Flex flexDir="column" py={2} mt={2}>
                <Flex flexDir="row" justifyContent="space-evenly" backgroundColor={"gray.600"}>
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