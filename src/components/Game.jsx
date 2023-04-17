import React, { useEffect, useState } from "react"
import { Button, Flex, Text, useColorMode, Center, Grid, GridItem } from '@chakra-ui/react'
import Inventary from "./Pokemon/Inventary/Inventary"
import Team from "./Pokemon/Inventary/Team"
import { FaPlusSquare, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { ConfettiCanvas } from "react-raining-confetti";
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import Opponents from "./Pokemon/Players/Opponents"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeBox from "./Pokemon/Trainer/PokeBox"
import PokeTeam from "./Pokemon/Trainer/PokeTeam";
import ElementList from "./Pokemon/Team/ElementsList"
import PokeShop from "./Pokemon/Shop/PokeShop"
import TrainerBar from "./Pokemon/Trainer/TrainerBar"
import Settings from "./Pokemon/Game/Settings"

function PokePage() {
    const { player, session, game, updateGame, emit, setWaitingForPlayers, updateCurrency } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [endTurnButton, setEndTurnButton] = useState(true)
    const [closeModal, setCloseModal] = useState(false)
    const [confetti, setConfetti] = useState(true)

    // const handlePokemonRollClean = (pokemonCatchExp) => {
    //     if(pokemonCatchExp) {
    //         setExperience(() => endTurnExp() + pokemonCatchExp + experience)
    //     } else {
    //         setExperience(() => endTurnExp() + experience)
    //     }
    // }

    const handleFinishMyTurn = () => {
        setEndTurnButton(true)

        setWaitingForPlayers(true)

        emit('turn-end')
    }

    useEffect(() => {
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
                            <TrainerBar />
                        </Center>
                    </GridItem>

                    <GridItem>
                        <Center colSpan={1} background={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={4}>
                            <Text fontSize="2xl" fontWeight="bold">Lv.{player.status.level} - {player.status.trainerName}</Text>
                        </Center>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Center justifyContent="right">
                            {/* <StealBlock />
                            <PokemonEgg /> */}
                            <PokeShop />
                            <Settings />
                        </Center>
                    </GridItem>
                </Grid>
            </Center>

            <Flex flex="1">
                <Flex flex="1" flexDir="column" overflow="hidden">
                    {/* <Flex flexDir="column" width={"100%"} py={2} minHeight="9rem" border={`2px solid ${colorMode === 'light' ? "#A0AEC0" : "#2D3748"}`}>
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
                    </Flex> */}
                    <PokeBox />

                    {/* <Items handleTeamStats={handleTeamStats} />
                    
                    <ExperienceBar
                        exp={experience} 
                        nextLevel={experienceToNextLevel}
                        previousLevel={experiencePreviousLevel}
                    /> */}
                    
                    <Flex flexDir="column">
                        <ElementList />
                        <PokeTeam />
                    </Flex>
                </Flex>
                <Opponents />
            </Flex>

            <Button w="100%" borderRadius={"none"} h={16} onClick={() => {
                handleFinishMyTurn()
            }}>
                <Text mb={1} mr={8} fontSize="2xl" fontWeight="bold">Finish turn</Text>
                <FaArrowRight size="24px"/>
            </Button>
            {
                game.openChallengeModal && (
                    <ChallengeModal />
                )
            }
            {
                game.openWalkModal && (
                    <WalkModal />
                )
            }
            {
                game.openGymModal && (
                    <GymModal />
                )
            }
            {
                game.openEncounterModal && (
                    <EncounterModal />
                )
            }
        </>
    )
}

export default PokePage