import { Button, Center, Flex, Text, keyframes, Spinner } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import { stringToUpperCase } from "../../../util"
import PokeSelector from "./PokeSelector"

export default function ControlBox({ 
    battleId,
    isMyTurn,
    team, 
    pokemon, 
    setPokemon,
    setHitAnimation, 
    displayText,
    setDisaplayText,
}) {
    const { emit } = useContext(PlayerContext)

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

    return (
        <>
            {pokemon ? (
                <Flex flex="1" justifyContent="space-between">
                    {isMyTurn ? (
                        <>
                            <Center w="75%">
                                {displayText !== '' ? (
                                    <Text fontSize={"3xl"}>{stringToUpperCase(pokemon.name)} used {displayText}</Text>
                                ) : (
                                    <Text fontSize={"3xl"}>What will {stringToUpperCase(pokemon.name)} do?</Text>
                                )}
                            </Center>
                            <Center w="25%" flexDir="column">
                                <Button w={52} h={14} m={2} isDisabled={!isMyTurn} onClick={() => {
                                    handleHitAnimation()
                                    setDisaplayText('Move 1')
                                    emit('battle-choose-pokemon', {battleId, id: pokemon.id, roll: 1, move: 1})
                                }}>Move 1</Button>
                                <Button w={52} h={14} m={2} isDisabled={!isMyTurn} onClick={() => {
                                    handleHitAnimation()
                                    setDisaplayText('Move 2')
                                    emit('battle-choose-pokemon', {battleId, id: pokemon.id, roll: 2, move: 2})
                                }}>Move 2</Button>
                                <Button w={52} h={14} m={2} isDisabled={!isMyTurn} onClick={() => {
                                    setPokemon()
                                }}>Change Pokemon</Button>
                            </Center>
                        </>
                    ) : (
                        <Center flex="1">
                            <Spinner size='xl' />
                            <Text ml={4} fontSize={"3xl"}>Waiting for your turn</Text>
                        </Center>
                    )}
                </Flex>
            ) : (
                <>
                    <Text fontSize={"4xl"} mr={8}>Select your pokemon</Text>
                    {team.map(poke => {
                        return <PokeSelector
                            key={poke.id} 
                            poke={poke} 
                            setPokemon={setPokemon}
                        />
                    })}
                </>
            )}
        </>
    )
}