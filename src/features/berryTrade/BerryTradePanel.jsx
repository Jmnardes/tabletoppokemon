import { useContext, useState } from "react"
import {
    Box, Button, Center, Flex, Image, SimpleGrid, Text, Badge, Tooltip, Divider
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import { getBerryIcon } from "@utils/berryIcon"

import ashImg from '@assets/images/game/ash.png'
import tokenIcon from '@assets/images/game/coin.png'

export default function BerryTradePanel() {
    const {
        berries, setBerries, berryShop, player,
        berryTradeUsed, setBerryTradeUsed,
        berryPurchaseUsed, setBerryPurchaseUsed,
        emit, setLoading, handleToast, setPlayer,
    } = useContext(PlayerContext)

    const [mode, setMode] = useState('swap') // 'swap' | 'upgrade-uncommon' | 'upgrade-rare'
    const [selectedShopBerry, setSelectedShopBerry] = useState(null)
    const [selectedPlayerBerries, setSelectedPlayerBerries] = useState([])
    const { t } = useTranslation()

    const requiredCount = mode === 'swap' ? 1 : mode === 'upgrade-uncommon' ? 2 : 3

    const totalBerryCount = berries.reduce((sum, b) => sum + b.amount, 0)

    const togglePlayerBerry = (berryName) => {
        if (berryTradeUsed) return
        setSelectedPlayerBerries(prev => {
            if (prev.includes(berryName)) return prev.filter(n => n !== berryName)
            if (prev.length >= requiredCount) return prev
            return [...prev, berryName]
        })
    }

    const handleTrade = async () => {
        if (mode === 'swap') {
            if (!selectedPlayerBerries[0] || !selectedShopBerry) return
        } else {
            if (selectedPlayerBerries.length < requiredCount) return
        }

        setLoading({ loading: true, text: t('berryTrade.trading') })
        try {
            const payload = mode === 'swap'
                ? { tradeType: 'swap', givenBerryName: selectedPlayerBerries[0], receivedBerryName: selectedShopBerry }
                : { tradeType: mode, givenBerries: selectedPlayerBerries }

            const result = await emit('berry-trade', payload)
            if (result?.berries) setBerries(result.berries)
            if (result?.berryTradeUsed) setBerryTradeUsed(true)
            setSelectedPlayerBerries([])
            setSelectedShopBerry(null)
            handleToast({
                title: t('berryTrade.tradeSuccess'),
                description: t('berryTrade.tradeSuccessDesc'),
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
            })
        } catch (error) {
            handleToast({ title: t('common.error'), description: error?.message || error, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const handlePurchase = async () => {
        setLoading({ loading: true, text: t('berryTrade.purchasing') })
        try {
            const result = await emit('berry-purchase', {})
            if (result?.berries) setBerries(result.berries)
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            if (result?.berryPurchaseUsed) setBerryPurchaseUsed(true)
            handleToast({
                title: t('berryTrade.purchaseSuccess'),
                description: t('berryTrade.purchaseSuccessDesc'),
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
            })
        } catch (error) {
            handleToast({ title: t('common.error'), description: error?.message || error, status: 'error' })
        }
        setLoading({ loading: false })
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setSelectedPlayerBerries([])
        setSelectedShopBerry(null)
    }

    const commonOffers = berryShop?.commonOffers || []
    const saleBerry = berryShop?.saleBerry || null
    const tokens = player?.daycare?.token || 0

    const speechText = berryTradeUsed
        ? t('berryTrade.alreadyTraded')
        : t('berryTrade.speech')

    const canTrade = () => {
        if (berryTradeUsed) return false
        if (mode === 'swap') return selectedPlayerBerries.length === 1 && !!selectedShopBerry
        return selectedPlayerBerries.length === requiredCount
    }

    return (
        <Flex flexDir="column" flex="1" gap={2} p={2} overflow="auto" id="berry-trade-panel">
            {/* Ash NPC with speech bubble */}
            <Flex alignItems="flex-start" gap={2}>
                <Image src={ashImg} w="48px" flexShrink={0} />
                <Box
                    bg="whiteAlpha.100"
                    borderRadius="lg"
                    px={3}
                    py={2}
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                >
                    <Text fontSize="sm">{speechText}</Text>
                </Box>
            </Flex>

            {/* Mode selector */}
            <Flex gap={2} flexWrap="wrap">
                <Button size="xs" colorScheme={mode === 'swap' ? 'blue' : 'gray'} onClick={() => switchMode('swap')}>
                    {t('berryTrade.modeSwap')}
                </Button>
                <Button size="xs" colorScheme={mode === 'upgrade-uncommon' ? 'purple' : 'gray'} onClick={() => switchMode('upgrade-uncommon')}
                    isDisabled={totalBerryCount < 2}
                >
                    {t('berryTrade.modeUncommon')}
                </Button>
                <Button size="xs" colorScheme={mode === 'upgrade-rare' ? 'yellow' : 'gray'} onClick={() => switchMode('upgrade-rare')}
                    isDisabled={totalBerryCount < 3}
                >
                    {t('berryTrade.modeRare')}
                </Button>
            </Flex>

            {/* Common swap section */}
            {mode === 'swap' && (
                <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>{t('berryTrade.shopTitle')}</Text>
                    <SimpleGrid columns={3} spacing={2}>
                        {commonOffers.map((berry) => {
                            const isSelected = selectedShopBerry === berry.name
                            return (
                                <Tooltip key={berry.name} label={berry.effect.description} hasArrow>
                                    <Flex
                                        flexDir="column"
                                        alignItems="center"
                                        gap={1}
                                        p={1}
                                        borderRadius="md"
                                        border="2px solid"
                                        borderColor={isSelected ? 'green.400' : 'whiteAlpha.200'}
                                        bg={isSelected ? 'whiteAlpha.200' : 'transparent'}
                                        cursor={berryTradeUsed ? 'not-allowed' : 'pointer'}
                                        opacity={berryTradeUsed ? 0.5 : 1}
                                        onClick={() => !berryTradeUsed && setSelectedShopBerry(berry.name)}
                                        transition="all 0.15s"
                                        _hover={!berryTradeUsed ? { bg: 'whiteAlpha.100' } : {}}
                                    >
                                        <Image src={getBerryIcon(berry.type)} w="28px" h="28px" />
                                        <Text fontSize="xs" textAlign="center">{berry.name}</Text>
                                        <Badge fontSize="2xs" colorScheme="blue">{berry.effect.type.replace('resist_', '')}</Badge>
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </SimpleGrid>
                </Box>
            )}

            {/* Upgrade info */}
            {mode !== 'swap' && (
                <Box bg="whiteAlpha.100" borderRadius="md" p={2}>
                    <Text fontSize="sm">
                        {mode === 'upgrade-uncommon'
                            ? t('berryTrade.upgradeUncommonInfo')
                            : t('berryTrade.upgradeRareInfo')
                        }
                    </Text>
                    <Text fontSize="xs" color="whiteAlpha.600">
                        {t('berryTrade.selectCount', { count: requiredCount })}
                        {' — '}{t('berryTrade.selected')}: {selectedPlayerBerries.length}/{requiredCount}
                    </Text>
                </Box>
            )}

            {/* Trade button */}
            <Center>
                <Button
                    colorScheme="green"
                    size="sm"
                    isDisabled={!canTrade()}
                    onClick={handleTrade}
                >
                    {t('berryTrade.tradeButton')}
                </Button>
            </Center>

            {/* Player berries inventory */}
            <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>{t('berryTrade.yourBerries')}</Text>
                {berries.length === 0 ? (
                    <Text fontSize="xs" color="whiteAlpha.500">{t('berryTrade.noBerries')}</Text>
                ) : (
                    <SimpleGrid columns={[4, 5, 6]} spacing={1}>
                        {berries.map((berry) => {
                            const isSelected = selectedPlayerBerries.includes(berry.name)
                            return (
                                <Tooltip key={berry.name} hasArrow label={
                                    <Center flexDir="column" gap={1}>
                                        <Text fontWeight="bold">{berry.name} (x{berry.amount})</Text>
                                        <Badge fontSize="2xs" colorScheme={
                                            berry.category === 'rare' ? 'yellow' : berry.category === 'uncommon' ? 'purple' : 'blue'
                                        }>{berry.category}</Badge>
                                        <Text fontSize="xs">{berry.effect.description}</Text>
                                    </Center>
                                }>
                                    <Flex
                                        flexDir="column"
                                        alignItems="center"
                                        gap={0}
                                        p={1}
                                        borderRadius="md"
                                        border="2px solid"
                                        borderColor={isSelected ? 'orange.400' : 'whiteAlpha.200'}
                                        bg={isSelected ? 'whiteAlpha.200' : 'transparent'}
                                        cursor={berryTradeUsed ? 'not-allowed' : 'pointer'}
                                        opacity={berryTradeUsed ? 0.5 : 1}
                                        onClick={() => togglePlayerBerry(berry.name)}
                                        transition="all 0.15s"
                                        _hover={!berryTradeUsed ? { bg: 'whiteAlpha.100' } : {}}
                                    >
                                        <Image src={getBerryIcon(berry.type)} w="20px" h="20px" />
                                        <Text fontSize="2xs" textAlign="center">{berry.name}</Text>
                                        <Badge fontSize="2xs" colorScheme="purple">x{berry.amount}</Badge>
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </SimpleGrid>
                )}
            </Box>

            <Divider borderColor="whiteAlpha.300" />

            {/* Berry purchase with tokens */}
            {saleBerry && (
                <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>{t('berryTrade.saleTitle')}</Text>
                    <Flex alignItems="center" gap={3} bg="whiteAlpha.100" p={3} borderRadius="md">
                        <Flex flexDir="column" alignItems="center" gap={1}>
                            <Image src={getBerryIcon(saleBerry.type)} w="40px" h="40px" />
                            <Text fontSize="xs" fontWeight="bold">{saleBerry.name}</Text>
                            <Badge fontSize="2xs" colorScheme={
                                saleBerry.category === 'rare' ? 'yellow' : saleBerry.category === 'uncommon' ? 'purple' : 'blue'
                            }>
                                {saleBerry.category}
                            </Badge>
                        </Flex>
                        <Box flex="1">
                            <Text fontSize="xs" color="whiteAlpha.700">{saleBerry.effect.description}</Text>
                            <Flex fontSize="xs" mt={1} alignItems="center" gap={1}>
                                <Text fontSize="xs">{t('berryTrade.price')}:</Text>
                                <Badge colorScheme="green" display="flex" alignItems="center" gap={1}>
                                    <Image src={tokenIcon} w="14px" />{saleBerry.price}
                                </Badge>
                            </Flex>
                            <Text fontSize="2xs" color="whiteAlpha.500">
                                {t('berryTrade.yourTokens')}: {tokens}
                            </Text>
                        </Box>
                        <Button
                            colorScheme="teal"
                            size="sm"
                            isDisabled={berryPurchaseUsed || tokens < saleBerry.price}
                            onClick={handlePurchase}
                        >
                            {berryPurchaseUsed ? t('berryTrade.alreadyPurchased') : t('berryTrade.buyButton')}
                        </Button>
                    </Flex>
                </Box>
            )}
        </Flex>
    )
}
