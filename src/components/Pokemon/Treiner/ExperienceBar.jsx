import { Flex, Progress, Text } from "@chakra-ui/react";

export default function ExperienceBar({
    level,
    exp,
    nextLevel,
    previousLevel
}) {
    return (
        <>
            <Flex justifyContent="center" alignItems="center">
                <Text mr={2}>{level}</Text>
                <Progress 
                    value={exp} 
                    min={previousLevel} 
                    max={nextLevel} 
                    borderRadius={4}
                    w="400px"
                />
                {/* <Text mr={2}>{previousLevel}/{exp}/{nextLevel}</Text> */}
            </Flex>
        </>
    )
}