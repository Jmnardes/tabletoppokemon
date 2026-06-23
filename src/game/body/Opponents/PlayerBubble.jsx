import { Badge, Box, Center, Flex, Image, Text, Tooltip, keyframes, useColorMode } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/game/pokeball.png'
import PLAYER_COLORS from "@constants/playerColors"

const pulseKeyframes = keyframes`
    0%, 100% { transform: scale(1) }
    50% { transform: scale(1.02) }
`

export default function PlayerBubble({ player, isExpanded, onClick, playerCount = 0, readyCount = 0 }) {
    const { colorMode } = useColorMode()
    const { t } = useTranslation()
    const light = colorMode === 'light'

    const isReady = player.turnReady
    const bgColor = isReady
        ? (light ? 'green.100' : 'green.900')
        : (light ? 'white' : 'gray.700')
    const borderColor = PLAYER_COLORS[player.colorIndex] || (player.isPlayer
        ? (light ? 'blue.400' : 'blue.300')
        : (light ? 'gray.300' : 'gray.500'))

    const shortName = player.status?.trainerName?.slice(0, 4) || '???'
    const isLastRemaining = !isReady && readyCount === playerCount - 1
    const speedBonus = isReady && player.speedPosition > 0 && playerCount > 0
        ? playerCount - player.speedPosition + 1
        : isLastRemaining ? 1 : null

    return (
        <Flex
            direction="column"
            align="center"
            position="relative"
            cursor="pointer"
            onClick={onClick}
            animation={!isReady ? `${pulseKeyframes} 2.5s ease-in-out infinite` : undefined}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            transform={isExpanded ? 'scale(1.1)' : 'scale(0.85)'}
            _hover={{ transform: 'scale(1)', boxShadow: 'lg', zIndex: 10 }}
        >
            {/* Speed bonus badge */}
            {speedBonus && (
                <Tooltip label={t('lobby.speedBonusTooltip')} fontSize="xs" hasArrow placement="top">
                    <Badge
                        colorScheme="yellow"
                        borderRadius="full"
                        fontSize="2xs"
                        px={1.5}
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        mb={0.5}
                        cursor="default"
                    >
                        +{speedBonus}
                        <Image src={tokenIcon} w="10px" />
                    </Badge>
                </Tooltip>
            )}

            {/* Status label */}
            <Badge
                colorScheme={isReady ? 'green' : 'purple'}
                fontSize="2xs"
                borderRadius="full"
                px={2}
                mb={1}
                textTransform="uppercase"
            >
                {isReady ? t('lobby.ready') : t('lobby.playing')}
            </Badge>

            {/* Bubble body */}
            <Flex
                direction="column"
                align="center"
                bg={bgColor}
                border="2px solid"
                borderColor={borderColor}
                borderRadius="10px"
                px={2}
                py={1.5}
                minW="50px"
                position="relative"
            >
                <Text fontSize="2xs" fontWeight="bold" color={light ? 'gray.700' : 'white'}>
                    {shortName}
                </Text>
                <Flex gap={1.5} mt={0.5}>
                    <Center gap={0.5}>
                        <Image src={pokeballIcon} w="10px" />
                        <Text fontSize="2xs" color={light ? 'gray.600' : 'gray.300'}>{player.status?.catches || 0}</Text>
                    </Center>
                    <Center gap={0.5}>
                        <Image src={tokenIcon} w="10px" />
                        <Text fontSize="2xs" color={light ? 'gray.600' : 'gray.300'}>{player.daycareToken ?? 0}</Text>
                    </Center>
                </Flex>
            </Flex>

            {/* Bubble pointer (triangle) */}
            <Center>
                <Box
                    w={0}
                    h={0}
                    borderLeft="5px solid transparent"
                    borderRight="5px solid transparent"
                    borderTop="5px solid"
                    borderTopColor={borderColor}
                />
            </Center>
        </Flex>
    )
}
