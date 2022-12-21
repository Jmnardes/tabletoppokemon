import { Flex, Text } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { GiRibbonMedal, GiTrophyCup } from "react-icons/gi";

export function TrainerBar({ 
    turn,
    medal,
    trophy,
    isEndgame
}) {
    return (
        <>
            {!isEndgame && (
                <Flex alignItems="center" ml={4} mr={2}>
                    <FaClock title="Turn" size={20} />
                    <Text ml={2}>{turn}</Text>
                </Flex>
            )}
            <Flex alignItems="center" mx={2}>
                <GiTrophyCup title="Trophy" size={isEndgame ? 28 : 20} />
                <Text ml={2}>{trophy}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={isEndgame ? 4 : 0}>
                <GiRibbonMedal title="Medal" size={isEndgame ? 28 : 20} />
                <Text ml={2}>{medal}</Text>
            </Flex>
        </>
    )
}