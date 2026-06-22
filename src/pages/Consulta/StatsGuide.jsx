import { Box, Button, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function StatsGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const stats = [
        { key: "HP", desc: t('consulta.statHp') },
        { key: "ATK", desc: t('consulta.statAtk') },
        { key: "DEF", desc: t('consulta.statDef') },
        { key: "ACC", desc: t('consulta.statAcc') },
        { key: "EVS", desc: t('consulta.statEvs') },
        { key: "CRT", desc: t('consulta.statCrt') },
    ];

    const tiers = [
        { tier: 0, weight: "60%", stars: "☆" },
        { tier: 1, weight: "30%", stars: "★" },
        { tier: 2, weight: "9%", stars: "★★" },
        { tier: 3, weight: "1%", stars: "★★★" },
    ];

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.stats')}</Heading>

            <Box mb={6} p={4} borderRadius={8} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}>
                <Heading size="sm" mb={3}>{t('consulta.statSystem')}</Heading>
                <Text fontSize="sm" mb={2}>{t('consulta.statBudget')}</Text>
                <Text fontSize="sm" mb={2}>{t('consulta.statRange')}</Text>
                <Text fontSize="sm">{t('consulta.statEffort')}</Text>
            </Box>

            <Heading size="sm" mb={3}>{t('consulta.sixStats')}</Heading>
            <Table size="sm" variant="simple" mb={6}>
                <Thead>
                    <Tr>
                        <Th>Stat</Th>
                        <Th>{t('consulta.statDescription')}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {stats.map(s => (
                        <Tr key={s.key}>
                            <Td fontWeight="bold">{s.key}</Td>
                            <Td fontSize="sm">{s.desc}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Heading size="sm" mb={3}>{t('consulta.tierSystem')}</Heading>
            <Table size="sm" variant="simple" mb={6}>
                <Thead>
                    <Tr>
                        <Th>Tier</Th>
                        <Th>{t('consulta.tierWeight')}</Th>
                        <Th>{t('consulta.tierRarity')}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tiers.map(tier => (
                        <Tr key={tier.tier}>
                            <Td>
                                <Badge colorScheme={tier.tier === 3 ? 'yellow' : tier.tier === 2 ? 'purple' : tier.tier === 1 ? 'blue' : 'gray'}>
                                    Tier {tier.tier}
                                </Badge>
                            </Td>
                            <Td>{tier.weight}</Td>
                            <Td>{tier.stars}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>


        </Box>
    );
}
