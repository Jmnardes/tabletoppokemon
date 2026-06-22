import { Box, Button, Heading, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Badge, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function CombatGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const bgCard = colorMode === 'light' ? 'gray.100' : 'gray.700';

    const elementalTable = [
        { label: t('consulta.superEffective'), net: "+2", crt: "+2", acc: "+5", def: "—", evs: "—", dmg: "×1.5" },
        { label: t('consulta.effective'), net: "+1", crt: "+1", acc: "+3", def: "—", evs: "—", dmg: "×1.25" },
        { label: t('consulta.neutral'), net: "0", crt: "—", acc: "—", def: "—", evs: "—", dmg: "×1" },
        { label: t('consulta.ineffective'), net: "-1", crt: "—", acc: "—", def: "+3", evs: "+1", dmg: "×0.8" },
        { label: t('consulta.superIneffective'), net: "-2", crt: "—", acc: "—", def: "+5", evs: "+2", dmg: "×0.67" },
    ];

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.combatTitle')}</Heading>

            <Box mb={6} p={4} borderRadius={8} bg={bgCard}>
                <Heading size="sm" mb={3}>{t('consulta.combatFormula')}</Heading>
                <Text fontSize="sm" mb={2}>{t('consulta.combatIntro')}</Text>
                <Text fontSize="xs" fontWeight="bold" mb={2}>{t('consulta.combatPriority')}</Text>
                <VStack align="start" spacing={1}>
                    <Text fontSize="sm">1. <Badge colorScheme="gray">MISS</Badge> — {t('consulta.combatMiss')}</Text>
                    <Text fontSize="sm">2. <Badge colorScheme="red">CRIT</Badge> — {t('consulta.combatCrit')}</Text>
                    <Text fontSize="sm">3. <Badge colorScheme="green">HIT</Badge> — {t('consulta.combatHit')}</Text>
                    <Text fontSize="sm">4. <Badge colorScheme="yellow">HALF</Badge> — {t('consulta.combatHalf')}</Text>
                </VStack>
            </Box>

            <Box mb={6} p={4} borderRadius={8} bg={bgCard}>
                <Heading size="sm" mb={2}>{t('consulta.effectiveAtk')}</Heading>
                <Text fontSize="sm" mb={3}>{t('consulta.effectiveAtkDesc')}</Text>
                <Heading size="sm" mb={2}>{t('consulta.effectiveDef')}</Heading>
                <Text fontSize="sm">{t('consulta.effectiveDefDesc')}</Text>
            </Box>

            <Heading size="sm" mb={3}>{t('consulta.elementalAdvantage')}</Heading>
            <Text fontSize="sm" mb={3}>{t('consulta.elementalDesc')}</Text>
            <Table size="sm" variant="simple" mb={3}>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Net</Th>
                        <Th>CRT</Th>
                        <Th>ACC</Th>
                        <Th>DEF</Th>
                        <Th>EVS</Th>
                        <Th>DMG</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {elementalTable.map(row => (
                        <Tr key={row.net}>
                            <Td fontSize="xs" fontWeight="bold">{row.label}</Td>
                            <Td>{row.net}</Td>
                            <Td>{row.crt}</Td>
                            <Td>{row.acc}</Td>
                            <Td>{row.def}</Td>
                            <Td>{row.evs}</Td>
                            <Td>{row.dmg}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Text fontSize="xs" mb={6} color="gray.500">{t('consulta.resistanceDesc')}</Text>

            <Box mb={6} p={4} borderRadius={8} bg={bgCard}>
                <Heading size="sm" mb={2}>{t('consulta.attackOrder')}</Heading>
                <Text fontSize="sm">{t('consulta.attackOrderDesc')}</Text>
            </Box>

            <Box p={4} borderRadius={8} bg={bgCard}>
                <Heading size="sm" mb={2}>{t('consulta.shieldTitle')}</Heading>
                <Text fontSize="sm">{t('consulta.shieldDesc')}</Text>
            </Box>
        </Box>
    );
}
