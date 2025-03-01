import { Button, Center, Flex, Text, Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"

import PlayerContext from "@Contexts/PlayerContext"
import PokeSelector from "./PokeSelector"
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"
import { taskTypeEnum } from "@enum"

import { FaDoorOpen } from "react-icons/fa";

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
    const { updateGame, updateStatus, emit, setLoading } = useContext(PlayerContext)
    const [refreshResults, setRefreshResults] = useState(false)
    const refreshButtonTimer = 60000
    const prize = event.prizes[2]

    // const battleChooseMove = (move) => {
    //     setLoading({ loading: false })(false)
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

    const LeaveBattlebutton = () => {
        return (
            <Button h="100%" py={4} mr={4} title="Leave" onClick={() => {
                if (turnWinner === pokemon?.id) {
                    setLoading({ loading: true, text: "Awarding..." })
                    updateStatus('wins')
                    emit('player-update-task', { type: taskTypeEnum.winBattle, amount: 1 })
                    emit('player-win-prize', { prize: prize })
                } else {
                    updateStatus('loses')
                }

                updateGame({ openBattleModal: false, openEncounterModal: true })
            }}>
                <FaDoorOpen size="24px"/>
            </Button>
        )
    }

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
                                {turnWinner === pokemon?.id ? (
                                    <>
                                        <Flex justifyContent="center" mx={2}>
                                            <Text mt={2} fontSize={"3xl"}>You won and received {prize.amount}</Text>
                                            <PrizeIcon type={prize.name} size={12} />
                                        </Flex>
                                    </>
                                ) : <Text ml={4} fontSize={"3xl"}>Sorry, you lost the battle</Text>}
                            </Center>
                            <LeaveBattlebutton />
                        </>
                    ) : (
                        <Center w="100%">
                            <Spinner size='xl' mr={8}/>
                            {refreshResults ? (
                                <>
                                    <Text fontSize={"3xl"} mr={4}>Something went wrong!</Text>
                                    <LeaveBattlebutton />
                                </>
                            ) : (
                                <Text fontSize={"3xl"}>Wait for the battle to end...</Text>
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