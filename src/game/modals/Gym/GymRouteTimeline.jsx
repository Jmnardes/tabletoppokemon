import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Center, Text, Image, Tooltip, Box, VStack, useColorMode } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa"
import PlayerContext from "@context/PlayerContext"
import Element from "@features/elements/Element"

const getBadgeIcon = (badgeName) => {
    if (!badgeName) return null
    const iconName = badgeName.toLowerCase().replace(/\s+/g, '_')
    try {
        return require(`@assets/images/badges/${iconName}.png`)
    } catch (e) {
        return null
    }
}

const getLeaderIcon = (leaderId) => {
    if (!leaderId) return null
    try {
        return require(`@assets/images/leaders/${leaderId}.png`)
    } catch (e) {
        return null
    }
}

function GymNode({ gymInfo, state }) {
    const { colorMode } = useColorMode()
    const { t } = useTranslation()
    const isDefeated = state === 'defeated'
    const isCurrent = state === 'current'
    const isHidden = state === 'hidden'

    const badgeIcon = getBadgeIcon(gymInfo.badge)
    const leaderIcon = getLeaderIcon(gymInfo.leaderId)

    const tooltipContent = isHidden ? (
        <VStack spacing={1} p={2}>
            <Text fontSize="sm" fontWeight="bold">???</Text>
        </VStack>
    ) : (
        <VStack
            spacing={2}
            p={3}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            borderRadius={8}
            minW="140px"
        >
            {leaderIcon && (
                <Image
                    src={leaderIcon}
                    w="64px"
                    h="64px"
                    objectFit="cover"
                    borderRadius={8}
                />
            )}
            <Text fontSize="sm" fontWeight="bold">{gymInfo.leader}</Text>
            <Text fontSize="xs" color="gray.400">{gymInfo.name}</Text>
            <Element element={gymInfo.element} size={20} />
            {isDefeated && (
                <Text fontSize="xs" color="green.400" fontWeight="bold">
                    {t('gym.defeated')}
                </Text>
            )}
        </VStack>
    )

    return (
        <Tooltip
            label={tooltipContent}
            placement="top"
            hasArrow
            bg="transparent"
            p={0}
            borderRadius={8}
        >
            <Flex flexDir="column" alignItems="center" gap={0} cursor="pointer">
                <Center
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg={isCurrent ? 'green.600' : isDefeated ? 'gray.600' : 'whiteAlpha.200'}
                    border="2px solid"
                    borderColor={isCurrent ? 'green.300' : isDefeated ? 'gray.500' : 'whiteAlpha.400'}
                    position="relative"
                    transform={isCurrent ? 'scale(1.15)' : 'none'}
                    transition="all 0.2s ease"
                    _hover={{ transform: 'scale(1.2)' }}
                >
                    {isHidden ? (
                        <Text fontSize="md" fontWeight="bold" color="whiteAlpha.500">?</Text>
                    ) : badgeIcon ? (
                        <Image
                            src={badgeIcon}
                            w="24px"
                            h="24px"
                            objectFit="contain"
                            opacity={isDefeated ? 1 : isCurrent ? 1 : 0.4}
                            filter={!isDefeated && !isCurrent ? 'grayscale(100%)' : 'none'}
                        />
                    ) : (
                        <Text fontSize="xs" fontWeight="bold">
                            {gymInfo.leader?.[0]}
                        </Text>
                    )}
                    {isDefeated && (
                        <Center
                            position="absolute"
                            top="-4px"
                            right="-4px"
                            w="14px"
                            h="14px"
                            borderRadius="full"
                            bg="green.500"
                        >
                            <FaCheck size={8} color="white" />
                        </Center>
                    )}
                </Center>
                <Text
                    fontSize="2xs"
                    color={isCurrent ? 'green.300' : isDefeated ? 'gray.500' : 'whiteAlpha.500'}
                    fontWeight={isCurrent ? 'bold' : 'normal'}
                    mt="2px"
                    maxW="50px"
                    textAlign="center"
                    isTruncated
                >
                    {isHidden ? '?' : gymInfo.leader}
                </Text>
            </Flex>
        </Tooltip>
    )
}

function GymConnector({ isPast }) {
    return (
        <Box
            h="2px"
            w="24px"
            bg={isPast ? 'green.500' : 'whiteAlpha.300'}
            transition="background 0.2s ease"
            mt="-10px"
        />
    )
}

export default function GymRouteTimeline() {
    const { gymRoute, player, gym, nextGym } = useContext(PlayerContext)
    const { t } = useTranslation()

    if (!gymRoute || gymRoute.length === 0) {
        return null
    }

    const defeatedIds = player?.defeatedGyms || []
    const currentGymId = gym?.id || nextGym?.id

    const getGymState = (gymInfo) => {
        if (defeatedIds.includes(gymInfo.id)) return 'defeated'
        if (gymInfo.id === currentGymId) return 'current'
        return 'hidden'
    }

    return (
        <Flex flexDir="column" alignItems="center" w="100%" py={2}>
            <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.300">
                {t('gym.routeTitle')}
            </Text>
            <Flex
                alignItems="center"
                gap={0}
                overflowX="auto"
                w="100%"
                justifyContent="center"
                px={2}
                py={1}
                sx={{
                    '&::-webkit-scrollbar': { height: '4px' },
                    '&::-webkit-scrollbar-track': { bg: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { bg: 'gray.600', borderRadius: '4px' }
                }}
            >
                {gymRoute.map((gymInfo, i) => {
                    const state = getGymState(gymInfo)
                    const prevState = i > 0 ? getGymState(gymRoute[i - 1]) : null
                    const isPastConnector = prevState === 'defeated'

                    return (
                        <Flex key={gymInfo.id} alignItems="center">
                            {i > 0 && <GymConnector isPast={isPastConnector} />}
                            <GymNode gymInfo={gymInfo} state={state} />
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
