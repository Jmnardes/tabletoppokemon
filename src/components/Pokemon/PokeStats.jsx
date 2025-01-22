import { Flex, Kbd, Text } from "@chakra-ui/react";
import Accuracy from '@assets/svgs/stats/accuracy'
import Attack from '@assets/svgs/stats/attack'
import Defense from '@assets/svgs/stats/defense'
import Evasion from '@assets/svgs/stats/evasion'
import Critical from '@assets/svgs/stats/critical'
import Health from '@assets/svgs/stats/health'

function PokeStats({ poke }) {
    const StatInventary = ({ stat, statName, statIcon }) => {
        return (
            <Kbd display="flex" alignItems="center" my={1} ml={2} title={statName}>
                {statIcon}
                <Text ml={1.5} fontSize="16px" fontWeight="bold">{stat}</Text>
            </Kbd>
        )
    }

    return (
        <Flex mt={2} flexDir="column">
            <StatInventary
                stat={poke.stats.hp}
                statName={"Health"}
                statIcon={<Health w={24} h={24}/>}
            />
            <StatInventary
                stat={poke.stats.atk}
                statName={"Attack"}
                statIcon={<Attack w={24} h={24}/>}
            />
            <StatInventary
                stat={poke.stats.def}
                statName={"Defense"}
                statIcon={<Defense w={24} h={24}/>}
            />
            <StatInventary
                stat={poke.stats.evs + poke.tier}
                statName={"Evasion"}
                statIcon={<Evasion w={24} h={24}/>}
            />
            <StatInventary
                stat={poke.stats.acc}
                statName={"Accuracy"}
                statIcon={<Accuracy w={24} h={24}/>}
            />
            <StatInventary
                stat={poke.stats.crt + poke.tier}
                statName={"Critical"}
                statIcon={<Critical w={24} h={24}/>}
            />
        </Flex>
    )
}

export default PokeStats