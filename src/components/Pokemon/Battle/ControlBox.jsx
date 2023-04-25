import { Button, Center, Flex, Text, keyframes } from "@chakra-ui/react"
import { stringToUpperCase } from "../../../util"
import PokeSelector from "./PokeSelector"

export default function ControlBox({ 
    team, 
    pokemon, 
    setPokemon, 
    isPokemonBattling, 
    setIsPokemonBattling, 
    setHitAnimation, 
    displayText,
    setDisaplayText
}) {

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
            {isPokemonBattling ? (
                <Flex flex="1" justifyContent="space-between">
                    <Center w="75%">
                        {displayText !== '' ? (
                            <Text fontSize={"3xl"}>{stringToUpperCase(pokemon.name)} used {displayText}</Text>
                        ) : (
                            <Text fontSize={"3xl"}>What will {stringToUpperCase(pokemon.name)} do?</Text>
                        )}
                    </Center>
                    <Center w="25%" flexDir="column">
                        <Button w={52} h={14} m={2} onClick={() => {
                            handleHitAnimation()
                            setDisaplayText('Move 1')
                        }}>Move 1</Button>
                        <Button w={52} h={14} m={2} onClick={() => {
                            handleHitAnimation()
                            setDisaplayText('Move 2')
                        }}>Move 2</Button>
                        <Button w={52} h={14} m={2} onClick={() => {
                            setIsPokemonBattling(false)
                        }}>Change Pokemon</Button>
                    </Center>
                </Flex>
            ) : (
                <>
                    <Text fontSize={"4xl"} mr={8}>Select your pokemon</Text>
                    {team.map(poke => {
                        return <PokeSelector
                            key={poke.id} 
                            poke={poke} 
                            setPokemon={setPokemon} 
                            setIsPokemonBattling={setIsPokemonBattling} 
                        />
                    })}
                </>
            )}
        </>
    )
}