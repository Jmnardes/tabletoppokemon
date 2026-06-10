import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import socket from "@client";
import { gameConfig, validateTrainerName } from "@utils/gameConfiguration";

export default function GameNew() {
    const [trainerName, setTrainerName] = useState('')
    const [badgesToWin, setBadgesToWin] = useState(gameConfig.badgesToWin.default)
    const [stagesPerJourney, setStagesPerJourney] = useState(gameConfig.stagesPerJourney.default)
    const [battleFrequency, setBattleFrequency] = useState(gameConfig.battleFrequency.default)
    const [gymStrengthBonus, setGymStrengthBonus] = useState(gameConfig.gymStrengthBonus.default)
    const [shinyChance, setShinyChance] = useState(gameConfig.shinyChance.default)
    const [catchDifficulty, setCatchDifficulty] = useState(gameConfig.catchDifficulty.default + 1) // Display 1-4, store 0-3
    const [journeyTeamLength] = useState(gameConfig.journeyTeamLength.default)
    const [formInvalid, setFormInvalid] = useState(true)
    const generation = gameConfig.generation.default;
    const mixedGroups = gameConfig.mixedGroups.default;

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
                    <Tooltip label={gameConfig.badgesToWin.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Badges to Win</Text>
                    </Tooltip>
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
                    <Tooltip label={gameConfig.stagesPerJourney.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Stages/Journey</Text>
                    </Tooltip>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.stagesPerJourney.step} 
                        defaultValue={gameConfig.stagesPerJourney.default} 
                        min={gameConfig.stagesPerJourney.min} 
                        max={gameConfig.stagesPerJourney.max} 
                        allowMouseWheel 
                        onChange={(e) => {setStagesPerJourney(Number(e))}}
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
                    <Tooltip label={gameConfig.battleFrequency.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Battle Frequency</Text>
                    </Tooltip>
                    <NumberInput 
                        w={20} 
                        step={gameConfig.battleFrequency.step} 
                        defaultValue={gameConfig.battleFrequency.default} 
                        min={gameConfig.battleFrequency.min} 
                        max={gameConfig.battleFrequency.max} 
                        allowMouseWheel 
                        onChange={(e) => {setBattleFrequency(Number(e))}}
                    >
                        <NumberInputField disabled />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flex={1} justifyContent="space-between" alignItems="center">
                    <Tooltip label={gameConfig.gymStrengthBonus.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Gym Strength</Text>
                    </Tooltip>
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
                    <Tooltip label={gameConfig.shinyChance.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Shiny Chance %</Text>
                    </Tooltip>
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
                    <Tooltip label={gameConfig.catchDifficulty.tooltip} placement="top" hasArrow>
                        <Text fontSize="2xs" cursor="help">Catch Difficulty</Text>
                    </Tooltip>
                    <NumberInput 
                        w={20} 
                        step={1} 
                        defaultValue={gameConfig.catchDifficulty.default + 1} 
                        min={1} 
                        max={4} 
                        allowMouseWheel 
                        onChange={(e) => {setCatchDifficulty(Number(e))}}
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
                    stagesPerJourney,
                    battleFrequency,
                    gymStrengthBonus,
                    shinyChance,
                    gameDifficulty: catchDifficulty - 1,
                    generation,
                    mixedGroups,
                    journeyTeamLength
                }))

            }}>Create room</Button>
        </>
    )
}