import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GiUpgrade } from "react-icons/gi";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'

function PokemonTable({ health, attack, defense, speed, nature, name, showingType }) {
    const pokemonStat = (title, up) => {
        return (
            <>
                <Box position="absolute">
                    <GiUpgrade title={title} color={up ? "#2EC92E" : "#D73737" } style={!up && {transform: 'rotate(180deg)'}}/>
                </Box>
            </>
        )
    }

    const StatInventary = ({ stat, statName, statAbrev, statIcon }) => {
        return (
            <Box display="flex" alignItems="center" px={2}>
                <Box mr={2}>
                    {/* {nature.statUp === statAbrev && pokemonStat(statName, true)}
                    {nature.statDown === statAbrev && pokemonStat(statName, false)} */}
                </Box>
                <Image
                    mr={1}
                    src={statIcon}
                    title={statName}
                    w="26px"
                ></Image>
                <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{stat}</Text>
            </Box>
        )
    }

    return (
        <>
            {showingType !== 'roll' &&
                <>
                    {showingType === 'inventary' && (
                        // <Text fontSize="lg">{nature.nature}{" "}{nature.statUp && `(+${nature.statUp})`}{" "}{nature.statDown && `(-${nature.statDown})`}</Text>
                        <Text fontSize="lg">{nature}</Text>
                    )}
                    <Flex mt={showingType === 'inventary' ? 0 : 2}>
                        <StatInventary
                            stat={health}
                            statName={"Health"}
                            statAbrev={"hp"}
                            statIcon={healthIcon}
                        />
                        <StatInventary
                            stat={attack}
                            statName={"Attack"}
                            statAbrev={"atk"}
                            statIcon={swordIcon}
                        />
                        <StatInventary
                            stat={defense}
                            statName={"Defense"}
                            statAbrev={"def"}
                            statIcon={shieldIcon}
                        />
                        <StatInventary
                            stat={speed}
                            statName={"Speed"}
                            statAbrev={"spd"}
                            statIcon={speedIcon}
                        />
                    </Flex>
                </>
            }
        </>
    )
}

export default PokemonTable