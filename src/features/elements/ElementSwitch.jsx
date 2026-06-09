import { HStack, Box } from "@chakra-ui/react"
import Element from "./Element"

/**
 * Switch para escolher qual elemento usar no ataque (apenas para dual-type pokemon)
 * @param {{ types: string[], selectedType: string, onChange: (type: string) => void }} props
 */
export default function ElementSwitch({ types, selectedType, onChange }) {
    if (!types || types.length < 2) return null

    return (
        <HStack spacing={0}>
            {types.map(type => {
                const isActive = type === selectedType
                return (
                    <Box
                        key={type}
                        onClick={(e) => { e.stopPropagation(); onChange(type) }}
                        cursor="pointer"
                        borderRadius={4}
                        border="2px solid"
                        borderColor={isActive ? "yellow.400" : "transparent"}
                        bg={isActive ? "whiteAlpha.200" : "transparent"}
                        p="2px"
                        opacity={isActive ? 1 : 0.4}
                        transition="all 0.15s"
                        _hover={{ opacity: 0.8 }}
                    >
                        <Element element={type} w={4} h={4} />
                    </Box>
                )
            })}
        </HStack>
    )
}
