import { useState } from "react";
import { Box, Button, ButtonGroup, Heading, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { augmentColor } from "@utils";

const nameToKey = (name) => name.replace(/\s+/g, '').replace(/é/g, 'e').charAt(0).toLowerCase() + name.replace(/\s+/g, '').replace(/é/g, 'e').slice(1);

const augmentsList = {
    common: [
        "Type Knowledge", "Type Specialist", "Poke Belt", "Harvest", "Dust Boost",
        "Shiny Charm", "Trainer", "Tracker", "Potion Master", "Token Economy",
        "Pokeball Economy", "Rare Encounter", "Level Encounter", "Seed Improvement",
        "Green House", "New Pieces", "Old Junk", "Minigame", "Potentializer"
    ],
    uncommon: [
        "Type Knowledge", "Type Specialist", "Pokeball Specialist", "Poke Belt", "Harvest",
        "Dust Boost", "Shiny Charm", "Trainer", "Tracker", "Potion Master",
        "Threat Control", "Gym Pass", "Token Economy", "Greatball Economy",
        "Rare Encounter", "Level Encounter", "Seed Improvement", "New Pieces",
        "Minigame", "Tasking", "Potentializer"
    ],
    rare: [
        "Type Knowledge", "Type Specialist", "Pokeball Specialist", "Poke Belt", "Harvest",
        "Dust Boost", "Shiny Charm", "Trainer", "Tracker", "Potion Master",
        "Threat Control", "Token Economy", "Ultraball Economy", "Rare Encounter",
        "Level Encounter", "Seed Improvement", "Green Thumb", "Overgrow",
        "New Pieces", "Fire Up", "Minigame", "Potentializer"
    ],
};

const rarities = ['common', 'uncommon', 'rare'];

export default function AugmentsGuide({ goBack }) {
    const { t } = useTranslation();
    const [activeRarity, setActiveRarity] = useState('common');

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.augments')}</Heading>

            <ButtonGroup mb={5} spacing={2}>
                {rarities.map((rarity) => (
                    <Button
                        key={rarity}
                        size="sm"
                        backgroundColor={augmentColor(rarity)}
                        color="white"
                        opacity={activeRarity === rarity ? 1 : 0.5}
                        onClick={() => setActiveRarity(rarity)}
                        _hover={{ opacity: 0.9 }}
                    >
                        {t(`augments.${rarity}`)}
                    </Button>
                ))}
            </ButtonGroup>

            <SimpleGrid columns={[2, 3, 4]} spacing={3}>
                {augmentsList[activeRarity].map((name, index) => {
                    const key = nameToKey(name);
                    return (
                        <Tooltip
                            key={`${activeRarity}-${index}`}
                            label={
                                <VStack spacing={1} p={1}>
                                    <Text fontWeight="bold">{t(`augments.${key}.name`, name)}</Text>
                                    <Text fontSize="sm">{t(`augments.${key}.description`, name)}</Text>
                                </VStack>
                            }
                            hasArrow
                        >
                            <Box
                                p={3}
                                borderRadius={8}
                                backgroundColor={augmentColor(activeRarity)}
                                cursor="pointer"
                                textAlign="center"
                                _hover={{ opacity: 0.8 }}
                            >
                                <Text fontSize="xs" fontWeight="bold" color="white">
                                    {t(`augments.${key}.name`, name)}
                                </Text>
                            </Box>
                        </Tooltip>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}
