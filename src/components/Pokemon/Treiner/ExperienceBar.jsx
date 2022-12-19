import { Flex, Progress, Text } from "@chakra-ui/react";

export default function ExperienceBar({
    level,
    exp,
    nextLevel,
    previousLevel
}) {
    return (
        <>
            <Flex w="100%" justifyContent="center" alignItems="center" mx={24}>
                <Text mr={2}>Tier {level}</Text>
                <Progress 
                    value={exp} 
                    min={previousLevel} 
                    max={nextLevel} 
                    borderRadius={4} 
                    w="80%"
                />
                <Text mr={2}>{previousLevel}/{exp}/{nextLevel}</Text>
            </Flex>
        </>
    )
}