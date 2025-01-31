import { Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";

import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client";

import ElementsList from "@components/Elements/ElementsList";
import ControlBox from "./Menu/ControlBox";
import BattleScreen from "./Screen/BattleScreen";
import OpponentPoke from "./Screen/OpponentPoke";

export default function BattleContent({
    battleId,
    opponent,
    opponentTrainer,
    isPokemonBattling,
    battleLog,
    turnWinner,
    event
}) {
    const { pokeTeam, updateGame } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [pokemon, setPokemon] = useState()
    const [battleEnded, setBattleEnded] = useState(false);

    const battleEnd = () => {
        updateGame({ openBattleModal: false, openEncounterModal: true })
    }

    useEffect(() => {
        socket.on('battle-end', battleEnd)

        return () => {
            socket.off('battle-end', battleEnd)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex flex="1">
            <Center flexDir="column" flex="1">
                {opponentTrainer && (
                    <Center position={"absolute"} top={2} left={2}>
                        <Center flexDir={"column"} mx={4}>
                            <Text fontStyle={"italic"} color={"red.400"} my={1}>VS.</Text>
                            <Text my={1}>{opponentTrainer.status.trainerName}</Text>
                        </Center>
                        {opponentTrainer.pokeTeam.map(pokemon => {
                            return <OpponentPoke
                                key={pokemon.id}
                                poke={pokemon}
                            />
                        })}
                    </Center>
                )}
                <Center w="100%" flex="1" p={4}>
                    <BattleScreen 
                        pokemon={pokemon} 
                        opponent={opponent}
                        battleLog={battleLog}
                        turnWinner={turnWinner}
                        event={event}
                        battleEnded={battleEnded}
                        setBattleEnded={setBattleEnded}
                    />
                </Center>
                <Center h={60} w="100%" background={colorMode === 'light' ? "gray.300" : "gray.600"} borderRadius={16}>
                    <Center position={"absolute"} mb={52}>
                        <ElementsList />
                    </Center>
                    <ControlBox
                        battleId={battleId}
                        team={pokeTeam}
                        pokemon={pokemon}
                        setPokemon={setPokemon}
                        isPokemonBattling={isPokemonBattling}
                        turnWinner={turnWinner}
                        event={event}
                        battleEnded={battleEnded}
                    />
                </Center>
            </Center>
        </Flex>
    )
}