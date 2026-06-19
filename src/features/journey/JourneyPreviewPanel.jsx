import { useContext } from "react"
import { Badge, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import Element from "@features/elements/Element"

const VISIBLE_COUNT = 3

const THREAT_LABELS = [
    { key: 'threatCalm', color: 'green', descKey: 'threatDescCalm' },
    { key: 'threatAnnoyed', color: 'yellow', descKey: 'threatDescAnnoyed' },
    { key: 'threatHeated', color: 'orange', descKey: 'threatDescHeated' },
    { key: 'threatEnraged', color: 'red', descKey: 'threatDescEnraged' },
    { key: 'threatFurious', color: 'purple', descKey: 'threatDescFurious' },
]

export default function JourneyPreviewPanel() {
    const { game, session, player } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const wildPreview = game.journeyWildPreview || []
    const journeyProgress = game.journeyProgress || 0
    const stagesToWin = session?.stagesPerJourney || 5

    if (wildPreview.length === 0) {
        return (
            <Flex flex="1" align="center" justify="center" p={4} data-tutorial="journey-panel">
                <Text color="gray.400" fontSize="sm">{t('journey.noPreview')}</Text>
            </Flex>
        )
    }

    const defeated = game.journeyWildDefeatedCount || journeyProgress
    const remaining = stagesToWin - defeated
    const allRemainingWild = wildPreview.slice(journeyProgress)
    const visibleWild = allRemainingWild.slice(0, VISIBLE_COUNT)
    const hiddenCount = allRemainingWild.length - visibleWild.length
    const journeyLevel = game.journeyLevel ?? 1

    const threat = player.threat ?? 0
    const threatData = THREAT_LABELS[threat] || THREAT_LABELS[0]
    const threatLabel = t(`journey.${threatData.key}`)
    const threatColor = threatData.color

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4} alignItems="center" data-tutorial="journey-panel">
            <Text fontSize="lg" fontWeight="bold" mb={1}>{t('journey.previewTitle')}</Text>

            <Badge colorScheme="purple" fontSize="xs" px={2} py={1} borderRadius="full" mb={2}>
                {t('journey.routeN', { route: journeyLevel })}
            </Badge>

            <Flex gap={3} mb={2}>
                <Badge colorScheme="green" fontSize="xs" px={2} py={1} borderRadius="full">
                    {t('journey.previewDefeated')}: {defeated}
                </Badge>
                <Badge colorScheme="red" fontSize="xs" px={2} py={1} borderRadius="full">
                    {t('journey.previewRemaining')}: {remaining}
                </Badge>
            </Flex>

            <Tooltip label={<><Text fontWeight="bold" fontSize="xs">{t('journey.threatTitle')}: {threatLabel}</Text><Text fontSize="xs" mt={1}>{t(`journey.${threatData.descKey}`)}</Text><Text fontSize="2xs" mt={1} color="gray.300">{t('journey.threatTooltip')}</Text></>} hasArrow>
                <Badge colorScheme={threatColor} fontSize="xs" px={2} py={1} borderRadius="full" mb={4} cursor="help">
                    {t('journey.threatTitle')}: {threatLabel}
                </Badge>
            </Tooltip>

            {/* Visible wild pokemon */}
            <Flex gap={2} justifyContent="center" flexWrap="wrap" maxW="900px" mb={2}>
                {visibleWild.map((wild, idx) => {
                    const realIdx = journeyProgress + idx
                    const isCurrent = realIdx === journeyProgress

                    return (
                        <Flex
                            key={wild.id}
                            direction="column"
                            align="center"
                            bg={colorMode === 'light' ? 'red.50' : 'red.900'}
                            border={isCurrent ? '2px solid' : '1px solid'}
                            borderColor={isCurrent ? 'orange.400' : 'red.400'}
                            borderRadius={8}
                            p={2}
                            w="80px"
                            transition="all 0.15s"
                        >
                            <Badge
                                colorScheme={isCurrent ? 'orange' : 'red'}
                                fontSize="2xs"
                                mb={1}
                            >
                                {realIdx + 1}
                            </Badge>
                            <Image
                                src={wild.sprite}
                                w="40px" h="40px"
                            />
                            <Text fontSize="2xs" noOfLines={1} fontWeight="bold">{wild.name}</Text>
                            <Flex gap={1} mt={1}>
                                {wild.types?.map(el => (
                                    <Element key={el} element={el} w={3} h={3} />
                                ))}
                            </Flex>
                            <Text fontSize="2xs" color="gray.400">Lv.{wild.level}</Text>
                            {isCurrent && (
                                <Text fontSize="2xs" color="orange.300" fontWeight="bold">{t('journey.previewNext')}</Text>
                            )}
                        </Flex>
                    )
                })}
            </Flex>

            {/* Hidden wild pokemon */}
            {hiddenCount > 0 && (
                <Flex gap={1} justifyContent="center" flexWrap="wrap" maxW="900px">
                    {Array.from({ length: hiddenCount }).map((_, idx) => (
                        <Flex
                            key={`hidden-${idx}`}
                            align="center"
                            justify="center"
                            bg="gray.700"
                            border="1px solid"
                            borderColor="whiteAlpha.200"
                            borderRadius={6}
                            w="32px"
                            h="32px"
                        >
                            <Text fontSize="sm" color="whiteAlpha.400">?</Text>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
