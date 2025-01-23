import { Button, Center, Flex, Text, keyframes, Spinner } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import socket from "@client"
import PlayerContext from "@Contexts/PlayerContext"
import { diceRoll, stringToUpperCase } from "@utils"
import PokeSelector from "./PokeSelector"
import { FaDoorOpen } from "react-icons/fa";

export default function ControlBox({ 
    battleId,
    isMyTurn,
    team, 
    pokemon,
    setPokemon,
    setHitAnimation,
    displayText,
    setDisaplayText,
    isPokemonBattling,
    turnWinner,
    event
}) {
    const { emit, setLoadingApi, updateGame, updateCurrency, updateStatus } = useContext(PlayerContext)

    const handleHitAnimation = () => {
        setHitAnimation(keyframes`
        0% { transform: translate(1px, 1px) rotate(6deg); opacity: 0.1 }
        10% { transform: translate(10px, 10px) rotate(12deg); opacity: 0.4 }
        20% { transform: translate(-10px, -10px) rotate(6deg); opacity: 0.7 }
        30% { transform: translate(5px, 5px) rotate(0deg); }
        40% { transform: translate(-5px, -5px) rotate(-6deg); }
        50% { transform: translate(10px, 1px) rotate(-12deg); }
        60% { transform: translate(1px, 10px) rotate(-6deg); opacity: 0.1 }
        70% { transform: translate(-5px, 5px) rotate(0deg); opacity: 0.4 }
        80% { transform: translate(5px, -5px) rotate(6deg); opacity: 0.7 }
        90% { transform: translate(-1px, -1px) rotate(12deg); }
        100% { transform: translate(0px, 0px) rotate(6deg); }
        ` + ' 0.5s ease-in-out 1s')
    }

    // const battleChooseMove = (move) => {
    //     setLoadingApi(false)
    //     handleHitAnimation()
    //     setDisaplayText(move)
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

    return (
        <>
            {isPokemonBattling ? (
                <Flex flex="1" justifyContent="space-between">
                    {turnWinner ? (
                        <>
                            <Center flex="1">
                                <Text ml={4} fontSize={"3xl"}>
                                    Battle ended, {turnWinner === pokemon?.id? `you received ${event.prizes[1].amount} coin(s)` : 'you lost!'}
                                </Text>
                            </Center>
                            <Button h="100%" py={4} mr={4} title="Leave" onClick={() => {
                                const prize = event.prizes[1]

                                if (turnWinner === pokemon?.id) {
                                    updateStatus('wins')
                                    updateCurrency(prize.amount, prize.name)
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
                            <Text fontSize={"3xl"}>Waiting for battle results</Text>
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