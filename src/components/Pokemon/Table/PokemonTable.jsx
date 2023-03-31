import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { GiUpgrade } from "react-icons/gi";
import { parseNumberMultToNatural, parseNumberToNatural, stringToUpperCase } from "../../../util";
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

    return (
        <>
            {showingType !== 'roll' &&
                <>
                    {showingType === 'Team' ? (
                        <>
                            <Text 
                                cursor="default" 
                                title={(
                                    nature.statUp && `+${nature.statUp} `
                                ) +
                                (
                                    nature.statDown && `-${nature.statDown}`
                                )}
                                fontWeight="bold" 
                                textAlign="center"
                            >{nature.nature}</Text>
                            <SimpleGrid columns={[1, 2]} spacingX={4} spacingY={2} mr={2} mt={2}>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <Box mr={2}>
                                            {nature.statUp === 'hp' && pokemonStat('Health', true)}
                                            {nature.statDown === 'hp' && pokemonStat('Health', false)}
                                        </Box>
                                        <Image
                                            mr={1}
                                            src={healthIcon} 
                                            title={'Health'}
                                            w="28px"
                                        ></Image>
                                        <Text
                                            cursor="default"
                                            fontSize={"lg"} 
                                            fontWeight="bold"
                                        >{health}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <Box mr={2}>
                                            {nature.statUp === 'atk' && pokemonStat('Attack', true)}
                                            {nature.statDown === 'atk' && pokemonStat('Attack', false)}
                                        </Box>
                                        <Image
                                            mr={1}
                                            src={swordIcon} 
                                            title={'Attack'}
                                            w="28px"
                                        ></Image>
                                        <Text 
                                            title={
                                                `${parseNumberToNatural(attack, 2)} / ` +
                                                `${parseNumberToNatural(attack, 1.5)} / ` +
                                                `${parseNumberMultToNatural(attack, 1.25)} / ` +
                                                `${parseNumberMultToNatural(attack, 1.5)}`
                                            } 
                                            cursor="default"
                                            fontSize={"lg"} 
                                            fontWeight="bold"
                                        >{attack}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <Box mr={2}>
                                            {nature.statUp === 'def' && pokemonStat('Defense', true)}
                                            {nature.statDown === 'def' && pokemonStat('Defense', false)}
                                        </Box>
                                        <Image
                                            mr={1}
                                            src={shieldIcon} 
                                            title={'Defense'}
                                            w="28px"
                                        ></Image>
                                        <Text
                                            cursor="default"
                                            fontSize={"lg"} 
                                            fontWeight="bold"
                                        >{defense}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <Box mr={2}>
                                            {nature.statUp === 'spd' && pokemonStat('Speed', true)}
                                            {nature.statDown === 'spd' && pokemonStat('Speed', false)}
                                        </Box>
                                        <Image
                                            mr={1}
                                            src={speedIcon} 
                                            title={'Speed'}
                                            w="28px"
                                        ></Image>
                                        <Text
                                            cursor="default"
                                            fontSize={"lg"} 
                                            fontWeight="bold"
                                        >{speed}</Text>
                                    </Box>
                            </SimpleGrid>
                        </>
                    ):(
                            <>
                                <Box textAlign="center" display="flex" alignItems="center">
                                    <Text fontSize={showingType === 'inventary' ? "lg" : 'xl'} fontWeight="bold">{stringToUpperCase(name)}</Text>
                                </Box>
                                {showingType === 'inventary' ?
                                (
                                    <Text fontSize="lg">{nature.nature}{" "}{nature.statUp && `(+${nature.statUp})`}{" "}{nature.statDown && `(-${nature.statDown})`}</Text>
                                ):(
                                    <Text fontSize="lg" >{nature.nature}</Text>
                                )
                                    
                                }
                                <Flex mt={showingType === 'inventary' ? 0 : 2}>
                                    <Box display="flex" alignItems="center" p={2}>
                                        <Image
                                            mr={2}
                                            src={healthIcon} 
                                            title={'Health'}
                                            w="32px"
                                        ></Image>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{health}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={2}>
                                        <Image
                                            mr={2}
                                            src={swordIcon} 
                                            title={'Attack'}
                                            w="28px"
                                        ></Image>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{attack}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={2}>
                                        <Image
                                            mr={2}
                                            src={shieldIcon} 
                                            title={'Defense'}
                                            w="28px"
                                        ></Image>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{defense}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={2}>
                                        <Image
                                            mr={2}
                                            src={speedIcon} 
                                            title={'Speed'}
                                            w="28px"
                                        ></Image>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{speed}</Text>
                                    </Box>
                                </Flex>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default PokemonTable