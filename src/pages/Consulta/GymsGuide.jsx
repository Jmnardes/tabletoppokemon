import { useState } from "react";
import { Box, Button, Heading, Text, VStack, HStack, Badge, SimpleGrid, Select, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Element from "@features/elements/Element";
import gymsData from "@assets/json/gyms.json";

const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh"];

export default function GymsGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();
    const [selectedRegion, setSelectedRegion] = useState("Kanto");
    const [selectedGym, setSelectedGym] = useState(null);

    const filteredGyms = gymsData.filter(g => g.region === selectedRegion);

    const levelLabel = (level) => {
        if (level === 0) return "Base";
        if (level === 1) return "Base+1";
        return "Base+2";
    };

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.gyms')}</Heading>

            <Select
                value={selectedRegion}
                onChange={(e) => { setSelectedRegion(e.target.value); setSelectedGym(null); }}
                maxW="200px"
                mb={4}
            >
                {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </Select>

            <SimpleGrid columns={[2, 3, 4]} spacing={3} mb={6}>
                {filteredGyms.map((gym) => (
                    <Button
                        key={gym.id}
                        h="auto"
                        py={3}
                        px={2}
                        flexDir="column"
                        onClick={() => setSelectedGym(gym)}
                        border="2px solid"
                        borderColor={selectedGym?.id === gym.id ? 'blue.400' : 'transparent'}
                        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                    >
                        <Element element={gym.element} elementTable={false} w={6} h={6} />
                        <Text fontSize="xs" mt={1} fontWeight="bold">{gym.leader}</Text>
                        <Text fontSize="xs" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>{gym.badge}</Text>
                    </Button>
                ))}
            </SimpleGrid>

            {selectedGym && (
                <Box p={4} borderRadius={8} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}>
                    <HStack mb={3}>
                        <Element element={selectedGym.element} elementTable={false} w={6} h={6} />
                        <Heading size="sm">{selectedGym.name}</Heading>
                    </HStack>
                    <Text fontSize="sm" mb={1}>{t('consulta.gymLeader')}: <strong>{selectedGym.leader}</strong></Text>
                    <Text fontSize="sm" mb={3}>{t('consulta.gymBadge')}: <strong>{selectedGym.badge}</strong></Text>

                    <Heading size="xs" mb={2}>{t('consulta.gymTeam')}</Heading>
                    <VStack spacing={2} align="stretch">
                        {selectedGym.pokemons.map((poke, idx) => (
                            <HStack key={idx} justify="space-between" px={3} py={1} borderRadius={4} bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}>
                                <Text textTransform="capitalize" fontSize="sm">{poke.name}</Text>
                                <Badge colorScheme={poke.level === 2 ? 'red' : poke.level === 1 ? 'yellow' : 'green'}>
                                    {levelLabel(poke.level)}
                                </Badge>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            )}
        </Box>
    );
}
