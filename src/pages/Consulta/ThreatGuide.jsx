import { Box, Button, Heading, Text, VStack, HStack, Badge, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import threatData from "@assets/json/threat.json";

const levelColors = ["green", "green", "yellow", "orange", "red", "red"];

export default function ThreatGuide({ goBack }) {
    const { t, i18n } = useTranslation();
    const { colorMode } = useColorMode();
    const isPortuguese = i18n.language === 'pt-BR';

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={2}>{t('consulta.threat')}</Heading>

            <Box mb={6} p={4} borderRadius={8} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}>
                <Text fontSize="sm" mb={2}>{t('consulta.threatExplanation')}</Text>
                <Text fontSize="sm" mb={1}>• {t('consulta.threatIncrement')}</Text>
                <Text fontSize="sm" mb={1}>• {t('consulta.threatDecay')}</Text>
                <Text fontSize="sm">• {t('consulta.threatCapture')}</Text>
            </Box>

            <VStack spacing={3} align="stretch">
                {threatData.map((level) => (
                    <Box
                        key={level.level}
                        p={4}
                        borderRadius={8}
                        border="1px solid"
                        borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                        bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
                    >
                        <HStack justify="space-between" mb={2}>
                            <HStack>
                                <Badge colorScheme={levelColors[level.level]} fontSize="md" px={2}>
                                    Lv. {level.level}
                                </Badge>
                                <Text fontWeight="bold">
                                    {isPortuguese ? level.label : level.labelEn}
                                </Text>
                            </HStack>
                            <Badge colorScheme="gray">
                                {t('consulta.escapeRate')}: {level.escapeRate}%
                            </Badge>
                        </HStack>

                        <HStack spacing={2} flexWrap="wrap">
                            {level.buffs.length === 0 ? (
                                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
                                    {t('consulta.noBuffs')}
                                </Text>
                            ) : (
                                level.buffs.map((buff, idx) => (
                                    <Badge key={idx} colorScheme="orange" variant="subtle">
                                        {buff}
                                    </Badge>
                                ))
                            )}
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}
