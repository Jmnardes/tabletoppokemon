import { useState, useEffect } from "react";
import { Center, Text, Tooltip } from "@chakra-ui/react";
import { stringToUpperCase } from "@utils";

import Types from "../Elements/Types"

export default function CardTitle({ poke }) {
    const [titleStatsTooltip, setTitleStatsTooltip] = useState('')

    const TitleTooltip = () => {
        setTitleStatsTooltip(() => {
            return (
                <Center alignItems="center" justifyContent="center" flexDir="column">
                    <Text my={2} fontSize="xs" fontWeight="bold">
                        {stringToUpperCase(poke.nature)}
                    </Text>
                    <Types types={poke.types} w={6} h={6}/>
                </Center>
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        TitleTooltip()
    }, [poke])

    return (
        <Tooltip label={titleStatsTooltip} placement="top" h={24} w={36} borderRadius={8}>
            <Center flexDirection={"column"}>
                <Text fontFamily={"Press Start 2P"}>
                    {stringToUpperCase(poke.name)}
                </Text>
            </Center>
        </Tooltip>
    )
}