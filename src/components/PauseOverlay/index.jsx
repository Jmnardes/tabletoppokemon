import { useContext, useEffect, useState } from 'react'
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import PlayerContext from '@context/PlayerContext'

const PauseOverlay = () => {
    const { gamePaused, kickVoteState, player, voteKick, extendPauseTimer } = useContext(PlayerContext)
    const { t } = useTranslation()
    const [remaining, setRemaining] = useState(0)

    useEffect(() => {
        if (!gamePaused?.deadline) return

        const update = () => {
            const left = Math.max(0, gamePaused.deadline - Date.now())
            setRemaining(left)
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [gamePaused?.deadline])

    if (!gamePaused) return null

    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    const isUrgent = remaining < 120000 // < 2 min
    const canExtend = remaining < 45 * 60 * 1000 // < 45 min

    return (
        <>
            <Box
                pos="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                bg="blackAlpha.700"
                backdropFilter="blur(4px)"
                zIndex="9998"
            />
            <Flex
                pos="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                align="center"
                justify="center"
                zIndex="9999"
            >
                <VStack
                    bg="gray.800"
                    borderRadius="lg"
                    p={6}
                    spacing={4}
                    maxW="400px"
                    w="90%"
                    shadow="2xl"
                    border="1px solid"
                    borderColor="gray.600"
                >
                    <Text fontSize="2xl" fontWeight="bold" color="red.300">
                        {t('pause.title')}
                    </Text>

                    <VStack spacing={1} w="100%">
                        {gamePaused.pausedPlayers.map(pp => (
                            <Text key={pp.playerId} fontSize="md" color="gray.200">
                                {t('pause.playerDisconnected', { name: pp.trainerName })}
                            </Text>
                        ))}
                    </VStack>

                    <VStack spacing={0}>
                        <Text fontSize="sm" color="gray.400">
                            {t('pause.timeRemaining')}
                        </Text>
                        <Text
                            fontSize="3xl"
                            fontFamily="mono"
                            fontWeight="bold"
                            color={isUrgent ? 'red.400' : 'white'}
                        >
                            {timeStr}
                        </Text>
                    </VStack>

                    <VStack spacing={2} w="100%">
                        {gamePaused.pausedPlayers.map(pp => {
                            const voteData = kickVoteState[pp.playerId]
                            const voteCount = voteData?.voteCount || 0
                            const threshold = voteData?.threshold || Math.ceil(1)
                            const hasVoted = voteData?.voters?.includes(player.id)

                            return (
                                <Button
                                    key={pp.playerId}
                                    colorScheme="red"
                                    variant={hasVoted ? 'solid' : 'outline'}
                                    size="sm"
                                    w="100%"
                                    onClick={() => !hasVoted && voteKick(pp.playerId)}
                                    isDisabled={hasVoted}
                                >
                                    {hasVoted
                                        ? t('pause.alreadyVoted')
                                        : t('pause.voteKick', { name: pp.trainerName })
                                    }
                                    {voteData && (
                                        <Text as="span" ml={2} fontSize="xs" opacity={0.8}>
                                            ({t('pause.votesCount', { current: voteCount, total: threshold })})
                                        </Text>
                                    )}
                                </Button>
                            )
                        })}
                    </VStack>

                    {canExtend && (
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            size="sm"
                            onClick={extendPauseTimer}
                        >
                            {t('pause.extendTimer')}
                        </Button>
                    )}
                </VStack>
            </Flex>
        </>
    )
}

export default PauseOverlay
