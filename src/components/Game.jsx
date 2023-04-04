import React, { useEffect, useState } from "react"
import { Button, Box, Flex, Text, Stack, useColorMode, Image, Center, Grid, GridItem } from '@chakra-ui/react'
import ShowPokemon from "./Pokemon/ShowPokemon"
import { sortPokemon } from "./sortPokemon"
import { diceRoll, parseNumberToNatural, tierSellingPrice, typeColor } from '../util'
import { catchExp, endTurnExp, experiencePerLevel, expToNextLevel, shinyRoll, whatNaturePokemonIs } from "./pokemonFunctions"
import Inventary from "./Pokemon/Inventary/Inventary"
import Team from "./Pokemon/Inventary/Team"
import { FaPlusSquare, FaDollarSign } from "react-icons/fa";
import pokemonJSON from '../assets/json/pokemons.json'
import { pokemonBaseStat } from './pokemonFunctions'
import { PlayTurn } from "./Pokemon/PlayTurn"
import { SimpleGrid } from "@chakra-ui/react"
import { TrainerBar } from "./Pokemon/Trainer/TrainerBar"
import { Economy } from "./Pokemon/Shop/Economy"
import { Settings } from "./Pokemon/Game/Settings"
import TeamTitle from "./Pokemon/Team/TeamTitle"
import PokeShop from "./Pokemon/Shop/PokeShop"
import ExperienceBar from "./Pokemon/Trainer/ExperienceBar"
import { TrainerStats } from "./Pokemon/Trainer/TrainerStats"
import EndGame from "./Pokemon/Game/EndGame"
import Items from "./Pokemon/Inventary/Items"
import StealBlock from "./Pokemon/Block/StealBlock"
import EventBlock from "./Pokemon/Event/EventBlock"
import GymBlock from "./Pokemon/Event/GymBlock"
import TournamentBlock from "./Pokemon/Event/TournamentBlock"
import { ConfettiCanvas } from "react-raining-confetti";
import ElementsList from "./Pokemon/Team/ElementsList"
import PokemonEgg from "./Pokemon/Block/PokemonEgg"

import arrowIcon from '../assets/images/game/arrow.png'
import shopIcon from '../assets/images/game/shop.png'
import event1Icon from '../assets/images/game/event1.png'
import event2Icon from '../assets/images/game/event2.png'
import event3Icon from '../assets/images/game/event3.png'

import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import Players from "./Pokemon/Players/Players"

function PokePage({ maxTurns, shinyPercentage, teamLength, generation, gameHost, setMaxTurns, gameDifficulty }) {
    const { status, handleToast } = useContext(PlayerContext)
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
    const [steal, setSteal] = useState(0)
    const [fight, setFight] = useState(0)
    const [pokemonEgg, setPokemonEgg] = useState(1)
    const [greatIncubator, setGreatIncubator] = useState(0)
    const [greatball, setGreatBall] = useState(0)
    const [superball, setSuperBall] = useState(0)
    const [ultraball, setUltraBall] = useState(0)
    const [masterball, setMasterBall] = useState(0)
    const [walkedBlocks, setWalkedBlocks] = useState(0)
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [disableDiceRoll, setDisableDiceRoll] = useState(true)
    const [disablePokeballs, setDisablePokeballs] = useState(false)
    const [rollBlockDisabed, setRollBlockDisabed] = useState(false)
    const [isPokemonEncounter, setIsPokemonEncounter] = useState(false)
    const [closeModal, setCloseModal] = useState(false)
    const [disableShop, setDisableShop] = useState(true)
    const [mercant, setMercant] = useState(false)
    const [disableEvent, setDisableEvent] = useState(true)
    const [disableGym, setDisableGym] = useState(true)
    const [gymTier, setGymTier] = useState(1)
    const [disableTournament, setDisableTournament] = useState(true)
    const [confetti, setConfetti] = useState(true)

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
                setConfetti(true)
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
        if(shiny) {
            setCoins(() => coins + tierSellingPrice(tier) + 2)
        } else {
            setCoins(() => coins + tierSellingPrice(tier))
        }
    }

    const handleCatchDiceRoll = () => {
        let result = diceRoll(20)

        if(result === 19) setCriticals(criticals + 1)
        setDisableDiceRoll(true)
        setDisablePokeballs(true)
        setCatchDiceRoll(result + 1)
        setResultDiceRoll(bonusOnCatch + result + 1)
        setEndTurnButton(false)
        setConfetti(false)
    }

    const handlePokemonRollClean = (pokemonCatchExp) => {
        setEndTurnButton(true)
        setTurn(() => turn + 1)
        setCoins(() => diceRoll(4) + 1 + coins + Number(parseNumberToNatural(turn, 10)))

        if(pokemonCatchExp) {
            setExperience(() => endTurnExp() + pokemonCatchExp + experience)
        } else {
            setExperience(() => endTurnExp() + experience)
        }

        setBonusOnCatch(0)
        setResultDiceRoll(0)
        setCatchDiceRoll(0)
        setDisablePokeballs(false)
        setRollBlockDisabed(false)
        setIsPokemonEncounter(false)
        setCloseModal(true)
        setMercant(false)

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

    const gymTurnControl = () => {
        if(turn === 5) {
            setGymTier(1)
            return true 
        }
        if(turn === 10) {
            setGymTier(2)
            return true 
        }
        if(turn === 15) {
            setGymTier(3)
            return true 
        }
        if(turn === 20) {
            setGymTier(4)
            return true 
        }
        if(turn === 25) {
            setGymTier(5)
            return true 
        }
        if(turn === 30) {
            setGymTier(6)
            return true 
        }
        if(turn === 35) {
            setGymTier(7)
            return true 
        }
        if(turn === 40) {
            setGymTier(8)
            return true 
        }
        if(turn === 70) {
            setGymTier(9)
            return true 
        }
        if(turn === 90) {
            setGymTier(10)
            return true 
        }
    }

    useEffect(() => {
        if((turn%10 === 0 || turn === maxTurns) && turn !== 0) {
            setDisableShop(false)
            handleToast({
                id: 'shop', 
                title: 'Shop',
                description: 'You can use de shop until the end of this turn',
                icon: <Image src={shopIcon} w="36px"></Image>
            })
        } else {
            mercant ? setDisableShop(false) : setDisableShop(true)
        }
        if(gymTurnControl()) {
            setDisableGym(false)
            handleToast({
                id: 'hym', 
                title: 'Gym Leader', 
                description: 'You can face the Gym Leader to get a Poke Crown',
                icon: <Image src={event2Icon} w="36px"></Image>
            })
        } else {
            setDisableGym(true)
        }

        if (gameHost) {
            if(turn%3 === 0 && turn !== 0) {
                setDisableEvent(false)
                handleToast({
                    id: 'event', 
                    title: 'Event', 
                    description: 'The event button is abled, you can roll a event now!',
                    icon: <Image src={event1Icon} w="32px"></Image>
                })
            } else {
                setDisableEvent(true)
            }
            
            if((turn % (Number.parseFloat(maxTurns/4).toFixed(0)) === 0 || turn % (Number.parseFloat(maxTurns/4).toFixed(0)) === maxTurns) && turn !== 0) {
                setDisableTournament(false)
                handleToast({
                    id: 'tournament', 
                    title: 'Pokemon Tournament', 
                    description: "It's time for the Pokemon Tournament, get ready!",
                    icon: <Image src={event3Icon} w="32px"></Image>
                })
            } else {
                setDisableTournament(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameHost, handleToast, maxTurns, turn, walkedBlocks, mercant])

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())

        if(coins > highestAmount) setHighestAmount(coins)

        setLevel(experiencePerLevel(experience))
        setExperiencePreviousLevel(expToNextLevel(level))
        setExperienceToNextLevel(expToNextLevel(level + 1))
        setTier(level)
    }, [coins, experience, highestAmount, level, shinyPercentage])

    return (
        <>
            <Center pt={3} pr={2} pb={1} display="flex" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            {confetti ? (
                <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={4000} />
            ): null}
                <Grid templateColumns='repeat(5, 1fr)' width="100%" h={12}>
                    <GridItem colSpan={2}>
                        <Center justifyContent="left">
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
                                    rollBlockDisabed={rollBlockDisabed}
                                    setRollBlockDisabed={setRollBlockDisabed}
                                    isPokemonEncounter={isPokemonEncounter}
                                    setIsPokemonEncounter={setIsPokemonEncounter}
                                    closeModal={closeModal}
                                    setCloseModal={setCloseModal}
                                    walkedBlocks={walkedBlocks}
                                    setWalkedBlocks={setWalkedBlocks}
                                    setMercant={setMercant}
                                    pokemonsTeam={pokemonsTeam}
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
                                                            gameDifficulty={gameDifficulty}
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
                            <TrainerBar 
                                turn={turn}
                                shinyPercentage={shinyPercentage}
                            />
                        </Center>
                    </GridItem>

                    <GridItem>
                        <Center colSpan={1} background={colorMode === 'light' ? "gray.200" : "RGBA(255, 255, 255, 0.08)"} borderRadius={4}>
                            <Text fontSize="2xl" fontWeight="bold">Lv.{level} - {status.trainerName}</Text>
                        </Center>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Center justifyContent="right">
                            {gameHost && (
                                <TournamentBlock
                                    disable={disableTournament}
                                />
                            )}
                            <GymBlock
                                disable={disableGym}
                                gymTier={gymTier}
                                team={handleTeamStats}
                                setConfetti={setConfetti}
                            />
                            {gameHost && (
                                <EventBlock
                                    disable={disableEvent}
                                />
                            )}
                            <StealBlock turn={turn} />
                            <PokemonEgg
                                pokemonEgg={pokemonEgg}
                                setPokemonEgg={setPokemonEgg}
                                greatIncubator={greatIncubator}
                                setGreatIncubator={setGreatIncubator}
                                turn={turn}
                                handleAddInventory={handleAddInventory}
                                tier={tier}
                                generation={generation}
                                shinyPercentage={shinyPercentage}
                                handleToast={handleToast}
                            />
                            <PokeShop
                                coins={coins}
                                setCoins={setCoins}
                                greatball={greatball}
                                setGreatBall={setGreatBall}
                                superball={superball}
                                setSuperBall={setSuperBall}
                                ultraball={ultraball}
                                setUltraBall={setUltraBall}
                                masterball={masterball}
                                setMasterBall={setMasterBall}
                                medal={medal}
                                setMedal={setMedal}
                                trophy={trophy}
                                setTrophy={setTrophy}
                                turn={turn}
                                disableShop={disableShop}
                                fight={fight}
                                steal={steal}
                                pokemonEgg={pokemonEgg}
                                greatIncubator={greatIncubator}
                                setGreatIncubator={setGreatIncubator}
                            />
                            <Settings>
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
                                    handleAddTrophy={() => setTrophy(trophy + 1)}
                                    handleAddMedal={() => setMedal(medal + 1)}
                                />
                            </Settings>
                        </Center>
                    </GridItem>
                </Grid>
            </Center>

            <Flex flex="1">
                <Box>                      
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
                                        <React.Fragment key={(turn * 100) + poke + i}>
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
                                                        isDisabled={pokemonsTeam.length >= teamLength ? true : false}
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
                                                        disabled={disableShop}
                                                        onClick={() => handleRemovePokeFromInventory(poke, true)}
                                                    >
                                                        <FaDollarSign size="16px" style={{ color: "green" }}/>
                                                    </Button>
                                                </Box>
                                            </Box>
                                            {i + pokemonsTeam.length === 5 && (
                                                <Center px={2}>
                                                    <Image
                                                        src={arrowIcon} 
                                                        title={'Pokemon team'}
                                                        w="36px"
                                                        style={{ transform: 'rotate(270deg)' }}
                                                    ></Image>
                                                </Center>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </Stack>
                        </Flex>
                    </Flex>

                    <Items>
                        <TeamTitle handleTeamStats={handleTeamStats} />
                    </Items>
                    
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
                                    <Box key={(turn * 100) + poke.pokemonId + i} m={2} mt={4}>
                                        <Team savedPokemon={poke} removeFromTeam={() => handleRemovePokeFromTeam(poke)} />
                                    </Box>
                                )
                            })}
                        </Flex>
                    </Flex>
                </Box>
                <Players />
            </Flex>
        </>
    )
}

export default PokePage