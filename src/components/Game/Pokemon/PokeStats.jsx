import { Flex, Image, Kbd, Text } from "@chakra-ui/react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'
import accuracyIcon from '../../../assets/images/stats/accuracy.svg'
import criticalIcon from '../../../assets/images/stats/critical.svg'

function PokeStats({ poke }) {
    const StatInventary = ({ stat, statName, statIcon }) => {
        return (
            <Kbd display="flex" alignItems="center" my={1} ml={2}>
                <Image
                    mr={1}
                    src={statIcon}
                    title={statName}
                    w="24px"
                ></Image>
                <Text fontSize="16px" fontWeight="bold">{stat}</Text>
            </Kbd>
        )
    }

    return (
        <Flex mt={2} flexDir="column">
            <StatInventary
                stat={poke.stats.hp}
                statName={"Health"}
                statIcon={healthIcon}
            />
            <StatInventary
                stat={poke.stats.atk}
                statName={"Attack"}
                statIcon={swordIcon}
            />
            <StatInventary
                stat={poke.stats.def}
                statName={"Defense"}
                statIcon={shieldIcon}
            />
            <StatInventary
                stat={poke.stats.evs}
                statName={"Evasion"}
                statIcon={speedIcon}
            />
            <StatInventary
                stat={poke.stats.acc}
                statName={"Accuracy"}
                statIcon={accuracyIcon}
            />
            <StatInventary
                stat={poke.stats.crt}
                statName={"Critical"}
                statIcon={criticalIcon}
            />
        </Flex>
    )
}

export default PokeStats