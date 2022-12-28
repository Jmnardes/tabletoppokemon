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
import { TrainerBar } from "./Pokemon/Treiner/TrainerBar"
import { Economy } from "./Pokemon/Shop/Economy"
import { Settings } from "./Pokemon/Game/Settings"
import TeamTitle from "./Pokemon/Team/TeamTitle"
import PokeShop from "./Pokemon/Shop/PokeShop"
import ExperienceBar from "./Pokemon/Treiner/ExperienceBar"
import { TreinerStats } from "./Pokemon/Treiner/TreinerStats"
import EndGame from "./Pokemon/Game/EndGame"
import PokeballStats from "./Pokemon/Treiner/PokeballStats"
import Items from "./Pokemon/Inventary/Items"
import FightBlock from "./Pokemon/Block/FightBlock"
import StealBlock from "./Pokemon/Block/StealBlock"
import EventBlock from "./Pokemon/Event/EventBlock"
import GymBlock from "./Pokemon/Event/GymBlock"
import TournamentBlock from "./Pokemon/Event/TournamentBlock"
import { ConfettiCanvas } from "react-raining-confetti";

import arrowIcon from '../assets/images/game/arrow.png'
import shopIcon from '../assets/images/game/shop.png'
import event1Icon from '../assets/images/game/event1.png'
import event2Icon from '../assets/images/game/event2.png'
import event3Icon from '../assets/images/game/event3.png'
import ElementsList from "./Pokemon/Team/ElementsList"

function PokePage({ maxTurns, shinyPercentage, handleGameReset, trainerName, teamLength, generation, handleToast, gameHost }) {
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
            setCoins(() => coins + tierSellingPrice(tier) + 1)
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
        setCoins(() => diceRoll(3) + coins + Number(parseNumberToNatural(turn, 10)))

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
            handleToast(
                'shop', 
                'Shop', 
                'You can use de shop until the end of this turn',
                <Image src={shopIcon} w="36px"></Image>
            )
        } else {
            mercant ? setDisableShop(false) : setDisableShop(true)
        }
        if(gymTurnControl()) {
            setDisableGym(false)
            handleToast(
                'hym', 
                'Gym Leader', 
                'You can face the Gym Leader to get a Poke Crown',
                <Image src={event2Icon} w="36px"></Image>
            )
        } else {
            setDisableGym(true)
        }

        if (gameHost) {
            if(turn%3 === 0 && turn !== 0) {
                setDisableEvent(false)
                handleToast(
                    'event', 
                    'Event', 
                    'The event button is abled, you can roll a event now!',
                    <Image src={event1Icon} w="32px"></Image>
                )
            } else {
                setDisableEvent(true)
            }
            
            if(turn % (Number.parseFloat(maxTurns/4).toFixed(0)) === 0 && turn !== 0) {
                setDisableTournament(false)
                handleToast(
                    'tournament', 
                    'Pokemon Tournament', 
                    "It's time for the Pokemon Tournament, get ready!",
                    <Image src={event3Icon} w="32px"></Image>
                )
            } else {
                setDisableTournament(true)
            }
        }
    }, [gameHost, handleToast, maxTurns, turn, walkedBlocks, mercant])

    useEffect(() => {
        setShiny(() => shinyRoll(shinyPercentage))
        setNature(() => whatNaturePokemonIs())

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
    }, [experience, level, turn, coins, medal, trophy, setExperience, pokemonsTeam, savedPokemons, shinyPercentage, walkedBlocks, highestAmount, maxTurns])

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
            <Center pt={3} pr={2} pb={1} display="flex" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"} borderBottom="solid 1px">
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
                                    greatball={greatball}
                                    setGreatBall={setGreatBall}
                                    superball={superball}
                                    setSuperBall={setSuperBall}
                                    ultraball={ultraball}
                                    setUltraBall={setUltraBall}
                                    masterball={masterball}
                                    setMasterBall={setMasterBall}
                                    rollBlockDisabed={rollBlockDisabed}
                                    setRollBlockDisabed={setRollBlockDisabed}
                                    isPokemonEncounter={isPokemonEncounter}
                                    setIsPokemonEncounter={setIsPokemonEncounter}
                                    closeModal={closeModal}
                                    setCloseModal={setCloseModal}
                                    walkedBlocks={walkedBlocks}
                                    setWalkedBlocks={setWalkedBlocks}
                                    setMercant={setMercant}
                                    setCoins={setCoins}
                                    coins={coins}
                                    pokemonsTeam={pokemonsTeam}
                                    setTrophy={setTrophy}
                                    trophy={trophy}
                                    medal={medal}
                                    setMedal={setMedal}
                                    steal={steal}
                                    setSteal={setSteal}
                                    fight={fight}
                                    setFight={setFight}
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
                                <>
                                    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={4000} />
                                    <EndGame
                                        medal={medal}
                                        trophy={trophy}
                                        setTrophy={setTrophy}
                                        coins={coins}
                                    >
                                        <TreinerStats 
                                            walked={walkedBlocks}
                                            totalCatches={totalCatches}
                                            shinyCatches={shinyCatches}
                                            totalCriticals={criticals}
                                            highestAmount={highestAmount}
                                        />
                                    </EndGame>
                                </>
                            )}
                            <TrainerBar 
                                turn={turn}
                                medal={medal}
                                trophy={trophy}
                                coin={coins}
                            />
                        </Center>
                    </GridItem>

                    <GridItem>
                        <Center colSpan={1} background={colorMode === 'light' ? "gray.200" : "RGBA(255, 255, 255, 0.08)"} borderRadius={4}>
                            <Text fontSize="2xl" fontWeight="bold">Lv.{level} - {trainerName}</Text>
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
                                trophy={trophy}
                                setTrophy={setTrophy}
                                team={handleTeamStats}
                                setConfetti={setConfetti}
                            />
                            {gameHost && (
                                <EventBlock
                                    disable={disableEvent}
                                />
                            )}
                            <StealBlock 
                                steal={steal}
                                setSteal={setSteal}
                                turn={turn}
                            />
                            <FightBlock 
                                fight={fight}
                                setFight={setFight}
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
                            />
                            <Settings handleGameReset={handleGameReset}>
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

            <Flex flexDir="column" py={2} minHeight="9rem">
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

            <Items>
                <PokeballStats 
                    greatball={greatball}
                    superball={superball}
                    ultraball={ultraball}
                    masterball={masterball}
                    fight={fight}
                    steal={steal}
                />
            </Items>
            
            <ExperienceBar
                exp={experience} 
                nextLevel={experienceToNextLevel}
                previousLevel={experiencePreviousLevel}
            />
            
            <Flex flexDir="column">
                <TeamTitle handleTeamStats={handleTeamStats} />
                <ElementsList />
                <Flex justifyContent="center" alignItems="center">
                    {pokemonsTeam?.map((poke, i) => {
                        return (
                            <Box key={(turn * 100) + poke.pokemonId + i} m={8}>
                                <Team savedPokemon={poke} removeFromTeam={() => handleRemovePokeFromTeam(poke)} />
                            </Box>
                        )
                    })}
                </Flex>
            </Flex>
        </>
    )
}

export default PokePage