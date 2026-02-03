import { VStack, HStack, Text, Button, Flex, Image, Badge, useColorMode } from "@chakra-ui/react"
import Element from "@components/Elements/Element"

export default function GymPokemonChoice({ availablePokemons, onChoose }) {
    const { colorMode } = useColorMode()
    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

    return (
        <VStack spacing={4} p={4} w="100%">
            <Text fontSize="lg" fontWeight="bold" color="yellow.400">
                Choose your next Pokémon!
            </Text>

            <VStack spacing={3} w="100%" maxH="400px" overflowY="auto">
                {availablePokemons.map((pokemon, index) => {
                    // Validações robustas
                    if (!pokemon || typeof pokemon !== 'object') {
                        console.error('Invalid pokemon at index', index, pokemon)
                        return null
                    }
                    
                    // Garantir que currentHp é número
                    const currentHp = typeof pokemon.currentHp === 'number' ? pokemon.currentHp : 
                                     (typeof pokemon.hp === 'number' ? pokemon.hp : 
                                      (typeof pokemon.stats?.hp === 'number' ? pokemon.stats.hp : 0))
                    const isDefeated = pokemon.defeated === true || currentHp <= 0
                    
                    const pokemonName = pokemon.name ? String(pokemon.name) : 'Unknown'
                    const pokemonLevel = pokemon.level ? String(pokemon.level) : '?'
                    const pokemonHp = pokemon.hp ? String(pokemon.hp) : 
                                     (pokemon.stats?.hp ? String(pokemon.stats.hp) : '?')
                    const spriteSrc = pokemon.sprites?.front || pokemon.sprites?.mini || ''
                    const pokemonTypes = Array.isArray(pokemon.types) ? pokemon.types : []
                    
                    console.log('Rendering pokemon choice:', {
                        name: pokemonName,
                        level: pokemonLevel,
                        hp: pokemonHp,
                        currentHp: currentHp,
                        types: pokemonTypes,
                        defeated: isDefeated,
                        spriteSrc: spriteSrc
                    })

                    return (
                        <Flex
                            key={pokemon.id || index}
                            bg={isDefeated ? "red.900" : bgColor}
                            p={3}
                            borderRadius={8}
                            w="100%"
                            alignItems="center"
                            gap={3}
                            opacity={isDefeated ? 0.5 : 1}
                            cursor={isDefeated ? "not-allowed" : "pointer"}
                            onClick={() => !isDefeated && onChoose(index)}
                            _hover={!isDefeated ? { bg: colorMode === 'light' ? "blue.200" : "blue.600" } : {}}
                        >
                            <Image
                                src={spriteSrc}
                                w="64px"
                                h="64px"
                                filter={isDefeated ? "grayscale(100%)" : "none"}
                                fallback={<Text>?</Text>}
                            />

                            <VStack align="start" flex="1" spacing={1}>
                                <HStack>
                                    <Text fontSize="md" fontWeight="bold">{pokemonName}</Text>
                                    <Badge colorScheme="blue">Lv {pokemonLevel}</Badge>
                                </HStack>

                                <HStack spacing={1}>
                                    {pokemonTypes.map((type, idx) => {
                                        if (typeof type !== 'string') return null
                                        return <Element key={idx} element={type} size={14} />
                                    })}
                                </HStack>

                                <HStack>
                                    <Badge 
                                        colorScheme={isDefeated ? "red" : "green"}
                                        fontSize="xs"
                                    >
                                        HP: {String(isDefeated ? 0 : currentHp)} / {pokemonHp}
                                    </Badge>
                                    {isDefeated && (
                                        <Text fontSize="xs" color="red.400" fontWeight="bold">
                                            DEFEATED
                                        </Text>
                                    )}
                                </HStack>
                            </VStack>

                            {!isDefeated && (
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => onChoose(index)}
                                >
                                    Choose
                                </Button>
                            )}
                        </Flex>
                    )
                })}
            </VStack>
        </VStack>
    )
}
