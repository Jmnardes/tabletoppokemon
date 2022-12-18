import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useColorMode } from "@chakra-ui/react";

export default function InitialMenu({ handleMaxTurns, handleGameDifficulty, gameDifficulty, handleShinyChance, handleGameStart, handleTrainerName, setGeneration }) {
    const { colorMode } = useColorMode()

    return (
        <Flex 
            justifyContent="center" 
            alignItems="center"
            mx="0 auto"
        >
            <Flex 
                mt={8} 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                maxWidth="600px" 
                background={colorMode === 'light' ? "purple.300" : "gray.700"} 
                borderRadius={8} p={8}
            >
                <Text fontSize="4xl">
                    Welcome to Im'a Pokémon!
                </Text>

                <Flex flexDirection="column" m={4} justifyContent="center" alignItems="center">
                    <Text fontSize="3xl" mb={2}>
                        Choose your name 
                    </Text>
                    <Input textAlign="center" fontSize="2xl" onChange={(e) => {handleTrainerName(e.target.value)}} />
                </Flex>

                <Flex justifyContent="space-evenly" alignItems="center">
                    <Text fontSize="3xl" m={4}>
                        Turns 
                    </Text>
                    <NumberInput mx={4} w={20} step={5} defaultValue={45} min={30} max={200} allowMouseWheel onChange={(e) => {handleMaxTurns(e)}}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>

                <Text fontSize="2xl" mt={8}>
                    Shiny Percentage
                </Text>

                <NumberInput mt={1} w={20} step={1} defaultValue={5} min={1} max={50} allowMouseWheel onChange={(e) => {handleShinyChance(e)}}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Text fontSize="2xl" mt={8}>
                    Pokemon Generation
                </Text>

                <NumberInput mt={1} w={20} step={1} defaultValue={8} min={1} max={8} allowMouseWheel onChange={(e) => {setGeneration(e)}}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Text fontSize="2xl" mt={4}>
                    Choose the difficulty
                </Text>
                <Flex flexDirection="row">
                    <Button mx={2} disabled={gameDifficulty === 0} _disabled={{border: '2px #ffffff solid', opacity: 0.7}} onClick={() => handleGameDifficulty(0)}>Trainer</Button>
                    <Button mx={2} disabled={gameDifficulty === 1} _disabled={{border: '2px #ffffff solid', opacity: 0.7}} onClick={() => handleGameDifficulty(1)}>Catcher</Button>
                    <Button mx={2} disabled={gameDifficulty === 2} _disabled={{border: '2px #ffffff solid', opacity: 0.7}} onClick={() => handleGameDifficulty(2)}>Champion</Button>
                    <Button mx={2} disabled={gameDifficulty === 3} _disabled={{border: '2px #ffffff solid', opacity: 0.7}} onClick={() => handleGameDifficulty(3)}>Elite</Button>
                </Flex>

                <Button w="100%" fontSize="3xl" h={12} mt={8} onClick={() => handleGameStart(true)}>Start</Button>
            </Flex>
        </Flex>
    )
}