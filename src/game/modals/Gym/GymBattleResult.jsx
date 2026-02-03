import { VStack, HStack, Text, Button, Flex, Image, Badge, useColorMode, Center } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import Element from "@components/Elements/Element"
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"

export default function GymBattleResult({ victory, gym, reward, onClose, onRetry, canRetry = true }) {
    const { colorMode } = useColorMode()
    const { emit, setLoading } = useContext(PlayerContext)
    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

    const handleClose = () => {
        if (victory && reward) {
            setLoading({ loading: true, text: "Awarding..." })
            emit('player-win-prize', { prize: reward })
        }
        onClose()
    }

    if (victory) {
        return (
            <VStack spacing={6} p={6} w="100%">
                {/* Victory Banner */}
                <Center
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    p={6}
                    borderRadius={16}
                    w="100%"
                    flexDirection="column"
                >
                    <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                        🏆 VICTORY! 🏆
                    </Text>
                    <Text fontSize="lg" color="white">
                        You defeated {gym.leader}!
                    </Text>
                </Center>

                {/* Badge and Reward */}
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
                            Badge Earned!
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
                                Victory Reward
                            </Text>
                            <HStack>
                                <Text fontSize="xl" fontWeight="bold" color="green.400">
                                    +{reward.amount}
                                </Text>
                                <PrizeIcon type={reward.name} size="28px" />
                            </HStack>
                        </VStack>
                    )}
                </Flex>

                {/* Close Button */}
                <Button
                    colorScheme="green"
                    size="lg"
                    w="100%"
                    onClick={handleClose}
                >
                    Continue
                </Button>
            </VStack>
        )
    }

    // Defeat Screen
    return (
        <VStack spacing={6} p={6} w="100%">
            {/* Defeat Banner */}
            <Center
                bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                p={6}
                borderRadius={16}
                w="100%"
                flexDirection="column"
            >
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                    😔 DEFEAT 😔
                </Text>
                <Text fontSize="lg" color="white">
                    {gym.leader} was too strong...
                </Text>
            </Center>

            {/* Message */}
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
                    Don't give up! Train your Pokémon and try again!
                </Text>
                <Text fontSize="sm" textAlign="center">
                    "The best battles are the ones you learn from."
                </Text>
            </Flex>

            {/* Buttons */}
            <VStack spacing={3} w="100%">
                <Button
                    colorScheme="orange"
                    size="lg"
                    w="100%"
                    onClick={onRetry}
                    isDisabled={!canRetry}
                >
                    {canRetry ? 'Try Again' : 'Already battled this turn'}
                </Button>
                <Button
                    variant="outline"
                    size="md"
                    w="100%"
                    onClick={onClose}
                >
                    Leave Gym
                </Button>
            </VStack>
        </VStack>
    )
}
