/* eslint-disable array-callback-return */
import { Box, Center, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Element from "../Team/Element";

function Types({ types, shiny, tier, color, showingType }) {

    return (
        <Box 
            display="flex" 
            flexDirection={showingType === 'Team' ? "row" : "column"} 
            w={showingType === 'Team' && "100%"} 
            justifyContent={showingType === 'Team' && "space-between"}
            mt={showingType === 'Team' && 2}
        >
            {(tier || tier === 0) && 
                <Center
                    my={1}
                    backgroundColor={color}
                    fontWeight="bold"
                    borderRadius="100%"
                    ml={showingType === 'Team' ? 4 : 1}
                    w={6}
                >
                    <Text textAlign="center">{ tier }</Text>
                </Center>
            }
            {shiny &&
                <Box ml={1.5} my={1}>{<FaStar title="Shiny" size={20}/>}</Box>
            }
            {types.map(t => {
                return <Element key={t} element={t} />
            })}
        </Box>
    )
}

export default Types



