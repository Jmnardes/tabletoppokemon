import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Text, HStack, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import naturesData from "@assets/json/natures.json";

const statLabels = {
    hp: "HP",
    atk: "ATK",
    def: "DEF",
    acc: "ACC",
    evs: "EVS",
    crt: "CRT"
};

export default function NaturesGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const mid = Math.ceil(naturesData.length / 2);
    const leftColumn = naturesData.slice(0, mid);
    const rightColumn = naturesData.slice(mid);

    const renderTable = (data) => (
        <Table size="sm" variant="simple">
            <Thead>
                <Tr>
                    <Th>{t('consulta.natureName')}</Th>
                    <Th color="green.400">↑ Buff</Th>
                    <Th color="red.400">↓ Debuff</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((nature) => (
                    <Tr key={nature.Nature}>
                        <Td textTransform="capitalize" fontWeight="medium">
                            {nature.Nature}
                        </Td>
                        <Td>
                            {nature.Increase ? (
                                <Text color="green.400" fontWeight="bold">
                                    +1 {statLabels[nature.Increase] || nature.Increase}
                                </Text>
                            ) : (
                                <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>—</Text>
                            )}
                        </Td>
                        <Td>
                            {nature.Decrease ? (
                                <Text color="red.400" fontWeight="bold">
                                    -1 {statLabels[nature.Decrease] || nature.Decrease}
                                </Text>
                            ) : (
                                <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>—</Text>
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.natures')}</Heading>

            <HStack align="start" spacing={4}>
                <Box flex={1} overflowX="auto">
                    {renderTable(leftColumn)}
                </Box>
                <Box flex={1} overflowX="auto">
                    {renderTable(rightColumn)}
                </Box>
            </HStack>
        </Box>
    );
}
