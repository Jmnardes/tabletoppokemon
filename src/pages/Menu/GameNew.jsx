import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useState } from "react";
import socket from "@client";
import { gameConfig, validateTrainerName } from "@utils/gameConfiguration";

export default function GameNew() {
    const [trainerName, setTrainerName] = useState('')
    const [badgesToWin, setBadgesToWin] = useState(gameConfig.badgesToWin.default)
    const [levelUpgradePerTurn, setLevelUpgradePerTurn] = useState(gameConfig.levelUpgradePerTurn.default)
    const [turnsUntilNextGym, setTurnsUntilNextGym] = useState(gameConfig.turnsUntilNextGym.default)
    const [gymStrengthBonus, setGymStrengthBonus] = useState(gameConfig.gymStrengthBonus.default)
    const [shinyChance, setShinyChance] = useState(gameConfig.shinyChance.default)
    const [gameDifficulty, setGameDifficulty] = useState(gameConfig.gameDifficulty.default + 1) // Display 1-4, store 0-3
    const [formInvalid, setFormInvalid] = useState(true)
    const generation = gameConfig.generation.default;
    const mixedGroups = gameConfig.mixedGroups.default;
    const teamLength = gameConfig.teamLength.default;

    const handleTrainerName = (e) => {
        let name = e.target.value

        if (validateTrainerName(name)) {
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
                <Input textAlign="center" w={80} maxLength={gameConfig.trainerName.maxLength} onChange={handleTrainerName} />
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" gap={4} mb={2}>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Badges to Win</Text>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.badgesToWin.step} 
                        defaultValue={gameConfig.badgesToWin.default} 
                        min={gameConfig.badgesToWin.min} 
                        max={gameConfig.badgesToWin.max} 
                        allowMouseWheel 
                        onChange={(e) => {setBadgesToWin(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Level Up/Turn</Text>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.levelUpgradePerTurn.step} 
                        defaultValue={gameConfig.levelUpgradePerTurn.default} 
                        min={gameConfig.levelUpgradePerTurn.min} 
                        max={gameConfig.levelUpgradePerTurn.max} 
                        allowMouseWheel 
                        onChange={(e) => {setLevelUpgradePerTurn(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" gap={4} mb={2}>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Turns Until Gym</Text>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.turnsUntilNextGym.step} 
                        defaultValue={gameConfig.turnsUntilNextGym.default} 
                        min={gameConfig.turnsUntilNextGym.min} 
                        max={gameConfig.turnsUntilNextGym.max} 
                        allowMouseWheel 
                        onChange={(e) => {setTurnsUntilNextGym(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Gym Strength</Text>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.gymStrengthBonus.step} 
                        defaultValue={gameConfig.gymStrengthBonus.default} 
                        min={gameConfig.gymStrengthBonus.min} 
                        max={gameConfig.gymStrengthBonus.max} 
                        allowMouseWheel 
                        onChange={(e) => {setGymStrengthBonus(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" gap={4} mb={2}>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Shiny Chance %</Text>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.shinyChance.step} 
                        defaultValue={gameConfig.shinyChance.default} 
                        min={gameConfig.shinyChance.min} 
                        max={gameConfig.shinyChance.max} 
                        allowMouseWheel 
                        onChange={(e) => {setShinyChance(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xs">Difficulty</Text>
                    <NumberInput 
                        w={20} 
                        step={1} 
                        defaultValue={gameConfig.gameDifficulty.default + 1} 
                        min={1} 
                        max={4} 
                        allowMouseWheel 
                        onChange={(e) => {setGameDifficulty(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>

            <Button w="100%" fontSize="2xl" h={12} my={6} isDisabled={formInvalid} onClick={() => {

                socket.emit('session-new', ({
                    trainerName,
                    badgesToWin,
                    levelUpgradePerTurn,
                    turnsUntilNextGym,
                    gymStrengthBonus,
                    shinyChance,
                    gameDifficulty: gameDifficulty - 1,
                    generation,
                    mixedGroups,
                    teamLength
                }))

            }}>Create room</Button>
        </>
    )
}