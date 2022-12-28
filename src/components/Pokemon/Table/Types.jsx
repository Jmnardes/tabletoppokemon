/* eslint-disable array-callback-return */
import { Box } from "@chakra-ui/react";
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
                <Box
                    mb={1}
                    backgroundColor={color}
                    fontWeight="bold"
                    borderRadius="100%"
                    textAlign="center"
                    ml={showingType === 'Team' ? 4 : 1}
                    w={6}
                >
                    { tier }
                </Box>
            }
            {shiny &&
                <Box ml={3/2} mb={1}>{<FaStar title="Shiny" size={20}/>}</Box>
            }
            {types.map(t => {
                return <Element key={t} element={t} />
            })}
        </Box>
    )
}

export default Types



