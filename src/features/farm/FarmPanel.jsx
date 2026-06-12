import { useContext, useState } from "react"
import {
    Badge, Box, Button, Center, Divider, Flex, HStack, IconButton, Image, Modal, ModalBody,
    ModalContent, ModalCloseButton, ModalHeader, ModalOverlay,
    SimpleGrid, Text, Tooltip
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import { getBerryIcon } from "@utils/berryIcon"

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import groundImg from '@assets/images/farm/ground.png'
import seedImg from '@assets/images/farm/seed.png'
import sproutImg from '@assets/images/farm/sprout.png'
import budImg from '@assets/images/farm/bud.png'
import rottenImg from '@assets/images/farm/rotten.png'
import berryIcon from '@assets/images/berries/berry.png'

const MAX_SLOTS = 6
const SEED_UPGRADE_COST = 5
const MAX_SEED_LEVEL = 3

const SEED_LEVELS = {
    1: { common: 80, uncommon: 14, rare: 6 },
    2: { common: 70, uncommon: 20, rare: 10 },
    3: { common: 60, uncommon: 26, rare: 14 },
}

const getSlotCost = (slotIndex) => 5

const getPlotImage = (plot) => {
    if (plot.status === 'rotted') return rottenImg
    if (plot.status === 'ready') return sproutImg
    if (plot.turnsLeft >= 3) return seedImg
    if (plot.turnsLeft >= 1) return budImg
    return seedImg
}

function PlotCard({ plot, onHarvest, onFertilize, onRevive, dust, tokens }) {
    const { t } = useTranslation()
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
                        {t('farm.turnsLeft', { count: plot.turnsLeft })}
                    </Text>
                    <Tooltip label={plot.fertilized ? t('farm.alreadyFertilized') : dust <= 0 ? t('farm.noDust') : t('farm.fertilize')} hasArrow>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            icon={<Image src={dustIcon} w="18px" />}
                            onClick={() => onFertilize(plot.id)}
                            isDisabled={plot.fertilized || dust <= 0}
                            opacity={plot.fertilized ? 0.4 : 1}
                            aria-label={t('farm.fertilize')}
                        />
                    </Tooltip>
                </>
            )}

            {plot.status === 'ready' && (
                <>
                    <Text fontSize="xs" color="orange.300">
                        {t('farm.turnsToHarvest', { count: plot.harvestWindow })}
                    </Text>
                    <Button
                        size="xs"
                        colorScheme="green"
                        onClick={() => onHarvest(plot.id)}
                    >
                        {t('common.harvest')}
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
                    title={tokens <= 0 ? t('farm.noTokens') : t('farm.spendTokenToRevive')}
                >
                    <Image src={tokenIcon} w="14px" mr={1} />
                    {t('farm.revive')}
                </Button>
            )}
        </Flex>
    )
}

function LockedSlot({ slotIndex, isNext, tokens, onBuy }) {
    const cost = getSlotCost(slotIndex)
    const canAfford = tokens >= cost
    const { t } = useTranslation()

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minH="120px"
            borderRadius="lg"
            opacity={isNext ? 1 : 0.3}
        >
            <Image src={groundImg} w="100px" opacity={0.4} />
            {isNext ? (
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={onBuy}
                    isDisabled={!canAfford}
                    title={canAfford ? t('farm.needTokens', {cost, current: tokens}) : t('farm.needTokens', {cost, current: tokens})}
                >
                    <Image src={tokenIcon} w="16px" mr={1} />
                    {cost}
                </Button>
            ) : (
                <Text fontSize="xs" color="whiteAlpha.400">{t('farm.locked')}</Text>
            )}
        </Flex>
    )
}

export default function FarmPanel() {
    const { farm, setFarm, player, setPlayer, setBerries, emit, setLoading, handleToast } = useContext(PlayerContext)
    const [harvestedBerry, setHarvestedBerry] = useState(null)
    const [showNextLevel, setShowNextLevel] = useState(false)
    const { t } = useTranslation()

    if (!farm) {
        return (
            <Flex flex="1" align="center" justify="center">
                <Text>{t('farm.title')}</Text>
            </Flex>
        )
    }

    const dust = player?.items?.dust || 0
    const tokens = player?.daycare?.token || 0
    const seedLevel = farm.seedLevel || 1
    const rates = SEED_LEVELS[seedLevel] || SEED_LEVELS[1]
    const nextRates = SEED_LEVELS[seedLevel + 1]
    const isMaxLevel = seedLevel >= MAX_SEED_LEVEL

    const handleHarvest = async (plotId) => {
        setLoading({ loading: true, text: t('farm.harvesting') })
        try {
            const result = await emit('farm-harvest', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.berries) setBerries(result.berries)
            if (result?.harvestedBerry) {
                setHarvestedBerry(result.harvestedBerry)
            }
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleFertilize = async (plotId) => {
        setLoading({ loading: true, text: t('farm.fertilizing') })
        try {
            const result = await emit('farm-fertilize', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.items) setPlayer(prev => ({ ...prev, items: result.items }))
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleRevive = async (plotId) => {
        setLoading({ loading: true, text: t('farm.revivingPlot') })
        try {
            const result = await emit('farm-revive', { plotId })
            if (result?.farm) setFarm(result.farm)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleBuySlot = async () => {
        setLoading({ loading: true, text: t('farm.buyingPlot') })
        try {
            const result = await emit('farm-buy-slot', {})
            if (result?.farm) setFarm(result.farm)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            handleToast({
                title: t('toast.newPlot'),
                description: t('toast.newPlotDesc'),
                status: 'success',
                duration: 4000,
            })
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handleUpgrade = async () => {
        setLoading({ loading: true, text: t('farm.upgradingSeeds') })
        try {
            const result = await emit('farm-upgrade', {})
            if (result?.farm) setFarm(result.farm)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            handleToast({
                title: t('toast.seedsUpgraded'),
                description: t('toast.seedsUpgradedDesc', { level: (farm.seedLevel || 1) + 1 }),
                status: 'success',
                duration: 4000,
            })
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: 'error' })
        }
        setLoading({ loading: false })
    }

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">{t('farm.title')}</Text>
            <Text fontSize="small" textAlign="center" mt={1} mb={2}>
                {t('farm.subtitle')}
            </Text>

            {/* Seed Level Badge */}
            <Flex justify="center" mb={4}>
                <Badge
                    colorScheme={isMaxLevel ? 'yellow' : 'green'}
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {t('farm.seedLevel', { level: seedLevel })}
                </Badge>
            </Flex>

            <SimpleGrid columns={3} spacing={3} mb={4}>
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

            {/* Farm Instructions Block */}
            <Box
                border="1px solid"
                borderColor="whiteAlpha.300"
                borderRadius="lg"
                bg="gray.800"
                p={4}
                mb={4}
            >
                <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800" mb={1}>
                    {t('farm.farmGuide')}
                </Text>
                <Text fontSize="2xs" color="whiteAlpha.600" mb={3}>
                    {t('farm.farmGuideText')}
                </Text>

                <Divider borderColor="whiteAlpha.200" mb={3} />

                <Text fontSize="2xs" fontWeight="bold" color="whiteAlpha.700" mb={2}>
                    {t('farm.berryChances', { level: seedLevel })}
                </Text>
                <Flex flexDir="column" gap={1}>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="whiteAlpha.700">{t('farm.common')}</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="whiteAlpha.800" fontWeight="bold">{rates.common}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.common}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="blue.300">{t('farm.uncommon')}</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="blue.300" fontWeight="bold">{rates.uncommon}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.uncommon}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="purple.300">{t('farm.rare')}</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="purple.300" fontWeight="bold">{rates.rare}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.rare}%</Text>
                            )}
                        </HStack>
                    </HStack>
                </Flex>
            </Box>

            {/* Upgrade Button */}
            {!isMaxLevel && (
                <Flex justify="center" mb={4}>
                    <Box
                        onMouseEnter={() => setShowNextLevel(true)}
                        onMouseLeave={() => setShowNextLevel(false)}
                    >
                        <Tooltip
                            label={tokens < SEED_UPGRADE_COST
                                ? t('farm.needTokens', { cost: SEED_UPGRADE_COST, current: tokens })
                                : t('farm.upgradeSeeds', { level: seedLevel + 1 })
                            }
                            hasArrow
                        >
                            <Button
                                colorScheme="green"
                                size="sm"
                                onClick={handleUpgrade}
                                isDisabled={tokens < SEED_UPGRADE_COST}
                            >
                                Upgrade seeds {SEED_UPGRADE_COST}
                                <Image src={tokenIcon} w="16px" ml={1} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Flex>
            )}
            {isMaxLevel && (
                <Text fontSize="xs" color="yellow.400" textAlign="center" fontWeight="bold" mb={4}>
                    {t('farm.maxLevel')}
                </Text>
            )}

            {harvestedBerry && (
                <Modal isOpen onClose={() => setHarvestedBerry(null)} isCentered size="sm">
                    <ModalOverlay bg="blackAlpha.600" />
                    <ModalContent>
                        <ModalHeader textAlign="center">{t('farm.berryHarvested')}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Center flexDir="column" gap={3}>
                                <Image
                                    src={getBerryIcon(harvestedBerry.type)}
                                    fallbackSrc={berryIcon}
                                    w="64px"
                                />
                                <Text fontSize="lg" fontWeight="bold">
                                    {t('farm.berryName', { name: harvestedBerry.name })}
                                </Text>
                                <Text fontSize="sm" color="gray.300" textAlign="center">
                                    {harvestedBerry.effect?.description}
                                </Text>
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    )
}
