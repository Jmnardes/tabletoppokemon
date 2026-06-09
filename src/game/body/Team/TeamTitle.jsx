import { Center, Flex, Text, useColorMode } from "@chakra-ui/react";

import { Heart, Swords, Shield, Zap, Crosshair, Sparkles } from 'lucide-react'

export default function TeamTitle({ pokeTeam, pokemons }) {
    const { colorMode } = useColorMode()
    
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
            <Text pt={2} fontSize={"xs"}>Team strength</Text>
            <Flex display="flex" flexDir="row" py={2} title="Team stats" cursor="pointer">
                <StatTitle
                    stat="hp"
                    statName="health"
                    statIcon={<Heart />}
                />
                <StatTitle
                    stat="atk"
                    statName="attack"
                    statIcon={<Swords />}
                />
                <StatTitle
                    stat="def"
                    statName="defense"
                    statIcon={<Shield />}
                />
                <StatTitle
                    stat="evs"
                    statName="evasion"
                    statIcon={<Zap />}
                />
                <StatTitle
                    stat="acc"
                    statName="accuracy"
                    statIcon={<Crosshair />}
                />
                <StatTitle
                    stat="crt"
                    statName="critical"
                    statIcon={<Sparkles />}
                />
            </Flex>
        </Flex>
    )
}