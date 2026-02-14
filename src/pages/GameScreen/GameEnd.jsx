import { Box, Collapse, Divider, Flex, Grid, Image, Text, useColorMode, VStack, HStack, Tooltip, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import { FaTrophy } from "react-icons/fa";

import starIcon from '@assets/images/game/star.png'
import crownIcon from '@assets/images/game/crown.png'
import pokeballIcon from '@assets/images/game/pokeball.png'
import FirstPlaceIcon from "@components/Icons/places/FirstPlaceIcon";
import SecondPlaceIcon from "@components/Icons/places/SecondPlaceIcon";
import ThirdPlaceIcon from "@components/Icons/places/ThirdPlaceIcon";

const getBadgeIcon = (badgeName) => {
    try {
        return require(`@assets/images/badges/${badgeName}.png`)
    } catch (e) {
        return null
    }
}

export default function GameEnd() {
    const { results, setWaitingForPlayers, player, emit } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [showFullStats, setShowFullStats] = useState(false)
    const [playerBadges, setPlayerBadges] = useState([])
    const [tabIndex, setTabIndex] = useState(0)

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const cardBgColor = colorMode === 'light' ? "white" : "gray.800"
    const borderColor = colorMode === 'light' ? "gray.300" : "gray.600"

    useEffect(() => {
        setWaitingForPlayers(false)
        
        // Fetch badges
        emit('gym-check-badges')
            .then((response) => {
                if (response?.defeatedGyms) {
                    const badges = Array.isArray(response.defeatedGyms) ? response.defeatedGyms : []
                    // Remove duplicates based on badgeId
                    const uniqueBadges = badges.filter((badge, index, self) => 
                        index === self.findIndex((b) => b.badgeId === badge.badgeId)
                    )
                    setPlayerBadges(uniqueBadges)
                } else {
                    // Fallback to player data from results
                    const playerData = results?.player || player
                    if (playerData?.defeatedGyms) {
                        const badges = Array.isArray(playerData.defeatedGyms) ? playerData.defeatedGyms : []
                        const uniqueBadges = badges.filter((badge, index, self) => 
                            index === self.findIndex((b) => b.badgeId === badge.badgeId)
                        )
                        setPlayerBadges(uniqueBadges)
                    }
                }
            })
            .catch(() => {
                // Fallback to player data
                const playerData = results?.player || player
                if (playerData?.defeatedGyms) {
                    const badges = Array.isArray(playerData.defeatedGyms) ? playerData.defeatedGyms : []
                    const uniqueBadges = badges.filter((badge, index, self) => 
                        index === self.findIndex((b) => b.badgeId === badge.badgeId)
                    )
                    setPlayerBadges(uniqueBadges)
                } else {
                    setPlayerBadges([])
                }
            })
    }, [setWaitingForPlayers, emit, results, player])

    function handlePlacement (place) {
        switch (place) {
            case 1:
                return <FirstPlaceIcon h={20} w={20} />
            case 2:
                return <SecondPlaceIcon h={20} w={20} />
            case 3:
                return <ThirdPlaceIcon h={20} w={20} />
            default:
                return <Text fontSize="3xl" fontWeight="bold" color="gray.500">#{place}</Text>
        }
    }

    function StatItem({ icon, label, value }) {
        return (
            <HStack spacing={2}>
                <Image src={icon} w={5} h={5} />
                <Text fontSize="sm">{label}:</Text>
                <Text fontSize="sm" fontWeight="bold">{value}</Text>
            </HStack>
        )
    }

    function PlayerResultBlock ({ place, playerData }) {
        const currentPlayerId = results?.player?.id || player?.id
        const isCurrentPlayer = playerData.playerId === currentPlayerId
        
        return (
            <Box position="relative" minW="250px">
                <Box 
                    bg={cardBgColor}
                    borderWidth={isCurrentPlayer ? 3 : 1}
                    borderColor={isCurrentPlayer ? "gold" : borderColor}
                    borderRadius="xl"
                    p={6}
                    boxShadow="lg"
                    _hover={{ transform: 'translateY(-4px)', transition: '0.2s' }}
                    h="100%"
                >
                    <Box position="absolute" top={2} left={2} zIndex={2}>
                        {handlePlacement(place)}
                    </Box>
                    
                    <VStack spacing={3}>
                        <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={8}>
                            {playerData.playerName}
                            {isCurrentPlayer && <Text as="span" fontSize="xs" ml={2} color="gold">(You)</Text>}
                        </Text>
                        
                        <Divider />
                        
                        <VStack spacing={2} w="100%">
                            <StatItem icon={starIcon} label="Ranking" value={playerData.ranking} />
                            <StatItem icon={crownIcon} label="Badges" value={playerData.badges} />
                            <StatItem icon={pokeballIcon} label="Catches" value={playerData.catches || 0} />
                        </VStack>
                    </VStack>
                </Box>
            </Box>
        )
    }

    function FullStatsSection() {
        const statsSource = results?.player || player
        if (!statsSource?.status) return null
        
        const stats = statsSource.status
        
        return (
            <Box 
                mt={6}
                bg={cardBgColor}
                borderWidth={2}
                borderColor="gold"
                borderRadius="xl"
                p={6}
                boxShadow="xl"
                maxW="800px"
                w="100%"
            >
                <Text 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    mb={4} 
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => setShowFullStats(!showFullStats)}
                    _hover={{ color: "gold" }}
                >
                    📊 Your Full Stats {showFullStats ? "▼" : "▶"}
                </Text>
                
                <Collapse in={showFullStats} animateOpacity>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <StatItem icon={starIcon} label="Ranking Points" value={stats.ranking} />
                        <StatItem icon={pokeballIcon} label="Total Catches" value={stats.catches} />
                        <StatItem icon={crownIcon} label="Badges Collected" value={stats.badges} />
                        <HStack spacing={2}>
                            <Text fontSize="sm">Battles Won:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.wins}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Battles Lost:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.loses}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Challenges:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.challenges}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Critical Hits:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.critics}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Tasks Completed:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.taskDone}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Shiny Chance:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.shinyChance}%</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Encounter Rarity:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.encounterRarity}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Encounter Level:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.encounterLevel}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Challenge Bonus:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.challengeBonus}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Level:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.level}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Text fontSize="sm">Level Bonus:</Text>
                            <Text fontSize="sm" fontWeight="bold">{stats.levelBonus}</Text>
                        </HStack>
                    </Grid>
                </Collapse>
            </Box>
        )
    }

    function BadgeCollectionDisplay() {
        if (playerBadges.length === 0) return null
        
        return (
            <Box 
                mt={8}
                bg={cardBgColor}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                boxShadow="lg"
                maxW="1200px"
                w="100%"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                    🏆 Your Badge Collection
                </Text>
                <Flex flexWrap="wrap" gap={4} justifyContent="center">
                    {playerBadges.map((gym, index) => {
                        if (!gym?.badgeId) return null
                        const badgeIcon = getBadgeIcon(gym.badgeId)
                        return (
                            <Tooltip 
                                key={gym.badgeId || index} 
                                label={`${gym.badgeId.replace('_', ' ').toUpperCase()}`}
                                placement="top"
                            >
                                <Box
                                    bg={bgColor}
                                    p={3}
                                    borderRadius="md"
                                    borderWidth={1}
                                    borderColor={borderColor}
                                    _hover={{ transform: 'scale(1.1)', transition: '0.2s' }}
                                >
                                    {badgeIcon ? (
                                        <Image src={badgeIcon} w={12} h={12} />
                                    ) : (
                                        <Box w={12} h={12} bg="gray.400" borderRadius="full" />
                                    )}
                                </Box>
                            </Tooltip>
                        )
                    })}
                </Flex>
            </Box>
        )
    }

    function AchievementsDisplay() {
        const achievementsData = results?.achievements || []
        if (achievementsData.length === 0) return null
        
        return (
            <Box 
                mb={8}
                bg={cardBgColor}
                borderWidth={2}
                borderColor="gold"
                borderRadius="xl"
                p={6}
                boxShadow="xl"
                maxW="1200px"
                w="100%"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                    🏆 Achievements Completed
                </Text>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                    gap={4}
                    w="100%"
                >
                    {achievementsData.map((achievement, index) => (
                        <Tooltip 
                            key={achievement.id || index}
                            label={achievement.message} 
                            placement="top" 
                            hasArrow
                        >
                            <Box 
                                bg={bgColor}
                                p={4}
                                borderRadius="lg"
                                borderWidth={1}
                                borderColor={borderColor}
                                _hover={{ transform: 'translateY(-2px)', transition: '0.2s' }}
                            >
                                <VStack spacing={3} align="stretch">
                                    <HStack spacing={2}>
                                        <FaTrophy size={20} color="gold" />
                                        <Text fontSize="md" fontWeight="semibold" noOfLines={2}>
                                            {achievement.label}
                                        </Text>
                                    </HStack>
                                    
                                    <Divider />
                                    
                                    <HStack spacing={2}>
                                        <Text fontSize="sm" color="gray.500">
                                            Reward:
                                        </Text>
                                        <Text fontSize="sm" fontWeight="bold" color="gold">
                                            +{achievement.reward || 15}
                                        </Text>
                                        <Image src={starIcon} w={4} h={4} />
                                    </HStack>
                                    
                                    {achievement.winners && achievement.winners.length > 0 && (
                                        <Box>
                                            <Text fontSize="xs" fontWeight="medium" color="gold" mb={1}>
                                                🎉 Winner{achievement.winners.length > 1 ? 's' : ''}:
                                            </Text>
                                            <VStack align="stretch" spacing={1}>
                                                {achievement.winners.map((winner, idx) => (
                                                    <HStack key={idx} spacing={2}>
                                                        <Text fontSize="sm" fontWeight="medium">
                                                            {winner.playerName}
                                                        </Text>
                                                        <Text fontSize="xs" color="gray.500">
                                                            ({winner.score})
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </VStack>
                                        </Box>
                                    )}
                                </VStack>
                            </Box>
                        </Tooltip>
                    ))}
                </Grid>
            </Box>
        )
    }

    function renderPlayers() {
        const rankings = results?.ranking || []
        if (rankings.length > 0) {
            return rankings.map((playerData) => {
                return <PlayerResultBlock key={playerData.playerId} place={playerData.position} playerData={playerData} />
            })
        }
        return null
    }

    return (
        <Flex 
            flexDirection="column" 
            alignItems="center" 
            py={10} 
            px={4}
            bg={bgColor}
            minH="100vh"
            w="100%"
            overflowY="auto"
        >
            <VStack spacing={2} mb={8}>
                <Text fontSize="6xl" fontWeight="bold" bgGradient="linear(to-r, gold, yellow.400)" bgClip="text">
                    Journey ended!
                </Text>
            </VStack>

            <Tabs index={tabIndex} onChange={setTabIndex} variant="soft-rounded" colorScheme="yellow" isFitted w="100%" maxW="1200px">
                <TabList mb={6}>
                    <Tab>Ranking</Tab>
                    <Tab>Achievements</Tab>
                    <Tab>Player Info</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* Ranking: lista dos players com posição, ranking, badges, catches */}
                        <Box w="100%" overflowX="auto" mb={8}>
                            <Flex
                                gap={6}
                                px={4}
                                minW="fit-content"
                                justifyContent="center"
                            >
                                {renderPlayers()}
                            </Flex>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        {/* Achievements: mostra os 3 separados e quem venceu */}
                        <AchievementsDisplay />
                    </TabPanel>
                    <TabPanel>
                        {/* Player Info: status, balls, tokens do daycare */}
                        <FullStatsSection />
                        <BadgeCollectionDisplay />
                        {/* Balls e tokens do daycare removidos temporariamente */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}