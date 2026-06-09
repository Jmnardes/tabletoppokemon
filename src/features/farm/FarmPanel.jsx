import { useContext } from "react"
import { Button, Flex, IconButton, Image, SimpleGrid, Text, Tooltip } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import seedImg from '@assets/images/farm/seed.png'
import sproutImg from '@assets/images/farm/sprout.png'
import budImg from '@assets/images/farm/bud.png'
import rottenImg from '@assets/images/farm/rotten.png'

const MAX_SLOTS = 6

const getSlotCost = (slotIndex) => 2 * (slotIndex - 1)

const getPlotImage = (plot) => {
    if (plot.status === 'rotted') return rottenImg
    if (plot.status === 'ready') return budImg
    if (plot.turnsLeft >= 3) return seedImg
    if (plot.turnsLeft >= 2) return sproutImg
    return budImg
}

function PlotCard({ plot, onHarvest, onFertilize, onRevive, dust, tokens }) {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            gap={1}
        >
            <Image src={getPlotImage(plot)} w="100px" />

            {plot.status === 'growing' && (
                <>
                    <Text fontSize="xs">
                        {plot.turnsLeft} turn{plot.turnsLeft !== 1 ? 's' : ''} left
                    </Text>
                    <Tooltip label={plot.fertilized ? 'Already fertilized' : dust <= 0 ? 'No dust' : 'Fertilize'} hasArrow>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            icon={<Image src={dustIcon} w="18px" />}
                            onClick={() => onFertilize(plot.id)}
                            isDisabled={plot.fertilized || dust <= 0}
                            opacity={plot.fertilized ? 0.4 : 1}
                            aria-label="Fertilize"
                        />
                    </Tooltip>
                </>
            )}

            {plot.status === 'ready' && (
                <>
                    <Text fontSize="xs" color="orange.300">
                        {plot.harvestWindow} turn{plot.harvestWindow !== 1 ? 's' : ''} to harvest
                    </Text>
                    <Button
                        size="xs"
                        colorScheme="green"
                        onClick={() => onHarvest(plot.id)}
                    >
                        Harvest
                    </Button>
                </>
            )}

            {plot.status === 'rotted' && (
                <Button
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => onRevive(plot.id)}
                    isDisabled={tokens <= 0}
                    title={tokens <= 0 ? 'No tokens' : 'Spend 1 token to revive'}
                >
                    <Image src={tokenIcon} w="14px" mr={1} />
                    Revive
                </Button>
            )}
        </Flex>
    )
}

function LockedSlot({ slotIndex, isNext, tokens, onBuy }) {
    const cost = getSlotCost(slotIndex)
    const canAfford = tokens >= cost

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minH="120px"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor={isNext ? 'blue.400' : 'whiteAlpha.200'}
            borderRadius="lg"
            opacity={isNext ? 1 : 0.3}
        >
            {isNext ? (
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={onBuy}
                    isDisabled={!canAfford}
                    title={canAfford ? `Buy for ${cost} tokens` : `Need ${cost} tokens`}
                >
                    <Image src={tokenIcon} w="16px" mr={1} />
                    {cost}
                </Button>
            ) : (
                <Text fontSize="xs" color="whiteAlpha.400">Locked</Text>
            )}
        </Flex>
    )
}

export default function FarmPanel() {
    const { farm, setFarm, player, setPlayer, setBerries, emit, setLoading, handleToast } = useContext(PlayerContext)

    if (!farm) {
        return (
            <Flex flex="1" align="center" justify="center">
                <Text>Farm not available</Text>
            </Flex>
        )
    }

    const dust = player?.items?.dust || 0
    const tokens = player?.daycare?.token || 0

    const handleHarvest = async (plotId) => {
        setLoading({ loading: true, text: 'Harvesting...' })
        try {
            const result = await emit('farm-harvest', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.berries) setBerries(result.berries)
            if (result?.harvestedBerry) {
                handleToast({
                    title: result.harvestedBerry.name || 'Berry',
                    description: 'You harvested a berry!',
                    status: 'success',
                    duration: 4000,
                })
            }
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleFertilize = async (plotId) => {
        setLoading({ loading: true, text: 'Fertilizing...' })
        try {
            const result = await emit('farm-fertilize', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.items) setPlayer(prev => ({ ...prev, items: result.items }))
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleRevive = async (plotId) => {
        setLoading({ loading: true, text: 'Reviving plot...' })
        try {
            const result = await emit('farm-revive', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
        } catch (error) {
            handleToast({ title: 'Error', description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleBuySlot = async () => {
        setLoading({ loading: true, text: 'Buying plot...' })
        try {
            const result = await emit('farm-buy-slot', {})
            if (result?.farm) setFarm(result.farm)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            handleToast({
                title: 'New Plot',
                description: 'A new plot has been added to your farm!',
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
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Berry Farm</Text>
            <Text fontSize="small" textAlign="center" mt={1} mb={4}>
                Grow berries over time. Harvest them before they rot!
            </Text>

            <SimpleGrid columns={2} spacing={3} mb={4}>
                {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                    const plot = farm.plots[i]
                    if (plot) {
                        return (
                            <PlotCard
                                key={plot.id}
                                plot={plot}
                                onHarvest={handleHarvest}
                                onFertilize={handleFertilize}
                                onRevive={handleRevive}
                                dust={dust}
                                tokens={tokens}
                            />
                        )
                    }
                    const isNext = i === farm.slots
                    return (
                        <LockedSlot
                            key={`locked-${i}`}
                            slotIndex={i + 1}
                            isNext={isNext}
                            tokens={tokens}
                            onBuy={handleBuySlot}
                        />
                    )
                })}
            </SimpleGrid>
        </Flex>
    )
}
