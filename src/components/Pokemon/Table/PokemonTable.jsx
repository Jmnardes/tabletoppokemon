import { Box, Flex, Text } from "@chakra-ui/react";

import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";
import { stringToUpperCase } from "../../../util";

function PokemonTable({ health, attack, defense, speed, nature, name, showingType }) {

    return (
        <>
            {showingType !== 'roll' &&
                <>
                    <Box textAlign="center" display="flex" alignItems="center">
                        <Text fontSize={showingType === 'inventary' ? "lg" : 'xl'} fontWeight="bold">{stringToUpperCase(name)}</Text>
                    </Box>
                    {showingType === 'inventary' &&
                        <>
                            <Text fontSize="lg">{nature.nature}{" "}{nature.statUp && `(+${nature.statUp})`}{" "}{nature.statDown && `(-${nature.statDown})`}</Text>
                        </>
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
            }
        </>
    )
}

export default PokemonTable