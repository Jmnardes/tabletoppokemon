import { Flex, Progress, useColorMode } from "@chakra-ui/react";

export default function ExperienceBar({
    exp,
    nextLevel,
    previousLevel
}) {
    const { colorMode } = useColorMode()

    const leftExperienceCalc = (previous, actual, next) => {
        next = next - previous

        actual = actual - previous

        actual = Number.parseFloat((actual*100) / 13).toFixed(0)

        return Number(actual)
    }

    return (
        <>
            <Flex background={colorMode === 'light' ? "#A0AEC0" : "#2D3748"} title={`${100 - leftExperienceCalc(previousLevel, exp, nextLevel)}%`}>
                    <Progress
                        value={exp} 
                        min={previousLevel}
                        max={nextLevel}
                        w="100%"
                        h={4}
                        title={`${leftExperienceCalc(previousLevel, exp, nextLevel)}%`}
                        _hover={{ title: 'test' }}
                    />
            </Flex>
        </>
    )
}