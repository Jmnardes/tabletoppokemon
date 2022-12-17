import { Flex, Text } from "@chakra-ui/react";
import { FaClock, FaWalking } from "react-icons/fa";
import { GiProgression, GiFist } from "react-icons/gi";

export function TrainerBar({ turn = 0, level = 0, exp = 0, nextLevel = 0, walked = 0 }) {
    return (
        <>
            <Flex alignItems="center" ml={4} mr={2}>
                <FaClock title="Turn" size={20} />
                <Text ml={2}>{turn}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <FaWalking title="Distance" size={20} />
                <Text ml={2}>{walked}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <GiFist title="Level" size={20} />
                <Text ml={2}>{level}</Text>
            </Flex>
            <Flex alignItems="center" mx={2}>
                <GiProgression title="Experience" size={20} />
                <Text ml={2}>{exp} / {nextLevel}</Text>
            </Flex>
        </>
    )
}