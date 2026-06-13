import { useContext } from "react"
import { Badge, Flex, Image, Text, useColorMode } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import Element from "@features/elements/Element"

export default function JourneyPreviewPanel() {
    const { game } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const wildPreview = game.journeyWildPreview || []
    const journeyProgress = game.journeyProgress || 0

    if (wildPreview.length === 0) {
        return (
            <Flex flex="1" align="center" justify="center" p={4}>
                <Text color="gray.400" fontSize="sm">{t('journey.noPreview')}</Text>
            </Flex>
        )
    }

    const defeated = wildPreview.filter((_, i) => i < journeyProgress).length
    const remaining = wildPreview.length - defeated

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4} alignItems="center">
            <Text fontSize="lg" fontWeight="bold" mb={1}>{t('journey.previewTitle')}</Text>

            <Flex gap={3} mb={4}>
                <Badge colorScheme="green" fontSize="xs" px={2} py={1} borderRadius="full">
                    {t('journey.previewDefeated')}: {defeated}
                </Badge>
                <Badge colorScheme="red" fontSize="xs" px={2} py={1} borderRadius="full">
                    {t('journey.previewRemaining')}: {remaining}
                </Badge>
            </Flex>

            <Flex gap={2} justifyContent="center" flexWrap="wrap" maxW="900px">
                {wildPreview.map((wild, idx) => {
                    const alreadyDefeated = idx < journeyProgress
                    const isCurrent = idx === journeyProgress

                    return (
                        <Flex
                            key={wild.id}
                            direction="column"
                            align="center"
                            bg={alreadyDefeated ? 'gray.700' : (colorMode === 'light' ? 'red.50' : 'red.900')}
                            border={isCurrent ? '2px solid' : '1px solid'}
                            borderColor={alreadyDefeated ? 'gray.500' : (isCurrent ? 'orange.400' : 'red.400')}
                            borderRadius={8}
                            p={2}
                            w="80px"
                            opacity={alreadyDefeated ? 0.4 : 1}
                            transition="all 0.15s"
                        >
                            <Badge
                                colorScheme={alreadyDefeated ? 'gray' : (isCurrent ? 'orange' : 'red')}
                                fontSize="2xs"
                                mb={1}
                            >
                                {idx + 1}
                            </Badge>
                            <Image
                                src={wild.sprite}
                                w="40px" h="40px"
                                filter={alreadyDefeated ? 'grayscale(1)' : 'none'}
                            />
                            <Text fontSize="2xs" noOfLines={1} fontWeight="bold">{wild.name}</Text>
                            <Flex gap={1} mt={1}>
                                {wild.types?.map(el => (
                                    <Element key={el} element={el} w={3} h={3} />
                                ))}
                            </Flex>
                            <Text fontSize="2xs" color="gray.400">Lv.{wild.level}</Text>
                            {alreadyDefeated && (
                                <Text fontSize="2xs" color="green.400" fontWeight="bold">✓</Text>
                            )}
                            {isCurrent && (
                                <Text fontSize="2xs" color="orange.300" fontWeight="bold">{t('journey.previewNext')}</Text>
                            )}
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
