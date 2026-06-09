import { useState } from "react"
import { VStack, Text, Button, Flex, Image, Badge, useColorMode, Tooltip, Box, HStack } from "@chakra-ui/react"
import Element from "@features/elements/Element"
import Card from "@features/pokemon/Card"
import { PokeRarity } from "@features/pokemon/PokemonRarity"

export default function BattleTeamSelect({ team, onConfirm }) {
    const { colorMode } = useColorMode()
    const [selectedPokemons, setSelectedPokemons] = useState([])

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const selectedBg = colorMode === 'light' ? "blue.200" : "blue.600"

    const togglePokemon = (pokemon) => {
        if (selectedPokemons.find(p => p.id === pokemon.id)) {
            setSelectedPokemons(selectedPokemons.filter(p => p.id !== pokemon.id))
        } else if (selectedPokemons.length < 3) {
            setSelectedPokemons([...selectedPokemons, pokemon])
        }
    }

    const handleConfirm = () => {
        const pokemonIds = selectedPokemons.map(p => p.id)
        onConfirm(pokemonIds)
    }

    return (
        <VStack spacing={4} w="100%">
            <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                    Select 3 Pokémon for battle
                </Text>
                <Text fontSize="sm" color="orange.400" textAlign="center">
                    ⚠️ Order matters! First selected will fight first
                </Text>
            </VStack>
            <HStack>
                <Badge colorScheme={selectedPokemons.length === 3 ? "green" : "orange"}>
                    Selected: {selectedPokemons.length}/3
                </Badge>
            </HStack>

            <Flex
                gap={3}
                w="100%"
                overflowX="auto"
                overflowY="hidden"
                p={2}
                flexWrap="nowrap"
                justifyContent="center"
                sx={{
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-track': { bg: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { bg: colorMode === 'light' ? 'gray.300' : 'gray.600', borderRadius: '4px' }
                }}
            >
                {team.map((pokemon) => {
                    const isSelected = selectedPokemons.find(p => p.id === pokemon.id)
                    const isDisabled = !isSelected && selectedPokemons.length >= 3
                    const selectionOrder = isSelected ? selectedPokemons.findIndex(p => p.id === pokemon.id) + 1 : null

                    return (
                        <Tooltip 
                            key={pokemon.id}
                            label={<Card poke={pokemon} tooltip={true} />}
                            background="none"
                            placement="top"
                        >
                            <Flex
                                bg={isSelected ? selectedBg : bgColor}
                                p={3}
                                borderRadius={8}
                                flexDirection="column"
                                alignItems="center"
                                cursor={isDisabled ? "not-allowed" : "pointer"}
                                opacity={isDisabled ? 0.5 : 1}
                                onClick={() => !isDisabled && togglePokemon(pokemon)}
                                border={isSelected ? "3px solid" : "2px solid transparent"}
                                borderColor={isSelected ? "blue.400" : "transparent"}
                                transition="all 0.2s"
                                _hover={!isDisabled ? { transform: "scale(1.05)" } : {}}
                                position="relative"
                                minW="120px"
                                maxW="120px"
                                flexShrink={0}
                            >
                                {isSelected && (
                                    <Badge
                                        position="absolute"
                                        top="-8px"
                                        right="-8px"
                                        borderRadius="full"
                                        colorScheme="blue"
                                        fontSize="sm"
                                        px={2}
                                        py={1}
                                        fontWeight="bold"
                                        zIndex={1}
                                    >
                                        {selectionOrder}
                                    </Badge>
                                )}

                                <Image
                                    src={pokemon.sprites?.front || pokemon.sprites?.mini}
                                    w="70px"
                                    h="70px"
                                    fallback={<Text>?</Text>}
                                />
                                <Text fontSize="xs" fontWeight="bold" isTruncated maxW="100%" textAlign="center">
                                    {pokemon.name}
                                </Text>
                                
                                <HStack spacing={2} mt={1}>
                                    <Badge fontSize="xs" colorScheme="blue">
                                        Lv {pokemon.level}
                                    </Badge>
                                    <Box transform="scale(0.8)">
                                        <PokeRarity rarity={pokemon.rarity?.rarity} />
                                    </Box>
                                </HStack>

                                <HStack spacing={1} mt={1}>
                                    {pokemon.types?.map((type, idx) => (
                                        <Element key={idx} element={type} size={14} />
                                    ))}
                                </HStack>
                            </Flex>
                        </Tooltip>
                    )
                })}
            </Flex>

            <Button
                colorScheme="green"
                size="lg"
                w="60%"
                onClick={handleConfirm}
                isDisabled={selectedPokemons.length !== 3}
            >
                Confirm Team
            </Button>
        </VStack>
    )
}
