/* eslint-disable array-callback-return */
import { Box} from "@chakra-ui/react";
import Element from "@features/elements/Element";

function Types({ types, w, h, elementTable }) {

    return (
        <Box display="flex">
            {types?.map(t => {
                return <Element key={t} element={t} w={w} h={h} elementTable={elementTable} />
            })}
        </Box>
    )
}

export default Types
