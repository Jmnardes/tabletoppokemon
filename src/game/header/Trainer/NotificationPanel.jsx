import { useContext } from "react";
import { Badge, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";

const STATUS_COLORS = {
    error: 'red.400',
    warning: 'orange.400',
    success: 'green.400',
    info: 'blue.400',
}

function timeAgo(timestamp, t) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return t('notifications.justNow')
    const minutes = Math.floor(seconds / 60)
    return t('notifications.minutesAgo', { count: minutes })
}

export default function NotificationPanel() {
    const { notifications } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    return (
        <Flex
            w={300}
            backgroundColor={bgColor}
            borderRadius={8}
            direction="column"
        >
            <Badge textAlign="center" w="full" py={3}>
                {t('notifications.title')}
            </Badge>
            {notifications.length === 0 ? (
                <Center py={6}>
                    <Text fontSize="xs" color="gray.500">{t('notifications.empty')}</Text>
                </Center>
            ) : (
                <Flex
                    direction="column"
                    maxH="300px"
                    overflowY="auto"
                    px={2}
                    py={1}
                    sx={{
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-thumb': { bg: 'gray.500', borderRadius: '4px' },
                    }}
                >
                    {notifications.map((n, i) => (
                        <Flex
                            key={i}
                            borderLeft="3px solid"
                            borderColor={STATUS_COLORS[n.status] || 'gray.400'}
                            pl={2}
                            py={2}
                            my={1}
                            direction="column"
                            borderRadius="0 4px 4px 0"
                        >
                            <Flex justifyContent="space-between" alignItems="center">
                                <Text fontSize="xs" fontWeight="bold" color={colorMode === 'dark' ? 'white' : undefined} isTruncated>
                                    {n.title}
                                </Text>
                                <Text fontSize="2xs" color="gray.500" flexShrink={0} ml={2}>
                                    {timeAgo(n.timestamp, t)}
                                </Text>
                            </Flex>
                            {n.description && (
                                <Text fontSize="2xs" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'} mt={0.5}>
                                    {n.description}
                                </Text>
                            )}
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
