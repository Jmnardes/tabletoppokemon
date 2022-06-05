import { Box, Flex, Text } from "@chakra-ui/react";

import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";
import { stringToUpperCase } from "../../../util";

function PokemonTable({ health, attack, defense, speed, nature, name, shiny }) {
    return (
        <>
            <Box textAlign="center">
                <Text fontSize='2xl' fontWeight={shiny ? 'bold' : ''}>{stringToUpperCase(name)}</Text>
                <Text fontSize='xs'>{ nature ? `(${nature})` : null }</Text>
            </Box>
            <Flex mt={2}>
                <Box display="flex" p={3}>
                    <GiHearts color="#d61717" size={28} style={{marginRight: 6}}/>
                    <Text fontSize="2x1" fontWeight="bold">{health}</Text>
                </Box>
                <Box display="flex" p={3}>
                    <GiBroadsword color="#4b4b4b" size={28} style={{marginRight: 6}}/>
                    <Text fontSize="2x1" fontWeight="bold">{attack}</Text>
                </Box>
                <Box display="flex" p={3}>
                    <GiShield color="#c8c815" size={28} style={{marginRight: 6}}/>
                    <Text fontSize="2x1" fontWeight="bold">{defense}</Text>
                </Box>
                <Box display="flex" p={3}>
                    <GiWingfoot color="#d58a2f" size={28} style={{marginRight: 6}}/>
                    <Text fontSize="2x1" fontWeight="bold">{speed}</Text>
                </Box>
            </Flex>
        </>
    )
}

export default PokemonTable