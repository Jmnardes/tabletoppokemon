import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex, Text, Button, Box, Badge, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

export default function JourneyCheckpoint({ journeyState, onContinue, onExit }) {
    const { t } = useTranslation()
    const { player, session, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [loading, setLoading] = useState(false)
    const [chestOpened, setChestOpened] = useState(false)
    const [reward, setReward] = useState(null)
    const [rewardJourney, setRewardJourney] = useState(null)

    const handleContinue = () => {
        setLoading(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {},
        }

        socket.emit('journey-continue', request, (res) => {
            setLoading(false)
            if (res?.success) {
                const result = res.result
                // Update player ranking
                if (result.playerRanking != null) {
                    setPlayer(prev => ({
                        ...prev,
                        status: { ...prev.status, ranking: result.playerRanking },
                    }))
                }
                // Update player potions
                if (result.potions) {
                    setPlayer(prev => ({
                        ...prev,
                        potions: result.potions,
                    }))
                }
                // Show reward before advancing
                setReward(result.reward)
                setChestOpened(true)
                // Store journey data for manual continue
                setRewardJourney(result.journey)
            }
        })
    }

    const bgBox = colorMode === 'light' ? 'gray.100' : 'gray.700'

    return (
        <Flex flex="1" direction="column" align="center" justify="center" w="100%" maxW="500px">
            <Text fontSize="2xl" mb={2}>
                {t('journey.checkpoint')}
            </Text>
            <Badge colorScheme="green" fontSize="lg" mb={4} p={2} borderRadius={8}>
                {t('journey.roundComplete', { round: journeyState.round })}
            </Badge>

            <Text fontSize="sm" color="gray.400" mb={4} textAlign="center">
                {t('journey.defeatedAll', { count: journeyState.wildTeam?.length || 10 })}
            </Text>

            {/* Chest */}
            <Box
                bg={bgBox}
                border="2px solid"
                borderColor={chestOpened ? 'green.400' : 'yellow.500'}
                borderRadius={12}
                p={6}
                mb={6}
                textAlign="center"
                cursor={!chestOpened && !loading ? 'pointer' : 'default'}
                onClick={!chestOpened && !loading ? handleContinue : undefined}
                _hover={!chestOpened && !loading ? { borderColor: 'yellow.300', transform: 'scale(1.02)' } : {}}
                transition="all 0.2s"
            >
                {!chestOpened ? (
                    <>
                        <Text fontSize="3xl" mb={2}>🎁</Text>
                        <Text fontSize="sm" color="yellow.300">{t('journey.clickToOpen')}</Text>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl" mb={2}>✨</Text>
                        <Badge colorScheme="yellow" fontSize="md" p={2} borderRadius={8}>
                            {t('journey.rankingPointsEarned', { amount: reward?.ranking || 5 })}
                        </Badge>
                        <Badge colorScheme="green" fontSize="sm" p={1} borderRadius={8} mt={2}>
                            {t('journey.potions', { amount: reward?.potions || 2 })}
                        </Badge>
                        <Badge colorScheme="blue" fontSize="sm" p={1} borderRadius={8} mt={1}>
                            {t('journey.superPotion', { amount: reward?.superPotions || 1 })}
                        </Badge>
                    </>
                )}
            </Box>

            {!chestOpened && (
                <Button
                    colorScheme="gray"
                    size="md"
                    variant="outline"
                    onClick={onExit}
                >
                    {t('journey.exitJourney')}
                </Button>
            )}
            {chestOpened && (
                <Button
                    colorScheme="green"
                    size="lg"
                    onClick={() => onContinue(rewardJourney)}
                >
                    {t('common.continue')}
                </Button>
            )}
        </Flex>
    )
}
