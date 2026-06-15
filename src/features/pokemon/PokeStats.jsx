import { Flex, Grid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Heart, Swords, Shield, Zap, Crosshair, Sparkles, Star, ArrowBigUp, ArrowBigDown } from 'lucide-react'
import { pokemonNature } from "@utils";

function PokeStats({ poke, isMini, hideIndicators, columns: columnsProp }) {
    const { t } = useTranslation()
    const iconSize = isMini ? 14 : 16
    const indicatorSize = isMini ? 10 : 12
    const statFontSize = isMini ? '2xs' : '9px'
    const separatorFontSize = isMini ? '7px' : '8px'

    const effectToStat = {
        boost_attack: 'atk',
        boost_defense: 'def',
        boost_health: 'hp',
        boost_accuracy: 'acc',
        boost_evasion: 'evs',
        boost_critical: 'crt',
    }

    const boostedStats = (poke.effects || [])
        .filter(e => effectToStat[e])
        .map(e => effectToStat[e])

    const StatInventary = ({ stat, statKey, statName, nature, statIcon }) => {
        const natureIncreaseStat = pokemonNature[nature].increase
        const natureDecreaseStat = pokemonNature[nature].decrease
        const hasRarityBuff = poke.rarity.stats.includes(statKey)
        const hasNatureBuff = natureIncreaseStat === statKey && natureDecreaseStat !== statKey
        const hasNatureDebuff = natureDecreaseStat === statKey && natureIncreaseStat !== statKey
        const hasBerryBuff = boostedStats.includes(statKey)

        return (
            <Flex
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={0.5}
                title={statName}
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                borderRadius={6}
            >
                <Flex alignItems="center" gap={1}>
                    {statIcon}
                    <Text fontSize={separatorFontSize} opacity={0.2} mx="2px">|</Text>
                    <Text fontSize={statFontSize} fontWeight="bold" color={hasBerryBuff ? "#facc15" : undefined}>{stat}</Text>
                    {!hideIndicators && hasRarityBuff && (
                        <Star size={indicatorSize} fill="#facc15" color="#facc15" title="Rarity buff" />
                    )}
                    {!hideIndicators && hasNatureBuff && (
                        <ArrowBigUp size={indicatorSize} fill="#22c55e" color="#22c55e" title="Nature buff" />
                    )}
                    {!hideIndicators && hasNatureDebuff && (
                        <ArrowBigDown size={indicatorSize} fill="#ef4444" color="#ef4444" title="Nature debuff" />
                    )}
                </Flex>
            </Flex>
        )
    }

    const stats = [
        { stat: poke.stats.hp, statKey: "hp", statName: t('pokemon.health'), statIcon: <Heart size={iconSize} fill="currentColor" /> },
        { stat: poke.stats.atk, statKey: "atk", statName: t('pokemon.attack'), statIcon: <Swords size={iconSize} /> },
        { stat: poke.stats.def, statKey: "def", statName: t('pokemon.defense'), statIcon: <Shield size={iconSize} fill="currentColor" /> },
        { stat: poke.stats.evs + poke.tier, statKey: "evs", statName: t('pokemon.evasion'), statIcon: <Zap size={iconSize} fill="currentColor" /> },
        { stat: poke.stats.acc, statKey: "acc", statName: t('pokemon.accuracy'), statIcon: <Crosshair size={iconSize} /> },
        { stat: poke.stats.crt + poke.tier, statKey: "crt", statName: t('pokemon.critical'), statIcon: <Sparkles size={iconSize} fill="currentColor" /> },
    ]

    const columns = columnsProp ?? (isMini ? 2 : 2)

    return (
        <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            gap={1}
            mt={1}
            w="100%"
        >
            {stats.map(s => (
                <StatInventary
                    key={s.statKey}
                    stat={s.stat}
                    statKey={s.statKey}
                    statName={s.statName}
                    nature={poke.nature}
                    statIcon={s.statIcon}
                />
            ))}
        </Grid>
    )
}

export default PokeStats