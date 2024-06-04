import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useState } from "react";
import socket from "../../client";

export default function GameNew() {
    const [trainerName, setTrainerName] = useState('')
    const [gameDuration, setGameDuration] = useState(1)
    const [generation, setGeneration] = useState(8)
    const [gameDifficulty, setGameDifficulty] = useState(0)
    const [formInvalid, setFormInvalid] = useState(true)

    const handleTrainerName = (e) => {
        let name = e.target.value

        if (name.length > 0 && name.length < 15) {
            setFormInvalid(false)
        } else {
            setFormInvalid(true)
        }

        setTrainerName(e.target.value)
    }

    return (
        <>
            <Flex justifyContent="space-evenly" alignItems="center" my={6}>
                <Text m={2}>
                    Nickname
                </Text>
                <Input textAlign="center" w={80} maxLength={14} onChange={handleTrainerName} />
            </Flex>

            <Flex justifyContent="space-evenly" alignItems="center">
                <Text m={2}>
                    Game duration 
                </Text>
                <NumberInput m={4} w={24} step={10} defaultValue={40} min={10} max={120} allowMouseWheel onChange={(e) => {setGameDuration(e)}}>
                    <NumberInputField disabled />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            {/* <Flex justifyContent="space-evenly" alignItems="center">
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
            </Flex> */}

            <Text fontSize="2xs" mt={4}>
                Set game difficulty:
            </Text>
            <Flex flexDirection="row">
                <Button fontSize="2xs" mx={2} m={2} isDisabled={gameDifficulty === 0} _disabled={{cursor: 'default', opacity: 0.3,  border: '3px solid'}} onClick={() => setGameDifficulty(0)}>Trainer</Button>
                <Button fontSize="2xs" mx={2} m={2} isDisabled={gameDifficulty === 1} _disabled={{cursor: 'default', opacity: 0.3,  border: '3px solid'}} onClick={() => setGameDifficulty(1)}>Catcher</Button>
                <Button fontSize="2xs" mx={2} m={2} isDisabled={gameDifficulty === 2} _disabled={{cursor: 'default', opacity: 0.3,  border: '3px solid'}} onClick={() => setGameDifficulty(2)}>Champion</Button>
                <Button fontSize="2xs" mx={2} m={2} isDisabled={gameDifficulty === 3} _disabled={{cursor: 'default', opacity: 0.3,  border: '3px solid'}} onClick={() => setGameDifficulty(3)}>Elite</Button>
            </Flex>

            <Button w="100%" fontSize="2xl" h={12} my={6} isDisabled={formInvalid} onClick={() => {

                socket.emit('session-new', ({
                    trainerName,
                    gameDuration,
                    gameDifficulty,
                    generation,
                }))

            }}>Create room</Button>
        </>
    )
}