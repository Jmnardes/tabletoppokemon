import { VStack, HStack, Text, Button, Flex, Image, Badge, useColorMode, Center } from "@chakra-ui/react"
import Element from "@components/Elements/Element"

export default function GymBattleResult({ victory, gym, rewards, onClose, onRetry, canRetry = true }) {
    const { colorMode } = useColorMode()
    const bgColor = colorMode === 'light' ? "gray.100" : "gray.700"

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

                {/* Badge Earned */}
                <Flex
                    bg={bgColor}
                    p={6}
                    borderRadius={12}
                    flexDirection="column"
                    alignItems="center"
                    gap={3}
                    w="100%"
                >
                    <Text fontSize="xl" fontWeight="bold">
                        Badge Earned!
                    </Text>
                    <VStack>
                        <Image
                            src={require(`@assets/images/badges/${gym.badge.toLowerCase().replace(/\s+/g, '_')}.png`)}
                            w="96px"
                            h="96px"
                            fallback={<Text fontSize="4xl">🏅</Text>}
                        />
                        <Text fontSize="lg" fontWeight="bold">{gym.badge}</Text>
                    </VStack>
                </Flex>

                {/* Rewards */}
                {rewards && (
                    <Flex
                        bg={bgColor}
                        p={4}
                        borderRadius={12}
                        flexDirection="column"
                        gap={2}
                        w="100%"
                    >
                        <Text fontSize="md" fontWeight="bold" textAlign="center">
                            Rewards:
                        </Text>
                        <VStack spacing={2}>
                            {rewards.experience && (
                                <Badge colorScheme="purple" fontSize="sm" p={2}>
                                    +{rewards.experience} EXP
                                </Badge>
                            )}
                            {rewards.money && (
                                <Badge colorScheme="yellow" fontSize="sm" p={2}>
                                    +{rewards.money} 💰
                                </Badge>
                            )}
                            {rewards.ranking && (
                                <Badge colorScheme="blue" fontSize="sm" p={2}>
                                    +{rewards.ranking} Ranking Points
                                </Badge>
                            )}
                        </VStack>
                    </Flex>
                )}

                {/* Close Button */}
                <Button
                    colorScheme="green"
                    size="lg"
                    w="100%"
                    onClick={onClose}
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
