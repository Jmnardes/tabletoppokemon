import { Flex, Progress, useColorMode } from "@chakra-ui/react";

export default function ExperienceBar({
    exp,
    nextLevel,
    previousLevel
}) {
    const { colorMode } = useColorMode()

    const leftExperienceCalc = (previous, actual, next) => {
        actual = Number.parseFloat( ((actual - previous) * 100) / (next - previous) ).toFixed(0)

        return Number(actual)
    }

    return (
        <>
            <Flex py={4} background={colorMode === 'light' ? "#A0AEC0" : "#2D3748"} title={`${100 - leftExperienceCalc(previousLevel, exp, nextLevel)}%`}>
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