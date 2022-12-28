import { Button, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { PokeLife } from "../Game/PokeLife";
import { FaDiceD20, FaDiceSix } from "react-icons/fa";
import { useState } from "react";
import { diceRoll, parseNumberToNatural } from "../../../util";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'

export default function TeamTitle({ handleTeamStats }) {
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
        <Flex flexDir="row" justifyContent="space-evenly" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}  py={3}>
            <Flex alignItems="center">
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <Image
                        mr={4}
                        src={healthIcon} 
                        title={'Health'}
                        w="32px"
                    ></Image>
                    <Text ml={-1} fontSize="2xl">{handleTeamStats('hp')}</Text>
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <Image
                        mr={4}
                        src={swordIcon} 
                        title={'Attack'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="2xl">{handleTeamStats('atk')}</Text>
                    {/* <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('atk'))}</Text> */}
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <Image
                        mr={4}
                        src={shieldIcon} 
                        title={'Defense'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="2xl">{handleTeamStats('def')}</Text>
                    {/* <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('def'))}</Text> */}
                </Flex>
                <Flex mx={4} justifyContent="center" alignItems="center">
                    <Image
                        mr={4}
                        src={speedIcon} 
                        title={'Speed'}
                        w="28px"
                    ></Image>
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
            {/* <PokeLife total={handleTeamStats('hp')} buttonSize={"xs"} lifeSize={"2xl"} iconSize={"12px"} title={true}/> */}
        </Flex>
    )
}