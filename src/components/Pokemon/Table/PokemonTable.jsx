import { Box, Flex, Text } from "@chakra-ui/react";
import Types from "./Types";

import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";

function PokemonTable({ health, attack, defense, type, speed, nature }) {
    return (
        <>
            <Flex w='100%' justifyContent="space-between" px={2}>
                <Text fontSize='xs' display="flex" alignItems="center">{ nature ? `(${nature})` : null }</Text>
                <Types types={type} />
            </Flex>
            <Flex mt={4}>
                <Box display="flex" p={2}>
                    <GiHearts color="red" size={20} style={{marginRight: 4}}/>
                    {health}
                </Box>
                <Box display="flex" p={2}>
                    <GiBroadsword size={20} style={{marginRight: 4}}/>
                    {attack}
                </Box>
                <Box display="flex" p={2}>
                    <GiShield color="gold" size={20} style={{marginRight: 4}}/>
                    {defense}
                </Box>
                <Box display="flex" p={2}>
                    <GiWingfoot color="aquamarine" size={20} style={{marginRight: 4}}/>
                    {speed}
                </Box>
            </Flex>
        </>
    )
}

export default PokemonTable