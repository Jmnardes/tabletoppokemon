import { useContext, useState } from "react"
import {
    Button, Flex, Image, SimpleGrid, Text, Tooltip, Box, Badge, Divider, HStack
} from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"

import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import machineOnIcon from '@assets/images/craft/machine-on.png'
import machineBrokeIcon from '@assets/images/craft/machine-broke.png'
import machineOffIcon from '@assets/images/craft/machine-off.png'

const MAX_SLOTS = 3
const SLOT_COST = 5
const UPGRADE_COST = 5
const MAX_MACHINE_LEVEL = 3

const MACHINE_LEVELS = {
    1: { break: 15, skip: 20, pokeball: 55, greatball: 8, ultraball: 2 },
    2: { break: 12, skip: 16, pokeball: 58, greatball: 10, ultraball: 4 },
    3: { break: 9, skip: 13, pokeball: 60, greatball: 12, ultraball: 6 },
}

function MachineCard({ machine, tokens, onRepair }) {
    const isWorking = machine.status === 'working'
    const isBroken = machine.status === 'broken'

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            gap={2}
            p={3}
            borderRadius="lg"
            border="1px solid"
            borderColor={isBroken ? 'red.400' : 'green.400'}
            bg={isBroken ? 'red.900' : 'green.900'}
            opacity={isBroken ? 0.8 : 1}
        >
            <Image
                src={isBroken ? machineBrokeIcon : machineOnIcon}
                w="64px" h="64px"
                objectFit="contain"
            />

            <Text fontSize="sm" fontWeight="bold" color={isBroken ? 'red.300' : 'green.300'}>
                {isWorking ? 'Working' : 'Broken'}
            </Text>

            {isWorking && (
                <Text fontSize="xs" color="whiteAlpha.700">
                    Producing pokéballs each turn
                </Text>
            )}

            {isBroken && (
                <Tooltip label={tokens < 1 ? 'Not enough tokens' : 'Repair for 1 token'} hasArrow>
                    <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => onRepair(machine.id)}
                        isDisabled={tokens < 1}
                    >
                        <Image src={tokenIcon} w="14px" mr={1} />
                        Repair (1)
                    </Button>
                </Tooltip>
            )}
        </Flex>
    )
}

function LockedSlot({ isNext, tokens, onBuy }) {
    const canAfford = tokens >= SLOT_COST

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            gap={2}
            p={3}
            minH="100px"
            borderRadius="lg"
            border="1px dashed"
            borderColor="whiteAlpha.300"
            opacity={isNext ? 1 : 0.3}
        >
            <Image
                src={machineOffIcon}
                w="64px" h="64px"
                objectFit="contain"
                opacity={isNext ? 0.6 : 0.3}
            />
            {isNext ? (
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={onBuy}
                    isDisabled={!canAfford}
                    title={canAfford ? `Buy for ${SLOT_COST} tokens` : `Need ${SLOT_COST} tokens`}
                >
                    <Image src={tokenIcon} w="16px" mr={1} />
                    {SLOT_COST}
                </Button>
            ) : (
                <Text fontSize="xs" color="whiteAlpha.400">Locked</Text>
            )}
        </Flex>
    )
}

export default function CraftPanel() {
    const { craft, setCraft, player, setPlayer, emit, setLoading, handleToast } = useContext(PlayerContext)
    const [showNextLevel, setShowNextLevel] = useState(false)

    if (!craft) {
        return (
            <Flex flex="1" align="center" justify="center">
                <Text>Craft not available</Text>
            </Flex>
        )
    }

    const tokens = player?.daycare?.token || 0
    const machineLevel = craft.machineLevel || 1
    const rates = MACHINE_LEVELS[machineLevel] || MACHINE_LEVELS[1]
    const nextRates = MACHINE_LEVELS[machineLevel + 1]
    const isMaxLevel = machineLevel >= MAX_MACHINE_LEVEL

    const handleRepair = async (machineId) => {
        setLoading({ loading: true, text: 'Repairing...' })
        try {
            const result = await emit('craft-repair', { machineId })
            if (result?.craft) setCraft(result.craft)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleBuySlot = async () => {
        setLoading({ loading: true, text: 'Buying machine...' })
        try {
            const result = await emit('craft-buy-slot', {})
            if (result?.craft) setCraft(result.craft)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            handleToast({
                title: 'New Machine',
                description: 'A new craft machine has been added!',
                status: 'success',
                duration: 4000,
            })
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleUpgrade = async () => {
        setLoading({ loading: true, text: 'Upgrading machines...' })
        try {
            const result = await emit('craft-upgrade', {})
            if (result?.craft) setCraft(result.craft)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            handleToast({
                title: 'Machines Upgraded',
                description: `Machines upgraded to Level ${(craft.machineLevel || 1) + 1}!`,
                status: 'success',
                duration: 4000,
            })
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Craft</Text>
            <Text fontSize="small" textAlign="center" mt={1} mb={2}>
                Machines produce pokéballs each turn. They may break!
            </Text>

            {/* Machine Level Badge */}
            <Flex justify="center" mb={4}>
                <Badge
                    colorScheme={isMaxLevel ? 'yellow' : 'blue'}
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    Machine Lv. {machineLevel}
                </Badge>
            </Flex>

            <SimpleGrid columns={3} spacing={3} mb={4}>
                {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                    const machine = craft.machines[i]
                    if (machine) {
                        return (
                            <MachineCard
                                key={machine.id}
                                machine={machine}
                                tokens={tokens}
                                onRepair={handleRepair}
                            />
                        )
                    }
                    const isNext = i === craft.slots
                    return (
                        <LockedSlot
                            key={`locked-${i}`}
                            isNext={isNext}
                            tokens={tokens}
                            onBuy={handleBuySlot}
                        />
                    )
                })}
            </SimpleGrid>

            {/* Machine Info Block */}
            <Box
                border="1px solid"
                borderColor="whiteAlpha.300"
                borderRadius="lg"
                bg="gray.800"
                p={4}
                mb={4}
            >
                <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800" mb={1}>
                    ⚙ Machine Instructions
                </Text>
                <Text fontSize="2xs" color="whiteAlpha.600" mb={3}>
                    Every turn, each working machine rolls for production. Better levels improve your odds of crafting rare balls and reduce breakdowns.
                </Text>

                <Divider borderColor="whiteAlpha.200" mb={3} />

                <Text fontSize="2xs" fontWeight="bold" color="whiteAlpha.700" mb={2}>
                    Production Rates (Lv. {machineLevel})
                </Text>
                <Flex flexDir="column" gap={1}>
                    <HStack justify="space-between">
                        <HStack spacing={1}>
                            <Image src={pokeballIcon} w="14px" />
                            <Text fontSize="2xs" color="whiteAlpha.700">Pokéball</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="whiteAlpha.800" fontWeight="bold">{rates.pokeball}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.pokeball}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <HStack spacing={1}>
                            <Image src={greatballIcon} w="14px" />
                            <Text fontSize="2xs" color="whiteAlpha.700">Great Ball</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="blue.300" fontWeight="bold">{rates.greatball}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.greatball}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <HStack spacing={1}>
                            <Image src={ultraballIcon} w="14px" />
                            <Text fontSize="2xs" color="whiteAlpha.700">Ultra Ball</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="purple.300" fontWeight="bold">{rates.ultraball}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.ultraball}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <Divider borderColor="whiteAlpha.100" my={1} />
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="whiteAlpha.500">Skip (no output)</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="whiteAlpha.500">{rates.skip}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.skip}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="red.400">Break</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="red.400">{rates.break}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.break}%</Text>
                            )}
                        </HStack>
                    </HStack>
                </Flex>
            </Box>

            {/* Upgrade Button */}
            {!isMaxLevel && (
                <Flex justify="center">
                    <Box
                        onMouseEnter={() => setShowNextLevel(true)}
                        onMouseLeave={() => setShowNextLevel(false)}
                    >
                        <Tooltip
                            label={tokens < UPGRADE_COST
                                ? `Need ${UPGRADE_COST} tokens (you have ${tokens})`
                                : `Upgrade all machines to Lv. ${machineLevel + 1}`
                            }
                            hasArrow
                        >
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={handleUpgrade}
                                isDisabled={tokens < UPGRADE_COST}
                            >
                                Upgrade machines {UPGRADE_COST}
                                <Image src={tokenIcon} w="16px" ml={1} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Flex>
            )}
            {isMaxLevel && (
                <Text fontSize="xs" color="yellow.400" textAlign="center" fontWeight="bold">
                    ★ Machines at max level ★
                </Text>
            )}
        </Flex>
    )
}
