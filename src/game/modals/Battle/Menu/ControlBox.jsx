import { Button, Center, Flex, Text, Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"

import PlayerContext from "@Contexts/PlayerContext"
import PokeSelector from "./PokeSelector"

import { FaDoorOpen, FaRedo } from "react-icons/fa";

export default function ControlBox({ 
    battleId,
    team, 
    pokemon,
    setPokemon,
    isPokemonBattling,
    turnWinner,
    event,
    battleEnded
}) {
    const { updateGame, updateStatus, updateRanking } = useContext(PlayerContext)
    const [refreshResults, setRefreshResults] = useState(false)
    const refreshButtonTimer = 30000

    // const battleChooseMove = (move) => {
    //     setLoadingApi(false)
    // }

    // const pokeMoveName = (index) => {
    //     return pokemon?.moves[index].name
    // }

    // const emitMove = (roll = (diceRoll(20) + 1), index) => {
    //     emit('battle-choose-move', {battleId, id: pokemon?.id, roll: roll, moveId: pokemon.moves[index].id})
    // }

    // useEffect(() => {
    //     socket.on('battle-choose-move', res => battleChooseMove(res))

    //     return () => {
    //         socket.off('battle-choose-move', battleChooseMove)
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setRefreshResults(true);
        }, refreshButtonTimer);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isPokemonBattling ? (
                <Flex flex="1" justifyContent="space-between">
                    {battleEnded ? (
                        <>
                            <Center flex="1">
                                <Text ml={4} fontSize={"3xl"}>
                                    Battle ended, {turnWinner === pokemon?.id? `you received ${event.prizes[1].amount} coin(s)` : 'sorry, you lost'}
                                </Text>
                            </Center>
                            <Button h="100%" py={4} mr={4} title="Leave" onClick={() => {
                                const prize = event.prizes[1]

                                if (turnWinner === pokemon?.id) {
                                    updateStatus('wins')
                                    updateRanking(prize.amount, prize.name)
                                } else {
                                    updateStatus('loses')
                                }

                                updateGame({ openBattleModal: false, openEncounterModal: true })
                            }}>
                                <FaDoorOpen size="24px"/>
                            </Button>
                        </>
                    ) : (
                        <Center w="100%">
                            <Spinner size='xl' mr={8}/>
                            <Text fontSize={"3xl"}>Wait for the battle to end...</Text>
                            {refreshResults && (
                                <FaRedo
                                    title="Refresh results" size={24}
                                    cursor={"pointer"}
                                    onClick={() => setRefreshResults(true)}
                                />
                            )}
                        </Center>
                    )}
                </Flex>
            ) : (
                <Flex flex="1" justifyContent="space-between" alignItems="center" mx={32}>
                    <Text fontSize={"4xl"} m={8}>Select your pokemon</Text>
                    <Center>
                        {team.map(poke => {
                            return <PokeSelector
                                key={poke.id} 
                                poke={poke} 
                                setPokemon={setPokemon}
                                battleId={battleId}
                            />
                        })}
                    </Center>
                </Flex>
            )}
        </>
    )
}