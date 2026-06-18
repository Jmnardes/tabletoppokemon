import { useContext, useState, useCallback } from "react"
import { Badge, Button, Center, Flex, Image, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"

import DayCareShop from "./DayCareShop"
import tokenIcon from '@assets/images/game/coin.png'

export default function DayCarePanel() {
    const { t } = useTranslation()
    const { getBoxPokemons, setLoading, emit, syncBoxFromServer, setPlayer, setDaycarePokes, handleToast, player } = useContext(PlayerContext)
    const [selectedIds, setSelectedIds] = useState([])

    const boxPokemons = getBoxPokemons()

    const toggleSelect = useCallback((poke) => {
        setSelectedIds(prev =>
            prev.includes(poke.id) ? prev.filter(id => id !== poke.id) : [...prev, poke.id]
        )
    }, [])

    const totalTokens = selectedIds.reduce((sum, id) => {
        const poke = boxPokemons.find(p => p.id === id)
        return sum + ((poke?.rarity?.rarity ?? 0) + 1)
    }, 0)

    const handleBatchRelease = async () => {
        if (selectedIds.length === 0) return
        setLoading({ loading: true, text: t('daycare.releasing') })

        try {
            const result = await emit('daycare-pokemon-release', { pokeIds: selectedIds })

            if (result) {
                syncBoxFromServer(result.pokeBox)
                if (result.daycare) {
                    setPlayer(prev => ({ ...prev, daycare: result.daycare }))
                }
                const releasedPokes = boxPokemons.filter(p => selectedIds.includes(p.id))
                setDaycarePokes(prev => [...prev, ...releasedPokes])

                handleToast({
                    title: t('daycare.tokenTitle'),
                    description: t('daycare.releaseSuccess', { count: result.count, tokens: result.totalTokens }),
                    status: 'info',
                    duration: 6000,
                    icon: <Image src={tokenIcon} w={12} />
                })
            }
            setSelectedIds([])
            setLoading({ loading: false })
        } catch (error) {
            setLoading({ loading: false })
            handleToast({
                id: 'release-pokemon-error',
                title: t('daycare.releaseError'),
                description: error.message || t('daycare.connectionError'),
                status: 'error',
                position: 'top'
            })
        }
    }

    return (
        <Flex flex="1" direction="row" h="100%" overflow="hidden" data-tutorial="daycare-panel">
            {/* Left side — Title, description, pokemon selection */}
            <Flex flex="1" flexDir="column" p={4} overflowY="auto" minW="200px">
                <Text fontSize="lg" fontWeight="bold" textAlign="center">{t('daycare.title')}</Text>
                <Text fontSize="small" textAlign="center" mt={2} color="gray.400">{t('daycare.subtitle')}</Text>

                {/* Tokens display */}
                <Center mt={4} gap={2}>
                    <Text fontSize="xl" fontWeight="bold">{player.daycare?.token ?? 0}x</Text>
                    <Image src={tokenIcon} alt="Daycare Token" w={10} />
                </Center>

                {boxPokemons.length === 0 ? (
                    <Center flex="1" mt={6}>
                        <Badge colorScheme="yellow" fontSize="sm" p={3} borderRadius={8} textAlign="center">
                            {t('daycare.noPokemon')}
                        </Badge>
                    </Center>
                ) : (
                    <>
                        <Text fontSize="xs" color="gray.400" textAlign="center" mt={4}>{t('daycare.selectToRelease')}</Text>
                        <Flex gap={2} flexWrap="wrap" justify="center" mt={2} flex="1" overflowY="auto">
                            {boxPokemons.map(poke => {
                                const isSelected = selectedIds.includes(poke.id)
                                const tokens = (poke.rarity?.rarity ?? 0) + 1
                                return (
                                    <Center
                                        key={poke.id}
                                        flexDir="column"
                                        w={16}
                                        minW={16}
                                        bg={isSelected ? "green.700" : "gray.600"}
                                        border="2px solid"
                                        borderColor={isSelected ? "green.400" : "transparent"}
                                        borderRadius={8}
                                        overflow="hidden"
                                        cursor="pointer"
                                        _hover={{ opacity: 0.8 }}
                                        onClick={() => toggleSelect(poke)}
                                        transition="all 0.15s"
                                    >
                                        <Image
                                            w={16}
                                            h={12}
                                            src={poke.sprites?.front}
                                            draggable={false}
                                        />
                                        <Badge fontSize="2xs" colorScheme={isSelected ? "green" : "gray"}>
                                            +{tokens} <Image src={tokenIcon} w={3} display="inline" />
                                        </Badge>
                                    </Center>
                                )
                            })}
                        </Flex>

                        {selectedIds.length > 0 && (
                            <Center mt={3} flexDir="column" gap={1}>
                                <Text fontSize="xs" color="green.300">
                                    {t('daycare.selectedCount', { count: selectedIds.length, tokens: totalTokens })}
                                </Text>
                                <Button colorScheme="green" size="md" onClick={handleBatchRelease}>
                                    {t('daycare.releaseBtn')}
                                </Button>
                            </Center>
                        )}
                    </>
                )}
            </Flex>

            {/* Right side — Shop (full height) */}
            <Flex flexDir="column" overflowY="auto" minW="280px" borderLeft="1px solid" borderColor="whiteAlpha.200">
                <DayCareShop />
            </Flex>
        </Flex>
    )
}
