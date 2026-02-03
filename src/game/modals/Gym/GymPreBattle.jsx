import { useState, useContext } from "react"
import { VStack, HStack, Text, Button, Flex, Image, Badge, useColorMode, Grid } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import Element from "@components/Elements/Element"

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
            <Text fontSize="md" fontWeight="bold" textAlign="center">
                Select exactly 3 Pokémon for battle
            </Text>
            <HStack>
                <Badge colorScheme={selectedPokemons.length === 3 ? "green" : "orange"}>
                    Selected: {selectedPokemons.length}/3
                </Badge>
            </HStack>

            {/* Pokemon Grid */}
            <Grid
                templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
                gap={3}
                w="100%"
                maxH="400px"
                overflowY="auto"
                p={2}
            >
                {allPokemons.map((pokemon) => {
                    const isSelected = selectedPokemons.find(p => p.id === pokemon.id)
                    const isDisabled = !isSelected && selectedPokemons.length >= 3

                    return (
                        <Flex
                            key={pokemon.id}
                            bg={isSelected ? selectedBg : bgColor}
                            p={3}
                            borderRadius={8}
                            flexDirection="column"
                            alignItems="center"
                            cursor={isDisabled ? "not-allowed" : "pointer"}
                            opacity={isDisabled ? 0.5 : 1}
                            onClick={() => !isDisabled && togglePokemon(pokemon)}
                            border={isSelected ? "2px solid" : "2px solid transparent"}
                            borderColor={isSelected ? "blue.400" : "transparent"}
                            transition="all 0.2s"
                            _hover={!isDisabled ? { transform: "scale(1.05)" } : {}}
                        >
                            <Image
                                src={pokemon.sprites?.front || pokemon.sprites?.mini}
                                w="64px"
                                h="64px"
                                fallback={<Text>?</Text>}
                            />
                            <Text fontSize="sm" fontWeight="bold" isTruncated maxW="100px">
                                {pokemon.name}
                            </Text>
                            <HStack spacing={1}>
                                <Badge fontSize="xx-small" colorScheme="blue">
                                    Lv {pokemon.level}
                                </Badge>
                                <Badge fontSize="xx-small" colorScheme="green">
                                    HP: {pokemon.hp}
                                </Badge>
                            </HStack>
                            <HStack spacing={1} mt={1}>
                                {pokemon.types?.map((type, idx) => (
                                    <Element key={idx} element={type} size={12} />
                                ))}
                            </HStack>
                        </Flex>
                    )
                })}
            </Grid>

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
