import { Box, Center, Collapse, Divider, Flex, Grid, GridItem, Image, Text, useColorMode, VStack, HStack, Tooltip } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";

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
    const { players } = results
    const [showFullStats, setShowFullStats] = useState(false)
    const [playerBadges, setPlayerBadges] = useState([])

    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"
    const cardBgColor = colorMode === 'light' ? "white" : "gray.800"
    const borderColor = colorMode === 'light' ? "gray.300" : "gray.600"

    useEffect(() => {
        setWaitingForPlayers(false)
        
        emit('gym-check-badges')
            .then((response) => {
                if (response?.defeatedGyms) {
                    setPlayerBadges(Array.isArray(response.defeatedGyms) ? response.defeatedGyms : [])
                }
            })
            .catch(() => {
                setPlayerBadges([])
            })
    }, [setWaitingForPlayers, emit])

    function handlePlacement (place) {
        switch (place) {
            case 0:
                return <FirstPlaceIcon h={20} w={20} />
            case 1:
                return <SecondPlaceIcon h={20} w={20} />
            case 2:
                return <ThirdPlaceIcon h={20} w={20} />
            default:
                return <Text fontSize="3xl" fontWeight="bold" color="gray.500">#{place + 1}</Text>
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
        const isCurrentPlayer = playerData.id === player.id
        
        return (
            <GridItem>
                <Box position="relative">
                    <Box 
                        bg={cardBgColor}
                        borderWidth={isCurrentPlayer ? 3 : 1}
                        borderColor={isCurrentPlayer ? "gold" : borderColor}
                        borderRadius="xl"
                        p={6}
                        boxShadow="lg"
                        _hover={{ transform: 'translateY(-4px)', transition: '0.2s' }}
                    >
                        <Box position="absolute" top={2} left={2} zIndex={2}>
                            {handlePlacement(place)}
                        </Box>
                        
                        <VStack spacing={3}>
                            <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={8}>
                                {playerData.status.trainerName}
                                {isCurrentPlayer && <Text as="span" fontSize="xs" ml={2} color="gold">(You)</Text>}
                            </Text>
                            
                            <Divider />
                            
                            <VStack spacing={2} w="100%">
                                <StatItem icon={starIcon} label="Ranking" value={playerData.status.ranking} />
                                <StatItem icon={pokeballIcon} label="Catches" value={playerData.status.catches} />
                                <StatItem icon={crownIcon} label="Badges" value={playerData.status.badges} />
                            </VStack>
                        </VStack>
                    </Box>
                </Box>
            </GridItem>
        )
    }

    function FullStatsSection() {
        if (!player?.status) return null
        
        const stats = player.status
        
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
                        const badgeIcon = getBadgeIcon(gym.badgeId)
                        return (
                            <Tooltip 
                                key={index} 
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

    function renderPlayers() {
        if (players) {
            return players.map((playerData, index) => {
                return <PlayerResultBlock key={index} place={index} playerData={playerData} />
            })
        }
    }

    return (
        <Flex 
            flexDirection="column" 
            alignItems="center" 
            py={10} 
            px={4}
            bg={bgColor}
            overflowY="auto"
            overflowX="hidden"
            w="100%"
        >
            <VStack spacing={2} mb={8}>
                <Text fontSize="6xl" fontWeight="bold" bgGradient="linear(to-r, gold, yellow.400)" bgClip="text">
                    Journey ended!
                </Text>
            </VStack>

            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
                gap={6}
                mb={8}
                w="100%"
                maxW="1600px"
            >
                {renderPlayers()}
            </Grid>

            <FullStatsSection />

            <BadgeCollectionDisplay />
        </Flex>
    )
}