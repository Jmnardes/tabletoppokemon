import { Flex, Grid, Text } from "@chakra-ui/react";
import { Heart, Swords, Shield, Zap, Crosshair, Sparkles, Star, ArrowBigUp, ArrowBigDown } from 'lucide-react'
import { pokemonNature } from "@utils";

function PokeStats({ poke, isMini }) {
    const StatInventary = ({ stat, statKey, statName, nature, statIcon }) => {
        const natureIncreaseStat = pokemonNature[nature].increase
        const natureDecreaseStat = pokemonNature[nature].decrease
        const hasRarityBuff = poke.rarity.stats.includes(statKey)
        const hasNatureBuff = natureIncreaseStat === statKey && natureDecreaseStat !== statKey
        const hasNatureDebuff = natureDecreaseStat === statKey && natureIncreaseStat !== statKey

        return (
            <Flex
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={1}
                title={statName}
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                borderRadius={6}
            >
                <Flex alignItems="center" gap={1}>
                    {statIcon}
                    <Text fontSize="8px" opacity={0.2} mx="2px">|</Text>
                    <Text fontSize="2xs" fontWeight="bold">{stat}</Text>
                </Flex>
                <Flex alignItems="center" gap={0.5}>
                    {hasRarityBuff && (
                        <Star size={12} fill="#facc15" color="#facc15" title="Rarity buff" />
                    )}
                    {hasNatureBuff && (
                        <ArrowBigUp size={12} fill="#22c55e" color="#22c55e" title="Nature buff" />
                    )}
                    {hasNatureDebuff && (
                        <ArrowBigDown size={12} fill="#ef4444" color="#ef4444" title="Nature debuff" />
                    )}
                </Flex>
            </Flex>
        )
    }

    const stats = [
        { stat: poke.stats.hp, statKey: "hp", statName: "Health", statIcon: <Heart size={16} fill="currentColor" /> },
        { stat: poke.stats.atk, statKey: "atk", statName: "Attack", statIcon: <Swords size={16} /> },
        { stat: poke.stats.def, statKey: "def", statName: "Defense", statIcon: <Shield size={16} fill="currentColor" /> },
        { stat: poke.stats.evs + poke.tier, statKey: "evs", statName: "Evasion", statIcon: <Zap size={16} fill="currentColor" /> },
        { stat: poke.stats.acc, statKey: "acc", statName: "Accuracy", statIcon: <Crosshair size={16} /> },
        { stat: poke.stats.crt + poke.tier, statKey: "crt", statName: "Critical", statIcon: <Sparkles size={16} fill="currentColor" /> },
    ]

    return (
        <Grid
            templateColumns={isMini ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
            gap={1}
            mt={2}
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