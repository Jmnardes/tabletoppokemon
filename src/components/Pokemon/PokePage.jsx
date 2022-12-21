import React, { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack, useColorMode } from '@chakra-ui/react'
import ShowPokemon from "./ShowPokemon"
import { sortPokemon } from "../sortPokemon"
import { diceRoll, typeColor } from '../../util'
import { catchExp, endTurnExp, experiencePerLevel, expToNextLevel, shinyRoll, whatNaturePokemonIs } from "../pokemonFunctions"
import Inventary from "./Inventary/Inventary"
import Team from "./Inventary/Team"
import { FaWindowClose, FaPlusSquare } from "react-icons/fa";
import pokemonJSON from '../../assets/json/pokemons.json'
import { pokemonBaseStat } from '../pokemonFunctions'
// import PokeDex from "./PokeDex"
// import PokeItems from "./PokeItems"
// import { TeamRocket } from "./TeamRocket"
import { PlayTurn } from "./PlayTurn"
import { SimpleGrid } from "@chakra-ui/react"
import { TrainerBar } from "./Treiner/TreinerBar"
import { Economy } from "./Shop/Economy"
import { ResetGame } from "./Game/ResetGame"
import TeamTitle from "./Team/TeamTitle"
import PokeShop from "./Shop/PokeShop"
import ExperienceBar from "./Treiner/ExperienceBar"
import { TreinerStats } from "./Treiner/TreinerStats"
import EndGame from "./Game/EndGame"

function PokePage({ maxTurns, shinyPercentage, handleGameReset, trainerName, teamLength, generation }) {
    const { colorMode } = useColorMode()
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [shiny, setShiny] = useState([])
    const [tier, setTier] = useState(0)
    const [level, setLevel] = useState(0)
    const [experience, setExperience] = useState(0)
    const [experienceToNextLevel, setExperienceToNextLevel] = useState(0)
    const [experiencePreviousLevel, setExperiencePreviousLevel] = useState(0)
    const [nature, setNature] = useState(0)
    const [resultDiceRoll, setResultDiceRoll] = useState(0)
    const [catchDiceRoll, setCatchDiceRoll] = useState(0)
    const [totalCatches, setTotalCatches] = useState(0)
    const [shinyCatches, setShinyCatches] = useState(0)
    const [criticals, setCriticals] = useState(0)
    const [highestAmount, setHighestAmount] = useState(0)
    const [turn, setTurn] = useState(0)
    const [bonusOnCatch, setBonusOnCatch] = useState(0)
    const [coins, setCoins] = useState(0)
    const [medal, setMedal] = useState(0)
    const [trophy, setTrophy] = useState(0)
    const [greatball, setGreatBall] = useState(0)
    const [superball, setSuperBall] = useState(0)
    const [ultraball, setUltraBall] = useState(0)
    const [walkedBlocks, setWalkedBlocks] = useState(0)
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disableDiceRoll, setDisableDiceRoll] = useState(true)
    const [disablePokeballs, setDisablePokeballs] = useState(false)
    const [isPokemonEncounter, setIsPokemonEncounter] = useState(false)
    const [closeModal, setCloseModal] = useState(false)
    const [disableShop, setDisableShop] = useState(true)

    const handlePokemonRoll = () => {
        let pokemon = []
        
        pokemon = sortPokemon(tier, generation)

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
            }, catchExp(pokemonJSON[pokemonId].tier))
            
            if(shiny.shiny) {
                setShinyCatches(shinyCatches + 1)
            } else {
                setTotalCatches(totalCatches + 1)
            }
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

    const handleRemovePokeFromSorted = (poke, pokemonExp) => {
        let array = pokemonArray

        pokemonArray.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setPokemonArray([...array])
            }
            return null
        })
        
        handlePokemonRollClean(pokemonExp)
    }

    const handleRemovePokeFromInventory = (poke, addCoin) => {
        let array = savedPokemons

        savedPokemons.filter((data, index) => {
            if (data.pokemonId === poke.pokemonId && data.nature.nature === poke.nature.nature && data.shiny.shiny === poke.shiny.shiny) {
                array.splice(index, 1)
                setSavedPokemons([...array])
                
                if (addCoin) {
                    if(data.shiny.shiny) {
                        setCoins(() => coins + pokemonJSON[poke.pokemonId].tier + 1)
                    } else {
                        setCoins(() => coins + pokemonJSON[poke.pokemonId].tier)
                    }
                }
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

        handleAddInventory(poke, false)
    }

    const handleCatchDiceRoll = () => {
        let result = diceRoll(20)

        if(result === 20) setCriticals(criticals + 1)
        setDisableDiceRoll(true)
        setDisablePokeballs(true)
        setCatchDiceRoll(result + 1)
        setResultDiceRoll(bonusOnCatch + result + 1)
        setEndTurnButton(false)
    }

    const handlePokemonRollClean = (pokemonCatchExp) => {
        setEndTurnButton(true)
        setTurn(() => turn + 1)
        setCoins(() => diceRoll(5) + coins)

        if(pokemonCatchExp) {
            setExperience(() => endTurnExp() + pokemonCatchExp + experience)
        } else {
            setExperience(() => endTurnExp() + experience)
        }

        setBonusOnCatch(0)
        setResultDiceRoll(0)
        setCatchDiceRoll(0)
        setDisablePokeballs(false)
        setIsPokemonEncounter(false)
        setCloseModal(true)

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

        if(turn%10 === 0) {
            setDisableShop(false)
        } else {
            setDisableShop(true)
        }

        if(coins > highestAmount) setHighestAmount(coins)

        setLevel(experiencePerLevel(experience))
        setExperiencePreviousLevel(expToNextLevel(level))
        setExperienceToNextLevel(expToNextLevel(level + 1))
        setTier(level)

        if(turn > 0) {
            localStorage.setItem('pokeTeam', JSON.stringify(pokemonsTeam))
            localStorage.setItem('inventory', JSON.stringify(savedPokemons))
            localStorage.setItem('turn', JSON.stringify(turn))
            localStorage.setItem('level', JSON.stringify(level))
            localStorage.setItem('experience', JSON.stringify(experience))
            localStorage.setItem('coins', JSON.stringify(coins))
            localStorage.setItem('medal', JSON.stringify(medal))
            localStorage.setItem('trophy', JSON.stringify(trophy))
            localStorage.setItem('walkedBlocks', JSON.stringify(walkedBlocks))
        }
    }, [experience, level, turn, coins, medal, trophy, setExperience,pokemonsTeam, savedPokemons, shinyPercentage, walkedBlocks, highestAmount])

    useEffect(() => {
        const pokeTeam = JSON.parse(localStorage.getItem('pokeTeam'));
        const pokeInventory = JSON.parse(localStorage.getItem('inventory'));
        const pokeTurn = JSON.parse(localStorage.getItem('turn'));
        const pokeLevel = JSON.parse(localStorage.getItem('level'));
        const pokeExp = JSON.parse(localStorage.getItem('experience'));
        const pokeCoins = JSON.parse(localStorage.getItem('coins'));
        const pokeMedal = JSON.parse(localStorage.getItem('medal'));
        const pokeTrophy = JSON.parse(localStorage.getItem('trophy'));
        const pokeBlocks = JSON.parse(localStorage.getItem('walkedBlocks'));

        if (pokeTeam) setPokemonsTeam([...pokeTeam]);
        if (pokeInventory) setSavedPokemons([...pokeInventory]);
        if (pokeTurn) setTurn(pokeTurn);
        if (pokeLevel) setLevel(pokeLevel);
        if (pokeExp) setExperience(pokeExp);
        if (pokeCoins) setCoins(pokeCoins);
        if (pokeMedal) setMedal(pokeMedal);
        if (pokeTrophy) setTrophy(pokeTrophy);
        if (pokeBlocks) setWalkedBlocks(pokeBlocks);
      }, []);

    return (
        <>
            <Box p={2} display="flex" backgroundColor={colorMode === 'light' ? "purple.300" : "gray.700"}>
                <Flex justifyContent="space-between" width="100%">
                    <Flex direction="column" textAlign="center">
                        <Flex direction="row">
                            {turn < maxTurns ? (
                                <PlayTurn
                                    pokemonArrayLength={pokemonArray.length}
                                    handlePokemonRoll={handlePokemonRoll}
                                    disableDiceRoll={disableDiceRoll}
                                    handleCatchDiceRoll={handleCatchDiceRoll}
                                    catchDiceRoll={catchDiceRoll}
                                    resultDiceRoll={resultDiceRoll}
                                    endTurnButton={endTurnButton}
                                    handlePokemonRollClean={handlePokemonRollClean}
                                    disablePokeballs={disablePokeballs}
                                    setBonusOnCatch={setBonusOnCatch}
                                    setDisablePokeballs={setDisablePokeballs}
                                    greatball={greatball}
                                    setGreatBall={setGreatBall}
                                    superball={superball}
                                    setSuperBall={setSuperBall}
                                    ultraball={ultraball}
                                    setUltraBall={setUltraBall}
                                    isPokemonEncounter={isPokemonEncounter}
                                    setIsPokemonEncounter={setIsPokemonEncounter}
                                    closeModal={closeModal}
                                    setCloseModal={setCloseModal}
                                    walkedBlocks={walkedBlocks}
                                    setWalkedBlocks={setWalkedBlocks}
                                    setDisableShop={setDisableShop}
                                >
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
                                </PlayTurn>
                            ) : (
                                <EndGame
                                    medal={medal}
                                    trophy={trophy}
                                    setTrophy={setTrophy}
                                >
                                    <TreinerStats 
                                        walked={walkedBlocks}
                                        totalCatches={totalCatches}
                                        shinyCatches={shinyCatches}
                                        totalCriticals={criticals}
                                        highestAmount={highestAmount}
                                    />
                                </EndGame>
                            )}
                            <TrainerBar 
                                turn={turn}
                                medal={medal}
                                trophy={trophy}
                            />
                        </Flex>
                    </Flex>
                    <ExperienceBar
                        level={level} 
                        exp={experience} 
                        nextLevel={experienceToNextLevel}
                        previousLevel={experiencePreviousLevel}
                    />                   
                    <Box textAlign="center">
                        <Flex>
                            {/* <TreinerStats 
                                walked={walkedBlocks}
                                totalCatches={totalCatches}
                                shinyCatches={shinyCatches}
                                totalCriticals={criticals}
                                highestAmount={highestAmount}
                            /> */}
                            <Economy 
                                coins={coins} 
                                medal={medal} 
                                trophy={trophy}
                                handleAddOneCoin={() => setCoins(coins + 1)} 
                                handleRemoveOneCoin={() => setCoins(coins - 1)} 
                                handleAddFiveCoins={() => setCoins(coins + 5)} 
                                handleRemoveFiveCoins={() => setCoins(coins - 5)}
                                handleRemoveMedal={() => setMedal(medal - 1)}
                                handleRemoveTrophy={() => setTrophy(trophy - 1)}
                            />
                            {/* <TeamRocket /> */}
                            {/* <PokeItems /> */}
                            {/* <PokeDex /> */}
                            <PokeShop 
                                coins={coins}
                                setCoins={setCoins}
                                greatball={greatball}
                                setGreatBall={setGreatBall}
                                superball={superball}
                                setSuperBall={setSuperBall}
                                ultraball={ultraball}
                                setUltraBall={setUltraBall}
                                medal={medal}
                                setMedal={setMedal}
                                trophy={trophy}
                                setTrophy={setTrophy}
                                turn={turn}
                                disableShop={disableShop}
                            />
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
                            <Box mb={2} key={(turn * 100) + poke + i}>
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
                                        isDisabled={pokemonsTeam.length >= teamLength ? true : false}
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
                                        disabled={disableShop}
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
                <TeamTitle trainerName={trainerName} handleTeamStats={handleTeamStats} />
                <SimpleGrid columns={[2, 2, 2, 3, 3, 4, 5]} spacingX={4} spacingY={2} mr={2} mt={2}>
                    {pokemonsTeam?.map((poke, i) => {
                        return <Team key={(turn * 100) + poke + i} savedPokemon={poke} removeFromTeam={() => handleRemovePokeFromTeam(poke)} />
                    })}
                </SimpleGrid>
            </Flex>
        </>
    )
}

export default PokePage