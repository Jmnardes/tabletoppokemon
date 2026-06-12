import { Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { Heart, Swords, Shield, Zap, Crosshair, Sparkles } from 'lucide-react'

export default function TeamTitle({ pokeTeam, pokemons }) {
    const { colorMode } = useColorMode()
    const { t } = useTranslation()
    
    // Aceita tanto pokeTeam (antigo) quanto pokemons (novo)
    const team = pokemons || pokeTeam
    
    const sumPokeStat = (stat) => {
        return team?.reduce((acc, poke) => {
            acc += poke.stats[stat];
            if (stat === 'crt' || stat === 'evs') {
                acc += poke.tier;
            }
            return acc;
        }, 0)
    }

    const StatTitle = ({ stat, statName, statIcon }) => {
        return (
            <Center mx={4} flexDir="column" title={statName}>
                {statIcon}
                <Text>{sumPokeStat(stat)}</Text>
            </Center>
        )
    }

    return (
        <Flex mt={4} flexDir={"column"} alignItems={"center"} background={colorMode === 'light' ? 'gray.400' : 'gray.600'} borderRadius={8}>
            <Text pt={2} fontSize={"xs"}>{t('team.teamStrength')}</Text>
            <Flex display="flex" flexDir="row" py={2} title={t('team.teamStats')} cursor="pointer">
                <StatTitle
                    stat="hp"
                    statName={t('pokemon.health')}
                    statIcon={<Heart />}
                />
                <StatTitle
                    stat="atk"
                    statName={t('pokemon.attack')}
                    statIcon={<Swords />}
                />
                <StatTitle
                    stat="def"
                    statName={t('pokemon.defense')}
                    statIcon={<Shield />}
                />
                <StatTitle
                    stat="evs"
                    statName={t('pokemon.evasion')}
                    statIcon={<Zap />}
                />
                <StatTitle
                    stat="acc"
                    statName={t('pokemon.accuracy')}
                    statIcon={<Crosshair />}
                />
                <StatTitle
                    stat="crt"
                    statName={t('pokemon.critical')}
                    statIcon={<Sparkles />}
                />
            </Flex>
        </Flex>
    )
}