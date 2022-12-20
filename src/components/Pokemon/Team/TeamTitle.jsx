import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { PokeLife } from "../PokeLife";
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";
import { FaDiceD20 } from "react-icons/fa";
import { useState } from "react";
import { diceRoll } from "../../../util";

export default function TeamTitle({ trainerName, handleTeamStats }) {
    const { colorMode } = useColorMode()
    const [teamDiceRoll, setTeamDiceRoll] = useState(0)
    const [previousTeamDiceRoll, setPreviousTeamDiceRoll] = useState(0)

    return (
        <Flex flexDir="row" justifyContent="space-evenly" backgroundColor={colorMode === 'light' ? "purple.300" : "gray.700"}>
            <Flex alignItems="center">
                <Text fontSize="2xl">{trainerName}'s Team</Text>
            </Flex>
            <Flex alignItems="center">
                <GiHearts title="Health" color="#d61717" size={32} style={{marginRight: 4}}/> {
                    <Text fontSize="2xl" m={2}>{handleTeamStats('hp')}</Text>
                }
                <GiBroadsword title="Attack" color="#4b4b4b" size={32} style={{marginRight: 4}}/> {
                    <Text fontSize="2xl" m={2}>{handleTeamStats('atk')}</Text>
                }
                <GiShield title="Defense" color="#c8c815" size={32} style={{marginRight: 4}}/> {
                    <Text fontSize="2xl" m={2}>{handleTeamStats('def')}</Text>
                }
                <GiWingfoot title="Speed" color="#874B0F" size={32} style={{marginRight: 4}}/> {
                    <Text fontSize="2xl" m={2}>{handleTeamStats('spd')}</Text>
                }
            </Flex>
            <Flex alignItems="center">
                <Button
                    mx={2}
                    title="Rolld20"
                    onClick={() => {
                        setPreviousTeamDiceRoll(teamDiceRoll)
                        setTeamDiceRoll(diceRoll(20) + 1)
                    }}
                >
                    <FaDiceD20 size="18px"/>
                </Button>
                <Text
                    background={
                        teamDiceRoll === 20 && "#2EC92E"
                    }
                    fontSize='2xl'
                    ml={2}
                    w={12}
                    borderRadius={4}
                    textAlign="center"
                >{teamDiceRoll}</Text>
                <Text
                    fontSize='1xl'
                    w={8}
                    borderRadius={4}
                    textAlign="center"
                >{previousTeamDiceRoll}</Text>
            </Flex>
            <PokeLife total={handleTeamStats('hp')} buttonSize={"md"} lifeSize={"2xl"} iconSize={"24px"} />
        </Flex>
    )
}