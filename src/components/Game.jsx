import React from "react"
import { Flex, Text, useColorMode, Center } from '@chakra-ui/react'
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import Opponents from "./Pokemon/Opponents/Opponents"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeBox from "./Pokemon/Trainer/PokeBox"
import PokeShop from "./Pokemon/Shop/PokeShop"
import TrainerBar from "./Pokemon/Trainer/TrainerBar"
import Settings from "./Pokemon/Configuration/Settings"
import TeamContainer from "./Pokemon/Team/TeamContainer";
import Items from "./Pokemon/Inventary/Items";
import ElementsList from "./Pokemon/Team/ElementsList";

function PokePage() {
    const { player, game, emit, setWaitingForPlayers } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const finishTurn = () => {
        setWaitingForPlayers(true)
        emit('turn-end')
    }

    return (
        <>
            <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
                <Center>
                    <Text pb={2} px={4} fontSize="2xl" fontWeight="bold" borderRight="1px solid">
                        {player.status.trainerName}
                    </Text>
                    <TrainerBar />
                </Center>
                <Center>
                    {/* <StealBlock />
                    <PokemonEgg /> */}
                    <PokeShop />
                    <Settings />
                </Center>
            </Center>

            <Flex flex="1">
                <Flex flex="1" flexDir="column" overflow="hidden">
                    <PokeBox />

                    <ElementsList />
                    <Items />
                    
                    <TeamContainer finishTurn={finishTurn} />
                </Flex>
                <Opponents />
            </Flex>

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