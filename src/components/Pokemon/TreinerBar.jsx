import { Flex, Text } from "@chakra-ui/react";

export function TrainerBar({ turn = 0, level = 0, exp = 0, nextLevel = 0 }) {
    return (
        <Flex justifyContent="center" alignItems="center" mx={2}>
            <Text mx={2} fontSize="2xl">T: {turn}</Text>
            <Text mx={2} fontSize="2xl">Lvl: {level}</Text>
            <Text mx={2} fontSize="2xl">Exp: {exp} / {nextLevel}</Text>
        </Flex>
    )
}