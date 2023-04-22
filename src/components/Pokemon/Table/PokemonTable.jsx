import { Box, Flex, Image, Text } from "@chakra-ui/react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'
import accuracyIcon from '../../../assets/images/stats/accuracy.svg'
import criticalIcon from '../../../assets/images/stats/critical.svg'

function PokemonTable({ health, attack, defense, accuracy, evasion, critical, nature, showingType }) {

    const StatInventary = ({ stat, statName, statIcon }) => {
        return (
            <Box display="flex" alignItems="center" mx={1}>
                <Image
                    mr={1}
                    src={statIcon}
                    title={statName}
                    w="22px"
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
                            statIcon={healthIcon}
                        />
                        <StatInventary
                            stat={attack}
                            statName={"Attack"}
                            statIcon={swordIcon}
                        />
                        <StatInventary
                            stat={defense}
                            statName={"Defense"}
                            statIcon={shieldIcon}
                        />
                        <StatInventary
                            stat={accuracy}
                            statName={"Accuracy"}
                            statIcon={speedIcon}
                        />
                        <StatInventary
                            stat={evasion}
                            statName={"Evasion"}
                            statIcon={accuracyIcon}
                        />
                        <StatInventary
                            stat={critical}
                            statName={"Critical"}
                            statIcon={criticalIcon}
                        />
                    </Flex>
                </>
            }
        </>
    )
}

export default PokemonTable