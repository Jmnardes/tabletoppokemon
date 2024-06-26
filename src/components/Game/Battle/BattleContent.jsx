import { Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import ControlBox from "./ControlBox";
import BattleScreen from "./BattleScreen";
import { useEffect } from "react";
import socket from "../../../client";
import OpponentPoke from "./OpponentPoke";
import ElementsList from "../Team/ElementsList";

export default function BattleContent({
    trainerName,
    battleId,
    myPokemonHp,
    isMyTurn,
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
    const [displayText, setDisaplayText] = useState('')
    const [hitAnimation, setHitAnimation] = useState('')

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
                        hitAnimation={hitAnimation} 
                        setHitAnimation={setHitAnimation}
                        myPokemonHp={myPokemonHp}
                        opponent={opponent}
                        battleLog={battleLog}
                        turnWinner={turnWinner}
                        event={event}
                    />
                </Center>
                <Center h={60} w="100%" background={colorMode === 'light' ? "gray.300" : "gray.600"} borderRadius={16}>
                    <Center position={"absolute"} mb={52}>
                        <ElementsList />
                    </Center>
                    <ControlBox
                        battleId={battleId}
                        isMyTurn={isMyTurn}
                        team={pokeTeam}
                        pokemon={pokemon}
                        setPokemon={setPokemon}
                        displayText={displayText}
                        setDisaplayText={setDisaplayText}
                        setHitAnimation={setHitAnimation}
                        isPokemonBattling={isPokemonBattling}
                        turnWinner={turnWinner}
                        event={event}
                    />
                </Center>
            </Center>
        </Flex>
    )
}