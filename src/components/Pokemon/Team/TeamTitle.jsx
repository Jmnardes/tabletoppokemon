import { Flex, Text } from "@chakra-ui/react";
import { PokeLife } from "../PokeLife";
import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";

export default function TeamTitle({ trainerName, handleTeamStats }) {
    return (
        <Flex flexDir="row" justifyContent="space-evenly" backgroundColor={"gray.600"}>
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
                <Text fontSize="2xl">{trainerName}'s Team</Text>
            </Flex>
            <PokeLife total={handleTeamStats('hp')} buttonSize={"md"} lifeSize={"2xl"} iconSize={"24px"} />
        </Flex>
    )
}