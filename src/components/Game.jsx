import React, { useEffect, useState } from "react"
import { Button, Flex, Text, useColorMode, Center, Grid, GridItem } from '@chakra-ui/react'
import Inventary from "./Pokemon/Inventary/Inventary"
import Team from "./Pokemon/Inventary/Team"
import { FaArrowRight } from "react-icons/fa";
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import Opponents from "./Pokemon/Opponents/Opponents"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeBox from "./Pokemon/Trainer/PokeBox"
import PokeTeam from "./Pokemon/Trainer/PokeTeam";
import ElementList from "./Pokemon/Team/ElementsList"
import PokeShop from "./Pokemon/Shop/PokeShop"
import TrainerBar from "./Pokemon/Trainer/TrainerBar"
import Settings from "./Pokemon/Configuration/Settings"

function PokePage() {
    const { player, session, game, updateGame, emit, setWaitingForPlayers, updateCurrency } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [endTurnButton, setEndTurnButton] = useState(true)

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