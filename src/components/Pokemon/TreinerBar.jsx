import { Flex, Text } from "@chakra-ui/react";
import { FaClock, FaWalking } from "react-icons/fa";
import { GiRibbonMedal, GiTrophyCup } from "react-icons/gi";

export function TrainerBar({ 
    turn,
    walked,
    medal,
    trophy
}) {
    return (
        <>
            <Flex alignItems="center" ml={4} mr={2}>
                <FaClock title="Turn" size={20} />
                <Text ml={2}>{turn}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <GiRibbonMedal title="Medal" size={20} />
                <Text ml={2}>{medal}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <GiTrophyCup title="Trophy" size={20} />
                <Text ml={2}>{trophy}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <FaWalking title="Distance" size={20} />
                <Text ml={2}>{walked}</Text>
            </Flex>
        </>
    )
}