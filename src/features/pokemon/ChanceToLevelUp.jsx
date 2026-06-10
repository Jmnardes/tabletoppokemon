import { Box, Progress, Text, Tooltip } from "@chakra-ui/react"

const EXP_TO_LEVEL = 5

export default function ExpBar({ selectedPokemon }) {
    const exp = selectedPokemon?.exp ?? 0
    const maxExp = EXP_TO_LEVEL

    return (
        <Tooltip label={`EXP: ${exp}/${maxExp} — Derrote pokémons selvagens para ganhar EXP`} p={4} borderRadius={6}>
            <Box position="relative" mt={2} mb="2px">
                <Progress
                    value={exp} max={maxExp} 
                    size="sm" w="100%"
                    colorScheme={"cyan"}
                    borderRadius="full"
                />
                <Text
                    position="absolute"
                    top="50%" left="50%"
                    transform="translate(-50%, -50%)"
                    fontSize="xx-small"
                >
                    {exp}/{maxExp}
                </Text>
            </Box>
        </Tooltip>
    )
}