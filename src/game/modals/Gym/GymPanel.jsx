import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Text, Center, Flex, Badge, Image, useColorMode, VStack, HStack, Divider } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import Element from "@features/elements/Element"
import PrizeIcon from "@features/prizes/PrizeIcon"
import GymRouteTimeline from "./GymRouteTimeline"

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

export default function GymPanel() {
    const { gym, nextGym } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const displayGym = gym || nextGym
    const isAvailable = !!gym

    if (!displayGym) {
        return (
            <Flex flex="1" flexDir="column" p={4} align="center" justify="center" data-tutorial="gym-panel">
                <GymRouteTimeline />
                <Text color="gray.400" mt={4}>{t('gym.noGymAvailable')}</Text>
            </Flex>
        )
    }

    return (
        <Flex flex="1" flexDir="column" p={4} overflowY="auto" data-tutorial="gym-panel">
            {/* Gym Route Timeline */}
            <GymRouteTimeline />

            <Divider my={3} />

            {/* Next Gym Detail */}
            <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
                {isAvailable ? displayGym.name : t('gym.nextGym', { name: displayGym.name })}
            </Text>

            <VStack spacing={3} flex="1">
                <HStack w="100%" spacing={4} align="start">
                    <Flex
                        bg={bgColor}
                        w="100px"
                        h="140px"
                        borderRadius={8}
                        alignItems="center"
                        justifyContent="center"
                        borderWidth="2px"
                        borderColor={colorMode === 'light' ? "gray.300" : "gray.600"}
                        overflow="hidden"
                        flexShrink={0}
                    >
                        {displayGym.leaderId && getLeaderIcon(displayGym.leaderId) ? (
                            <Image src={getLeaderIcon(displayGym.leaderId)} w="100%" h="100%" objectFit="cover" />
                        ) : (
                            <Text fontSize="sm" color="gray.500">Leader</Text>
                        )}
                    </Flex>

                    <Flex flex={1} bg={bgColor} p={3} borderRadius={8} flexDirection="column" gap={2}>
                        <HStack>
                            <Image src={getBadgeIcon(displayGym.badge)} w="28px" h="28px" />
                            <VStack align="start" spacing={0}>
                                <Text fontSize="md" fontWeight="bold">{t('gym.leaderName', { name: displayGym.leader })}</Text>
                                <Text fontSize="sm" color="gray.400">{t('gym.badgeName', { name: displayGym.badge })}</Text>
                            </VStack>
                            <Element element={displayGym.element} size={24} />
                        </HStack>
                        {displayGym.attempts > 0 && (
                            <HStack justify="center">
                                <Badge colorScheme="orange" fontSize="xs">{t('gym.attempts', { count: displayGym.attempts })}</Badge>
                            </HStack>
                        )}
                    </Flex>

                    {displayGym.reward && (
                        <Flex bg={bgColor} p={3} borderRadius={8} flexDirection="column" alignItems="center" gap={1} flexShrink={0}>
                            <Text fontSize="sm" fontWeight="bold">{t('gym.rewards')}</Text>
                            <HStack>
                                <Text fontSize="md" fontWeight="bold" color="green.400">+{displayGym.reward.amount}</Text>
                                <PrizeIcon type={displayGym.reward.name} size="20px" />
                            </HStack>
                            <Text fontSize="2xs" color="cyan.400">{t('gym.expPerPokemonReward')}</Text>
                            <Text fontSize="2xs" color="pink.400">{t('gym.berries3')}</Text>
                        </Flex>
                    )}
                </HStack>

                <Divider />

                <Flex w="100%" flexDirection="column" gap={2}>
                    <Text fontSize="md" fontWeight="bold" textAlign="center">{t('gym.leaderTeam')}</Text>
                    <Flex wrap="wrap" justify="center" gap={3}>
                        {displayGym.leaderTeam && displayGym.leaderTeam.length > 0 ? (
                            displayGym.leaderTeam.map((pokemon, index) => (
                                <Flex key={index} bg={bgColor} p={2} borderRadius={8} flexDirection="column" alignItems="center" minW="100px">
                                    <Image src={pokemon.sprites?.front} w="72px" h="72px" fallback={<Text>?</Text>} />
                                    <Text fontSize="sm" fontWeight="bold" textAlign="center">{pokemon.name}</Text>
                                    <Badge fontSize="xs" colorScheme="blue">Lv {pokemon.level}</Badge>
                                </Flex>
                            ))
                        ) : (
                            <Text fontSize="sm" color="gray.400">{t('gym.teamUnavailable')}</Text>
                        )}
                    </Flex>
                </Flex>

                <Divider />

                <Center flexDirection="column" gap={2} pt={1}>
                    {!isAvailable && (
                        <Text fontSize="lg" fontWeight="bold" color="yellow.400" textAlign="center">
                            {t('gym.reachStage', { stage: displayGym.turnStart })}
                        </Text>
                    )}
                    {displayGym.attempts > 0 && (
                        <Text fontSize="xs" color="gray.400">
                            {t('gym.challengeCount', { count: displayGym.attempts })}
                        </Text>
                    )}
                </Center>
            </VStack>
        </Flex>
    )
}