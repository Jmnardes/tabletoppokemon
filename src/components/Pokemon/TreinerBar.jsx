import { Flex, Text } from "@chakra-ui/react";

export function TrainerBar({ turn = 0, level = 0, exp = 0, nextLevel = 0 }) {
    return (
        <Flex justifyContent="center" alignItems="center" mx={2}>
            <Text mx={2} fontSize="2xl">Turno: {turn}</Text>
            <Text mx={2} fontSize="2xl">Level: {level}</Text>
            <Text mx={2} fontSize="2xl">Experience: {exp} / {nextLevel}</Text>
        </Flex>
    )
}