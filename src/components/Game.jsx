import React, { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack, useColorMode, Center, Grid, GridItem } from '@chakra-ui/react'
import ShowPokemon from "./Pokemon/ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, tierSellingPrice, typeColor } from '../util'
import { catchExp, endTurnExp, experiencePerLevel, expToNextLevel, shinyRoll, whatNaturePokemonIs } from "./pokemonFunctions"
import Inventary from "./Pokemon/Inventary/Inventary"
import Team from "./Pokemon/Inventary/Team"
import { FaPlusSquare, FaDollarSign, FaArrowRight } from "react-icons/fa";
import pokemonJSON from '../assets/json/pokemons.json'
import { pokemonBaseStat } from './pokemonFunctions'
import { PlayTurn } from "./Pokemon/PlayTurn"
import { SimpleGrid } from "@chakra-ui/react"
import { TrainerBar } from "./Pokemon/Trainer/TrainerBar"
import { Settings } from "./Pokemon/Game/Settings"
import PokeShop from "./Pokemon/Shop/PokeShop"
import ExperienceBar from "./Pokemon/Trainer/ExperienceBar"
import { TrainerStats } from "./Pokemon/Trainer/TrainerStats"
import EndGame from "./Pokemon/Game/EndGame"
import Items from "./Pokemon/Inventary/Items"
import StealBlock from "./Pokemon/Block/StealBlock"
import { ConfettiCanvas } from "react-raining-confetti";
import ElementsList from "./Pokemon/Team/ElementsList"
import PokemonEgg from "./Pokemon/Block/PokemonEgg"
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import Opponents from "./Pokemon/Players/Opponents"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"

function PokePage() {
    const { player, session, game, updateGame, emit, setWaitingForPlayers, updateCurrency, event } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [pokemonArray, setPokemonArray] = useState([])
    const [savedPokemons, setSavedPokemons] = useState([])
    const [pokemonsTeam, setPokemonsTeam] = useState([])
    const [tier, setTier] = useState(0)
    const [level, setLevel] = useState(0)
    const [experience, setExperience] = useState(0)
    const [experienceToNextLevel, setExperienceToNextLevel] = useState(0)
    const [experiencePreviousLevel, setExperiencePreviousLevel] = useState(0)
    const [resultDiceRoll, setResultDiceRoll] = useState(0)
    const [totalCatches, setTotalCatches] = useState(0)
    const [shinyCatches, setShinyCatches] = useState(0)
    const [criticals, setCriticals] = useState(0)
    const [highestAmount, setHighestAmount] = useState(0)
    const [bonusOnCatch, setBonusOnCatch] = useState(0)
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disablePokeCatch, setDisablePokeCatch] = useState(true)
    const [closeModal, setCloseModal] = useState(false)
    const [confetti, setConfetti] = useState(true)

    const handlePokemonEncounter = () => {
        let pokemon = [{
            pokemonId: sortPokemon(tier, session.generation),
            nature: whatNaturePokemonIs(),
            shiny: shinyRoll(player.items.incense)
        },
        {
            pokemonId: sortPokemon(tier, session.generation),
            nature: whatNaturePokemonIs(),
            shiny: shinyRoll(player.items.incense)
        },
        {
            pokemonId: sortPokemon(tier, session.generation),
            nature: whatNaturePokemonIs(),
            shiny: shinyRoll(player.items.incense)
        },
        {
            pokemonId: sortPokemon(tier, session.generation),
            nature: whatNaturePokemonIs(),
            shiny: shinyRoll(player.items.incense)
        }]

        setPokemonArray([...pokemon])
    }
        
    const handleAddInventory = ({pokemonId, nature, shiny}, sorted) => {
        setSavedPokemons(old => [{
            pokemonId,
            nature,
            shiny,
        }, ...old])

        if(sorted) {
            handleRemovePokeFromSorted({
                pokemonId,
                nature,
                shiny,
            }, catchExp(pokemonJSON[pokemonId].tier))
            
            if(shiny.shiny) {
                setShinyCatches(shinyCatches + 1)
                setConfetti(true)
            } else {
                setTotalCatches(totalCatches + 1)
            }

            setDisablePokeCatch(true)
        }
    }

    const handleAddPokemonTeam = ({pokemonId, nature, shiny}) => {
        setPokemonsTeam(old => [{
            pokemonId,
            nature,
            shiny,
        }, ...old])

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
                
                if (addCoin) handleSellingPokemonPrice(pokemonJSON[poke.pokemonId].tier, data.shiny.shiny)
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

    const handleSellingPokemonPrice = (tier, shiny) => {
        updateCurrency(player.currency.coins + tierSellingPrice(tier) + (shiny * 2), 'coins')
    }

    const handleCatchDiceRoll = () => {
        let result = diceRoll(20)

        updateGame({ isPokemonRollDisabled: true })

        if(result === 19) setCriticals(criticals + 1)
        setDisablePokeCatch(false)
        setResultDiceRoll(bonusOnCatch + result + 1)
        setConfetti(false)
    }

    const handlePokemonRollClean = (pokemonCatchExp) => {
        if(pokemonCatchExp) {
            setExperience(() => endTurnExp() + pokemonCatchExp + experience)
        } else {
            setExperience(() => endTurnExp() + experience)
        }
    }

    const handleFinishMyTurn = () => {
        setEndTurnButton(true)

        setWaitingForPlayers(true)

        setPokemonArray([])

        emit('turn-end')
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
        if(player.currency.coins > highestAmount) setHighestAmount(player.currency.coins)

        setLevel(experiencePerLevel(experience))
        setExperiencePreviousLevel(expToNextLevel(level))
        setExperienceToNextLevel(expToNextLevel(level + 1))
        setTier(level)
    }, [player.currency.coins, experience, highestAmount, level])

    useEffect(() => {
        handlePokemonEncounter()
        setEndTurnButton(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.turn])

    return (
        <>
            <Center pt={3} pr={2} pb={1} display="flex" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            {confetti ? (
                <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={4000} />
            ): null}
                <Grid templateColumns='repeat(5, 1fr)' width="100%" h={12}>
                    <GridItem colSpan={2}>
                        <Center justifyContent="left">
                            {game.turn < session.gameDuration ? (
                                <PlayTurn
                                    handleCatchDiceRoll={handleCatchDiceRoll}
                                    setBonusOnCatch={setBonusOnCatch}
                                    closeModal={closeModal}
                                    setCloseModal={setCloseModal}
                                >
                                    <Flex justifyContent="center">
                                        <SimpleGrid columns={2} mt={2}>
                                            {pokemonArray?.map((data, i) => {
                                                return (
                                                    <React.Fragment key={`${i} ${Date.now()}`}>
                                                        <ShowPokemon
                                                            pokemonId={data.pokemonId}
                                                            nature={data.nature} 
                                                            shiny={data.shiny}
                                                            diceRollResult={resultDiceRoll}
                                                            setResultDiceRoll={setResultDiceRoll}
                                                            handleAddInventory={() => handleAddInventory(data, true)}
                                                            disablePokeCatch={disablePokeCatch}
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </SimpleGrid>
                                    </Flex>
                                </PlayTurn>
                            ) : (
                                <>
                                    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={4000} />
                                    <EndGame>
                                        <TrainerStats />
                                    </EndGame>
                                </>
                            )}
                            <TrainerBar />
                        </Center>
                    </GridItem>

                    <GridItem>
                        <Center colSpan={1} background={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={4}>
                            <Text fontSize="2xl" fontWeight="bold">Lv.{level} - {player.status.trainerName}</Text>
                        </Center>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Center justifyContent="right">
                            {/* <StealBlock /> */}
                            <PokemonEgg handleAddInventory={handleAddInventory} tier={tier} />
                            <PokeShop />
                            <Settings />
                        </Center>
                    </GridItem>
                </Grid>
            </Center>

            <Flex flex="1">
                <Box flex="1">                      
                    <Flex justifyContent="space-between">
                        <Flex flexDir="column" width={"100%"} py={2} minHeight="9rem" border={`2px solid ${colorMode === 'light' ? "#A0AEC0" : "#2D3748"}`}>
                            <Text fontSize="2xl" fontWeight="bold" lineHeight="36px" pl={2} mb={2} w="100%" textAlign="center">Pokemon inventary</Text>
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
                                        <React.Fragment key={(game.turn * 100) + poke + i}>
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
                                                            backgroundColor: `#327ae64c`,
                                                            cursor: "pointer",
                                                            borderLeft: "2px solid #327ae64c",
                                                            borderBottom: "2px solid #327ae64c"
                                                        }}
                                                        isDisabled={pokemonsTeam.length >= session.teamLength ? true : false}
                                                        onClick={() => handleAddPokemonTeam(poke)}
                                                    >
                                                        <FaPlusSquare size="16px" style={{ color: "#085ad6", marginRight: "4px" }}/>
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        width="50%"
                                                        title={
                                                            poke.shiny.shiny 
                                                            ? tierSellingPrice(pokemonJSON[poke.pokemonId].tier + 1) 
                                                            : tierSellingPrice(pokemonJSON[poke.pokemonId].tier)
                                                        }
                                                        borderRadius="0 0 16px 0"
                                                        borderRight={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                                        borderBottom={`2px solid ${typeColor(pokemonJSON[poke.pokemonId].type)}`}
                                                        _hover={{
                                                            backgroundColor: "#52d73750",
                                                            cursor: "pointer",
                                                            borderRight: "2px solid #52d73750",
                                                            borderBottom: "2px solid #52d73750"
                                                        }}
                                                        onClick={() => handleRemovePokeFromInventory(poke, true)}
                                                    >
                                                        <FaDollarSign size="16px" style={{ color: "green" }}/>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </React.Fragment>
                                    )
                                })}
                            </Stack>
                        </Flex>
                    </Flex>

                    <Items handleTeamStats={handleTeamStats} />
                    
                    <ExperienceBar
                        exp={experience} 
                        nextLevel={experienceToNextLevel}
                        previousLevel={experiencePreviousLevel}
                    />
                    
                    <Flex flexDir="column">
                        <ElementsList />
                        <Flex justifyContent="center" alignItems="center">
                            {pokemonsTeam?.map((poke, i) => {
                                return (
                                    <Box key={(game.turn * 100) + poke.pokemonId + i} m={2} mt={4}>
                                        <Team savedPokemon={poke} removeFromTeam={() => handleRemovePokeFromTeam(poke)} />
                                    </Box>
                                )
                            })}
                        </Flex>
                    </Flex>
                </Box>
                <Opponents />
            </Flex>
            <Button borderRadius={"none"} h={16} isDisabled={endTurnButton} onClick={() => {
                handleFinishMyTurn()
            }}>
                <Text mb={1} mr={8} fontSize="2xl" fontWeight="bold">Finish turn</Text>
                <FaArrowRight size="24px"/>
            </Button>
            {
                game.openChallengeModal && (
                    <ChallengeModal pokeTeam={pokemonsTeam} />
                )
            }
            {
                game.openWalkModal && (
                    <WalkModal pokeTeam={pokemonsTeam} />
                )
            }
        </>
    )
}

export default PokePage