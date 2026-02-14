import { useContext } from "react";
import { Badge, Center, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@Contexts/PlayerContext";

import { FaTrophy } from "react-icons/fa";
import starIcon from '@assets/images/game/star.png'

export default function Objectives() {
    const { achievements } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"
    const hiddenColor = colorMode === 'light' ? "gray.400" : "gray.600"

    const AchievementItem = ({ achievement }) => {
        const isHidden = achievement.hidden

        if (isHidden) {
            return (
                <Flex 
                    py={3} 
                    w="full" 
                    direction="column" 
                    alignItems="center"
                    opacity={0.6}
                >
                    <Flex alignItems="center" gap={2}>
                        <FaTrophy size={16} color={hiddenColor} />
                        <Text fontSize="sm" color={hiddenColor} fontStyle="italic">
                            ?????
                        </Text>
                    </Flex>
                </Flex>
            )
        }

        return (
            <Tooltip label={achievement.message} placement="top" hasArrow>
                <Flex py={3} w="full" direction="column">
                    <Flex alignItems="center" gap={2} w="full">
                        <FaTrophy size={16} color="gold" />
                        <Flex direction="column" flex={1}>
                            <Text fontSize="xs" fontWeight="medium">
                                {achievement.label}
                            </Text>
                            <Flex alignItems="center" gap={1} mt={1}>
                                <Text fontSize="xx-small" color="gray.500">
                                    Reward: +{achievement.reward || 15}
                                </Text>
                                <Image src={starIcon} w={3} h={3} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Tooltip>
        )
    }

    return (
        <Flex
            h="full" 
            w="full"
            backgroundColor={bgColor}
            borderRadius={8}
            direction="column"
            justifyContent="space-between"
        >
            <Badge textAlign="center" w="full" py={4}>
                Objectives
            </Badge>
            
            <Center flexDir="column" px={4} py={2}>
                <Flex alignItems="center" gap={2} mb={4}>
                    <Text fontSize="sm" fontWeight="bold">
                        +{achievements?.[0]?.reward || 15}
                    </Text>
                    <Image src={starIcon} w={5} h={5} />
                </Flex>

                {achievements && achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                        <AchievementItem key={achievement.id || index} achievement={achievement} />
                    ))
                ) : (
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                        No objectives available
                    </Text>
                )}
            </Center>
        </Flex>
    )
}
