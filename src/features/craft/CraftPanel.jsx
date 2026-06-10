import { useContext } from "react"
import {
    Button, Flex, Image, SimpleGrid, Text, Tooltip
} from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"

import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'

const MAX_SLOTS = 3
const SLOT_COST = 5

const ballIcons = {
    pokeball: pokeballIcon,
    greatball: greatballIcon,
    ultraball: ultraballIcon,
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
            <Flex gap={1}>
                {Object.entries(ballIcons).map(([type, icon]) => (
                    <Image key={type} src={icon} w="24px" />
                ))}
            </Flex>

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
            minH="100px"
            borderRadius="lg"
            border="1px dashed"
            borderColor="whiteAlpha.300"
            opacity={isNext ? 1 : 0.3}
        >
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

    if (!craft) {
        return (
            <Flex flex="1" align="center" justify="center">
                <Text>Craft not available</Text>
            </Flex>
        )
    }

    const tokens = player?.daycare?.token || 0

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

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Craft</Text>
            <Text fontSize="small" textAlign="center" mt={1} mb={4}>
                Machines produce pokéballs each turn. They may break!
            </Text>

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

            <Flex flexDir="column" gap={1} mt={2}>
                <Text fontSize="xs" color="whiteAlpha.600" textAlign="center">
                    Per turn: 70% Pokéball · 10% Great Ball · 5% Ultra Ball · 10% skip · 5% break
                </Text>
            </Flex>
        </Flex>
    )
}
