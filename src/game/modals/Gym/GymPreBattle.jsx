import { useState, useContext } from "react"
import { VStack, HStack, Text, Button, Flex, Image, Badge, useColorMode, Tooltip, Box } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import Element from "@components/Elements/Element"
import Card from "@components/Pokemon/Card"
import { PokeRarity } from "@components/Pokemon/PokemonRarity"

export default function GymPreBattle({ gym, onStartBattle }) {
    const { getTeamPokemons, getBoxPokemons } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [selectedPokemons, setSelectedPokemons] = useState([])

    const allPokemons = [...getTeamPokemons(), ...getBoxPokemons()]
    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const selectedBg = colorMode === 'light' ? "blue.200" : "blue.600"

    const togglePokemon = (pokemon) => {
        if (selectedPokemons.find(p => p.id === pokemon.id)) {
            setSelectedPokemons(selectedPokemons.filter(p => p.id !== pokemon.id))
        } else if (selectedPokemons.length < 3) {
            setSelectedPokemons([...selectedPokemons, pokemon])
        }
    }

    const handleStartBattle = () => {
        const pokemonIds = selectedPokemons.map(p => p.id)
        onStartBattle(pokemonIds)
    }

    return (
        <VStack spacing={4} p={4} w="100%">
            {/* Gym Info */}
            <Flex
                w="100%"
                bg={bgColor}
                p={4}
                borderRadius={8}
                flexDirection="column"
                gap={2}
            >
                <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                        {gym.leader}
                    </Text>
                    <Element element={gym.element} size={24} />
                </HStack>
                <Text fontSize="sm" color="gray.400">
                    {gym.badge}
                </Text>
            </Flex>

            {/* Instructions */}
            <VStack spacing={2}>
                <Text fontSize="md" fontWeight="bold" textAlign="center">
                    Select exactly 3 Pokémon for battle
                </Text>
                <Text fontSize="sm" color="orange.400" textAlign="center">
                    ⚠️ The first Pokémon selected will be your STARTER
                </Text>
            </VStack>
            <HStack>
                <Badge colorScheme={selectedPokemons.length === 3 ? "green" : "orange"}>
                    Selected: {selectedPokemons.length}/3
                </Badge>
            </HStack>

            {/* Pokemon Grid */}
            <Flex
                gap={3}
                w="100%"
                overflowX="auto"
                overflowY="hidden"
                p={2}
                flexWrap="nowrap"
                sx={{
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-track': { bg: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { bg: colorMode === 'light' ? 'gray.300' : 'gray.600', borderRadius: '4px' }
                }}
            >
                {allPokemons.map((pokemon) => {
                    const isSelected = selectedPokemons.find(p => p.id === pokemon.id)
                    const isDisabled = !isSelected && selectedPokemons.length >= 3
                    const selectionOrder = isSelected ? selectedPokemons.findIndex(p => p.id === pokemon.id) + 1 : null
                    const isStarter = selectionOrder === 1

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
                                borderColor={isSelected ? (isStarter ? "orange.400" : "blue.400") : "transparent"}
                                transition="all 0.2s"
                                _hover={!isDisabled ? { transform: "scale(1.05)" } : {}}
                                position="relative"
                                minW="140px"
                                maxW="140px"
                                flexShrink={0}
                            >
                                {/* Selection order badge */}
                                {isSelected && (
                                    <Badge
                                        position="absolute"
                                        top="-8px"
                                        right="-8px"
                                        borderRadius="full"
                                        colorScheme={isStarter ? "orange" : "blue"}
                                        fontSize="sm"
                                        px={2}
                                        py={1}
                                        fontWeight="bold"
                                        zIndex={1}
                                    >
                                        {selectionOrder}
                                    </Badge>
                                )}

                                {/* Starter badge */}
                                {isStarter && (
                                    <Badge
                                        position="absolute"
                                        top="-8px"
                                        left="-8px"
                                        borderRadius="md"
                                        colorScheme="orange"
                                        fontSize="xs"
                                        px={2}
                                        py={0.5}
                                        fontWeight="bold"
                                        zIndex={1}
                                    >
                                        STARTER
                                    </Badge>
                                )}

                                <Image
                                    src={pokemon.sprites?.front || pokemon.sprites?.mini}
                                    w="80px"
                                    h="80px"
                                    fallback={<Text>?</Text>}
                                />
                                <Text fontSize="sm" fontWeight="bold" isTruncated maxW="100%" textAlign="center">
                                    {pokemon.name}
                                </Text>
                                
                                {/* Level and Rarity */}
                                <HStack spacing={2} mt={1}>
                                    <Badge fontSize="xs" colorScheme="blue">
                                        Lv {pokemon.level}
                                    </Badge>
                                    <Box transform="scale(0.8)">
                                        <PokeRarity rarity={pokemon.rarity?.rarity} />
                                    </Box>
                                </HStack>

                                {/* Types */}
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

            {/* Start Button */}
            <Button
                colorScheme="green"
                size="lg"
                w="100%"
                onClick={handleStartBattle}
                isDisabled={selectedPokemons.length !== 3}
            >
                Start Battle
            </Button>
        </VStack>
    )
}
