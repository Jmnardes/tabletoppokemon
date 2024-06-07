import { Center, Flex, Image, Kbd, Text, useColorMode } from "@chakra-ui/react";
import Accuracy from '../../../assets/svgs/stats/accuracy'
import Attack from '../../../assets/svgs/stats/attack'
import Defense from '../../../assets/svgs/stats/defense'
import Evasion from '../../../assets/svgs/stats/evasion'
import Critical from '../../../assets/svgs/stats/critical'
import Health from '../../../assets/svgs/stats/health'

export default function TeamTitle({ pokeTeam }) {
    const { colorMode } = useColorMode()
    
    const sumPokeStat = (stat) => {
        return pokeTeam?.reduce((acc, poke) => {
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
        <Flex display="flex" flexDir="row" mt={12} py={2} borderRadius={8} 
            background={colorMode === 'light' ? 'gray.400' : 'gray.600'}
            title="Team stats"
            cursor="pointer"
        >
            <StatTitle
                stat="hp"
                statName="health"
                statIcon={<Health/>}
            />
            <StatTitle
                stat="atk"
                statName="attack"
                statIcon={<Attack/>}
            />
            <StatTitle
                stat="def"
                statName="defense"
                statIcon={<Defense/>}
            />
            <StatTitle
                stat="evs"
                statName="evasion"
                statIcon={<Evasion/>}
            />
            <StatTitle
                stat="acc"
                statName="accuracy"
                statIcon={<Accuracy/>}
            />
            <StatTitle
                stat="crt"
                statName="critical"
                statIcon={<Critical/>}
            />
        </Flex>
    )
}