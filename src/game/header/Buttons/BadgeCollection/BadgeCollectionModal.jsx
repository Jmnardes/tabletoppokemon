import { useContext, useEffect, useState } from "react"
import { 
    Badge,
    Grid,
    Box,
    Image,
    Text,
    Center,
    Flex,
    useColorMode
} from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"

const ALL_BADGES = [
    'balance_badge', 'beacon_badge', 'boulder_badge', 'cascade_badge',
    'coal_badge', 'cobble_badge', 'dynamo_badge', 'earth_badge',
    'feather_badge', 'fen_badge', 'fog_badge', 'forest_badge',
    'glacier_badge', 'heat_badge', 'hive_badge', 'icicle_badge',
    'knuckle_badge', 'marsh_badge', 'mind_badge', 'mineral_badge',
    'mine_badge', 'plain_badge', 'rainbow_badge', 'rain_badge',
    'relic_badge', 'rising_badge', 'soul_badge', 'stone_badge',
    'storm_badge', 'thunder_badge', 'volcano_badge', 'zephyr_badge'
]

const getBadgeIcon = (badgeName) => {
    try {
        return require(`@assets/images/badges/${badgeName}.png`)
    } catch (e) {
        return null
    }
}

export default function BadgeCollectionTooltip() {
    const { emit } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [defeatedGyms, setDefeatedGyms] = useState([])

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"
    const borderColor = colorMode === 'light' ? "gray.300" : "gray.600"

    useEffect(() => {
        emit('gym-check-badges')
            .then((response) => {
                if (response?.defeatedGyms) {
                    const badges = Array.isArray(response.defeatedGyms) ? response.defeatedGyms : []
                    const uniqueBadges = badges.filter((badge, index, self) =>
                        index === self.findIndex((b) => b.badgeId === badge.badgeId)
                    )
                    setDefeatedGyms(uniqueBadges)
                }
            })
            .catch(() => {})
    }, [emit])

    const getBadgeInfo = (badgeId) => {
        return defeatedGyms.find(gym => gym.badgeId === badgeId)
    }

    return (
        <Flex
            w={340}
            backgroundColor={bgColor}
            borderRadius={8}
            direction="column"
        >
            <Badge textAlign="center" w="full" py={4}>
                Badge Collection
            </Badge>
            <Center mb={2} mt={2}>
                <Text fontSize="xx-small" color="gray.500">
                    {defeatedGyms.length} / {ALL_BADGES.length} Badges Earned
                </Text>
            </Center>
            <Grid templateColumns="repeat(8, 1fr)" gap={1} px={3} pb={3}>
                {ALL_BADGES.map((badgeId) => {
                    const badgeIcon = getBadgeIcon(badgeId)
                    const badgeInfo = getBadgeInfo(badgeId)
                    const isEarned = !!badgeInfo

                    return (
                        <Box
                            key={badgeId}
                            p={1}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={isEarned ? "yellow.400" : borderColor}
                            textAlign="center"
                            title={isEarned ? `${badgeInfo.badge} - ${badgeInfo.leader} (${badgeInfo.name})` : ""}
                        >
                            {badgeIcon && (
                                <Image
                                    src={badgeIcon}
                                    alt={badgeId}
                                    w="32px"
                                    h="32px"
                                    mx="auto"
                                    opacity={isEarned ? 1 : 0.3}
                                    filter={isEarned ? "none" : "grayscale(100%)"}
                                />
                            )}
                        </Box>
                    )
                })}
            </Grid>
        </Flex>
    )
}
