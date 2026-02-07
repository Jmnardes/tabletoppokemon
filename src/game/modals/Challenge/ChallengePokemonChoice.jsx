import { VStack, Text, Flex, Box, Badge } from "@chakra-ui/react"
import ChallengePokemonCard from "./ChallengePokemonCard"

export default function ChallengePokemonChoice({ availablePokemons, selectedIds, onToggle, maxSelection = 3 }) {
    const isSelected = (pokemonId) => selectedIds.includes(pokemonId)
    const canSelectMore = selectedIds.length < maxSelection

    return (
        <VStack spacing={3} w="100%">
            <Text fontSize="md" fontWeight="bold" color="yellow.400">
                Select {maxSelection} Pokémon ({selectedIds.length}/{maxSelection})
            </Text>

            <Flex 
                wrap="wrap" 
                justify="center" 
                gap={2} 
                w="100%" 
                maxH="450px" 
                overflowY="auto" 
                p={2}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'gray.600',
                        borderRadius: '4px',
                    },
                }}
            >
                {availablePokemons.map((pokemon) => {
                    if (!pokemon || typeof pokemon !== 'object') {
                        return null
                    }
                    
                    const selected = isSelected(pokemon.id)
                    const canSelect = selected || canSelectMore

                    return (
                        <Box 
                            key={pokemon.id}
                            position="relative"
                            cursor={canSelect ? "pointer" : "not-allowed"}
                            onClick={() => canSelect && onToggle(pokemon.id)}
                            transition="all 0.2s"
                            opacity={!canSelect ? 0.4 : 1}
                            transform={selected ? "scale(1.08)" : "scale(1)"}
                            _hover={canSelect ? { transform: "scale(1.08)", filter: "brightness(1.1)" } : {}}
                            filter={!canSelect ? "grayscale(50%)" : "none"}
                        >
                            <ChallengePokemonCard poke={pokemon} />
                            
                            {/* Selected badge */}
                            {selected && (
                                <Badge
                                    position="absolute"
                                    top="-6px"
                                    right="-6px"
                                    colorScheme="yellow"
                                    fontSize="md"
                                    w={6}
                                    h={6}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="full"
                                    fontWeight="bold"
                                >
                                    ✓
                                </Badge>
                            )}
                        </Box>
                    )
                })}
            </Flex>
        </VStack>
    )
}
