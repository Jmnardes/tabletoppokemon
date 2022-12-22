import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { PokeLife } from "../Game/PokeLife";
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";
import { FaDiceD20, FaDiceSix } from "react-icons/fa";
import { useState } from "react";
import { diceRoll, parseNumberToNatural } from "../../../util";

export default function TeamTitle({ trainerName, handleTeamStats }) {
    const { colorMode } = useColorMode()
    const [teamTwentyRoll, setTeamTwentyRoll] = useState(0)
    const [teamSixRoll, setTeamSixRoll] = useState(0)
    const [previousTeamDiceRoll, setPreviousTeamDiceRoll] = useState(0)

    const statMedium = (stat) => {
        let mediumStat = parseNumberToNatural(stat, 3)

        if(mediumStat === '0') mediumStat = 1

        return `${mediumStat}/${stat}`
    }

    return (
        <Flex flexDir="row" justifyContent="space-evenly" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Flex alignItems="center">
                <Text fontSize="2xl">{trainerName}'s Team</Text>
            </Flex>
            <Flex alignItems="center">
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <GiHearts title="Health" color="#d61717" size={32} style={{marginRight: 4}}/>
                    <Text ml={-1} fontSize="2xl">{handleTeamStats('hp')}</Text>
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <GiBroadsword title="Attack" color="#4b4b4b" size={32} style={{marginRight: 4}}/>
                    <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('atk'))}</Text>
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <GiShield title="Defense" color="#c8c815" size={32} style={{marginRight: 4}}/>
                    <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('def'))}</Text>
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <GiWingfoot title="Speed" color="#874B0F" size={32} style={{marginRight: 4}}/>
                    <Text ml={-1} fontSize="2xl">{handleTeamStats('spd')}</Text>
                </Flex>
            </Flex>
            <Flex>
                <Flex alignItems="center">
                    <Button
                        title="Rolld20"
                        onClick={() => {
                            setPreviousTeamDiceRoll(teamTwentyRoll)
                            setTeamTwentyRoll(diceRoll(20) + 1)
                        }}
                    >
                        <FaDiceD20 size="18px"/>
                    </Button>
                    <Text
                        background={
                            teamTwentyRoll === 20 && "#2EC92E"
                        }
                        fontSize='2xl'
                        w={12}
                        borderRadius={4}
                        textAlign="center"
                    >{teamTwentyRoll}</Text>
                    <Text
                        fontSize='1xl'
                        w={8}
                        borderRadius={4}
                        textAlign="center"
                    >{previousTeamDiceRoll}</Text>
                </Flex>
                <Flex alignItems="center">
                    <Text
                        fontSize='2xl'
                        ml={-2}
                        w={12}
                        borderRadius={4}
                        textAlign="center"
                    >{teamSixRoll}</Text>
                    <Button
                        title="Rolld20"
                        onClick={() => {
                            setPreviousTeamDiceRoll(teamSixRoll)
                            setTeamSixRoll(diceRoll(6) + 1)
                        }}
                    >
                        <FaDiceSix size="18px"/>
                    </Button>
                </Flex>
            </Flex>
            <PokeLife total={handleTeamStats('hp')} buttonSize={"xs"} lifeSize={"2xl"} iconSize={"12px"} title={true}/>
        </Flex>
    )
}