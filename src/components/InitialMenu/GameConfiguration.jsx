import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useState } from "react";
import socket from "../../client";

export default function GameConfiguration({ setIsPlayerInLobby }) {
    const [trainerName, setTrainerName] = useState(``)
    const [gameDuration, setGameDuration] = useState(0)
    const [generation, setGeneration] = useState(0)
    const [gameDifficulty, setGameDifficulty] = useState(0)

    return (
        <>
            <Flex justifyContent="space-evenly" alignItems="center">
                <Text fontSize="2xl" m={2}>
                    Name
                </Text>
                <Input textAlign="center" fontSize="2xl" maxLength={14} onChange={(e) => {setTrainerName(e.target.value)}} />
            </Flex>

            <Flex justifyContent="space-evenly" alignItems="center">
                <Text fontSize="2xl" m={2}>
                    Game duration 
                </Text>
                <NumberInput mx={4} w={20} step={20} defaultValue={40} min={20} max={100} allowMouseWheel onChange={(e) => {setGameDuration(e)}}>
                    <NumberInputField disabled />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            <Flex justifyContent="space-evenly" alignItems="center">
                <Text fontSize="2xl" m={2}>
                    Generation
                </Text>
                <NumberInput mt={1} w={20} step={1} defaultValue={8} min={1} max={8} allowMouseWheel onChange={(e) => {setGeneration(e)}}>
                    <NumberInputField disabled />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            <Text fontSize="1xl" mt={2}>
                Difficulty:
            </Text>
            <Flex flexDirection="row">
                <Button mx={2} m={2} disabled={gameDifficulty === 0} _disabled={{cursor: 'default', opacity: 0.3}} onClick={() => setGameDifficulty(0)}>Trainer</Button>
                <Button mx={2} m={2} disabled={gameDifficulty === 1} _disabled={{cursor: 'default', opacity: 0.3}} onClick={() => setGameDifficulty(1)}>Catcher</Button>
                <Button mx={2} m={2} disabled={gameDifficulty === 2} _disabled={{cursor: 'default', opacity: 0.3}} onClick={() => setGameDifficulty(2)}>Champion</Button>
                <Button mx={2} m={2} disabled={gameDifficulty === 3} _disabled={{cursor: 'default', opacity: 0.3}} onClick={() => setGameDifficulty(3)}>Elite</Button>
            </Flex>

            <Button w="100%" fontSize="3xl" h={12} mt={4} mb={4} onClick={() => {

                socket.emit('session-new', {
                    trainerName,
                    gameDuration,
                    gameDifficulty,
                    generation,
                })
                setIsPlayerInLobby(true)

            }}>Start</Button>
        </>
    )
}