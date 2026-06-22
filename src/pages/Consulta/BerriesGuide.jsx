import { Box, Button, Heading, SimpleGrid, Image, Text, Tooltip, Badge, VStack, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getBerryIcon } from "@utils/berryIcon";
import berriesData from "@assets/json/berries.json";

const categoryColors = {
    common: "green",
    uncommon: "blue",
    rare: "purple"
};

export default function BerriesGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const grouped = {
        common: berriesData.filter(b => b.category === 'common'),
        uncommon: berriesData.filter(b => b.category === 'uncommon'),
        rare: berriesData.filter(b => b.category === 'rare'),
    };

    const renderSection = (category, berries) => (
        <Box key={category} mb={6}>
            <Heading size="sm" mb={3} textTransform="capitalize">
                <Badge colorScheme={categoryColors[category]} fontSize="sm" mr={2}>
                    {category}
                </Badge>
                {t('consulta.berryTurns', { turns: berries[0]?.turns })}
            </Heading>
            <SimpleGrid columns={[3, 4, 6]} spacing={3}>
                {berries.map((berry) => (
                    <Tooltip
                        key={berry.type}
                        label={
                            <VStack spacing={1} p={1}>
                                <Text fontWeight="bold">{berry.name}</Text>
                                <Text fontSize="sm">{berry.effect}</Text>
                            </VStack>
                        }
                        hasArrow
                    >
                        <VStack
                            p={2}
                            borderRadius={8}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                            border="1px solid"
                            borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                            cursor="pointer"
                            _hover={{ borderColor: categoryColors[category] + '.400', bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
                        >
                            <Image src={getBerryIcon(berry.type)} w={8} h={8} />
                            <Text fontSize="xs" textAlign="center">{berry.name}</Text>
                        </VStack>
                    </Tooltip>
                ))}
            </SimpleGrid>
        </Box>
    );

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.berries')}</Heading>

            {renderSection('common', grouped.common)}
            {renderSection('uncommon', grouped.uncommon)}
            {grouped.rare.length > 0 && renderSection('rare', grouped.rare)}
        </Box>
    );
}
