import { Flex, Grid, Kbd, Text } from "@chakra-ui/react";
import Accuracy from '@assets/svgs/stats/accuracy'
import Attack from '@assets/svgs/stats/attack'
import Defense from '@assets/svgs/stats/defense'
import Evasion from '@assets/svgs/stats/evasion'
import Critical from '@assets/svgs/stats/critical'
import Health from '@assets/svgs/stats/health'
import { FaStar, FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { pokemonNature } from "@utils";

function PokeStats({ poke, isMini }) {
    const StatInventary = ({ stat, statKey, statName, nature, statIcon }) => {
        const natureIncreaseStat = pokemonNature[nature].increase
        const natureDecreaseStat = pokemonNature[nature].decrease

        return (
            <Kbd display="flex" alignItems="center" my={1} ml={2} title={statName}>
                {statIcon}
                {poke.rarity.stats.includes(statKey) && (
                    <Flex position={"absolute"} mb={5} ml={10}>
                        <FaStar title="Rarity buff" color="green" size={12} />
                    </Flex>
                )}
                {natureIncreaseStat === statKey && (
                    <Flex position={"absolute"} mt={5} ml={10}>
                        <FaAngleDoubleUp title="Nature buff" color="green" size={12} />
                    </Flex>
                )}
                {natureDecreaseStat === statKey && (
                    <Flex position={"absolute"} mt={5} ml={10}>
                        <FaAngleDoubleDown title="Nature debuff" color="red" size={12} />
                    </Flex>
                )}
                <Text ml={1.5} fontSize="16px" fontWeight="bold">{stat}</Text>
            </Kbd>
        )
    }

    return (
        <Flex mt={2} flexDir="column">
            {isMini ? (
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <StatInventary
                    stat={poke.stats.hp}
                    statKey={"hp"}
                    statName={"Health"}
                    nature={poke.nature}
                    statIcon={<Health w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.atk}
                    statKey={"atk"}
                    statName={"Attack"}
                    nature={poke.nature}
                    statIcon={<Attack w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.def}
                    statKey={"def"}
                    statName={"Defense"}
                    nature={poke.nature}
                    statIcon={<Defense w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.evs + poke.tier}
                    statKey={"evs"}
                    statName={"Evasion"}
                    nature={poke.nature}
                    statIcon={<Evasion w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.acc}
                    statKey={"acc"}
                    statName={"Accuracy"}
                    nature={poke.nature}
                    statIcon={<Accuracy w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.crt + poke.tier}
                    statKey={"crt"}
                    statName={"Critical"}
                    nature={poke.nature}
                    statIcon={<Critical w={24} h={24} />}
                />
                </Grid>
            ) : (
                <>
                <StatInventary
                    stat={poke.stats.hp}
                    statKey={"hp"}
                    statName={"Health"}
                    nature={poke.nature}
                    statIcon={<Health w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.atk}
                    statKey={"atk"}
                    statName={"Attack"}
                    nature={poke.nature}
                    statIcon={<Attack w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.def}
                    statKey={"def"}
                    statName={"Defense"}
                    nature={poke.nature}
                    statIcon={<Defense w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.evs + poke.tier}
                    statKey={"evs"}
                    statName={"Evasion"}
                    nature={poke.nature}
                    statIcon={<Evasion w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.acc}
                    statKey={"acc"}
                    statName={"Accuracy"}
                    nature={poke.nature}
                    statIcon={<Accuracy w={24} h={24} />}
                />
                <StatInventary
                    stat={poke.stats.crt + poke.tier}
                    statKey={"crt"}
                    statName={"Critical"}
                    nature={poke.nature}
                    statIcon={<Critical w={24} h={24} />}
                />
                </>
            )}
        </Flex>
    )
}

export default PokeStats