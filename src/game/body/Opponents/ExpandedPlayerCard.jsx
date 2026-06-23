import { Box, Center, CloseButton, Divider, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"
import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/game/pokeball.png'
import crownIcon from '@assets/images/game/crown.png'
import stepsIcon from '@assets/images/game/direction.png'
import PLAYER_COLORS from "@constants/playerColors"
import AugmentData from "@game/modals/Augments/AugmentData"
import { augmentColor } from "@utils"

export default function ExpandedPlayerCard({ player, onClose }) {
    const { colorMode } = useColorMode()
    const light = colorMode === 'light'

    const bgColor = light ? 'white' : 'gray.750'
    const borderColor = PLAYER_COLORS[player.colorIndex] || (player.isPlayer
        ? (light ? 'blue.400' : 'blue.300')
        : (light ? 'gray.300' : 'gray.500'))

    const trainerName = player.status?.trainerName || '???'
    const augments = player.augments || []
    const lastTeam = player.lastTeam || []

    return (
        <Box
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <Box
                bg={bgColor}
                border="2px solid"
                borderColor={borderColor}
                borderRadius="16px"
                px={6}
                py={4}
                minW="220px"
                maxW="300px"
                position="relative"
                boxShadow="xl"
            >
                <CloseButton
                    position="absolute"
                    top={2}
                    right={2}
                    size="sm"
                    onClick={onClose}
                />

                <Text fontSize="md" fontWeight="bold" textAlign="center" mb={3} color={light ? 'gray.800' : 'white'}>
                    {trainerName}
                </Text>

                <Flex direction="column" gap={2}>
                    <StatRow icon={crownIcon} label="Badges" value={player.status?.badges || 0} light={light} />
                    <StatRow icon={pokeballIcon} label="Catches" value={player.status?.catches || 0} light={light} />
                    <StatRow icon={tokenIcon} label="Tokens" value={player.daycareToken ?? 0} light={light} />
                    <StatRow icon={stepsIcon} label="Journey" value={`Lv.${player.journeyLevel ?? 1} - ${player.journeyProgress ?? 0}`} light={light} />
                </Flex>

                {/* Team Section */}
                {lastTeam.length > 0 && (
                    <>
                        <Divider my={3} />
                        <Flex justify="center" gap={1} flexWrap="wrap">
                            {lastTeam.map((poke, i) => (
                                <Tooltip key={i} label={`${poke.name} Lv.${poke.level}${poke.shiny ? ' ★' : ''}`} fontSize="xs">
                                    <Center
                                        w="36px" h="36px"
                                        borderRadius={6}
                                        bg={light ? 'gray.100' : 'gray.700'}
                                        position="relative"
                                    >
                                        <Image
                                            src={poke.sprite}
                                            w="28px" h="28px"
                                            sx={{ imageRendering: 'pixelated' }}
                                            fallback={<Text fontSize="xs">?</Text>}
                                        />
                                        {poke.shiny && (
                                            <Text position="absolute" top="-2px" right="0" fontSize="2xs" color="yellow.400">★</Text>
                                        )}
                                    </Center>
                                </Tooltip>
                            ))}
                        </Flex>
                    </>
                )}

                {/* Augments Section */}
                {augments.length > 0 && (
                    <>
                        <Divider my={3} />
                        <Flex direction="column" gap={1.5}>
                            {augments.map((augment, i) => (
                                <Box
                                    key={i}
                                    bg={augmentColor(augment.rarity)}
                                    borderRadius={6}
                                    px={3}
                                    py={2}
                                >
                                    <Text fontSize="2xs" fontWeight="bold" color="white" textAlign="center">
                                        {augment.name}
                                    </Text>
                                    <Text fontSize="3xs" color="whiteAlpha.800" textAlign="center" mt={0.5}>
                                        {augment.description}
                                    </Text>
                                    <Center mt={1}>
                                        <AugmentData augment={augment} />
                                    </Center>
                                </Box>
                            ))}
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    )
}

function StatRow({ icon, label, value, light }) {
    return (
        <Flex align="center" justify="space-between">
            <Center gap={2}>
                <Image src={icon} w="16px" />
                <Text fontSize="xs" color={light ? 'gray.600' : 'gray.400'}>{label}</Text>
            </Center>
            <Text fontSize="sm" fontWeight="bold" color={light ? 'gray.800' : 'white'}>{value}</Text>
        </Flex>
    )
}
