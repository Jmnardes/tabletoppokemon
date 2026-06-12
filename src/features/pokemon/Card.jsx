import { useContext, useEffect, useState } from "react"
import { Flex, Image, Text, Center, Kbd, Tooltip, useColorMode } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { stringToUpperCase, typeColor, pokemonNature } from '@utils'
import { Heart, Swords, Shield, Zap, Crosshair, Sparkles } from 'lucide-react'
import PlayerContext from "@context/PlayerContext"

import PokeStats from "./PokeStats"
import Types from "@features/elements/Types"
import CardTitle from "./CardTitle"

import { PokeRarity } from "./PokemonRarity"
import AppliedItems from "./AppliedItems"
import ChanceToLevelUp from "./ChanceToLevelUp"

function Card({ poke, tooltip, bag, isCaptured, challenge, size }) {
    const { moveToBox } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const effectiveSize = size || (isCaptured || challenge ? 'M' : (tooltip ? 'S' : 'L'))
    const isCompact = effectiveSize === 'M' || effectiveSize === 'S'

    const spriteW = { L: 36, M: 28, S: 20 }[effectiveSize]
    const showExtras = effectiveSize === 'L'

    const statLabels = { hp: t('pokemon.health'), atk: t('pokemon.attack'), def: t('pokemon.defense'), evs: t('pokemon.evasion'), acc: t('pokemon.accuracy'), crt: t('pokemon.critical') }
    const statIcons = { hp: <Heart size={14} fill="currentColor" />, atk: <Swords size={14} />, def: <Shield size={14} fill="currentColor" />, evs: <Zap size={14} fill="currentColor" />, acc: <Crosshair size={14} />, crt: <Sparkles size={14} fill="currentColor" /> }
    const natureData = pokemonNature[poke.nature]

    const handleBackgroundColor = (poke) => {
        if (poke.shiny) {
            return `linear-gradient(145deg, ${colorByType} 35%, #d1d1d1 50%, ${colorByType} 65%)`
        }
        return colorMode === 'light' ? 'whiteAlpha.900' : 'gray.600'
    }

    useEffect(() => {
        let color = typeColor(poke.types)
        setColorByType(color)
    }, [poke])

    const cardBaseProps = {
        alignItems: "center",
        flexDirection: "column",
        border: `2px solid ${colorByType}`,
        borderRadius: 8,
        pt: 1,
        pb: 0,
        px: 0,
        backgroundColor: tooltip && colorByType,
        background: handleBackgroundColor(poke),
        shadow: "dark-lg",
    }

    const renderCardContent = () => (
        <Flex flexDirection="column" position="relative" px={2} w="100%">
            {/* Top row: Level + Name */}
            <Flex alignItems="center" justifyContent="space-between" w="100%" mt={1}>
                <Tooltip borderRadius={8} label={t('pokemon.levelDesc')}>
                    <Flex
                        h={6}
                        w={6}
                        borderRadius={4}
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        fontSize="xs"
                        backgroundColor={colorByType}
                    >
                        {poke.level}
                    </Flex>
                </Tooltip>
                <CardTitle poke={poke} />
                <Flex w={6} />
            </Flex>

            {/* Sprite + Info */}
            <Flex alignItems="center" my={1} gap={2} w="100%">
                <Center flex={1}>
                    <Image
                        w={spriteW}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.main}
                        fallbackSrc={poke.sprites?.front}
                        sx={{ imageRendering: 'pixelated' }}
                    />
                </Center>
                {showExtras && (
                    <Flex flex={1} flexDir="column" gap={1} alignItems="center" justifyContent="center">
                        <Tooltip borderRadius={8} label={
                            <Flex flexDir="column" alignItems="center" p={1}>
                                <Text fontWeight="bold">{t('pokemon.rarity')}</Text>
                                <Text fontSize="xs">{t('pokemon.rarityDesc')}</Text>
                            </Flex>
                        }>
                            <Flex><PokeRarity rarity={poke.rarity.rarity} /></Flex>
                        </Tooltip>
                        <Tooltip borderRadius={8} label={
                            <Flex flexDir="column" alignItems="center" p={1}>
                                <Text fontWeight="bold">{t('pokemon.nature')}</Text>
                                {natureData?.increase && <Flex alignItems="center" gap={1} color="#22c55e">{statIcons[natureData.increase]}<Text fontSize="xs">{statLabels[natureData.increase]}</Text></Flex>}
                                {natureData?.decrease && <Flex alignItems="center" gap={1} color="#ef4444">{statIcons[natureData.decrease]}<Text fontSize="xs">{statLabels[natureData.decrease]}</Text></Flex>}
                            </Flex>
                        }>
                            <Kbd px={2} py={0.5} fontSize="xs" fontWeight="bold">
                                {stringToUpperCase(poke.nature)}
                            </Kbd>
                        </Tooltip>
                        <Types types={poke.types} w={5} h={5} elementTable />
                    </Flex>
                )}
            </Flex>

            {/* Stats */}
            {showExtras && <PokeStats poke={poke} />}
            {isCompact && <PokeStats poke={poke} isMini />}

            {showExtras && (
                <>
                    <AppliedItems poke={poke} />

                    <ChanceToLevelUp selectedPokemon={poke} />
                </>
            )}

            {tooltip && (
                <Center justifyContent="space-between">
                    <Text my={2} fontWeight="bold">
                        {stringToUpperCase(poke.nature)}
                    </Text>
                    <Types types={poke.types} w={6} h={6} />
                </Center>
            )}
        </Flex>
    )

    return (
        <Flex
            {...cardBaseProps}
            _hover={bag && {
                backgroundColor: `${colorByType}70`,
                cursor: 'pointer'
            }}
            onClick={() => {
                if(!bag) return
                moveToBox(poke.id)
            }}
        >
            {renderCardContent()}
        </Flex>
    )    
}

export default Card