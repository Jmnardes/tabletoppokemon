import { Card } from "@chakra-ui/card"
import { useColorMode } from "@chakra-ui/color-mode"
import { Image } from "@chakra-ui/image"
import { Badge, Center, Flex, Text, Tooltip } from "@chakra-ui/react"
import crownIcon from '@assets/images/game/crown.png'
import pokeballIcon from '@assets/images/game/pokeball.png'
import stepsIcon from '@assets/images/game/direction.png'
import tokenIcon from '@assets/images/game/coin.png'
import DisconnectedIcon from "@components/Icons/DisconnectedIcon"

export default function OpponentCard({ opponent, inFront = false, playerCount = 0 }) {
    const { colorMode } = useColorMode()

    const light = colorMode === 'light'

    const getBackgroundColor = () => {
        if (!opponent.online) return 'transparent'
        if (opponent.turnReady) return light ? 'green.200' : 'green.800'
        return light ? 'gray.200' : 'gray.650'
    }

    const bgColor = getBackgroundColor()
    const borderStyle = opponent.isPlayer
        ? light ? "2px solid #3182ce" : "2px solid #63b3ed"
        : opponent.online ? undefined : "4px solid red"

    const shortName = opponent.status.trainerName?.slice(0, 3) || '???'
    const speedBonus = opponent.turnReady && opponent.speedPosition && playerCount > 0
        ? playerCount - opponent.speedPosition + 1
        : null

    return (
        <Tooltip label={opponent.status.trainerName} placement="left" hasArrow>
            <Card
                backgroundColor={bgColor}
                padding="0.5rem"
                borderRadius={8}
                gap="0.25rem"
                border={borderStyle}
                zIndex={inFront ? '2' : 'auto'}
                minW={"80px"}
                align="center"
                position="relative"
            >
                {speedBonus && (
                    <Badge
                        position="absolute"
                        top="-10px"
                        right="-10px"
                        colorScheme="yellow"
                        borderRadius="full"
                        fontSize="xs"
                        px={2}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        +{speedBonus}
                        <Image src={tokenIcon} w="12px" />
                    </Badge>
                )}
                <Text fontSize="xs" fontWeight="bold" textAlign="center">
                    {shortName}
                </Text>
                {opponent.online ? (
                    <Flex direction="column" align="center" gap={1}>
                        <Flex alignItems="center">
                            <Image src={crownIcon} w="14px" />
                            <Text fontSize="2xs" ml={1}>{opponent.status.badges || 0}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Image src={pokeballIcon} w="14px" />
                            <Text fontSize="2xs" ml={1}>{opponent.status.catches || 0}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Image src={stepsIcon} w="14px" />
                            <Text fontSize="2xs" ml={1}>{opponent.journeyLevel ?? 1} - {opponent.journeyProgress ?? 0}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Image src={tokenIcon} w="14px" />
                            <Text fontSize="2xs" ml={1}>{opponent.daycareToken ?? 0}</Text>
                        </Flex>
                    </Flex>
                ) : (
                    <Center>
                        <DisconnectedIcon />
                    </Center>
                )}
            </Card>
        </Tooltip>
    )
}
