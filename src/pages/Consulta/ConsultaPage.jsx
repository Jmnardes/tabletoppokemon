import { useState } from "react";
import { Box, Button, SimpleGrid, Heading, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import StatisticsPage from "@pages/Statistics/StatisticsPage";
import BerriesGuide from "./BerriesGuide";
import NaturesGuide from "./NaturesGuide";
import ThreatGuide from "./ThreatGuide";
import GymsGuide from "./GymsGuide";
import StatsGuide from "./StatsGuide";
import CombatGuide from "./CombatGuide";
import ItemsGuide from "./ItemsGuide";
import AugmentsGuide from "./AugmentsGuide";

export default function ConsultaPage({ setConsulta }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const [activePage, setActivePage] = useState(null);

    if (activePage === 'elementos') {
        return <StatisticsPage setStatistics={() => setActivePage(null)} />;
    }
    if (activePage === 'berries') {
        return <BerriesGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'natures') {
        return <NaturesGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'threat') {
        return <ThreatGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'gyms') {
        return <GymsGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'stats') {
        return <StatsGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'combat') {
        return <CombatGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'items') {
        return <ItemsGuide goBack={() => setActivePage(null)} />;
    }
    if (activePage === 'augments') {
        return <AugmentsGuide goBack={() => setActivePage(null)} />;
    }

    const buttons = [
        { key: 'elementos', label: t('consulta.elementos') },
        { key: 'berries', label: t('consulta.berries') },
        { key: 'natures', label: t('consulta.natures') },
        { key: 'threat', label: t('consulta.threat') },
        { key: 'gyms', label: t('consulta.gyms') },
        { key: 'stats', label: t('consulta.stats') },
        { key: 'combat', label: t('consulta.combat') },
        { key: 'items', label: t('consulta.items') },
        { key: 'augments', label: t('consulta.augments') },
    ];

    return (
        <Box p={5}>
            <Button mb={6} onClick={() => setConsulta(false)}>
                {t('common.back')}
            </Button>

            <Heading size="lg" mb={6} textAlign="center">
                {t('consulta.title')}
            </Heading>

            <SimpleGrid
                columns={2}
                spacing={4}
                maxW="500px"
                mx="auto"
            >
                {buttons.map((btn) => (
                    <Button
                        key={btn.key}
                        h={14}
                        bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                        onClick={() => setActivePage(btn.key)}
                        fontSize="md"
                        fontWeight="bold"
                    >
                        {btn.label}
                    </Button>
                ))}
            </SimpleGrid>
        </Box>
    );
}
