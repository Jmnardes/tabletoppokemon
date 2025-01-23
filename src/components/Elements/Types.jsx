/* eslint-disable array-callback-return */
import { Box} from "@chakra-ui/react";
import Element from "@components/Elements/Element";

function Types({ types, w, h }) {

    return (
        <Box display="flex">
            {types?.map(t => {
                return <Element key={t} element={t} w={w} h={h} />
            })}
        </Box>
    )
}

export default Types
