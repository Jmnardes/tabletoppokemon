import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield,
    GiUpgrade
} from "react-icons/gi";
import { stringToUpperCase } from "../../../util";

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
                                        <GiHearts title="Health" color="#d61717" size={32} style={{marginRight: 4}}/>
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
                                        <GiBroadsword title="Attack" color="#4b4b4b" size={32} style={{marginRight: 4}}/>
                                        <Text 
                                            title={
                                                `${(Number.parseFloat(attack/2).toFixed(0))} / ` +
                                                `${(Number.parseFloat(attack/1.5).toFixed(0))} / ` +
                                                `${(Number.parseFloat(attack*1.5).toFixed(0))} / ` +
                                                `${(Number.parseFloat(attack*2).toFixed(0))}`
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
                                        <GiShield title="Defense" color="#c8c815" size={32} style={{marginRight: 4}}/>
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
                                        <GiWingfoot title="Speed" color="#874B0F" size={32} style={{marginRight: 4}}/>
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
                                    <Box display="flex" alignItems="center" p={1}>
                                        <GiHearts title="Health" color="#d61717" size={showingType === 'inventary' ? 28 : 24} style={{marginRight: 1}}/>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{health}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <GiBroadsword title="Attack" color="#4b4b4b" size={showingType === 'inventary' ? 28 : 24} style={{marginRight: 1}}/>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{attack}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <GiShield title="Defense" color="#c8c815" size={showingType === 'inventary' ? 28 : 24} style={{marginRight: 1}}/>
                                        <Text fontSize={showingType === 'inventary' && "lg"} fontWeight="bold">{defense}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" p={1}>
                                        <GiWingfoot title="Speed" color="#874B0F" size={showingType === 'inventary' ? 28 : 24} style={{marginRight: 1}}/>
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