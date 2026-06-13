import { VStack, HStack, Text, Button, Flex, Image, useColorMode, Center } from "@chakra-ui/react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import ultraboxIcon from '@assets/images/box/ultrabox-closed.png'

export default function GymBattleResult({ victory, gym, reward, onClose, onRetry, canRetry = true, leveledUpPokemons = [] }) {
    const { colorMode } = useColorMode()
    const { setLoading, playerWinPrize } = useContext(PlayerContext)
    const { t } = useTranslation()
    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

    const handleClose = async () => {
        if (victory && reward) {
            setLoading({ loading: true, text: t('gym.awarding') })
            // Badge increment is handled by the server on gym-victory event
            // await updateStatus('badges') // REMOVED: This was causing duplicate badge increments
            await playerWinPrize(reward)
            setLoading({ loading: false })
        }
        onClose()
    }

    if (victory) {
        return (
            <VStack spacing={6} p={6} w="100%">
                <Center
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    p={6}
                    borderRadius={16}
                    w="100%"
                    flexDirection="column"
                >
                    <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                        {t('gym.victory')}
                    </Text>
                    <Text fontSize="lg" color="white">
                        {t('gym.youDefeated', { leader: gym.leader })}
                    </Text>
                </Center>

                <Flex
                    bg={bgColor}
                    p={6}
                    borderRadius={12}
                    flexDirection="column"
                    alignItems="center"
                    gap={4}
                    w="100%"
                >
                    <VStack spacing={3}>
                        <Text fontSize="xl" fontWeight="bold">
                            {t('gym.badgeEarned')}
                        </Text>
                        <Image
                            src={require(`@assets/images/badges/${gym.badge.toLowerCase().replace(/\s+/g, '_')}.png`)}
                            w="96px"
                            h="96px"
                            fallback={<Text fontSize="4xl">🏅</Text>}
                        />
                        <Text fontSize="lg" fontWeight="bold">{gym.badge}</Text>
                    </VStack>

                    {reward && (
                        <VStack spacing={2} pt={2}>
                            <Text fontSize="md" fontWeight="bold">
                                {t('gym.victoryRewards')}
                            </Text>
                            <HStack>
                                <Text fontSize="xl" fontWeight="bold" color="green.400">
                                    +1
                                </Text>
                                <Image src={ultraboxIcon} w="28px" />
                            </HStack>
                            <Text fontSize="sm" color="cyan.400">{t('gym.expPerPokemon')}</Text>
                            {leveledUpPokemons.length > 0 && (
                                <VStack spacing={1}>
                                    {leveledUpPokemons.map((p) => (
                                        <Text key={p.id} fontSize="sm" color="yellow.400" fontWeight="bold">
                                            {t('gym.leveledUp', { name: p.name, level: p.level })}
                                        </Text>
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    )}
                </Flex>

                <Button
                    colorScheme="green"
                    size="lg"
                    w="100%"
                    onClick={handleClose}
                >
                    {t('common.continue')}
                </Button>
            </VStack>
        )
    }

    // Defeat Screen
    return (
        <VStack spacing={6} p={6} w="100%">
            <Center
                bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                p={6}
                borderRadius={16}
                w="100%"
                flexDirection="column"
            >
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                    {t('gym.defeat')}
                </Text>
                <Text fontSize="lg" color="white">
                    {t('gym.tooStrong', { leader: gym.leader })}
                </Text>
            </Center>

            <Flex
                bg={bgColor}
                p={6}
                borderRadius={12}
                flexDirection="column"
                alignItems="center"
                gap={3}
                w="100%"
            >
                <Text fontSize="md" textAlign="center" color="gray.400">
                    {t('gym.dontGiveUp')}
                </Text>
                <Text fontSize="sm" textAlign="center">
                    {t('gym.bestBattles')}
                </Text>
            </Flex>

            <VStack spacing={3} w="100%">
                <Button
                    colorScheme="orange"
                    size="lg"
                    w="100%"
                    onClick={onRetry}
                    isDisabled={!canRetry}
                >
                    {canRetry ? t('gym.tryAgain') : t('gym.alreadyBattled')}
                </Button>
                <Button
                    variant="outline"
                    size="md"
                    w="100%"
                    onClick={onClose}
                >
                    {t('gym.leaveGym')}
                </Button>
            </VStack>
        </VStack>
    )
}
