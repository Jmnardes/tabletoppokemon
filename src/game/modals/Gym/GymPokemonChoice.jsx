import { VStack, Text, Flex, Box } from "@chakra-ui/react"
import Card from "@components/Pokemon/Card"

export default function GymPokemonChoice({ availablePokemons, onChoose }) {
    return (
        <VStack spacing={4} p={4} w="100%">
            <Text fontSize="lg" fontWeight="bold" color="yellow.400">
                Choose your next Pokémon!
            </Text>

            <Flex wrap="wrap" justify="center" gap={4} w="100%" maxH="500px" overflowY="auto" p={2}>
                {availablePokemons.map((pokemon, index) => {
                    if (!pokemon || typeof pokemon !== 'object') {
                        return null
                    }
                    
                    const currentHp = typeof pokemon.currentHp === 'number' ? pokemon.currentHp : 
                                     (typeof pokemon.hp === 'number' ? pokemon.hp : 
                                      (typeof pokemon.stats?.hp === 'number' ? pokemon.stats.hp : 0))
                    const isDefeated = pokemon.defeated === true || currentHp <= 0

                    // Garantir estrutura compatível com Card component
                    const pokemonForCard = {
                        ...pokemon,
                        rarity: pokemon.rarity || { rarity: 'common' },
                        sprites: {
                            ...pokemon.sprites,
                            main: pokemon.sprites?.front || pokemon.sprites?.main || pokemon.sprites?.mini || ''
                        }
                    }

                    return (
                        <Box 
                            key={pokemon.id || index}
                            position="relative"
                            cursor={isDefeated ? "not-allowed" : "pointer"}
                            onClick={() => !isDefeated && onChoose(index)}
                            transition="all 0.2s"
                            opacity={isDefeated ? 0.5 : 1}
                            filter={isDefeated ? "grayscale(80%)" : "none"}
                            _hover={!isDefeated ? { transform: "scale(1.05)" } : {}}
                        >
                            <Card poke={pokemonForCard} challenge={true} />
                            
                            {/* Defeated overlay */}
                            {isDefeated && (
                                <Flex
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    bg="blackAlpha.700"
                                    borderRadius={8}
                                    align="center"
                                    justify="center"
                                    pointerEvents="none"
                                >
                                    <Text fontSize="2xl" color="red.400" fontWeight="bold" textShadow="0 0 10px rgba(0,0,0,0.8)">
                                        DEFEATED
                                    </Text>
                                </Flex>
                            )}
                        </Box>
                    )
                })}
            </Flex>
        </VStack>
    )
}
